/* globals systems sync persistent */

/**
 * cerebral controller app
 * - rethink-db as database
 * - ngrok exposes app and db server
 *
 * see Azkfile.md for more info
 */

systems({

  /////////////////////////////////////////////////
  /// rethink-db
  /// ----------
  /// RethinkDB is the open-source, scalable database that
  /// makes building realtime apps dramatically easier.
  ///
  /// RethinkDB provides a web interface which lets you manage your entire server
  /// cluster, from controlling sharding and replication to running ReQL queries (in
  /// JavaScript), with editing and history support. In addition, you can perform
  /// administration tasks using scriptable ReQL commands.
  ///
  /// http://rethinkdb.com/
  /////////////////////////////////////////////////
  'rethink-db': {
    // https://registry.hub.docker.com/u/library/rethink-db/
    image: {'docker': 'rethinkdb'},
    scalable: {'default': 1},
    mounts: {

      // persistent() -> Persists the files that are inside the container on
      // the path '#{system.name}/data', to an azk persistent data folder in
      // the user machine. The location the data will be saved will vary
      // between Mac and Linux
      //
      // You can check where `/data` folder is located with this command:
      // ```
      // $ azk info
      // ```
      // http://docs.azk.io/en/reference/azkfilejs/mounts.html#persistent
      '/data': persistent('#{system.name}/data')
    },
    wait: 10,
    http: {
      domains: [ '#{system.name}.#{azk.default_domain}' ]
    },
    ports: {
      http: '8080/tcp',
      rdb_28015: '28015:28015/tcp',
      rdb_29015: '29015:29015/tcp'
    },
    export_envs: {
      APP_URL: "#{azk.default_domain}:#{net.port.http}"
    }
  },

  /////////////////////////////////////////////////
  /// ngrok: rethink-db exposer
  /// -----------------------------
  /// Secure tunnels to localhost
  /// "I want to expose a local server behind a NAT
  /// or firewall to the internet."
  ///
  /// https://ngrok.com/
  /////////////////////////////////////////////////
  'rethink-db-ngrok': {
    depends: ['rethink-db'],
    // Dependent systems
    image: {docker: 'azukiapp/ngrok'},

    // Mounts folders to assigned paths
    mounts: {
      // Mount the folder located in the current system machine '/tmp',
      // relative to the Azkfile.js, to the path '/ngrok/log' inside the
      // system container. If any of the files are changed, from the user
      // machine or from inside the container, the information is also updated
      // on the other end.
      '/ngrok/log': path('/tmp')
    },
    scalable: { default: 0 },

    wait: 10,
    http: {
      domains: ['#{system.name}.#{azk.default_domain}']
    },
    ports: {
      http: '4040/tcp'
    },
    envs: {
      NGROK_CONFIG: '/ngrok/ngrok.yml',
      NGROK_LOG: '/ngrok/log/#{system.name}_ngrok.log'
    }
  },

  /////////////////////////////////////////////////
  /// rethink-express: thinky + express
  /// ----------------
  /// A light Node.js ORM for RethinkDB
  ///
  /// https://github.com/neumino/thinky
  /// https://thinky.io/
  /////////////////////////////////////////////////
  'rethink-express': {
    extends: 'task-cerebral',
    depends: ['rethink-db'],
    workdir: '/azk/#{manifest.dir}/#{system.name}',
    command: 'npm start',
    wait: 10,
    ports: {
      http: '8080/tcp'
    },
    mounts: {
      // Syncs the files in './#{system.name}' with a remote destination,
      // which is mounted in the '/azk/#{manifest.dir}/#{system.name}'.
      // Differently from `path()` option, `sync` uses rsync instead of VirtualBox
      // shared folders. As result, the overall performance is significantly
      // increased, mainly for applications which demand a great number of
      // files (e.g. a Ruby on Rails application with a lot of assets).
      //
      // > http://docs.azk.io/en/reference/azkfilejs/mounts.html#sync
      '/azk/#{manifest.dir}/#{system.name}': sync('./#{system.name}'),
      '/azk/#{manifest.dir}/#{system.name}/node_modules': persistent('#{system.name}/#{system.name}/node_modules')
    },
    envs: {
      SIMULATE_DELAY: "800"
    },
    export_envs: {
      APP_URL: "#{azk.default_domain}:#{net.port.http}"
    }
  },

  /////////////////////////////////////////////////
  /// ngrok: rethink-express web exposer
  /// -----------------------------
  /// Secure tunnels to localhost
  /// "I want to expose a local server behind a NAT
  /// or firewall to the internet."
  ///
  /// https://ngrok.com/
  /////////////////////////////////////////////////
  'rethink-express-ngrok': {
    depends: ['rethink-express'],
    // Dependent systems
    image: {docker: 'azukiapp/ngrok'},

    // Mounts folders to assigned paths
    mounts: {
      // Mount the folder located in the current system machine '/tmp',
      // relative to the Azkfile.js, to the path '/ngrok/log' inside the
      // system container. If any of the files are changed, from the user
      // machine or from inside the container, the information is also updated
      // on the other end.
      '/ngrok/log': path('/tmp')
    },
    scalable: { default: 0 },

    wait: 10,
    http: {
      domains: ['#{system.name}.#{azk.default_domain}']
    },
    ports: {
      http: '4040/tcp'
    },
    envs: {
      NGROK_CONFIG: '/ngrok/ngrok.yml',
      NGROK_LOG: '/ngrok/log/#{system.name}_ngrok.log'
    }
  },

  /////////////////////////////////////////////////
  /// util-config-save: express - json config saver
  /// ----------------------
  /// saves configuration to a json file
  /// so the task-cerebral can use on browser
  /////////////////////////////////////////////////
  'util-config-save': {
    extends: 'rethink-express',
    depends: ['rethink-express-ngrok', 'rethink-db-ngrok'],
    workdir: '/azk/#{manifest.dir}/#{system.name}',
    command: 'npm start',
    wait: 10,
    scalable: { default: 0 },
    http: {
      domains: ['#{system.name}.#{azk.default_domain}']
    },
    ports: {
      http: '8080/tcp'
    },
    mounts: {
      '/azk/#{manifest.dir}': path('.'),
      '/azk/#{manifest.dir}/#{system.name}/node_modules': persistent('#{system.name}/#{system.name}/node_modules'),
    }
  },



  /////////////////////////////////////////////////
  /// task-cerebral: main web app
  /// ------------
  /// Simples list example using cerebral controller
  /// - serves a webpack-dev-server
  /// - build a production ready version on dist folder
  ///
  /// https://github.com/christianalfoni/cerebral
  /////////////////////////////////////////////////
  'task-cerebral': {
    // Dependent systems
    depends: ['rethink-express'],
    image: {'docker': 'azukiapp/node'},
    provision: [
      'npm install'
    ],
    workdir: '/azk/#{manifest.dir}',
    shell: '/bin/bash',
    command: 'npm run deploy && npm start',
    wait: 30,
    mounts: {
      '/azk/#{manifest.dir}': path('.'),
      // '/azk/#{manifest.dir}/dist': path('./dist'),
      '/azk/#{manifest.dir}/node_modules': persistent('#{manifest.dir}/node_modules')
    },
    scalable: {'default': 1},
    http: {
      domains: [ '#{system.name}.#{azk.default_domain}' ]
    },
    ports: {
      http: '8080/tcp'
    },
    envs: {
      NODE_ENV: 'dev',
      HOST_NAME: '#{system.name}.#{azk.default_domain}',
      // Make sure that the PORT value is the same as the one
      // in ports/http below, and that it's also the same
      // if you're setting it in a .env file
      PORT: '8080',
      PATH: 'node_modules/.bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin'
    }
  },

  /////////////////////////////////////////////////
  /// Caddy: http2 static server for deploy version
  /// alternative web server that is easy to configure and use.
  ///
  /// https://caddyserver.com/
  /////////////////////////////////////////////////
  'task-caddy': {
    depends: ['task-cerebral'],
    image: {docker: 'joshix/caddy'},
    scalable: { default: 0 },
    wait: 10,
    http: {
      domains: [
        '#{system.name}.#{azk.default_domain}', // default azk
        '#{process.env.AZK_HOST_IP}'            // used if deployed
      ]
    },
    mounts: {
      // equivalent persistent_folders
      '/var/www/html/': path('./dist')
    },
    ports: {
      http: '2015/tcp'
    },
    export_envs: {
      APP_URL: "#{azk.default_domain}:#{net.port.http}"
    }
  },

  /////////////////////////////////////////////////
  /// ngrok: caddy web exposer
  /// -----------------------------
  /// Secure tunnels to localhost
  /// "I want to expose a local server behind a NAT
  /// or firewall to the internet."
  ///
  /// https://ngrok.com/
  /////////////////////////////////////////////////
  'task-caddy-ngrok': {
    // Dependent systems
    depends: ['task-caddy'],
    image: {docker: 'azukiapp/ngrok'},

    // Mounts folders to assigned paths
    mounts: {
      // equivalent persistent_folders
      '/ngrok/log': path('/tmp')
    },
    scalable: { default: 0 },

    wait: 10,
    http: {
      domains: ['#{system.name}.#{azk.default_domain}']
    },
    ports: {
      http: '4040/tcp'
    },
    envs: {
      NGROK_CONFIG: '/ngrok/ngrok.yml',
      NGROK_LOG: '/ngrok/log/#{system.name}_ngrok.log'
    }
  },

  //////////
  /// deploy systems
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

      // need this big because we have to build nokogiri
      BOX_SIZE: '2gb',

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
      BOX_SIZE: '2gb',
      GIT_CHECKOUT_COMMIT_BRANCH_TAG: 'azkfile',
      AZK_RESTART_COMMAND: 'azk restart huginn-worker -Rvv && azk restart huginn -Rvv',
      RUN_SETUP: 'false',
      RUN_CONFIGURE: 'false',
      RUN_DEPLOY: 'true',
    }
  },

});
