# test all from gallery

- download latest Azkfiles (easy to search)
- stops azk agent
- kill/clean Docker containers
- download and start each project on `projects-list.js`
- send elapsed time to keen.io
- save screenshots to check if it is working

#### test all button (may take too many minutes)

Edit `projects-list.js`, then:

##### Start first time

```sh
./_stop-clean-start-agent.sh && ./run-first-time.sh
```

##### Start reprovisioning

```sh
./_stop-clean-start-agent.sh && ./run-restart-reprovision.sh
```

##### Clear all

```sh
./_stop-clean-start-agent.sh && sudo ./_clear-buttons.sh
```
