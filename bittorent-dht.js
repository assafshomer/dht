//bittorent-dht
var DHT    = require('bittorrent-dht')
var magnet = require('magnet-uri')

// var uri = 'magnet:?xt=urn:btih:e3811b9539cacff680e418124272177c47477157'
var uri = 'magnet:?xt=urn:btih:a7894459d9594fe4cd122bcf0cd507aac7414537'
var parsed = magnet(uri)

console.log(parsed.infoHash) // 'e3811b9539cacff680e418124272177c47477157'

var dht = new DHT()
var randomPort = 20000+Math.round(Math.random()*10000)
dht.listen(randomPort, function () {
  console.log('now listening on port ' +randomPort)
	console.log(dht.address())
})

dht.on('ready', function () {
  // DHT is ready to use (i.e. the routing table contains at least K nodes, discovered
  // via the bootstrap nodes)

  // find peers for the given torrent info hash
  console.log('ready')
  dht.lookup(parsed.infoHash)
  dht.announce(parsed.infoHash, 6881, function () {  
		console.log('announced')
	})
})

dht.on('peer', function (addr, hash, from) {
  console.log('found potential peer ' + addr + ' through ' + from)
})
