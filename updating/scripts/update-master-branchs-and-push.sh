#! /bin/bash

BASEDIR=$(dirname $0)
for var in $(cat "$BASEDIR/../project-list.txt")
do
  echo " ------------"
  echo " $var"
  echo " ------------"
  cd "$BUTTONS_FOLDER/$var"

  echo ""
  echo " $ git fetch --all --prune"
  git fetch --all --prune

  echo ""
  echo " $ git checkout master"
  git checkout master

  echo ""
  echo " $ git pull upstream master"
  git pull upstream master

  echo ""
  echo " $ git push origin master"
  git push origin master

  echo ""
  echo " $ git checkout azkfile"
  git checkout azkfile
done
