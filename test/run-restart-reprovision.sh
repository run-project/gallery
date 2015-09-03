#! /bin/bash

./_create_folders.sh

# -------------
echo 'starting'

azk nvm node `pwd`/app/runAll.js 'restart-reprovision'
