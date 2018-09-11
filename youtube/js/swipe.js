function Swipe(callback) {
    this.callback = callback;
    this.videos = document.querySelector('.videos');

    if (callback != undefined) {
        let active = document.querySelector('.active'), pageNumber;
        if (active == null) 
            pageNumber = 0;
        else 
            pageNumber = active.dataset.number;

        this.activatePage(pageNumber);
        this.videos.addEventListener("mousedown", this.clickHandler.bind(this), false);
        this.videos.addEventListener("touchstart", this.clickHandler.bind(this), false);

        document.querySelector('footer').addEventListener('click', function (event) {
            let pages = document.querySelectorAll('.page');
            let number = event.target.dataset.number;
            if (number != undefined) {
                this.swipe(number);
                if (parseInt(number) === (pages.length - 1) || parseInt(number) === (pages.length - 2)) 
                    this.callback.call(this, '');
            }
        }.bind(this));

        window.addEventListener('resize', function () {
            let active = document.querySelector('.active'), pageNumber;
            if (active == null) 
                pageNumber = 0;
            else 
                pageNumber = active.dataset.number;
            
            let pages = document.querySelectorAll('.page'),
                videos = document.querySelector('.videos'),
                trans = document.body.clientWidth * pageNumber;
            videos.style.transition = "transform 0.0s";
            videos.style.transform = "translate3D(-" + trans + "px, 0px, 0px)";
            if (active === null) 
                this.swipe(pages.length - 1);
        }.bind(this));
    }
}

Swipe.prototype.activatePage = function (number) {
    let pages = document.querySelectorAll('.page');
    for (let i = 0; i < pages.length; i++) 
        if (i == number) 
            pages[i].classList.add('active');
         else 
            pages[i].classList.remove('active');
};

Swipe.prototype.clickHandler = function (event) {
    let active = document.querySelector('.active'), pageNumber;

    if (active == null) 
        pageNumber = 0;
    else 
        pageNumber = active.dataset.number;
    
    let videos = document.querySelector('.videos');
    let trans = document.body.clientWidth * pageNumber;
    let shiftX;

    if (event.changedTouches == undefined) 
        shiftX = event.pageX;
    else 
        shiftX = event.changedTouches[0].pageX;
    
    videos.style.transition = "transform 0s"

    function clickMoveAt(event) {
        let pageX;

        if (event.changedTouches == undefined) 
            pageX = event.pageX;
        else 
            pageX = event.changedTouches[0].pageX;
        
        videos.style.transform = "translate3D(" + (-trans + pageX - shiftX) + "px, 0px, 0px)";
    }

    document.addEventListener('mousemove', clickMoveAt);
    document.addEventListener('touchmove', clickMoveAt);

    let activatePage = this.activatePage,
        callback = this.callback;

    function endHandler(event) {
        let active = document.querySelector('.active'), pageNumber;

        if (active == null) 
            pageNumber = 0;
        else 
            pageNumber = active.dataset.number;
        

        let videos = document.querySelector('.videos');
        let pages = document.querySelectorAll('.page');
        let pageX;

        if (event.changedTouches == undefined) 
            pageX = event.pageX;
        else 
            pageX = event.changedTouches[0].pageX;
        
        document.removeEventListener('mousemove', clickMoveAt);
        document.removeEventListener('touchmove', clickMoveAt);

        videos.style.transition = "transform 0.5s";

        if (pageX < shiftX && pageNumber != (pages.length - 3) && pageNumber != (pages.length - 1)) 
            pageNumber++;
        else if (pageX > shiftX && pageNumber != '0') 
            pageNumber--;
        else if (parseInt(pageNumber) === pages.length - 3) {
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
    let videos = document.querySelector('.videos'), trans = 0;
    this.activatePage(number);
    videos.style.transition = "transform 0.8s";
    trans = document.body.clientWidth * number;
    videos.style.transform = "translate3D(-" + trans + "px, 0px, 0px)";
};

module.exports = Swipe;
