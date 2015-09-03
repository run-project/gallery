#! /bin/bash

./prepare.sh
# ./linux_clean_docker_and_agent.sh

# -------------
echo 'starting'

azk nvm node `pwd`/app/runAll.js 'first-time'
