/* globals systems path sync persistent */
/* eslint camelcase: [2, {properties: "never"}] */
/* eslint comma-dangle: [0, {properties: "never"}] */

/* see Azkfile.md */
systems({

  "lets-chat": {
    depends: ['mongo'],
    image: {"docker": "azukiapp/node:0.10"},
    provision: [
      "npm install --production",
    ],
    workdir: "/azk/#{manifest.dir}",
    shell: "/bin/bash",

    command: "npm start",
    wait: { retry: 30, timeout: 1000 },
    mounts: {
      "/azk/#{manifest.dir}": path("."),
      "/azk/node_modules": persistent("#{manifest.dir}/node_modules"),
    },
    scalable: {"default": 1},
    http: {
      domains: [
        "#{system.name}.#{azk.default_domain}", // default azk
        '#{process.env.AZK_HOST_IP}'            // used if deployed
      ]
    },
    ports: {
      http: "8080/tcp",
      xmpp: "5222/tcp",
    },
    envs: {
      DOMAIN: "#{system.name}.#{azk.default_domain}",
      PORT: "8080",
      NODE_ENV: "production",

      LCB_HTTP_HOST: "0.0.0.0",
      LCB_HTTP_PORT: "8080",
      LCB_XMPP_ENABLE: "true",
      LCB_XMPP_PORT: "5222",
    },
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
      MONGODB_URI: "mongodb://#{net.host}:#{net.port[27017]}/#{manifest.dir}_development",
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
