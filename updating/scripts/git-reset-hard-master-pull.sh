#! /bin/bash

BASEDIR=$(dirname $0)
for var in $(cat "$BASEDIR/../project-list.txt")
do
  echo " ------------"
  echo " $var"
  echo " ------------"
  cd "$BUTTONS_FOLDER/$var"

  echo ""
  echo " $ git status"
  git status

  echo ""
  echo " $ git checkout master"
  git checkout master

  echo ""
  echo " $ git fetch --all --prune"
  git fetch --all --prune

  echo ""
  echo " $ git reset origin/master --hard"
  git reset origin/master --hard

  echo ""
  echo " $ git pull origin master"
  git pull origin master
done
