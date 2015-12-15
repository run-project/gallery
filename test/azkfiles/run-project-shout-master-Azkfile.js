/* globals systems path sync persistent */
/* eslint camelcase: [2, {properties: "never"}] */
/* eslint comma-dangle: [0, {properties: "never"}] */
systems({
  shout: {
    depends: [],
    image: { docker: 'azukiapp/node:0.10' },
    provision: [
      'npm install',
      'npm install grunt-cli',
      'node_modules/.bin/grunt',
    ],
    workdir: '/azk/#{manifest.dir}',
    shell: '/bin/bash',

    command: 'node index.js',
    wait: 30,
    mounts: {
      '/azk/#{manifest.dir}': path('.'),
      '/azk/node_modules': persistent('#{manifest.dir}/node_modules'),
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
      DOMAIN: '#{system.name}.#{azk.default_domain}',
      HOST: '0.0.0.0',
      PORT: '8080',
    },
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
      // List with all available deployment settings:
      // https://github.com/azukiapp/docker-deploy-digitalocean/blob/master/README.md
      GIT_REF: 'master',
      AZK_RESTART_COMMAND: 'azk restart -Rvv',
    }
  },

});
