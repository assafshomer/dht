var createTorrent = require('create-torrent');
var fs = require('fs');
var path = require('path');
var dirPath = 'files/create/'
var torrentedFileName = process.argv[2] || 'TestTorrent'
var torrentedFileContent = process.argv[3] || 'TestTorrent Content\n'
var filePath = dirPath+torrentedFileName+'.txt'
var torrentFilePath = filePath+'.torrent';

var date = new Date(Date.now());
var timeStamp = ('0' + date.getDate()).slice(-2) + '/' + ('0' + (date.getMonth() + 1)).slice(-2) + '/' + date.getFullYear() + ' ' + ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2);

fs.appendFile(filePath, torrentedFileContent+'\nGenerated by webtorrent at ['+timeStamp+']\n', function(err) {
    if(err) {
        return console.log(err);
    }  
});


// var filePath = '/home/cowboydan/js_projects/colu/dht/files/test/WT9.txt';
// var fileName = path.basename(filePath,'.txt');
// var torrentFilePath = '/home/cowboydan/js_projects/colu/dht/files/torrents/'+fileName+'.torrent';


createTorrent(filePath, function (err, torrent) {
  if (!err) {
    // `torrent` is a Buffer with the contents of the new .torrent file
    fs.writeFile(torrentFilePath, torrent, function(err) {
	    if(err) {
	        return console.log(err);
	    }
	    console.log("torrent file: ",torrentFilePath);
	});
  }
})