
echo ""
echo "-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+"
echo "-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+"
echo " Starting saitodisse/huginn#azkfile"
echo "-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+"
echo "-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+"

echo ""
echo $(date)
echo ""

echo "cd /tmp/buttons/huginn folder"
cd /tmp/buttons/huginn

echo ""
echo ""
echo " +++++++++++++++++++++++++++"
echo "  restarting with reprovision..."
echo " +++++++++++++++++++++++++++"
azk start -Rovv saitodisse/huginn#azkfile /tmp/buttons/huginn

echo ""
echo $(date)
echo ""

