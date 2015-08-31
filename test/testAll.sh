echo "---------------------------------------"
echo "saitodisse/cloudtunes#azkfile"
echo "---------------------------------------"

echo ""
echo "cd /tmp/buttons/cloudtunes folder"
cd /tmp/buttons/cloudtunes

echo ""
echo "azk stop"
azk stop

echo ""
echo "removing any persistent/sync folders..."
azk info |
  grep -e "(sync_folders|persistent_folders)" |
  awk -F ":" "{ print $2 }" |
  sed "s/.*(persistent_folders|sync_folders)/(w+).*/\2/g" |
  tail -n 1 |
  xargs -n 1 -I VARR sudo rm -rf ~/.azk/data/sync_folders/VARR ~/.azk/data/persistent_folders/VARR

echo ""
echo "removing old project folder if exists..."
cd /tmp/buttons
sudo rm -rf /tmp/buttons/cloudtunes

echo ""
echo "restarting with reprovision..."
azk start -Rvv saitodisse/cloudtunes#azkfile /tmp/buttons/cloudtunes

echo ""
# open http://cloudtunes.dev.azk.io/
echo ""
echo ""


echo "---------------------------------------"
echo "saitodisse/dashboard#azkfile"
echo "---------------------------------------"

echo ""
echo "cd /tmp/buttons/dashboard folder"
cd /tmp/buttons/dashboard

echo ""
echo "azk stop"
azk stop

echo ""
echo "removing any persistent/sync folders..."
azk info |
  grep -e "(sync_folders|persistent_folders)" |
  awk -F ":" "{ print $2 }" |
  sed "s/.*(persistent_folders|sync_folders)/(w+).*/\2/g" |
  tail -n 1 |
  xargs -n 1 -I VARR sudo rm -rf ~/.azk/data/sync_folders/VARR ~/.azk/data/persistent_folders/VARR

echo ""
echo "removing old project folder if exists..."
cd /tmp/buttons
sudo rm -rf /tmp/buttons/dashboard

echo ""
echo "restarting with reprovision..."
azk start -Rvv saitodisse/dashboard#azkfile /tmp/buttons/dashboard

echo ""
# open http://dashboard.dev.azk.io/
echo ""
echo ""


echo "---------------------------------------"
echo "saitodisse/dillinger#azkfile"
echo "---------------------------------------"

echo ""
echo "cd /tmp/buttons/dillinger folder"
cd /tmp/buttons/dillinger

echo ""
echo "azk stop"
azk stop

echo ""
echo "removing any persistent/sync folders..."
azk info |
  grep -e "(sync_folders|persistent_folders)" |
  awk -F ":" "{ print $2 }" |
  sed "s/.*(persistent_folders|sync_folders)/(w+).*/\2/g" |
  tail -n 1 |
  xargs -n 1 -I VARR sudo rm -rf ~/.azk/data/sync_folders/VARR ~/.azk/data/persistent_folders/VARR

echo ""
echo "removing old project folder if exists..."
cd /tmp/buttons
sudo rm -rf /tmp/buttons/dillinger

echo ""
echo "restarting with reprovision..."
azk start -Rvv saitodisse/dillinger#azkfile /tmp/buttons/dillinger

echo ""
# open http://dillinger.dev.azk.io/
echo ""
echo ""


echo "---------------------------------------"
echo "saitodisse/discourse#azkfile"
echo "---------------------------------------"

echo ""
echo "cd /tmp/buttons/discourse folder"
cd /tmp/buttons/discourse

echo ""
echo "azk stop"
azk stop

echo ""
echo "removing any persistent/sync folders..."
azk info |
  grep -e "(sync_folders|persistent_folders)" |
  awk -F ":" "{ print $2 }" |
  sed "s/.*(persistent_folders|sync_folders)/(w+).*/\2/g" |
  tail -n 1 |
  xargs -n 1 -I VARR sudo rm -rf ~/.azk/data/sync_folders/VARR ~/.azk/data/persistent_folders/VARR

echo ""
echo "removing old project folder if exists..."
cd /tmp/buttons
sudo rm -rf /tmp/buttons/discourse

echo ""
echo "restarting with reprovision..."
azk start -Rvv saitodisse/discourse#azkfile /tmp/buttons/discourse

echo ""
# open http://discourse.dev.azk.io/
echo ""
echo ""


echo "---------------------------------------"
echo "saitodisse/habitrpg#azkfile"
echo "---------------------------------------"

echo ""
echo "cd /tmp/buttons/habitrpg folder"
cd /tmp/buttons/habitrpg

echo ""
echo "azk stop"
azk stop

