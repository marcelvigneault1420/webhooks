cd /var/apps/charlesvigneault/dashboard

echo "Pulling from dashboard/master."

git pull origin master

echo "Pull success"

echo "Restarting server..."

pm2 restart dashboard

echo "Server restarted."
