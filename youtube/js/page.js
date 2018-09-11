let Page = require('./paging');

function Change(count) {
    let pages = document.querySelectorAll('.page');
    let footer = document.querySelector('footer');
    let page;
    if (pages.length < count) 
        while (pages.length < count) {
            let p = new Page(pages.length);
            document.querySelector('footer').innerHTML += p.template;
            pages = document.querySelectorAll('.page');
        }
    else if (pages.length > count) 
        while (pages.length > count) {
            page = document.querySelector('.page[data-number="' + (pages.length - 1) + '"]');
            footer.removeChild(page);
            pages = document.querySelectorAll('.page');
        }
}

module.exports = Change;
