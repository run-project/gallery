/* globals systems path sync persistent */
/* eslint camelcase: [2, {properties: "never"}] */
/* eslint comma-dangle: [0, {properties: "never"}] */

/* see Azkfile.md */
systems({
  feedbin: {
    // Dependent systems
    depends: ["clock", "worker-slow", "worker", "redis", "postgres", "elasticsearch", "memcached"],
    // More images:  http://images.azk.io
    image: {"docker": "azukiapp/ruby:2.1.4"},
    // Steps to execute before running instances
    provision: [],
    workdir: "/azk/#{manifest.dir}",
    shell: "/bin/bash",
    command: "bundle exec rackup config.ru --pid /tmp/ruby.pid --port $HTTP_PORT --host 0.0.0.0",
    wait: {"retry": 40, "timeout": 10000},
    mounts: {
      // Uncomment the line below to use with two-way share (slower)
      //'/azk/#{manifest.dir}': path("."),
      // Run with one-way share rsync (faster)
      '/azk/#{manifest.dir}'        : sync("."),
      '/azk/bundler'                : persistent("bundler"),
      '/azk/#{manifest.dir}/tmp'    : persistent("tmp"),
      '/azk/#{manifest.dir}/.bundle': path(".bundle"),
      '/azk/#{manifest.dir}/log'    : path("log"),
    },
    scalable: {"default": 1},
    http: {
      domains: [
        "#{system.name}.#{azk.default_domain}", // default azk
        "#{process.env.AZK_HOST_IP}"            // used if deployed
      ]
    },
    envs: {
      // set instances variables
      RACK_ENV: "development",
      RUBY_ENV: "development",
    },
  },
  worker: {
    extends: 'feedbin',
    provision: [
      "bundle install --path /azk/bundler",
      "bundle exec rake db:setup",
    ],
    depends: ["postgres", "redis", "elasticsearch", "memcached"],
    command: 'bundle exec sidekiq -c 12 -q critical,2 -q feed_refresher_receiver,1 -q default',
    scalable: { limit: 1, default: 1},
    http: null,
    envs: {
      RACK_ENV: "development",
      RUBY_ENV: "development",
      DB_POOL: 12,
      LIBRATO_AUTORUN: 1,
    }
  },
  "worker-slow": {
    extends: 'feedbin',
    depends: ["postgres", "redis", "elasticsearch", "memcached"],
    command: 'bundle exec sidekiq -c 1 -q worker_slow_critical,3 -q worker_slow,2 -q favicon,1',
    scalable: { default: 1,  limit: 1 },
    http: null,
    envs: {
      RACK_ENV: "development",
      RUBY_ENV: "development",
      DB_POOL: 1
    }
  },
  clock: {
    extends: 'feedbin',
    depends: ["postgres", "redis", "elasticsearch", "memcached"],
    command: 'bundle exec clockwork lib/clock.rb',
    scalable: { default: 1,  limit: 1 },
    http: null,
    envs: {
      RACK_ENV: "development",
      RUBY_ENV: "development",
    }
  },
  redis: {
    image: {"docker": "redis"},
    export_envs: {
      "REDIS_HOST": "#{net.host}",
      "REDIS_PORT": "#{net.port.data}",
      "REDIS_URL": "redis://#{net.host}:#{net.port[6379]}",
    },
  },
  postgres: {
    // Dependent systems
    depends: [],
    // More images:  http://images.azk.io
    image: {"docker": "azukiapp/postgres:9.3"},
    shell: "/bin/bash",
    wait: {"retry": 20, "timeout": 1000},
    mounts: {
      '/var/lib/postgresql': persistent("postgresql"),
      '/var/log/postgresql': path("./log/postgresql"),
    },
    ports: {
      // exports global variables
      data: "5432/tcp",
    },
    envs: {
      // set instances variables
      POSTGRES_USER: "azk",
      POSTGRES_PASS: "azk",
      POSTGRES_DB  : "#{manifest.dir}",
    },
    export_envs: {
      // check this gist to configure your database
      // https://gist.github.com/gullitmiranda/62082f2e47c364ef9617
      DATABASE_URL: "postgres://#{envs.POSTGRES_USER}:#{envs.POSTGRES_PASS}@#{net.host}:#{net.port.data}/${envs.POSTGRES_DB}",
    },
  },
  elasticsearch: {
    image: { "docker": "barnybug/elasticsearch:0.90.13" },
    http: {
      domains: [ "#{system.name}.#{azk.default_domain}" ]
    },
    ports: {
      http: "9200",
    },
    wait: {"retry": 40, "timeout": 1000},
    export_envs : {
      ELASTICSEARCH_URL: "#{system.name}.#{azk.default_domain}:#{net.port[9200]}",
    },
  },
  memcached: {
    image: { "docker": "memcached" },
    ports: {
      http: "11211",
    },
    export_envs: {
      MEMCACHED_HOSTS: "#{system.name}.#{azk.default_domain}:#{net.port[11211]}"
    }
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
      BOX_SIZE: '2gb',
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
      BOX_SIZE: '2gb',
      GIT_CHECKOUT_COMMIT_BRANCH_TAG: 'azkfile',
      AZK_RESTART_COMMAND: 'azk restart -Rvv',
      RUN_SETUP: 'false',
      RUN_CONFIGURE: 'false',
      RUN_DEPLOY: 'true',
    }
  },

});
