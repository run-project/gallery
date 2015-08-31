systems({
  habitrpg: {
    depends: ['mongo'],
    image: {"dockerfile": "Azkfile.Dockerfile"},
    provision: [
      "npm install nodemon phantomjs -g",
      "npm install",
      "node_modules/.bin/bower install --allow-root",
      "node_modules/.bin/grunt build:prod",
    ],
    workdir: "/azk/#{manifest.dir}",
    shell: "/bin/bash",

    // command: "node_modules/.bin/grunt run:dev",
    command: "node_modules/.bin/grunt nodemon",

    wait: { retry: 30, timeout: 1000 },
    mounts: {
      '/azk/#{manifest.dir}': sync("."),
      '/azk/#{manifest.dir}/node_modules': persistent("#{system.name}/node_modules"),
      '/azk/#{manifest.dir}/website/public/bower_components': persistent("#{system.name}/bower_components"),
      '/azk/#{manifest.dir}/website/build': persistent("#{system.name}/website/build"),
    },
    scalable: {"default": 1},
    http: {
      domains: [
        "#{system.name}.#{azk.default_domain}", // default azk
        "#{process.env.AZK_HOST_IP}"            // used if deployed
      ]
    },
    ports: {
      http: "3000/tcp",
    },
    envs: {
      NODE_ENV        : "dev",
      PORT            : "3000",
      HOST            : "0.0.0.0",
      SESSION_SECRET  : "THIS_IS_THE_SESSION_SECRET",
      BASE_URL        : "http ://#{system.name}.#{azk.default_domain}",
      FACEBOOK_KEY    : "123456789012345",
      FACEBOOK_SECRET : "aaaabbbbccccddddeeeeffff00001111",
      ADMIN_EMAIL     : "you@yours.com",
      SMTP_USER       : "user@domain.com",
      SMTP_PASS       : "password",
      SMTP_SERVICE    : "Gmail",
      SMTP_HOST       : "smtp.gmail.com",
      SMTP_PORT       : "587",
      SMTP_TLS        : "true",
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
      domains: [ "#{system.name}.#{azk.default_domain}" ],
    },
    export_envs        : {
      NODE_DB_URI: "mongodb://#{net.host}:#{net.port[27017]}/#{manifest.dir}_development",
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
