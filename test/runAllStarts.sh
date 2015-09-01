#! /bin/bash

mkdir -p logs

# -------------
echo 'cleaning'

./generators/create-script-test-azk-start.sh
./scripts-shared/stop-clean-start-agent.sh

# -------------
echo 'starting'

./scripts/clear/saitodisse-cloudtunes-azkfile.sh 2> /dev/null
touch "./logs/saitodisse-cloudtunes-azkfile_INI_$(date +"%T")"
./scripts/start/saitodisse-cloudtunes-azkfile.sh
touch "saitodisse-cloudtunes-azkfile_FIN_$(date +"%T")"
./scripts/clear/saitodisse-cloudtunes-azkfile.sh 2> /dev/null

./scripts/clear/saitodisse-dashboard-azkfile.sh 2> /dev/null
touch "./logs/saitodisse-dashboard-azkfile_INI_$(date +"%T")"
./scripts/start/saitodisse-dashboard-azkfile.sh
touch "saitodisse-dashboard-azkfile_FIN_$(date +"%T")"
./scripts/clear/saitodisse-dashboard-azkfile.sh 2> /dev/null

./scripts/clear/saitodisse-dillinger-azkfile.sh 2> /dev/null
touch "./logs/saitodisse-dillinger-azkfile_INI_$(date +"%T")"
./scripts/start/saitodisse-dillinger-azkfile.sh
touch "saitodisse-dillinger-azkfile_FIN_$(date +"%T")"
./scripts/clear/saitodisse-dillinger-azkfile.sh 2> /dev/null

./scripts/clear/saitodisse-discourse-azkfile.sh 2> /dev/null
touch "./logs/saitodisse-discourse-azkfile_INI_$(date +"%T")"
./scripts/start/saitodisse-discourse-azkfile.sh
touch "saitodisse-discourse-azkfile_FIN_$(date +"%T")"
./scripts/clear/saitodisse-discourse-azkfile.sh 2> /dev/null

./scripts/clear/saitodisse-habitrpg-azkfile.sh 2> /dev/null
touch "./logs/saitodisse-habitrpg-azkfile_INI_$(date +"%T")"
./scripts/start/saitodisse-habitrpg-azkfile.sh
touch "saitodisse-habitrpg-azkfile_FIN_$(date +"%T")"
./scripts/clear/saitodisse-habitrpg-azkfile.sh 2> /dev/null

./scripts/clear/saitodisse-huginn-azkfile.sh 2> /dev/null
touch "./logs/saitodisse-huginn-azkfile_INI_$(date +"%T")"
./scripts/start/saitodisse-huginn-azkfile.sh
touch "saitodisse-huginn-azkfile_FIN_$(date +"%T")"
./scripts/clear/saitodisse-huginn-azkfile.sh 2> /dev/null

./scripts/clear/saitodisse-isomorphic500-azkfile.sh 2> /dev/null
touch "./logs/saitodisse-isomorphic500-azkfile_INI_$(date +"%T")"
./scripts/start/saitodisse-isomorphic500-azkfile.sh
touch "saitodisse-isomorphic500-azkfile_FIN_$(date +"%T")"
./scripts/clear/saitodisse-isomorphic500-azkfile.sh 2> /dev/null

./scripts/clear/saitodisse-lets-chat-azkfile.sh 2> /dev/null
touch "./logs/saitodisse-lets-chat-azkfile_INI_$(date +"%T")"
./scripts/start/saitodisse-lets-chat-azkfile.sh
touch "saitodisse-lets-chat-azkfile_FIN_$(date +"%T")"
./scripts/clear/saitodisse-lets-chat-azkfile.sh 2> /dev/null

./scripts/clear/saitodisse-paperwork-azkfile.sh 2> /dev/null
touch "./logs/saitodisse-paperwork-azkfile_INI_$(date +"%T")"
./scripts/start/saitodisse-paperwork-azkfile.sh
touch "saitodisse-paperwork-azkfile_FIN_$(date +"%T")"
./scripts/clear/saitodisse-paperwork-azkfile.sh 2> /dev/null

./scripts/clear/saitodisse-platform-azkfile.sh 2> /dev/null
touch "./logs/saitodisse-platform-azkfile_INI_$(date +"%T")"
./scripts/start/saitodisse-platform-azkfile.sh
touch "saitodisse-platform-azkfile_FIN_$(date +"%T")"
./scripts/clear/saitodisse-platform-azkfile.sh 2> /dev/null

./scripts/clear/saitodisse-regexr-azkfile.sh 2> /dev/null
touch "./logs/saitodisse-regexr-azkfile_INI_$(date +"%T")"
./scripts/start/saitodisse-regexr-azkfile.sh
touch "saitodisse-regexr-azkfile_FIN_$(date +"%T")"
./scripts/clear/saitodisse-regexr-azkfile.sh 2> /dev/null

./scripts/clear/saitodisse-shout-azkfile.sh 2> /dev/null
touch "./logs/saitodisse-shout-azkfile_INI_$(date +"%T")"
./scripts/start/saitodisse-shout-azkfile.sh
touch "saitodisse-shout-azkfile_FIN_$(date +"%T")"
./scripts/clear/saitodisse-shout-azkfile.sh 2> /dev/null

./scripts/clear/saitodisse-stringer-azkfile.sh 2> /dev/null
touch "./logs/saitodisse-stringer-azkfile_INI_$(date +"%T")"
./scripts/start/saitodisse-stringer-azkfile.sh
touch "saitodisse-stringer-azkfile_FIN_$(date +"%T")"
./scripts/clear/saitodisse-stringer-azkfile.sh 2> /dev/null
