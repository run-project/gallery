#! /bin/bash

BASEDIR=$(dirname $0)
for var in $(cat "$BASEDIR/../project-list.txt")
do
  echo " ------------"
  echo " $var"
  echo " ------------"
  cd "$BUTTONS_FOLDER/$var"

  echo ""
  echo " $ git checkout azkfile"
  git checkout azkfile

  echo ""
  echo " $ git merge upstream/master"
  git merge master
done
