// magnets.js
var magnet = require('magnet-uri')

var uri = 'magnet:?xt=urn:btih:e3811b9539cacff680e418124272177c47477157'
// var uri = 'magnet:?xt=urn:btih:a3aa98c5f64f92b5ba893c8c4f714c36215a8251&dn=WebTorrent1.txt&tr=udp%3A%2F%2Fopen.demonii.com%3A1337&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=udp%3A%2F%2Ftracker.publicbt.com%3A80&tr=udp%3A%2F%2Ftracker.webtorrent.io%3A80&tr=wss%3A%2F%2Ftracker.webtorrent.io'
var parsed = magnet(uri)

console.log('parsed:\n',parsed)

