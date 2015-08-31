#! /bin/bash

echo ""
echo ""
echo " +++++++++++++++++++"
echo "  stopping azk agent..."
echo " +++++++++++++++++++"
azk agent stop

echo ""
echo ""
echo " +++++++++++++++++++"
echo "  kill containers..."
echo " +++++++++++++++++++"
docker kill $(docker ps -q | tr "\r\n" " ")

echo ""
echo ""
echo " +++++++++++++++++++"
echo "  removing containers..."
echo " +++++++++++++++++++"
docker rm -f $(docker ps -f status=exited -q | tr "\r\n" " ")

echo ""
echo ""
echo " +++++++++++++++++++"
echo "  restarting Docker..."
echo " +++++++++++++++++++"
sudo service docker restart

echo ""
echo ""
echo " +++++++++++++++++++"
echo "  starting azk agent..."
echo " +++++++++++++++++++"
azk agent start
