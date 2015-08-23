var path = require('path');
var Webtorrent = require('webtorrent');
var client = new Webtorrent();

// var filePath = '/home/cowboydan/Pictures/satoshi.png'
var filePath = '/home/cowboydan/Downloads/Torrents/Files/test_0.txt'

client.seed(filePath, function (torrent) {	
	console.log(torrent.magnetURI)
});