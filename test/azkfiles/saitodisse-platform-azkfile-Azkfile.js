/* globals systems path sync persistent */
/* eslint camelcase: [2, {properties: "never"}] */
/* eslint comma-dangle: [0, {properties: "never"}] */

/* see Azkfile.md */
systems({

  platform: {
    depends: ['mysql'],

    // configure docker and volumes
    image: {"dockerfile": "docker/local-azk/Dockerfile"},
    scalable: { default: 1, limit: 1 },
    workdir: "/go/src/github.com/mattermost/platform",
    mounts: {
      '/go/src/github.com/mattermost/platform': path("."),
      '/go/src/github.com/mattermost/platform/web/react/node_modules': path("/web/react/node_modules"),
      '/go/src/github.com/mattermost/platform/web/sass-files/.sass-cache': path("/web/sass-files/.sass-cache"),
    },

    // set default shell to bash
    shell: "/bin/bash",

    // entrypoint
    provision: [
      // react
      'cd /go/src/github.com/mattermost/platform/web/react && npm i',
      'cd /go/src/github.com/mattermost/platform/web/react && NODE_ENV=production node_modules/.bin/browserify ./**/*.jsx | node_modules/.bin/uglifyjs  > ../static/js/bundle.js',
      // compass
      'cd /go/src/github.com/mattermost/platform/web/sass-files && compass compile',
    ],
    command: [
      "go get github.com/tools/godep",
      "cd /go/src/github.com/mattermost/platform/",
      "godep go install",
      "cd /go/src/github.com/mattermost/platform/",
      "godep go run mattermost.go -config=/go/src/github.com/mattermost/platform/docker/local-azk/config_docker.json",
    ].join(';'),

    // network
    http: {
      domains: [
        "#{system.name}.#{azk.default_domain}", // default azk
        "#{process.env.AZK_HOST_IP}"            // used if deployed
      ]
    },
    ports: {
      http: '80/tcp'
    },
    wait: { retry: 30, timeout: 1000 },
  },

  mysql: {
    // configure docker and volumes
    image: {"docker": "azukiapp/mysql"},
    scalable: { default: 1, limit: 1 },
    mounts: {
      '/var/lib/mysql': persistent("mysql_lib#{system.name}"),
    },

    // set default shell to bash
    shell: "/bin/bash",

    // provision: [
    //   'rm -rf /var/lib/mysql', // clean mysql data
    // ],

    // network
    ports: {
      data: "3306:3306/tcp",
    },
    wait: {"retry": 25, "timeout": 1000},

    envs: {
      // set instances variables
      MYSQL_USER         : "azk",
      MYSQL_PASS         : "azk",
      MYSQL_DATABASE     : "#{system.name}_development",
    },
    export_envs: {
      // check this gist to configure your database
      // https://gist.github.com/gullitmiranda/62082f2e47c364ef9617
      DATABASE_URL: "mysql2://#{envs.MYSQL_USER}:#{envs.MYSQL_PASS}@#{net.host}:#{net.port.data}/${envs.MYSQL_DATABASE}",
    },
  },

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
      AZK_RESTART_COMMAND: 'azk restart -Rvv',
      RUN_SETUP: 'true',
      RUN_CONFIGURE: 'true',
      RUN_DEPLOY: 'true',
    }
  },
  "fast-deploy": {
    extends: 'deploy',
    envs: {
      GIT_CHECKOUT_COMMIT_BRANCH_TAG: 'azkfile',
      AZK_RESTART_COMMAND: 'azk restart -Rvv',
      RUN_SETUP: 'false',
      RUN_CONFIGURE: 'false',
      RUN_DEPLOY: 'true',
    }
  },

});
