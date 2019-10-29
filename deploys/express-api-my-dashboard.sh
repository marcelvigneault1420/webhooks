cd /var/apps/charlesvigneault/express-api-my-dashboard

echo "Pulling from express-api-my-dashboard/master."

git pull origin master

echo "Pull success"

echo "Restarting server..."

pm2 restart dashboard

echo "Server restarted."
