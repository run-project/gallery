
echo ""
echo "-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+"
echo "-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+"
echo " Starting saitodisse/dillinger#azkfile"
echo "-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+"
echo "-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+"

echo ""
echo "cd /tmp/buttons/dillinger folder"
cd /tmp/buttons/dillinger

echo ""
echo ""
echo " +++++++++++++++++++++++++++"
echo "  restarting with reprovision..."
echo " +++++++++++++++++++++++++++"
[ -e /tmp/buttons/dillinger ] || azk start -Rovv saitodisse/dillinger#azkfile /tmp/buttons/dillinger
[ -e /tmp/buttons/dillinger ] && cd /tmp/buttons/dillinger && azk start -Rovv
