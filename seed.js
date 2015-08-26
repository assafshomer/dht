// seed.js 
// "node seed.js filename content"
var fs = require('fs');
var path = require('path');
var Webtorrent = require('webtorrent');

opts = {
  dht: true,
  // announce[]
}

var client = new Webtorrent(opts);
var torrentedFileName = process.argv[2] || 'TestTorrent'
var torrentedFileContent = process.argv[3] || 'TestTorrent Content\n'
var filePath = 'files/test/'+torrentedFileName+'.txt'
var date = new Date(Date.now());
var timeStamp = ('0' + date.getDate()).slice(-2) + '/' + ('0' + (date.getMonth() + 1)).slice(-2) + '/' + date.getFullYear() + ' ' + ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2);

fs.appendFile(filePath, torrentedFileContent+'\nGenerated by webtorrent at ['+timeStamp+']\n', function(err) {
    if(err) {
        return console.log(err);
    }  
});

var magnet_file_name = "webtorrent_magnet_for_("+torrentedFileName+').txt';

client.seed(filePath, function (torrent) {
	magnet = torrent.magnetURI;
	fs.appendFile('files/magnets/'+magnet_file_name, magnet+'\n', function(err) {
	    if(err) {
	        return console.log(err);
	    }
	    console.log("["+magnet+"] Saved to magnets file ["+magnet_file_name+']');
	});
});