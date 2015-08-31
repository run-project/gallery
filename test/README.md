# test all from gallery

#### test all button (may take too many minutes)

```sh
# generate all starts
./generators/create-script-test-azk-start.sh

# azk agent: stop, clean and start
./scripts-shared/stop-clean-start-agent.sh

# create repo and start each one
./scripts/start/saitodisse-cloudtunes-azkfile.sh
./scripts/clear/saitodisse-cloudtunes-azkfile.sh

./scripts/start/saitodisse-dashboard-azkfile.sh
./scripts/clear/saitodisse-dashboard-azkfile.sh

./scripts/start/saitodisse-dillinger-azkfile.sh
./scripts/clear/saitodisse-dillinger-azkfile.sh

./scripts/start/saitodisse-discourse-azkfile.sh
./scripts/clear/saitodisse-discourse-azkfile.sh

./scripts/start/saitodisse-habitrpg-azkfile.sh
./scripts/clear/saitodisse-habitrpg-azkfile.sh

./scripts/start/saitodisse-huginn-azkfile.sh
./scripts/clear/saitodisse-huginn-azkfile.sh

./scripts/start/saitodisse-isomorphic500-azkfile.sh
./scripts/clear/saitodisse-isomorphic500-azkfile.sh

./scripts/start/saitodisse-lets-chat-azkfile.sh
./scripts/clear/saitodisse-lets-chat-azkfile.sh

./scripts/start/saitodisse-paperwork-azkfile.sh
./scripts/clear/saitodisse-paperwork-azkfile.sh

./scripts/start/saitodisse-platform-azkfile.sh
./scripts/clear/saitodisse-platform-azkfile.sh

./scripts/start/saitodisse-regexr-azkfile.sh
./scripts/clear/saitodisse-regexr-azkfile.sh

./scripts/start/saitodisse-shout-azkfile.sh
./scripts/clear/saitodisse-shout-azkfile.sh

./scripts/start/saitodisse-stringer-azkfile.sh
./scripts/clear/saitodisse-stringer-azkfile.sh
```

#### download and update all azkfiles

```sh
./generators/create-script-download-azkfile.sh && ./downloadAllAzkfiles.sh
git add . -A
git commit -m"Azkfiles Updated"
git push
```
