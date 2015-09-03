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

```sh
npm install
./run-first-time.sh
```

##### Restarting and reprovisioning

```sh
./run-restart-reprovision.sh
```

------------

##### Clean azk and Docker in Linux

```sh
./linux_clean_docker_and_agent.sh
```
