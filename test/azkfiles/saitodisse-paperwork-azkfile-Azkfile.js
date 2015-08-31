/* globals systems sync persistent */

/**
 * see Azkfile.md for more info
 */
systems({
  frontend: {
    depends: ['db'],
    image: { docker: "azukiapp/php-fpm:5.6" },
    // Steps to execute before running instances
    provision: [
      // prepare storage folder because persisted
      "mkdir -p ./app/storage/attachments ./app/storage/cache ./app/storage/logs ./app/storage/meta ./app/storage/sessions ./app/storage/views",
      "find ./app/storage -type d -print0 | xargs -0 chmod 0755",
      // "find ./app/storage -type f -print0 | xargs -0 chmod 0644",
      // install system dependencies (composer, npm and bower)
      "composer install",
      "npm install",
      "node_modules/.bin/bower --allow-root install",
      // compile assets and start livereload
      "node_modules/.bin/gulp",
      // create db and run migrations
      'mysql -P $MYSQL_PORT -h $MYSQL_HOST -u $MYSQL_USER -p$MYSQL_PASSWORD -e "CREATE DATABASE $MYSQL_DATABASE"',
      "php artisan migrate",
    ],
    workdir: "/azk/#{manifest.dir}/#{system.name}",
    shell: "/bin/bash",
    wait: 20,
    mounts: {
      '/azk/#{manifest.dir}/#{system.name}'                        : sync("./#{system.name}"),
      '/azk/#{manifest.dir}/#{system.name}/vendor'                 : persistent("#{system.name}/vendor"),
      '/azk/#{manifest.dir}/#{system.name}/app/storage'            : persistent("#{system.name}/app/storage"),
      '/azk/#{manifest.dir}/#{system.name}/app/js/bower_components': persistent("#{system.name}/app/js/bower_components"),
      '/azk/#{manifest.dir}/#{system.name}/node_modules'           : persistent("#{system.name}/node_modules"),
      '/azk/#{manifest.dir}/#{system.name}/composer.lock'          : path("#{system.name}/composer.lock"),
      '/azk/#{manifest.dir}/#{system.name}/bootstrap/compiled.php' : path("#{system.name}/bootstrap/compiled.php"),
      // '/azk/#{manifest.dir}/#{system.name}/.env.php': path("#{system.name}/.env.php"),
    },
    scalable: {"default": 1},
    http: {
      domains: [
        "paperwork.#{azk.default_domain}", // default azk
        "#{process.env.AZK_HOST_IP}"       // used if deployed
      ]
    },
    ports: {
      // exports global variables
      http: "80/tcp",
    },
    envs: {
      // Make sure that the PORT value is the same as the one
      // in ports/http below, and that it's also the same
      // if you're setting it in a .env file
      APP_DIR: "/azk/#{manifest.dir}/#{system.name}",
      COMPOSER_ENV: "development",
    },
  },
  db: {
    depends: [],
    image: {"docker": "azukiapp/mysql:5.6"},
    shell: "/bin/bash",
    wait: 25,
    mounts: {
      "/var/lib/mysql": persistent("#{manifest.dir}/mysql"),
    },
    ports: {
      data: "3306:3306/tcp",
    },
    envs: {
      MYSQL_ROOT_PASSWORD: "secret",
      MYSQL_USER: "paperwork",
      MYSQL_PASS: "paperwork",
      MYSQL_DATABASE: "paperwork",
    },
    export_envs: {
      DATABASE_URL  : "mysql2://#{envs.MYSQL_USER}:#{envs.MYSQL_PASS}@#{net.host}:#{net.port.data}/${envs.MYSQL_DATABASE}",
      MYSQL_HOST    : "#{net.host}",
      MYSQL_PORT    : "#{net.port.data}",
      MYSQL_USER    : "#{envs.MYSQL_USER}",
      MYSQL_PASSWORD: "#{envs.MYSQL_PASS}",
      MYSQL_DATABASE: "#{envs.MYSQL_DATABASE}",
    },
  },

  deploy: {
    image: {"docker": "azukiapp/deploy-digitalocean"},
    mounts: {

      // your files on remote machine
      // will be on /home/git folder
      "/azk/deploy/src":  path("."),

      // will use your public key on server
      // that way you can connect with:
      // $ ssh git@REMOTE.IP
      // $ bash
      "/azk/deploy/.ssh": path("#{process.env.HOME}/.ssh")
    },

    // this is not a server
    // just call with azk shell deploy
    scalable: {"default": 0, "limit": 0},

    envs: {
      GIT_CHECKOUT_COMMIT_BRANCH_TAG: 'azkfile',
      AZK_RESTART_COMMAND: 'azk restart -Rvv',
      RUN_SETUP: 'true',
      RUN_CONFIGURE: 'true',
      RUN_DEPLOY: 'true',
    }
  },
  "fast-deploy": {
    extends: 'deploy',
    envs: {
      GIT_CHECKOUT_COMMIT_BRANCH_TAG: 'azkfile',
      AZK_RESTART_COMMAND: 'azk restart -Rvv',
      RUN_SETUP: 'false',
      RUN_CONFIGURE: 'false',
      RUN_DEPLOY: 'true',
    }
  },
});
