#! /bin/bash

mkdir -p "$BUTTONS_FOLDER"

echo " > shout"
cd $BUTTONS_FOLDER
git clone git@github.com:run-project/shout.git
cd shout
git remote add upstream git@github.com:erming/shout.git
git remote -v
echo ""
echo ""

echo " > dashboard"
cd $BUTTONS_FOLDER
git clone git@github.com:run-project/dashboard.git
cd dashboard
git remote add upstream git@github.com:Reportr/dashboard.git
git remote -v
echo ""
echo ""

echo " > stringer"
cd $BUTTONS_FOLDER
git clone git@github.com:run-project/stringer.git
cd stringer
git remote add upstream https://github.com/swanson/stringer.git
git remote -v
echo ""
echo ""

echo " > dillinger"
cd $BUTTONS_FOLDER
git clone git@github.com:run-project/dillinger.git
cd dillinger
git remote add upstream git@github.com:joemccann/dillinger.git
git remote -v
echo ""
echo ""

echo " > regexr"
cd $BUTTONS_FOLDER
git clone git@github.com:run-project/regexr.git
cd regexr
git remote add upstream git@github.com:gskinner/regexr.git
git remote -v
echo ""
echo ""

echo " > huginn"
cd $BUTTONS_FOLDER
git clone git@github.com:run-project/huginn.git
cd huginn
git remote add upstream https://github.com/cantino/huginn.git
git remote -v
echo ""
echo ""
