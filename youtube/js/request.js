let Video = require('./video');
let Resizer = require('./resize');

function Request() {
    let XHR = XMLHttpRequest;
    let nextpage = '';
    let saveQ = '';
    let resizer = new Resizer();

    function loadVideos(query) {
        if (query == '')
            query = saveQ;
        else
            saveQ = query;

        let xhr = new XHR();
        let url = 'https://www.googleapis.com/youtube/v3/search?key=AIzaSyBa96CkSQ_MX9YAMwFk-6kMp7I74rR2rKo&type=video&part=snippet&maxResults=15&q='+query+'&pageToken=' + nextpage;
        let videos;

        xhr.open('GET', url, true);
        xhr.send();

        xhr.onload = function () {
            nextpage = JSON.parse(this.responseText).nextPageToken;
            videos = JSON.parse(this.responseText)['items'];

            videos.forEach(function (element, i) {
                let statURL = 'https://www.googleapis.com/youtube/v3/videos?&key=AIzaSyBa96CkSQ_MX9YAMwFk-6kMp7I74rR2rKo&id=' + element.id.videoId + '&part=snippet,statistics';
                let statisticXHR = new XHR();

                statisticXHR.open('GET', statURL, true);
                statisticXHR.send();

                let video = {
                    href: 'https://www.youtube.com/watch?v=' + element.id.videoId,
                    hrefTag: element.snippet.title,
                    imgSrc: element.snippet.thumbnails.medium.url,
                    person: element.snippet.channelTitle,
                    date: element.snippet.publishedAt.substring(0, 10),
                    views: 0,
                    text: element.snippet.description
                };

                statisticXHR.onload = function () {
                    let statistic = JSON.parse(this.responseText)['items'];

                    try {
                        video.views = statistic[0].statistics.viewCount;
                    } catch(e) { }

                    let videoView = new Video(video);

                    resizer.calculate(i);
                }
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
