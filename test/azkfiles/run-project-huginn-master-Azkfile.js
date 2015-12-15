/* globals systems path sync persistent */
/* eslint camelcase: [2, {properties: "never"}] */
/* eslint comma-dangle: [0, {properties: "never"}] */
systems({

  // production version
  'huginn': {
    depends: ['mysql'],
    image: { docker: 'azukiapp/ruby:2.2' },
    provision: [
      '[ -e .env ] || cp .env.example .env',
      'bundle install --path /azk/bundler --without development test',
      'sed \'s,{{APP_SECRET_TOKEN}},\'$(bundle exec rake secret)\',g\' -i .env',
      'bundle exec rake db:create',
      'bundle exec rake db:migrate',
      'bundle exec rake db:seed',
      'bundle exec rake assets:precompile',
    ],
    workdir: '/azk/#{manifest.dir}',
    shell: '/bin/bash',

    command: 'bundle exec rails server -p $HTTP_PORT -P /tmp/ruby.pid -b 0.0.0.0',
    wait: 60,
    mounts: {
      // mount and sync all to container
      '/azk/#{manifest.dir}': sync('.'),

      // share this too, because sync ignores that because of .gitignore
      '/azk/#{manifest.dir}/.bundle': path('#{manifest.dir}/.bundle'),

      // some persistent folders
      // will be stored on host and shared on container
      // use azk info to see where is stored
      // $ azk info
      '/azk/bundler': persistent('#{manifest.dir}/bundler'),
      '/azk/#{manifest.dir}/tmp': persistent('#{manifest.dir}/tmp'),
      '/azk/#{manifest.dir}/public': persistent('#{manifest.dir}/public'),
      '/azk/#{manifest.dir}/vendor/bundle': persistent('#{manifest.dir}/vendor/bundle'),
      '/azk/#{manifest.dir}/log': persistent('#{manifest.dir}/log'),
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
      http: '3000/tcp',
    },
    envs: {
      RAILS_ENV: 'production',
      ON_HEROKU: 'true',
      RAILS_SERVE_STATIC_FILES: 'true',
      BUNDLE_APP_CONFIG: '/azk/bundler',
      DOMAIN: '#{system.name}.#{azk.default_domain}',
      PORT: '3000'
    },
  },

  'huginn-worker': {
    extends: 'huginn',
    scalable: { default: 1, limit: 1 },
    http: null,
    ports: null,
    wait: undefined,
    command: 'bundle exec rails runner bin/threaded.rb -E production',
  },

  mysql: {
    depends: [],
    image: { docker: 'azukiapp/mysql:5.6' },
    shell: '/bin/bash',
    wait: 25,
    mounts: {
      '/var/lib/mysql': persistent('#{manifest.dir}/mysql'),
    },
    ports: {
      data: '3306/tcp',
    },
    envs: {
      MYSQL_ROOT_PASSWORD: 'mysecretpassword',
      MYSQL_USER: 'azk',
      MYSQL_PASS: 'azk',
      MYSQL_DATABASE: '#{manifest.dir}_development',
    },
    export_envs: {
      // check this gist to configure your database
      // https://gist.github.com/gullitmiranda/62082f2e47c364ef9617
      DATABASE_URL: 'mysql2://#{envs.MYSQL_USER}:#{envs.MYSQL_PASS}@#{net.host}:#{net.port.data}/${envs.MYSQL_DATABASE}',
    },
  },

  // development version
  'huginn-dev': {
    extends: 'huginn',
    depends: ['mysql'],
    provision: [
      'bundle install --path /azk/bundler',
      'bundle exec rake db:create',
      'bundle exec rake db:migrate',
      'bundle exec rake db:seed'
    ],
    command: 'bundle exec rails server -p $HTTP_PORT -P /tmp/ruby.pid -b 0.0.0.0',
    http: {
      domains: [ '#{system.name}.#{azk.default_domain}' ]
    },
    scalable: { default: 0, limit: 1 },
    envs: {
      RAILS_ENV: 'development',
      BUNDLE_APP_CONFIG: '/azk/bundler',
      DOMAIN: '#{system.name}.#{azk.default_domain}',
      PORT: '3000'
    },
  },

  'huginn-dev-worker': {
    extends: 'huginn-dev',
    scalable: { default: 0, limit: 1 },
    http: null,
    ports: null,
    wait: undefined,
    command: 'bundle exec rails runner bin/threaded.rb',
  },

  // deploy systems
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
      BOX_SIZE: '2gb',
      AZK_RESTART_COMMAND: 'azk restart huginn-worker -Rvv && azk restart huginn -Rvv',
    }
  },

});
