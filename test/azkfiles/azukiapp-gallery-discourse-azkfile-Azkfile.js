/* globals systems path sync persistent */
/* eslint camelcase: [2, {properties: "never"}] */
/* eslint comma-dangle: [0, {properties: "never"}] */

/**
 *   see more info on Azkfile.md
 */

systems({

  /////////////////////////////////////////////////
  /// discourse
  /// ----------------------
  /// ruby 2.0
  /////////////////////////////////////////////////
  discourse: {
    depends: ["postgres", "redis", "mail"],
    image: {"docker": "azukiapp/ruby:2.0"},
    provision: [
      "bundle install --path /azk/bundler",
      "bundle exec rake db:migrate"
    ],
    workdir: "/azk/#{manifest.dir}",
    shell: "/bin/bash",
    command: "bundle exec rails server -p $HTTP_PORT -P /tmp/ruby.pid -b 0.0.0.0",
    wait: 20,
    mounts: {
      "/azk/#{manifest.dir}": sync("."),
      "/azk/bundler": persistent("#{manifest.dir}/bundler"),
      "/azk/#{manifest.dir}/tmp": persistent("#{manifest.dir}/tmp"),
      "/azk/#{manifest.dir}/log": path("#{manifest.dir}/log"),
      "/azk/#{manifest.dir}/.bundle": path("#{manifest.dir}/.bundle")
    },
    scalable: {"default": 1},
    http: {
      domains: [
        "#{system.name}.#{azk.default_domain}", // default azk
        "#{process.env.AZK_HOST_IP}"            // used if deployed
      ]
    },
    ports: {
      // exports global variables
      http: "3000/tcp"
    },
    envs: {
      RAILS_ENV: "development",
      BUNDLE_APP_CONFIG: "/azk/bundler",
      DISCOURSE_DEVELOPER_EMAILS: "admin@example.com",
      DISCOURSE_HOSTNAME: "#{system.name}.#{azk.default_domain}"
    },
    export_envs: {
      // will override on "discourse-sidekiq" that extends same envs
      DISCOURSE_HOSTNAME: "#{system.name}.#{azk.default_domain}",
      // will be used on ngrok system
      APP_URL: "#{azk.default_domain}:#{net.port.http}"
    }
  },

  /////////////////////////////////////////////////
  /// discourse-sidekiq
  /// ----------------------
  /// sidekiq worker
  /// `/jobs` folder
  /////////////////////////////////////////////////
  "discourse-sidekiq": {
    depends: ["discourse", "postgres", "redis", "mail"], // depends on discourse too
    extends: "discourse",
    scalable: { default: 1, limit: 1 },
    http: null,
    ports: null,
    wait: undefined,
    command: "bundle exec sidekiq -c 3 -v"
  },

  /////////////////////////////////////////////////
  /// postgres
  /// ----------------------
  /// postgres:9.3 database
  /////////////////////////////////////////////////
  postgres: {
    depends: [],
    image: {"docker": "azukiapp/postgres:9.3"},
    shell: "/bin/bash",
    wait: 20,
    mounts: {
      "/var/lib/postgresql/data": persistent("postgresql"),
      "/var/log/postgresql": path("./log/postgresql")
    },
    ports: {
      data: "5432/tcp"
    },
    envs: {
      POSTGRESQL_USER: "azk",
      POSTGRESQL_PASS: "azk",
      POSTGRESQL_DB: "postgres_development"
    },
    export_envs: {
      // check this gist to configure your database
      // https://gist.github.com/gullitmiranda/62082f2e47c364ef9617
      DATABASE_URL: "postgres://#{envs.POSTGRESQL_USER}:#{envs.POSTGRESQL_PASS}@#{net.host}:#{net.port.data}/${envs.POSTGRESQL_DB}"
    }
  },

  /////////////////////////////////////////////////
  /// redis
  /// ----------------------
  /// redis database
  /////////////////////////////////////////////////
  redis: {
    image: {"docker": "redis"},
    ports: {
      data: "6379/tcp"
    },
    export_envs: {
      "REDIS_HOST": "#{net.host}",
      "REDIS_PORT": "#{net.port.data}",
      "REDIS_URL": "redis://#{net.host}:#{net.port.data}",
      "OPENREDIS_URL": "redis://#{net.host}:#{net.port.data}",
      "DISCOURSE_REDIS_HOST": "#{net.host}",
      "DISCOURSE_REDIS_PORT": "#{net.port.data}"
    }
  },

  /////////////////////////////////////////////////
  /// mail
  /// ----------------------
  /// mailcatcher: will intercept all mail sent
  /////////////////////////////////////////////////
  mail: {
    depends: [],
    image: {"docker": "schickling/mailcatcher"},
    http: {
      domains: [
        "#{system.name}.#{azk.default_domain}"
      ]
    },
    ports: {
      http: "1080/tcp",
      smtp: "1025/tcp"
    },
    export_envs: {
      // exports global variables to discourse's systems
      // see on Azkfile.md how to use real SMTP servers
      DISCOURSE_MAILCATCHER_SMTP_ADDRESS: "#{net.host}",
      DISCOURSE_MAILCATCHER_SMTP_PORT: "#{net.port.smtp}"
    }
  },

  /////////////////////////////////////////////////
  /// ngrok: discourse website tunnel exposer
  /// -----------------------------
  /// Secure tunnels to localhost
  /// "I want to expose a local server behind a NAT
  /// or firewall to the internet."
  ///
  /// https://ngrok.com/
  /////////////////////////////////////////////////
  "ngrok": {
    depends: ["discourse"],
    image: {docker: "azukiapp/ngrok"},
    mounts: {
      "/ngrok/log": path("/tmp")
    },
    scalable: { default: 0, "limit": 1 },
    wait: 10,
    http: {
      domains: ["#{system.name}.#{azk.default_domain}"]
    },
    ports: {
      http: "4040/tcp"
    },
    envs: {
      NGROK_CONFIG: "/ngrok/ngrok.yml",
      NGROK_LOG: "/ngrok/log/#{system.name}_ngrok.log"
    }
  },

  /////////////////////////////////////////////////
  /// deploy
  /// -----------------------------
  /// https://github.com/azukiapp/docker-deploy-digitalocean
  /////////////////////////////////////////////////
  deploy: {
    image: {"docker": "azukiapp/deploy-digitalocean"},
    mounts: {
      "/azk/deploy/src":  path("."),
      "/azk/deploy/.ssh": path("#{process.env.HOME}/.ssh")
    },
    scalable: {"default": 0, "limit": 0},
    envs: {
      GIT_CHECKOUT_COMMIT_BRANCH_TAG: 'feature/azkfile',
      AZK_RESTART_COMMAND: 'azk restart -Rvv',
    }
  },

  /////////////////////////////////////////////////
  /// deploy
  /// -----------------------------
  /// https://github.com/azukiapp/docker-deploy-digitalocean
  /////////////////////////////////////////////////
  "fast-deploy": {
    extends: 'deploy',
    envs: {
      GIT_CHECKOUT_COMMIT_BRANCH_TAG: 'feature/azkfile',
      AZK_RESTART_COMMAND: 'azk restart -Rvv',
      RUN_SETUP: 'false',
      RUN_CONFIGURE: 'false',
      RUN_DEPLOY: 'true',
    }
  },

});
