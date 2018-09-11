var bundle =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var page = __webpack_require__(6);
var Swipe = __webpack_require__(1);

function pagesCalculate(count, length) {
    var number = length / count;

    if (number ^ 0 == number) return number;else return parseInt(number.toFixed(0));
}

function ResizeCalculator() {
    this.count = 0;
}

ResizeCalculator.prototype.calculate = function (i) {
    var swipe = new Swipe();
    var video = document.querySelectorAll('.video');
    var length = video.length;
    var pages = document.querySelectorAll('.page');
    var videos = document.querySelector('.videos');

    if (document.body.clientWidth < 700) {
        videos.style.width = 'calc(100vw * ' + length + ')';
        this.count = pagesCalculate(1, length);
    } else if (document.body.clientWidth < 1050) {
        videos.style.width = 'calc(50vw *' + length + ')';
        this.count = pagesCalculate(2, length);
    } else if (document.body.clientWidth < 1400) {
        videos.style.width = 'calc(33.3vw *' + length + ')';
        this.count = pagesCalculate(3, length);
    } else if (document.body.clientWidth > 1500) {
        videos.style.width = 'calc(25vw *' + length + ')';
        this.count = pagesCalculate(4, length);
    }

    page(this.count);

    if (pages.length == 1) {
        pages[0].classList.add('active');
        swipe.swipe(0);
    }
};

ResizeCalculator.prototype.listen = function () {
    window.addEventListener('resize', this.calculate);
};

module.exports = ResizeCalculator;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function Swipe(callback) {
    this.callback = callback;
    this.videos = document.querySelector('.videos');

    if (callback != undefined) {
        var active = document.querySelector('.active'),
            pageNumber = void 0;
        if (active == null) pageNumber = 0;else pageNumber = active.dataset.number;

        this.activatePage(pageNumber);
        this.videos.addEventListener("mousedown", this.clickHandler.bind(this), false);
        this.videos.addEventListener("touchstart", this.clickHandler.bind(this), false);

        document.querySelector('footer').addEventListener('click', function (event) {
            var pages = document.querySelectorAll('.page');
            var number = event.target.dataset.number;
            if (number != undefined) {
                this.swipe(number);
                if (parseInt(number) === pages.length - 1 || parseInt(number) === pages.length - 2) this.callback.call(this, '');
            }
        }.bind(this));

        window.addEventListener('resize', function () {
            var active = document.querySelector('.active'),
                pageNumber = void 0;
            if (active == null) pageNumber = 0;else pageNumber = active.dataset.number;

            var pages = document.querySelectorAll('.page'),
                videos = document.querySelector('.videos'),
                trans = document.body.clientWidth * pageNumber;
            videos.style.transition = "transform 0.0s";
            videos.style.transform = "translate3D(-" + trans + "px, 0px, 0px)";
            if (active === null) this.swipe(pages.length - 1);
        }.bind(this));
    }
}

Swipe.prototype.activatePage = function (number) {
    var pages = document.querySelectorAll('.page');
    for (var i = 0; i < pages.length; i++) {
        if (i == number) pages[i].classList.add('active');else pages[i].classList.remove('active');
    }
};

Swipe.prototype.clickHandler = function (event) {
    var active = document.querySelector('.active'),
        pageNumber = void 0;

    if (active == null) pageNumber = 0;else pageNumber = active.dataset.number;

    var videos = document.querySelector('.videos');
    var trans = document.body.clientWidth * pageNumber;
    var shiftX = void 0;

    if (event.changedTouches == undefined) shiftX = event.pageX;else shiftX = event.changedTouches[0].pageX;

    videos.style.transition = "transform 0s";

    function clickMoveAt(event) {
        var pageX = void 0;

        if (event.changedTouches == undefined) pageX = event.pageX;else pageX = event.changedTouches[0].pageX;

        videos.style.transform = "translate3D(" + (-trans + pageX - shiftX) + "px, 0px, 0px)";
    }

    document.addEventListener('mousemove', clickMoveAt);
    document.addEventListener('touchmove', clickMoveAt);

    var activatePage = this.activatePage,
        callback = this.callback;

    function endHandler(event) {
        var active = document.querySelector('.active'),
            pageNumber = void 0;

        if (active == null) pageNumber = 0;else pageNumber = active.dataset.number;

        var videos = document.querySelector('.videos');
        var pages = document.querySelectorAll('.page');
        var pageX = void 0;

        if (event.changedTouches == undefined) pageX = event.pageX;else pageX = event.changedTouches[0].pageX;

        document.removeEventListener('mousemove', clickMoveAt);
        document.removeEventListener('touchmove', clickMoveAt);

        videos.style.transition = "transform 0.5s";

        if (pageX < shiftX && pageNumber != pages.length - 3 && pageNumber != pages.length - 1) pageNumber++;else if (pageX > shiftX && pageNumber != '0') pageNumber--;else if (parseInt(pageNumber) === pages.length - 3) {
            callback.call(this, '');
            pageNumber++;
        }

        activatePage(pageNumber);
        trans = document.body.clientWidth * pageNumber;
        videos.style.transform = "translate3D(-" + trans + "px, 0px, 0px)";

        document.removeEventListener('mouseup', endHandler);
        document.removeEventListener('touchend', endHandler);
    }

    document.addEventListener('mouseup', endHandler);
    document.addEventListener('touchend', endHandler);
};

