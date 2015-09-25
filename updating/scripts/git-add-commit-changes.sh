#! /bin/bash

BASEDIR=$(dirname $0)
for var in $(cat "$BASEDIR/../project-list.txt")
do
  echo " ------------"
  echo " $var"
  echo " ------------"
  cd "$BUTTONS_FOLDER/$var"

  echo ""
  echo " $ git add . -A"
  git add . -A

  echo ""
  echo " $ git commit -m'[azk] Azkfile.js updated'"
  git commit -m'[azk] Azkfile.js updated'

done
