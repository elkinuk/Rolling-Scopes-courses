function Page(number) {
    this.template = '<a href="#" class="page animated fadeInUp" style="display: inline-block;" data-number="' + number + '">' + (number + 1) + '</a>';
}

module.exports = Page;
