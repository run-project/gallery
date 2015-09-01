# test all from gallery

#### test all button (may take too many minutes)

Edit `projects-list.js`, then:

```sh
./stop-clean-start-agent.sh && ./runAllStarts.sh
```

#### download and update all azkfiles

```sh
./generators/download-azkfile.sh && ./downloadAllAzkfiles.sh
git add . -A
git commit -m"Azkfiles Updated"
git push
```
