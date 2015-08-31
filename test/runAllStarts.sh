#! /bin/bash

# generate all starts
echo 'cleaning'
./generators/create-script-test-azk-start.sh
./scripts-shared/stop-clean-start-agent.sh
./scripts/clear/saitodisse-cloudtunes-azkfile.sh
./scripts/clear/saitodisse-dashboard-azkfile.sh
./scripts/clear/saitodisse-dillinger-azkfile.sh
./scripts/clear/saitodisse-discourse-azkfile.sh
./scripts/clear/saitodisse-habitrpg-azkfile.sh
./scripts/clear/saitodisse-huginn-azkfile.sh
./scripts/clear/saitodisse-isomorphic500-azkfile.sh
./scripts/clear/saitodisse-lets-chat-azkfile.sh
./scripts/clear/saitodisse-paperwork-azkfile.sh
./scripts/clear/saitodisse-platform-azkfile.sh
./scripts/clear/saitodisse-regexr-azkfile.sh
./scripts/clear/saitodisse-shout-azkfile.sh
./scripts/clear/saitodisse-stringer-azkfile.sh

echo 'starting'

mkdir -p logs

./scripts/clear/saitodisse-cloudtunes-azkfile.sh
./scripts/start/saitodisse-cloudtunes-azkfile.sh 2>&1 > ./logs/saitodisse-cloudtunes-azkfile.log
./scripts/clear/saitodisse-cloudtunes-azkfile.sh

./scripts/clear/saitodisse-dashboard-azkfile.sh
./scripts/start/saitodisse-dashboard-azkfile.sh 2>&1 > ./logs/saitodisse-dashboard-azkfile.log
./scripts/clear/saitodisse-dashboard-azkfile.sh

./scripts/clear/saitodisse-dillinger-azkfile.sh
./scripts/start/saitodisse-dillinger-azkfile.sh 2>&1 > ./logs/saitodisse-dillinger-azkfile.log
./scripts/clear/saitodisse-dillinger-azkfile.sh

./scripts/clear/saitodisse-discourse-azkfile.sh
./scripts/start/saitodisse-discourse-azkfile.sh 2>&1 > ./logs/saitodisse-discourse-azkfile.log
./scripts/clear/saitodisse-discourse-azkfile.sh

./scripts/clear/saitodisse-habitrpg-azkfile.sh
./scripts/start/saitodisse-habitrpg-azkfile.sh 2>&1 > ./logs/saitodisse-habitrpg-azkfile.log
./scripts/clear/saitodisse-habitrpg-azkfile.sh

./scripts/clear/saitodisse-huginn-azkfile.sh
./scripts/start/saitodisse-huginn-azkfile.sh 2>&1 > ./logs/saitodisse-huginn-azkfile.log
./scripts/clear/saitodisse-huginn-azkfile.sh

./scripts/clear/saitodisse-isomorphic500-azkfile.sh
./scripts/start/saitodisse-isomorphic500-azkfile.sh 2>&1 > ./logs/saitodisse-isomorphic500-azkfile.log
./scripts/clear/saitodisse-isomorphic500-azkfile.sh

./scripts/clear/saitodisse-lets-chat-azkfile.sh
./scripts/start/saitodisse-lets-chat-azkfile.sh 2>&1 > ./logs/saitodisse-lets-chat-azkfile.log
./scripts/clear/saitodisse-lets-chat-azkfile.sh

./scripts/clear/saitodisse-paperwork-azkfile.sh
./scripts/start/saitodisse-paperwork-azkfile.sh 2>&1 > ./logs/saitodisse-paperwork-azkfile.log
./scripts/clear/saitodisse-paperwork-azkfile.sh

./scripts/clear/saitodisse-platform-azkfile.sh
./scripts/start/saitodisse-platform-azkfile.sh 2>&1 > ./logs/saitodisse-platform-azkfile.log
./scripts/clear/saitodisse-platform-azkfile.sh

./scripts/clear/saitodisse-regexr-azkfile.sh
./scripts/start/saitodisse-regexr-azkfile.sh 2>&1 > ./logs/saitodisse-regexr-azkfile.log
./scripts/clear/saitodisse-regexr-azkfile.sh

./scripts/clear/saitodisse-shout-azkfile.sh
./scripts/start/saitodisse-shout-azkfile.sh 2>&1 > ./logs/saitodisse-shout-azkfile.log
./scripts/clear/saitodisse-shout-azkfile.sh

./scripts/clear/saitodisse-stringer-azkfile.sh
./scripts/start/saitodisse-stringer-azkfile.sh 2>&1 > ./logs/saitodisse-stringer-azkfile.log
./scripts/clear/saitodisse-stringer-azkfile.sh
