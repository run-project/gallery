/* globals systems path persistent */
/* eslint camelcase: [2, {properties: "never"}] */
/* eslint comma-dangle: [0, {properties: "never"}] */
systems({
  dashboard: {
    depends: ['mongo', 'redis'],
    image: { docker: 'azukiapp/node:0.10' },
    provision: [
      'npm install'
    ],
    workdir: '/azk/#{system.name}',
    shell: '/bin/bash',

    command: 'node bin/web.js',
    wait: 30,
    mounts: {
      '/azk/#{system.name}': path('.'),
      '/azk/#{system.name}/node_modules': persistent('#{system.name}/node_modules'),
      '/azk/#{system.name}/public/src/vendors': persistent('#{system.name}/public/src/vendors'),
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
      http: '5000/tcp'
    },
    envs: {
      DOMAIN: '#{system.name}.#{azk.default_domain}',
      HOST: '0.0.0.0',

      // Port for running the application, default is 5000
      PORT: '5000',

      // Url for the mongoDB database
      // MONGODB_URL: '',
      // already get from redis dependency
      // REDIS_URL: '',

      // Username for authentication
      AUTH_USERNAME: '',

      // Password for authentication
      AUTH_PASSWORD: '',

      MAIL_SERVICE: '',
      MAIL_USERNAME: '',
      MAIL_PASSWORD: '',
      MAIL_FROM: '',
      TWILIO_SID: '',
      TWILIO_TOKEN: '',
      TWILIO_FROM: '',
    },
  },

  worker: {
    extends: 'dashboard',
    scalable: { default: 1, limit: 1 },
    http: null,
    ports: null,
    wait: undefined,
    image: { docker: 'azukiapp/node:0.10' },
    command: 'node bin/worker.js',
  },

  redis: {
    image: { docker: 'redis' },
    ports: {
      data: '6379/tcp'
    },
    export_envs: {
      REDIS_HOST: '#{net.host}',
      REDIS_PORT: '#{net.port.data}',
      REDIS_URL: 'redis://#{net.host}:#{net.port.data}',
      OPENREDIS_URL: 'redis://#{net.host}:#{net.port.data}',
    }
  },

  mongo: {
    image : { docker: 'azukiapp/mongodb' },
    scalable: false,
    wait: 80,
    mounts: {
      '/data/db': persistent('mongodb-#{manifest.dir}'),
    },
    ports: {
      http: '28017/tcp',
      data: '27017:27017/tcp',
    },
    http: {
      domains: [ '#{manifest.dir}-#{system.name}.#{azk.default_domain}' ],
    },
    export_envs: {
      MONGODB_URL: 'mongodb://#{net.host}:#{net.port[27017]}/#{manifest.dir}_development',
      LCB_DATABASE_URI: 'mongodb://#{net.host}:#{net.port[27017]}/#{manifest.dir}_development',
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
      // List of available deployment settings:
      // https://github.com/azukiapp/docker-deploy-digitalocean/blob/master/README.md
      GIT_REF: 'master',
      AZK_RESTART_COMMAND: 'azk restart -Rvv',
    }
  },

});
