/* globals path, systems, sync, persistent */
/* eslint camelcase: [2, {properties: "never"}] */
/* eslint comma-dangle: [0, {properties: "never"}] */
systems({
  dillinger: {
    depends: [],
    image: { docker: 'azukiapp/node:4' },
    provision: [
      'npm install',
      'npm install gulp',

      // FIXME: remove this after gulp-group-css-media-queries
      // is updated. https://github.com/SE7ENSKY/group-css-media-queries/pull/8
      'wget https://raw.githubusercontent.com/saitodisse/group-css-media-queries/71fe8b181650b20790aca325988ac0fb9d9fe4a4/index.js -O ./node_modules/gulp-group-css-media-queries/node_modules/group-css-media-queries/index.js',
      'wget https://raw.githubusercontent.com/saitodisse/group-css-media-queries/71fe8b181650b20790aca325988ac0fb9d9fe4a4/index.js -O ./node_modules/group-css-media-queries/index.js',

      'node_modules/.bin/gulp build --prod',
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
    scalable: { default: 1 },
    http: {
      domains: [
        '#{env.HOST_DOMAIN}',                   // used if deployed
        '#{env.HOST_IP}',                       // used if deployed
        '#{system.name}.#{azk.default_domain}', // default azk domain
      ]
    },
    ports: {
      http: '8080/tcp'
    },
    envs: {
      PATH: 'node_modules/.bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin',
      // NODE_ENV: 'production',
      HOST_NAME: '#{system.name}.#{azk.default_domain}',
      PORT: '8080',
    }
  },

  deploy: {
    image: { docker: 'azukiapp/deploy-digitalocean' },
    mounts: {

      // your files on remote machine
      // will be on /home/git folder
      '/azk/deploy/src':  path('.'),

      // will use your public key on server
      // that way you can connect with:
      // $ ssh git@REMOTE.IP
      // $ bash
      '/azk/deploy/.ssh': path('#{env.HOME}/.ssh')
    },

    // this is not a server
    // just call with azk shell deploy
    scalable: { default: 0, limit: 0 },

    envs: {
      GIT_CHECKOUT_COMMIT_BRANCH_TAG: 'master',
      AZK_RESTART_COMMAND: 'azk restart dillinger -Rvv',
      RUN_SETUP: 'true',
      RUN_CONFIGURE: 'true',
      RUN_DEPLOY: 'true',
    }
  },
  'fast-deploy': {
    extends: 'deploy',
    envs: {
      GIT_CHECKOUT_COMMIT_BRANCH_TAG: 'master',
      AZK_RESTART_COMMAND: 'azk restart dillinger -Rvv',
      RUN_SETUP: 'false',
      RUN_CONFIGURE: 'false',
      RUN_DEPLOY: 'true',
    }
  },

});
