function Creator() {
    document.querySelector('body').innerHTML = '<header><i class="fa fa-search fa-3x bounceInLeft animated"></i><input placeholder="Search..." class="search bounceInLeft animated" type="search"><h1>You<span class="red">Tube</span> <span class="black">Player</span></h1></header><main><ul class="videos"></ul></main><footer></footer>';
}

module.exports = Creator;
