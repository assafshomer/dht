#! /bin/bash
FILEDIR='/home/assaf/js_projects/dht/files/test/'
FILENAME='test_13.txt'
# TORRENTFILE="/home/assaf/js_projects/dht/files/torrents/$FILENAME.torrent"
TORRENTFILE="$FILEDIR$FILENAME.torrent"
TORDIR='/home/assaf/js_projects/dht/files/torrents/'
# TRACKERS='-t udp://tracker.openbittorrent.com:80 -t udp://open.demonii.com:1337 -t udp://tracker.coppersurfer.tk:6969 -t udp://tracker.leechers-paradise.org:6969'
TRACKERS='-t udp://router.bittorrent.com:6881 -t udp://router.utorrent.com:6881 -t udp://dht.transmissionbt.com:6881'
# echo "$(ls $TORDIR)"

# # Torrenting a directory with trackers
# transmission-create -o $TORDIR$FILENAME'.torrent' -c "Directory with trackers" -t udp://tracker.openbittorrent.com:80 -t udp://open.demonii.com:1337 -t udp://tracker.coppersurfer.tk:6969 -t udp://tracker.leechers-paradise.org:6969 $FILEDIR

# # Torrenting a directory without trackers
# transmission-create -o $TORDIR$FILENAME'.torrent' -c "no tracker" $FILEDIR

# # Torrenting a directory with trackers
# transmission-create -o $TORDIR$FILENAME'.torrent' -c "Directory with trackers" $TRACKERS $FILEDIR
# echo "$TORRENTFILE"
Torrenting a file with trackers
transmission-create -x -y -o $TORRENTFILE -f $TORDIR -c "Directory with trackers" $TRACKERS $FILEDIR$FILENAME

transmission-remote -n 'transmission:transmission' -a $TORRENTFILE
