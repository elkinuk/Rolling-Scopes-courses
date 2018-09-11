let Creator = require('./creator');
let Search = require('./search');
let Request = require('./request');
let Swipe = require('./swipe');
let Resize = require('./resize');

let req = new Request();
let creator = new Creator();
let resizer = new Resize();

resizer.listen();

let swipe = new Swipe(req.loadVideos);
let search = new Search(req.loadVideos);
