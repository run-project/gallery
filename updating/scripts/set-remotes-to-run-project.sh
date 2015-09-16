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
  git remote set-url origin "git@github.com:run-project/$var.git"

  echo ""
  echo " $ git remote -v"
  git remote -v
done
