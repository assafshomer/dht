// seed.js 
// "node seed.js filename content"
var fs = require('fs');
var path = require('path');
var Webtorrent = require('webtorrent');
var magnet = require('magnet-uri');
var util = require('util');
var DHT    = require('bittorrent-dht');              
// console.log("Body: ",util.inspect(body, {depth:10}))
opts = {
  dht: true,
  announce: ['dht.transmission.com']
}
  // announce: ['dht.transmission.com']
  // 113.12.34.158:13374


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

var magnetFileName = "webtorrent_magnet_for_("+torrentedFileName+').txt';
var magnetFilePath = 'files/magnets/'+magnetFileName;
client.seed(filePath,opts, function (torrent) {
	var magnetURI = torrent.magnetURI;
	var parsedMagentUrI = magnet(magnetURI);
	content = '['+magnetURI +']\n'+util.inspect(parsedMagentUrI, {depth:10}) +'\n';
	logContent = content+" Saved to magnets file ["+magnetFileName+']'
	fs.appendFile(magnetFilePath, content, function(err) {
	    if(err) {
	        return console.log(err);
	    }
	    console.log("Magnet: ",logContent);
	});

	var dht = new DHT();
	var randomPort = 20000+Math.round(Math.random()*10000);	
	dht.listen(randomPort, function () {
	  console.log('now listening on port ' +randomPort)
		console.log(dht.address())
	})

	dht.on('ready', function () {

	  console.log('ready')
	  dht.lookup(parsedMagentUrI.infoHash)
	  dht.announce(parsedMagentUrI.infoHash, 6881, function () {  
			console.log('announced')
		})
	})

	dht.on('peer', function (addr, hash, from) {
	  console.log('found potential peer ' + addr + ' through ' + from)
	})

});