echo ""
echo "removing any persistent/sync folders..."
azk info |
  grep -e "(sync_folders|persistent_folders)" |
  awk -F ":" "{ print $2 }" |
  sed "s/.*(persistent_folders|sync_folders)/(w+).*/\2/g" |
  tail -n 1 |
  xargs -n 1 -I VARR sudo rm -rf ~/.azk/data/sync_folders/VARR ~/.azk/data/persistent_folders/VARR

echo ""
echo "removing old project folder if exists..."
cd /tmp/buttons
sudo rm -rf /tmp/buttons/habitrpg

echo ""
echo "restarting with reprovision..."
azk start -Rvv saitodisse/habitrpg#azkfile /tmp/buttons/habitrpg

echo ""
# open http://habitrpg.dev.azk.io/
echo ""
echo ""


echo "---------------------------------------"
echo "saitodisse/huginn#azkfile"
echo "---------------------------------------"

echo ""
echo "cd /tmp/buttons/huginn folder"
cd /tmp/buttons/huginn

echo ""
echo "azk stop"
azk stop

echo ""
echo "removing any persistent/sync folders..."
azk info |
  grep -e "(sync_folders|persistent_folders)" |
  awk -F ":" "{ print $2 }" |
  sed "s/.*(persistent_folders|sync_folders)/(w+).*/\2/g" |
  tail -n 1 |
  xargs -n 1 -I VARR sudo rm -rf ~/.azk/data/sync_folders/VARR ~/.azk/data/persistent_folders/VARR

echo ""
echo "removing old project folder if exists..."
cd /tmp/buttons
sudo rm -rf /tmp/buttons/huginn

echo ""
echo "restarting with reprovision..."
azk start -Rvv saitodisse/huginn#azkfile /tmp/buttons/huginn

echo ""
# open http://huginn.dev.azk.io/
echo ""
echo ""


echo "---------------------------------------"
echo "saitodisse/isomorphic500#azkfile"
echo "---------------------------------------"

echo ""
echo "cd /tmp/buttons/isomorphic500 folder"
cd /tmp/buttons/isomorphic500

echo ""
echo "azk stop"
azk stop

echo ""
echo "removing any persistent/sync folders..."
azk info |
  grep -e "(sync_folders|persistent_folders)" |
  awk -F ":" "{ print $2 }" |
  sed "s/.*(persistent_folders|sync_folders)/(w+).*/\2/g" |
  tail -n 1 |
  xargs -n 1 -I VARR sudo rm -rf ~/.azk/data/sync_folders/VARR ~/.azk/data/persistent_folders/VARR

echo ""
echo "removing old project folder if exists..."
cd /tmp/buttons
sudo rm -rf /tmp/buttons/isomorphic500

echo ""
echo "restarting with reprovision..."
azk start -Rvv saitodisse/isomorphic500#azkfile /tmp/buttons/isomorphic500

echo ""
# open http://isomorphic500.dev.azk.io/
echo ""
echo ""


echo "---------------------------------------"
echo "saitodisse/lets-chat#azkfile"
echo "---------------------------------------"

echo ""
echo "cd /tmp/buttons/lets-chat folder"
cd /tmp/buttons/lets-chat

echo ""
echo "azk stop"
azk stop

echo ""
echo "removing any persistent/sync folders..."
azk info |
  grep -e "(sync_folders|persistent_folders)" |
  awk -F ":" "{ print $2 }" |
  sed "s/.*(persistent_folders|sync_folders)/(w+).*/\2/g" |
  tail -n 1 |
  xargs -n 1 -I VARR sudo rm -rf ~/.azk/data/sync_folders/VARR ~/.azk/data/persistent_folders/VARR

echo ""
echo "removing old project folder if exists..."
cd /tmp/buttons
sudo rm -rf /tmp/buttons/lets-chat

echo ""
echo "restarting with reprovision..."
azk start -Rvv saitodisse/lets-chat#azkfile /tmp/buttons/lets-chat

echo ""
# open http://lets-chat.dev.azk.io/
echo ""
echo ""


echo "---------------------------------------"
echo "saitodisse/paperwork#azkfile"
echo "---------------------------------------"

echo ""
echo "cd /tmp/buttons/paperwork folder"
cd /tmp/buttons/paperwork

echo ""
echo "azk stop"
azk stop

echo ""
echo "removing any persistent/sync folders..."
azk info |
  grep -e "(sync_folders|persistent_folders)" |
  awk -F ":" "{ print $2 }" |
  sed "s/.*(persistent_folders|sync_folders)/(w+).*/\2/g" |
  tail -n 1 |
  xargs -n 1 -I VARR sudo rm -rf ~/.azk/data/sync_folders/VARR ~/.azk/data/persistent_folders/VARR

