/* globals systems path sync persistent */
/* eslint camelcase: [2, {properties: "never"}] */
/* eslint comma-dangle: [0, {properties: "never"}] */
systems({
  stringer: {
    depends: ['postgres'],
    image: { docker: 'azukiapp/ruby:2.0' },
    provision: [
      'bundle install --path /azk/bundler',
      'bundle exec rake db:migrate RACK_ENV=production',
    ],
    workdir: '/azk/#{manifest.dir}',
    shell: '/bin/bash',
    command: [
      'bundle exec rake fetch_feeds',
      'bundle exec unicorn -p $HTTP_PORT -c ./config/unicorn.rb',
    ].join(';'),
    wait: 20,
    mounts: {
      '/azk/#{manifest.dir}': sync('.'),
      '/azk/bundler': persistent('./bundler'),
      '/azk/#{manifest.dir}/tmp': persistent('./tmp'),
      '/azk/#{manifest.dir}/log': path('./log'),
      '/azk/#{manifest.dir}/.bundle': path('./.bundle'),
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
      RUBY_ENV: 'production',
      BUNDLE_APP_CONFIG: '/azk/bundler',
      APP_URL: '#{system.name}.#{azk.default_domain}',
      //$ openssl rand -hex 20
      SECRET_TOKEN: 'd108461ed31016b360479e074a4ae4fefff1d8eb',
    },
  },

  postgres: {
    depends: [],
    image: { docker: 'azukiapp/postgres:9.3' },
    shell: '/bin/bash',
    wait: 20,
    mounts: {
      '/var/lib/postgresql/data': persistent('postgresql'),
      '/var/log/postgresql': path('./log/postgresql'),
    },
    ports: {
      data: '5432/tcp',
    },
    envs: {
      POSTGRESQL_USER: 'stringer',
      POSTGRESQL_PASS: 'EDIT_ME',
      POSTGRESQL_DB: 'stringer_live',
    },
    export_envs: {
      // check this gist to configure your database
      // https://gist.github.com/gullitmiranda/62082f2e47c364ef9617
      DATABASE_URL: 'postgres://#{envs.POSTGRESQL_USER}:#{envs.POSTGRESQL_PASS}@#{net.host}:#{net.port.data}/${envs.POSTGRESQL_DB}',

      // from https://github.com/saitodisse/stringer/blob/master/docs/VPS.md
      STRINGER_DATABASE: '${envs.POSTGRESQL_DB}',
      STRINGER_DATABASE_USERNAME: '${envs.POSTGRESQL_USER}',
      STRINGER_DATABASE_PASSWORD: '${envs.POSTGRESQL_PASS}',
      STRINGER_DATABASE_HOST: '#{net.host}',
      STRINGER_DATABASE_PORT: '#{net.port.data}',

      RACK_ENV: 'production',
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
