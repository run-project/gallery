/* globals systems path sync persistent */
/* eslint camelcase: [2, {properties: "never"}] */
/* eslint comma-dangle: [0, {properties: "never"}] */

/* see Azkfile.md */
systems({

  dashboard: {
    depends: ['mongo', 'redis'],
    image: {"docker": "azukiapp/node:0.10"},
    provision: [
      "npm install",
      // "npm run grunt",
      // "node_modules/.bin/grunt",
    ],
    workdir: "/azk/#{system.name}",
    shell: "/bin/bash",

    command: "node bin/web.js",
    wait: { retry: 30, timeout: 1000 },
    mounts: {
      "/azk/#{system.name}": path("."),
      "/azk/#{system.name}/node_modules": persistent("#{system.name}/node_modules"),
      "/azk/#{system.name}/public/src/vendors": persistent("#{system.name}/public/src/vendors"),
    },
    scalable: {"default": 1},
    http: {
      domains: [
        "#{system.name}.#{azk.default_domain}", // default azk
        '#{process.env.AZK_HOST_IP}'            // used if deployed
      ]
    },
    ports: {
      http: "5000/tcp"
    },
    envs: {
      DOMAIN: "#{system.name}.#{azk.default_domain}",
      HOST: "0.0.0.0",
      PORT: "5000",

      // Port for running the application, default is 5000
      PORT: "5000",

      // Url for the mongoDB database
      // already get from mongo dependency
      // MONGODB_URL: "",

      // (Optional) Url for a redis database when using worker mode
      // already get from redis dependency
      // REDIS_URL: "",

      // Username for authentication
      AUTH_USERNAME: "",

      // Password for authentication
      AUTH_PASSWORD: "",

      MAIL_SERVICE: "",
      MAIL_USERNAME: "",
      MAIL_PASSWORD: "",
      MAIL_FROM: "",
      TWILIO_SID: "",
      TWILIO_TOKEN: "",
      TWILIO_FROM: "",
    },
  },

  worker: {
    extends: 'dashboard',
    scalable: { default: 1, limit: 1 },
    http: null,
    ports: null,
    wait: undefined,
    image: {"docker": "azukiapp/node:0.10"},
    command: "node bin/worker.js",
  },

  redis: {
    image: {"docker": "redis"},
    ports: {
      data: "6379/tcp"
    },
    export_envs: {
      REDIS_HOST: "#{net.host}",
      REDIS_PORT: "#{net.port.data}",
      REDIS_URL: "redis://#{net.host}:#{net.port.data}",
      OPENREDIS_URL: "redis://#{net.host}:#{net.port.data}",
      DISCOURSE_REDIS_HOST: "#{net.host}",
      DISCOURSE_REDIS_PORT: "#{net.port.data}"
    }
  },

  mongo: {
    image : { docker: "azukiapp/mongodb" },
    scalable: false,
    wait: { retry: 60, timeout: 1000 },
    // Mounts folders to assigned paths
    mounts: {
      // equivalent persistent_folders
      '/data/db': persistent('mongodb-#{manifest.dir}'),
    },
    ports: {
      http: "28017/tcp",
      data: "27017:27017/tcp",
    },
    http      : {
      // mongodb.azk.dev
      domains: [ "#{manifest.dir}-#{system.name}.#{azk.default_domain}" ],
    },
    export_envs        : {
      MONGODB_URL: "mongodb://#{net.host}:#{net.port[27017]}/#{manifest.dir}_development",
      // LCB_DATABASE_URI: "mongodb://mongo/letschat",
      LCB_DATABASE_URI: "mongodb://#{net.host}:#{net.port[27017]}/#{manifest.dir}_development",
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

