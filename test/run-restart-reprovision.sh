#! /bin/bash

./_create_folders.sh

# -------------
echo 'starting'

node `pwd`/app/runAll.js 'restart-reprovision'
