function Video(obj) {
    let inner = '<li class="video animated pulse"><div class="video-preview"><a href="' + obj.href + '" class="name">' + obj.hrefTag + '</a><img src="' + obj.imgSrc + '"></div><div class="video-statistic"><ul class="video-statistic-list"><li><div><i class="fa fa-user"></i>' + obj.person + '</div></li><li><div><i class="fa fa-calendar"></i>' + obj.date + '</div></li><li><div><i class="fa fa-eye"></i>' + obj.views + '</div></li></ul></div><div class="mobile-video-statistic"><ul class="mobile-video-statistic-list"><li>' + obj.person + '</li><li>' + obj.date + '</li><li>' + obj.views + '</li></ul></div>';
    if(obj.text != "")
        inner += '<div class="video-description">' + obj.text + '</div></li>';
    else
        inner += '<div class="video-description">No description</div></li>';
    document.querySelector('.videos').innerHTML += inner;
}

module.exports = Video;
