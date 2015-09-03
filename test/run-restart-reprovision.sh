#! /bin/bash

./prepare.sh

# -------------
echo 'starting'

azk nvm node `pwd`/app/runAll.js 'restart-reprovision'
