#! /bin/bash

BASEDIR=$(dirname $0)
for var in $(cat "$BASEDIR/../project-list.txt")
do
  echo " ------------"
  echo " $var"
  echo " ------------"
  cd "$BUTTONS_FOLDER/$var"

  echo ""
  echo " $ git remote -v"
  sudo git remote rm azk_deploy

  echo ""
  echo " $ git remote -v"
  git remote -v
done
