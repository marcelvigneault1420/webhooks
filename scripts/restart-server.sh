cd /var/apps/charlesvigneault/$1

echo "Pulling from $1/master."

git pull origin master

echo "Pull success"

echo "Restarting server $1..."

pm2 restart $1

echo "Server $1 restarted."
