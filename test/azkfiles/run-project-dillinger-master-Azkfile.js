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
      '/azk/deploy/src':     path('.'),
      '/azk/deploy/.ssh':    path('#{env.HOME}/.ssh'), // Required to connect with the remote server
      '/azk/deploy/.config': persistent('deploy-config')
    },

    // This is not a server. Just run it with `azk deploy`
    scalable: { default: 0, limit: 0 },

    envs: {
      // List of available deployment settings:
      // https://github.com/azukiapp/docker-deploy-digitalocean/blob/master/README.md
      GIT_REF: 'master',
      AZK_RESTART_COMMAND: 'azk restart -Rvv',
    }
  },

});
