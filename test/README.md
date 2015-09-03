# test all from gallery

- download latest Azkfiles (easy to search)
- stops azk agent
- kill/clean Docker containers
- download and start each project on `projects-list.js`
- send elapsed time to keen.io
- save screenshots to check if it is working

#### test all button (may take too many minutes)

Edit `projects-list.js`, then:

##### Clean azk and Docker in Linux

```sh
./linux_clean_docker_and_agent.sh
```

##### Start first time

```sh
npm install
./run-first-time.sh
```

##### Start reprovisioning

```sh
./run-restart-reprovision.sh
```

