function Search(callback) {
    let search = document.querySelector('.search');
    search.addEventListener('keyup',
        function (event) {
            if (event.keyCode == 13) {
                document.querySelector('.videos').innerHTML = "";
                document.querySelector('footer').innerHTML = "";
                callback.call(this, search.value);
            }
        });
}

module.exports = Search;
