#! /bin/bash
CID=$(docker ps -a | grep docktorrent | awk '{print $1}')
echo "$CID"

echo "Stopping docktorrent container $CID"
docker stop $CID
echo "Removing docktorrent container $CID"
docker rm -f $CID
echo "*****************************"
echo "...and the remaining running containers"
echo "*****************************"
docker ps -a