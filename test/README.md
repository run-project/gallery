# test all from gallery

#### test all button (may take too many minutes)

```sh
# azk agent: stop, clean and start
./scripts-shared/stop-clean-start-agent.sh

# create repo and start each one
./scripts/saitodisse-discourse-azkfile.sh
./scripts/saitodisse-cloudtunes-azkfile.sh
./scripts/saitodisse-dashboard-azkfile.sh
./scripts/saitodisse-dillinger-azkfile.sh
./scripts/saitodisse-discourse-azkfile.sh
./scripts/saitodisse-habitrpg-azkfile.sh
./scripts/saitodisse-huginn-azkfile.sh
./scripts/saitodisse-isomorphic500-azkfile.sh
./scripts/saitodisse-lets-chat-azkfile.sh
./scripts/saitodisse-paperwork-azkfile.sh
./scripts/saitodisse-platform-azkfile.sh
./scripts/saitodisse-regexr-azkfile.sh
./scripts/saitodisse-shout-azkfile.sh
./scripts/saitodisse-stringer-azkfile.sh
```

#### download and update all azkfiles

```sh
./generators/create-script-download-azkfile.sh && ./downloadAllAzkfiles.sh
git add . -A
git commit -m"Azkfiles Updated"
git push
```
