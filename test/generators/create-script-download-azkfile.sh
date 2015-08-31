echo '#! /bin/bash'   > ./downloadAllAzkfiles.sh
echo 'echo "$ rm -rf azkfiles"'   >> ./downloadAllAzkfiles.sh
echo 'rm -rf azkfiles'            >> ./downloadAllAzkfiles.sh

echo 'echo "downloading all..."'  >> ./downloadAllAzkfiles.sh

node ./generators/templates/download-azkfile.js   saitodisse    cloudtunes      azkfile >> ./downloadAllAzkfiles.sh
node ./generators/templates/download-azkfile.js   saitodisse    dashboard       azkfile >> ./downloadAllAzkfiles.sh
node ./generators/templates/download-azkfile.js   saitodisse    dillinger       azkfile >> ./downloadAllAzkfiles.sh
node ./generators/templates/download-azkfile.js   saitodisse    discourse       azkfile >> ./downloadAllAzkfiles.sh
node ./generators/templates/download-azkfile.js   saitodisse    habitrpg        azkfile >> ./downloadAllAzkfiles.sh
node ./generators/templates/download-azkfile.js   saitodisse    huginn          azkfile >> ./downloadAllAzkfiles.sh
node ./generators/templates/download-azkfile.js   saitodisse    isomorphic500   azkfile >> ./downloadAllAzkfiles.sh
node ./generators/templates/download-azkfile.js   saitodisse    lets-chat       azkfile >> ./downloadAllAzkfiles.sh
node ./generators/templates/download-azkfile.js   saitodisse    paperwork       azkfile >> ./downloadAllAzkfiles.sh
node ./generators/templates/download-azkfile.js   saitodisse    platform        azkfile >> ./downloadAllAzkfiles.sh
node ./generators/templates/download-azkfile.js   saitodisse    regexr          azkfile >> ./downloadAllAzkfiles.sh
node ./generators/templates/download-azkfile.js   saitodisse    shout           azkfile >> ./downloadAllAzkfiles.sh
node ./generators/templates/download-azkfile.js   saitodisse    stringer        azkfile >> ./downloadAllAzkfiles.sh