echo ""
echo "removing old project folder if exists..."
cd /tmp/buttons
sudo rm -rf /tmp/buttons/paperwork

echo ""
echo "restarting with reprovision..."
azk start -Rvv saitodisse/paperwork#azkfile /tmp/buttons/paperwork

echo ""
# open http://paperwork.dev.azk.io/
echo ""
echo ""


echo "---------------------------------------"
echo "saitodisse/platform#azkfile"
echo "---------------------------------------"

echo ""
echo "cd /tmp/buttons/platform folder"
cd /tmp/buttons/platform

echo ""
echo "azk stop"
azk stop

echo ""
echo "removing any persistent/sync folders..."
azk info |
  grep -e "(sync_folders|persistent_folders)" |
  awk -F ":" "{ print $2 }" |
  sed "s/.*(persistent_folders|sync_folders)/(w+).*/\2/g" |
  tail -n 1 |
  xargs -n 1 -I VARR sudo rm -rf ~/.azk/data/sync_folders/VARR ~/.azk/data/persistent_folders/VARR

echo ""
echo "removing old project folder if exists..."
cd /tmp/buttons
sudo rm -rf /tmp/buttons/platform

echo ""
echo "restarting with reprovision..."
azk start -Rvv saitodisse/platform#azkfile /tmp/buttons/platform

echo ""
# open http://platform.dev.azk.io/
echo ""
echo ""


echo "---------------------------------------"
echo "saitodisse/regexr#azkfile"
echo "---------------------------------------"

echo ""
echo "cd /tmp/buttons/regexr folder"
cd /tmp/buttons/regexr

echo ""
echo "azk stop"
azk stop

echo ""
echo "removing any persistent/sync folders..."
azk info |
  grep -e "(sync_folders|persistent_folders)" |
  awk -F ":" "{ print $2 }" |
  sed "s/.*(persistent_folders|sync_folders)/(w+).*/\2/g" |
  tail -n 1 |
  xargs -n 1 -I VARR sudo rm -rf ~/.azk/data/sync_folders/VARR ~/.azk/data/persistent_folders/VARR

echo ""
echo "removing old project folder if exists..."
cd /tmp/buttons
sudo rm -rf /tmp/buttons/regexr

echo ""
echo "restarting with reprovision..."
azk start -Rvv saitodisse/regexr#azkfile /tmp/buttons/regexr

echo ""
# open http://regexr.dev.azk.io/
echo ""
echo ""


echo "---------------------------------------"
echo "saitodisse/shout#azkfile"
echo "---------------------------------------"

echo ""
echo "cd /tmp/buttons/shout folder"
cd /tmp/buttons/shout

echo ""
echo "azk stop"
azk stop

echo ""
echo "removing any persistent/sync folders..."
azk info |
  grep -e "(sync_folders|persistent_folders)" |
  awk -F ":" "{ print $2 }" |
  sed "s/.*(persistent_folders|sync_folders)/(w+).*/\2/g" |
  tail -n 1 |
  xargs -n 1 -I VARR sudo rm -rf ~/.azk/data/sync_folders/VARR ~/.azk/data/persistent_folders/VARR

echo ""
echo "removing old project folder if exists..."
cd /tmp/buttons
sudo rm -rf /tmp/buttons/shout

echo ""
echo "restarting with reprovision..."
azk start -Rvv saitodisse/shout#azkfile /tmp/buttons/shout

echo ""
# open http://shout.dev.azk.io/
echo ""
echo ""


echo "---------------------------------------"
echo "saitodisse/stringer#azkfile"
echo "---------------------------------------"

echo ""
echo "cd /tmp/buttons/stringer folder"
cd /tmp/buttons/stringer

echo ""
echo "azk stop"
azk stop

echo ""
echo "removing any persistent/sync folders..."
azk info |
  grep -e "(sync_folders|persistent_folders)" |
  awk -F ":" "{ print $2 }" |
  sed "s/.*(persistent_folders|sync_folders)/(w+).*/\2/g" |
  tail -n 1 |
  xargs -n 1 -I VARR sudo rm -rf ~/.azk/data/sync_folders/VARR ~/.azk/data/persistent_folders/VARR

echo ""
echo "removing old project folder if exists..."
cd /tmp/buttons
sudo rm -rf /tmp/buttons/stringer

echo ""
echo "restarting with reprovision..."
azk start -Rvv saitodisse/stringer#azkfile /tmp/buttons/stringer

echo ""
# open http://stringer.dev.azk.io/
echo ""
echo ""


