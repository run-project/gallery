# test all from gallery

- download latest Azkfiles (easy to search)
- stops azk agent
- clean persistent/sync forders
- download and start each project on `projects-list.js`
- send elapsed time to keen.io
- save screenshots to check if it is working
- can kill/clean Docker containers

#### test all button (may take too many minutes)

Edit `projects-list.js`, then:

##### npm install

```sh
npm install
```

##### Start first time (clean install)

Run this the first time.

- download repo to `/tmp/buttons` folder
- clear any persistent data
- install app

```sh
npm install
./run-first-start.sh
```

- go check result in browser: `gallery/test/keen-io-charts.html`

##### Restarting and reprovisioning

Just restart and reprovision.

- do not clear any persistent/sync data files
- stop and start all systems

```sh
./run-restart-reprovision.sh
```

------------

##### Clean azk and Docker in Linux

```sh
./linux_clean_docker_and_agent.sh
```
