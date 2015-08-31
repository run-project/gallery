
echo ""
echo "-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+"
echo "-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+"
echo " Starting saitodisse/lets-chat#azkfile"
echo "-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+"
echo "-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+"

echo ""
echo "cd /tmp/buttons/lets-chat folder"
cd /tmp/buttons/lets-chat

echo ""
echo ""
echo " +++++++++++++++++++++++++++"
echo "  restarting with reprovision..."
echo " +++++++++++++++++++++++++++"
[ -e /tmp/buttons/lets-chat ] || azk start -Rovv saitodisse/lets-chat#azkfile /tmp/buttons/lets-chat
[ -e /tmp/buttons/lets-chat ] && cd /tmp/buttons/lets-chat && azk start -Rovv
