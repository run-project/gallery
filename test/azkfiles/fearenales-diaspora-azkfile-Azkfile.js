/**
 * Documentation: http://docs.azk.io/Azkfile.js
 */
// Adds the systems that shape your system
systems({
  diaspora: {
    // Dependent systems
    depends: ["postgres", "redis", "mail"],
    // More images:  http://images.azk.io
    image: {"dockerfile": "./Dockerfile"},
    // Steps to execute before running instances
    provision: [
      "bundle install --path /azk/bundler",
      "bundle exec rake db:create",
      "bundle exec rake db:migrate",
    ],
    workdir: "/azk/#{manifest.dir}",
    shell: "/bin/bash",
    command: "bundle exec rackup config.ru --pid /tmp/ruby.pid --port $HTTP_PORT --host 0.0.0.0",
    wait: 20,
    mounts: {
      '/azk/#{manifest.dir}': sync(".", {shell: true}),
      '/azk/bundler': persistent("./bundler"),
      '/azk/#{manifest.dir}/tmp': persistent("./tmp"),
      '/azk/#{manifest.dir}/log': path("./log"),
      '/azk/#{manifest.dir}/.bundle': path("./.bundle"),
      '/azk/#{manifest.dir}/public/uploads': persistent("./public/uploads"),
      '/azk/#{manifest.dir}/public/assets': persistent("./public/assets"),
      '/azk/#{manifest.dir}/config/diaspora.yml': path("./config/diaspora.yml.example"),
    },
    scalable: {"default": 1},
    http: {
      domains: [ "#{system.name}.#{azk.default_domain}" ]
    },
    ports: {
      // exports global variables
      http: "3000/tcp",
    },
    envs: {
      // Make sure that the PORT value is the same as the one
      // in ports/http below, and that it's also the same
      // if you're setting it in a .env file
      RUBY_ENV: "development",
      RAILS_ENV: "development",
      BUNDLE_APP_CONFIG: "/azk/bundler",
      DB: "postgres",
      CONFIGURATION_ENVIRONMENT_URL: "http://#{system.name}.#{azk.default_domain}",
      CONFIGURATION_ENVIRONMENT_REDIS: env.REDIS_URL,
      ENVIRONMENT_URL: "http://#{system.name}.#{azk.default_domain}",
      MAIL_ENABLE: 'true',
      MAIL_METHOD: 'smtp',
      MAIL_SMTP_PORT: env.SMTP_PORT,
      MAIL_SMTP_HOST: env.SMTP_ADDRESS,
      MAIL_SMTP_PORT: env.SMTP_PORT,
    },
  },
  worker: {
    extends: "diaspora",
    depends: ["diaspora", "postgres", "redis", "mail"], // depends on diaspora as well
    scalable: { default: 1, limit: 1 },
    http: null,
    ports: null,
    wait: undefined,
    command: "bundle exec sidekiq"
  },
  mysql: {
    // Dependent systems
    depends: [],
    // More images:  http://images.azk.io
    image: {"docker": "azukiapp/mysql:5.6"},
    shell: "/bin/bash",
    wait: 25,
    mounts: {
      '/var/lib/mysql': persistent("#{manifest.dir}/mysql"),
    },
    scalable: { default: 0, limit: 0 },
    ports: {
      // exports global variables
      data: "3306/tcp",
    },
    envs: {
      // Make sure that the PORT value is the same as the one
      // in ports/http below, and that it's also the same
      // if you're setting it in a .env file
      MYSQL_ROOT_PASSWORD: "mysecretpassword",
      MYSQL_USER: "azk",
      MYSQL_PASS: "azk",
      MYSQL_DATABASE: "#{manifest.dir}_development",
    },
    export_envs: {
      // check this gist to configure your database
      // https://gist.github.com/gullitmiranda/62082f2e47c364ef9617
      DATABASE_URL: "mysql2://#{envs.MYSQL_USER}:#{envs.MYSQL_PASS}@#{net.host}:#{net.port.data}/${envs.MYSQL_DATABASE}",
    },
  },
  postgres: {
    // Dependent systems
    depends: [],
    // More images:  http://images.azk.io
    image: {"docker": "azukiapp/postgres:9.3"},
    shell: "/bin/bash",
    wait: 20,
    mounts: {
      '/var/lib/postgresql/data': persistent("postgresql"),
      '/var/log/postgresql': path("./log/postgresql"),
    },
    ports: {
      // exports global variables
      data: "5432/tcp",
    },
    envs: {
      // set instances variables
      POSTGRESQL_USER: "azk",
      POSTGRESQL_PASS: "azk",
      POSTGRESQL_DB: "postgres_development",
    },
    export_envs: {
      // check this gist to configure your database
      // https://gist.github.com/gullitmiranda/62082f2e47c364ef9617
      DATABASE_URL: "postgres://#{envs.POSTGRESQL_USER}:#{envs.POSTGRESQL_PASS}@#{net.host}:#{net.port.data}/${envs.POSTGRESQL_DB}",
    },
  },
  redis: {
    image: { docker: "redis" },
    scalable: { default: 1, limit: 1 },
    export_envs: {
      REDIS_URL: "redis://#{net.host}:#{net.port[6379]}"
    }
  },
  mail: {
    depends: [],
    image: {"docker": "schickling/mailcatcher"},
    http: {
      domains: [
        "#{system.name}.#{azk.default_domain}"
      ]
    },
    ports: {
      http: "1080/tcp",
      smtp: "1025/tcp"
    },
    export_envs: {
      // exports global variables to main system
      SMTP_ADDRESS: "#{net.host}",
      SMTP_PORT: "#{net.port.smtp}"
    }
  },
});
