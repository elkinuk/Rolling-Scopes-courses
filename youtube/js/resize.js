let page = require('./page');
let Swipe = require('./swipe');

function pagesCalculate(count, length) {
    let number = length / count;

    if (number ^ 0 == number) 
        return number;
    else 
        return parseInt(number.toFixed(0));
}

function ResizeCalculator() {
    this.count = 0;
}

ResizeCalculator.prototype.calculate = function(i) {
    let swipe = new Swipe();
    let video = document.querySelectorAll('.video');
    let length = video.length;
    let pages = document.querySelectorAll('.page');
    let videos =  document.querySelector('.videos');

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
