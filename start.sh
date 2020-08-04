#!/bin/bash
path=`pwd`
echo "Starting.."
echo "Installing mongo server"

type mongodb-server >/dev/null 2>&1 || { sudo apt-get install mongodb-server; }
    
#sudo apt-get install mongodb-server

echo "Creating srv/mongodb folder"
cd /srv/
sudo mkdir -p mongodb
sudo chmod 775 /srv


type curl >/dev/null 2>&1 || { sudo apt-get install curl; curl -sL https://deb.nodesource.com/setup_10.x | sudo bash -;}

type node >/dev/null 2>&1 || { echo "Installing node..."; sudo apt install nodejs;}

cd $path
service mongodb stop
mkdir mongodb
echo "Starting mongoDB..."
mongo="sudo mongod --dbpath=$(pwd)/mongodb"

$mongo &
echo "mongoDB started"

echo "Installing dependencies..."
npm install
npm install mocha -g
echo "Dependencies Installed"


echo "Starting server..."
node app.js
echo "Server started on port 3000"
