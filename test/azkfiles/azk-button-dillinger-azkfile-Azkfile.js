/* globals path, systems, sync, persistent */
/* eslint camelcase: [2, {properties: "never"}] */
/* eslint comma-dangle: [0, {properties: "never"}] */

/**
 * see Azkfile.md for more info
 */
systems({
  'dillinger': {
    // Dependent systems
    depends: [],
    image: {'docker': 'azukiapp/node:0.10'},
    provision: [
      'npm install -d',
      'npm install gulp',
      'node_modules/.bin/gulp build --prod &',
    ],
    workdir: '/azk/#{manifest.dir}',
    shell: '/bin/bash',
    command: 'NODE_ENV=production node app',
    wait: 30,
    mounts: {
      '/azk/#{manifest.dir}': sync('.'),
      '/azk/#{manifest.dir}/node_modules': persistent('#{manifest.dir}/node_modules'),
      '/azk/#{manifest.dir}/bower_components': persistent('#{manifest.dir}/bower_components'),
    },
    scalable: {'default': 1},
    http: {
      domains: [
        '#{system.name}.#{azk.default_domain}', // default azk
        '#{process.env.AZK_HOST_IP}'            // used if deployed
      ]
    },
    ports: {
      http: '8080/tcp'
    },
    envs: {
      // NODE_ENV: 'production',
      HOST_NAME: '#{system.name}.#{azk.default_domain}',
      // Make sure that the PORT value is the same as the one
      // in ports/http below, and that it's also the same
      // if you're setting it in a .env file
      PORT: '8080',
      PATH: 'node_modules/.bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin'
    }
  },

  //////////
  /// deploy
  //////////
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
      AZK_RESTART_COMMAND: 'azk restart huginn-worker -Rvv && azk restart huginn -Rvv',
      RUN_SETUP: 'true',
      RUN_CONFIGURE: 'true',
      RUN_DEPLOY: 'true',
    }
  },
  "fast-deploy": {
    extends: 'deploy',
    envs: {
      GIT_CHECKOUT_COMMIT_BRANCH_TAG: 'azkfile',
      AZK_RESTART_COMMAND: 'azk restart huginn-worker -Rvv && azk restart huginn -Rvv',
      RUN_SETUP: 'false',
      RUN_CONFIGURE: 'false',
      RUN_DEPLOY: 'true',
    }
  },

});
