
echo ""
echo "-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+"
echo "-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+"
echo " Starting saitodisse/isomorphic500#azkfile"
echo "-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+"
echo "-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+"

echo ""
echo "cd /tmp/buttons/isomorphic500 folder"
cd /tmp/buttons/isomorphic500

echo ""
echo ""
echo " +++++++++++++++++++++++++++"
echo "  restarting with reprovision..."
echo " +++++++++++++++++++++++++++"
[ -e /tmp/buttons/isomorphic500 ] || azk start -Rovv saitodisse/isomorphic500#azkfile /tmp/buttons/isomorphic500
[ -e /tmp/buttons/isomorphic500 ] && cd /tmp/buttons/isomorphic500 && azk start -Rovv
