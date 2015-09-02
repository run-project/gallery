#! /bin/bash

./_create_folders.sh
./_stop-clean-start-agent.sh
# ./_clear-buttons.sh

# -------------
echo 'starting'

node `pwd`/app/runAll.js 'first-time'
