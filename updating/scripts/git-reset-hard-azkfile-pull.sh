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
  echo " $ git checkout azkfile"
  git checkout azkfile

  echo ""
  echo " $ git reset origin/azkfile --hard"
  git reset origin/azkfile --hard

  echo ""
  echo " $ git pull origin azkfile"
  git pull origin azkfile
done
