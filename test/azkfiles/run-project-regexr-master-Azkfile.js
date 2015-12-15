/* globals systems path sync persistent */
/* eslint camelcase: [2, {properties: "never"}] */
/* eslint comma-dangle: [0, {properties: "never"}] */
systems({
  regexr: {
    depends: [],
    image: { docker: 'azukiapp/ruby' },
    provision: [
      'NODE_ENV=dev npm install',
      'bundle install --path /azk/bundler',
      'node_modules/.bin/grunt build',
    ],
    workdir: '/azk/#{system.name}',
    shell: '/bin/bash',
    command: 'node_modules/.bin/grunt serve',
    wait: 20,
    mounts: {
      '/azk/#{system.name}': sync('.'),

      // node mounts
      '/azk/#{system.name}/node_modules': persistent('./node_modules'),
      '/azk/#{system.name}/.sass-cache': persistent('./.sass-cache'),
      '/azk/#{system.name}/build': persistent('./build'),

      // ruby mounts
      '/azk/bundler': persistent('#{system.name}/bundler'),
      '/azk/#{system.name}/tmp': persistent('#{system.name}/tmp'),
      '/azk/#{system.name}/log': path('#{system.name}/log'),
      '/azk/#{system.name}/.bundle': path('#{system.name}/.bundle')
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
      http: '8000/tcp'
    },
    envs: {
      NODE_ENV: 'production',
      PORT: '8000',
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
