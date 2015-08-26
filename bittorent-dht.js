//bittorent-dht
var DHT    = require('bittorrent-dht')
var magnet = require('magnet-uri')

// var uri = 'magnet:?xt=urn:btih:e3811b9539cacff680e418124272177c47477157'
var uri = 'magnet:?xt=urn:btih:d643d4f78373b3187a1860b2e1bb7f64978254a0&dn=obi-wan%5F20.png'
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
