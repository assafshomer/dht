var WebTorrent = require('webtorrent');
var util = require('util');
var client = new WebTorrent();

var magnetURI = 'magnet:?xt=urn:btih:2cfee6e826e94eba7d0d5d60c3f304ba9df73e12&dn=WT6.txt'

client.add(magnetURI, function (torrent) {
	// Got torrent metadata!
  console.log('Client is downloading:', torrent.infoHash)

  torrent.files.forEach(function (file) {
    console.log(util.inspect(file, {depth:10}) +'\n')
  })
})