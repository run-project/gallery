/**
 * Documentation: http://docs.azk.io/Azkfile.js
 */
// Adds the systems that shape your system
systems({
  stringer: {
    // Dependent systems
    depends: ["postgres"],
    // More images:  http://images.azk.io
    image: {"docker": "azukiapp/ruby:2.0"},
    // Steps to execute before running instances
    provision: [
      "bundle install --path /azk/bundler",
      "bundle exec rake db:migrate RACK_ENV=production",
    ],
    workdir: "/azk/#{manifest.dir}",
    shell: "/bin/bash",

    // command: "bundle exec rackup config.ru --pid /tmp/ruby.pid --port $HTTP_PORT --host 0.0.0.0",
    command: [
      // fetch now!
      "bundle exec rake fetch_feeds",
      // start server
      "bundle exec unicorn -p $HTTP_PORT -c ./config/unicorn.rb",
    ].join(";"),

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
        "#{system.name}.#{azk.default_domain}", // default azk
        '#{process.env.AZK_HOST_IP}'            // used if deployed
      ]
    },
    ports: {
      // exports global variables
      http: "3000/tcp",
    },
    envs: {
      // Make sure that the PORT value is the same as the one
      // in ports/http below, and that it's also the same
      // if you're setting it in a .env file
      RUBY_ENV: "production",
      BUNDLE_APP_CONFIG: "/azk/bundler",
      APP_URL: "#{system.name}.#{azk.default_domain}",
      //$ openssl rand -hex 20
      SECRET_TOKEN: "d108461ed31016b360479e074a4ae4fefff1d8eb",
    },
  },
  postgres: {
    // Dependent systems
    depends: [],
    // More images:  http://images.azk.io
    image: {"docker": "azukiapp/postgres:9.3"},
    shell: "/bin/bash",
    wait: 20,
    mounts: {
      '/var/lib/postgresql/data': persistent("postgresql"),
      '/var/log/postgresql': path("./log/postgresql"),
    },
    ports: {
      // exports global variables
      data: "5432/tcp",
    },
    envs: {
      // set instances variables
      POSTGRESQL_USER: "stringer",
      POSTGRESQL_PASS: "EDIT_ME",
      POSTGRESQL_DB: "stringer_live",
    },
    export_envs: {
      // check this gist to configure your database
      // https://gist.github.com/gullitmiranda/62082f2e47c364ef9617
      DATABASE_URL: "postgres://#{envs.POSTGRESQL_USER}:#{envs.POSTGRESQL_PASS}@#{net.host}:#{net.port.data}/${envs.POSTGRESQL_DB}",

      // from https://github.com/saitodisse/stringer/blob/master/docs/VPS.md
      STRINGER_DATABASE: "${envs.POSTGRESQL_DB}",
      STRINGER_DATABASE_USERNAME: "${envs.POSTGRESQL_USER}",
      STRINGER_DATABASE_PASSWORD: "${envs.POSTGRESQL_PASS}",
      STRINGER_DATABASE_HOST: "#{net.host}",
      STRINGER_DATABASE_PORT: "#{net.port.data}",

      RACK_ENV: "production",
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