Swipe.prototype.swipe = function (number) {
    var videos = document.querySelector('.videos'),
        trans = 0;
    this.activatePage(number);
    videos.style.transition = "transform 0.8s";
    trans = document.body.clientWidth * number;
    videos.style.transform = "translate3D(-" + trans + "px, 0px, 0px)";
};

module.exports = Swipe;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function Creator() {
    document.querySelector('body').innerHTML = '<header><i class="fa fa-search fa-3x bounceInLeft animated"></i><input placeholder="Search..." class="search bounceInLeft animated" type="search"><h1>You<span class="red">Tube</span> <span class="black">Player</span></h1></header><main><ul class="videos"></ul></main><footer></footer>';
}

module.exports = Creator;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Video = __webpack_require__(8);
var Resizer = __webpack_require__(0);

function Request() {
    var XHR = XMLHttpRequest;
    var nextpage = '';
    var saveQ = '';
    var resizer = new Resizer();

    function loadVideos(query) {
        if (query == '') query = saveQ;else saveQ = query;

        var xhr = new XHR();
        var url = 'https://www.googleapis.com/youtube/v3/search?key=AIzaSyBa96CkSQ_MX9YAMwFk-6kMp7I74rR2rKo&type=video&part=snippet&maxResults=15&q=' + query + '&pageToken=' + nextpage;
        var videos = void 0;

        xhr.open('GET', url, true);
        xhr.send();

        xhr.onload = function () {
            nextpage = JSON.parse(this.responseText).nextPageToken;
            videos = JSON.parse(this.responseText)['items'];

            videos.forEach(function (element, i) {
                var statURL = 'https://www.googleapis.com/youtube/v3/videos?&key=AIzaSyBa96CkSQ_MX9YAMwFk-6kMp7I74rR2rKo&id=' + element.id.videoId + '&part=snippet,statistics';
                var statisticXHR = new XHR();

                statisticXHR.open('GET', statURL, true);
                statisticXHR.send();

                var video = {
                    href: 'https://www.youtube.com/watch?v=' + element.id.videoId,
                    hrefTag: element.snippet.title,
                    imgSrc: element.snippet.thumbnails.medium.url,
                    person: element.snippet.channelTitle,
                    date: element.snippet.publishedAt.substring(0, 10),
                    views: 0,
                    text: element.snippet.description
                };

                statisticXHR.onload = function () {
                    var statistic = JSON.parse(this.responseText)['items'];

                    try {
                        video.views = statistic[0].statistics.viewCount;
                    } catch (e) {}

                    var videoView = new Video(video);

                    resizer.calculate(i);
                };
            });
        };

        xhr.onerror = function () {
            console.log('Status ' + this.staus);
        };
    }
    return {
        loadVideos: loadVideos
    };
}

module.exports = Request;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function Search(callback) {
    var search = document.querySelector('.search');
    search.addEventListener('keyup', function (event) {
        if (event.keyCode == 13) {
            document.querySelector('.videos').innerHTML = "";
            document.querySelector('footer').innerHTML = "";
            callback.call(this, search.value);
        }
    });
}

module.exports = Search;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Creator = __webpack_require__(2);
var Search = __webpack_require__(4);
var Request = __webpack_require__(3);
var Swipe = __webpack_require__(1);
var Resize = __webpack_require__(0);

var req = new Request();
var creator = new Creator();
var resizer = new Resize();

resizer.listen();

var swipe = new Swipe(req.loadVideos);
var search = new Search(req.loadVideos);

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Page = __webpack_require__(7);

function Change(count) {
    var pages = document.querySelectorAll('.page');
    var footer = document.querySelector('footer');
    var page = void 0;
    if (pages.length < count) while (pages.length < count) {
        var p = new Page(pages.length);
        document.querySelector('footer').innerHTML += p.template;
        pages = document.querySelectorAll('.page');
    } else if (pages.length > count) while (pages.length > count) {
        page = document.querySelector('.page[data-number="' + (pages.length - 1) + '"]');
        footer.removeChild(page);
        pages = document.querySelectorAll('.page');
    }
}

module.exports = Change;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function Page(number) {
    this.template = '<a href="#" class="page animated fadeInUp" style="display: inline-block;" data-number="' + number + '">' + (number + 1) + '</a>';
}

module.exports = Page;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function Video(obj) {
    var inner = '<li class="video animated pulse"><div class="video-preview"><a href="' + obj.href + '" class="name">' + obj.hrefTag + '</a><img src="' + obj.imgSrc + '"></div><div class="video-statistic"><ul class="video-statistic-list"><li><div><i class="fa fa-user"></i>' + obj.person + '</div></li><li><div><i class="fa fa-calendar"></i>' + obj.date + '</div></li><li><div><i class="fa fa-eye"></i>' + obj.views + '</div></li></ul></div><div class="mobile-video-statistic"><ul class="mobile-video-statistic-list"><li>' + obj.person + '</li><li>' + obj.date + '</li><li>' + obj.views + '</li></ul></div>';
    if (obj.text != "") inner += '<div class="video-description">' + obj.text + '</div></li>';else inner += '<div class="video-description">No description</div></li>';
    document.querySelector('.videos').innerHTML += inner;
}

module.exports = Video;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map