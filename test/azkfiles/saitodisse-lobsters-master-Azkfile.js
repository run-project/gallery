/**
 * azk's documentation: http://docs.azk.io/Azkfile.js
 */
systems({

  // Rails
  lobsters: {
    depends: ["mysql"],
    image: {"docker": "azukiapp/ruby:2.1"},

    // Steps to execute before running instances
    provision: [
      "bundle install --path /azk/bundler",
      "bundle exec rake db:create RACK_ENV=production",
      // "bundle exec rake db:schema:load RACK_ENV=production",
      "bundle exec rake db:migrate RACK_ENV=production",
      "echo \"Lobsters::Application.config.secret_key_base = '$(bundle exec rake secret)'\" > config/initializers/secret_token.rb",
      "bundle exec rake db:seed RACK_ENV=production",
    ],
    workdir: "/azk/#{manifest.dir}",
    shell: "/bin/bash",

    // command: "bundle exec unicorn -p $HTTP_PORT -c ./config/unicorn.rb",
    command: "bundle exec rails server -p $HTTP_PORT -P /tmp/ruby.pid -b 0.0.0.0",

    wait: 20,
    mounts: {
      '/azk/#{manifest.dir}': sync("."),
      '/azk/bundler': persistent("./bundler"),
      '/azk/#{manifest.dir}/tmp': persistent("./tmp"),
      '/azk/#{manifest.dir}/log': path("./log"),
      '/azk/#{manifest.dir}/.bundle': path("./.bundle"),
    },
    scalable: {"default": 1},
    http: {
      domains: [
        '#{env.HOST_DOMAIN}',                   // used only if deployed
        '#{env.HOST_IP}',                       // used only if deployed
        "#{system.name}.#{azk.default_domain}", // default azk domain
      ]
    },
    ports: {
      http: "3000/tcp",
    },
    envs: {
      RUBY_ENV: "production",
      BUNDLE_APP_CONFIG: "/azk/bundler",
      APP_URL: "#{system.name}.#{azk.default_domain}",
      //$ openssl rand -hex 20
      SECRET_TOKEN: "d108461ed31016b360479e074a4ae4fefff1d8eb"
    },
  },

  mysql: {
    depends: [],
    image: {"docker": "azukiapp/mysql:5.6"},
    shell: "/bin/bash",
    wait: 25,
    mounts: {
      "/var/lib/mysql": persistent("#{manifest.dir}/mysql"),
    },
    ports: {
      data: "3306/tcp",
    },
    envs: {
      MYSQL_ROOT_PASSWORD: "mysecretpassword",
      MYSQL_USER: "azk",
      MYSQL_PASS: "azk",
      MYSQL_DATABASE: "#{manifest.dir}_development",
    },
    export_envs: {
      // check this gist to configure your database
      // https://gist.github.com/gullitmiranda/62082f2e47c364ef9617
      DATABASE_URL: "mysql2://#{envs.MYSQL_USER}:#{envs.MYSQL_PASS}@#{net.host}:#{net.port.data}/${envs.MYSQL_DATABASE}",
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
      "/azk/deploy/.ssh": path("#{env.HOME}/.ssh")
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
