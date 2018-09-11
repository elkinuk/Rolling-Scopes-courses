class customJQuery {
    constructor(elem) {
        if (typeof elem === 'string') {
              let elements = document.querySelectorAll(elem);
              this.elements = Array.from(elements);
        } else {
            this.elements = [];
            this.elements.push(elem);
        }
        return this;
    }

    addClass(myNewClass) {
        if(typeof myNewClass === 'string'){
            myNewClass = myNewClass.split(' ');
            this.elements.forEach(element=> myNewClass.forEach(className => element.classList.add(className)));
        }
        if(typeof myNewClass === 'function')
            this.elements.forEach((element, index) => $(element).addClass(myNewClass.call(element, index, element.className)));
        return this;
    }

    append(newChild) {
        if (typeof newChild === 'string')
            this.elements.forEach(element => element.innerHTML = newChild);
        else
            this.elements.forEach(element => element.appendChild(newChild.cloneNode(true)));
        return this;
    }

    html(htmlCode) {
        if (!htmlCode)
            return this.elements[0].innerHTML;
        else if (typeof htmlCode === 'string')
            this.elements.forEach(element => element.innerHTML = htmlCode);
        return this;
    }

    attr(par,val) {
        if (val)
            this.elements.forEach(element => element.setAttribute(par,val));
        else
            return this.elements[0].getAttribute(par);
        return this;
    }

    children(className) {
        if (!className)
            return this.elements[0].children;
        else
            return Array.from(this.elements[0].children).filter(element => $(className).elements.indexOf(element) != -1);
    }

    css(cssObj) {
        if (typeof cssObj === 'string')
            return this.elements[0].style[cssObj];
        else if (typeof cssObj === 'object') {
            this.elements.forEach(element => {
                for (let prop in cssObj)
                    element.style[prop] = cssObj[prop];
            });
        }
        return this;
    }

    data(firstArg, secondArg) {
        if (!firstArg)
            return this.elements[0].dataset;
        if (!secondArg) {
            if (typeof firstArg === 'string')
                return this.elements[0].dataset[firstArg];
            if (typeof firstArg === 'object')
                this.elements.forEach(element => {
                    for (let prop in firstArg)
                        element.dataset[prop] = firstArg[prop];
                });
        } else if (typeof secondArg === 'number')
            for (let i = 0; i < arguments.length; i += 2)
                this.elements.forEach(element => element.dataset[arguments[i]] = arguments[i + 1]);
    }

    on(firstArg, secondArg, thirdArg) {
        if (!thirdArg)
            this.elements[0].addEventListener(firstArg, secondArg);
        else
            this.elements[0].addEventListener(firstArg, (e, ...args) => {
                if ($(secondArg).elements.indexOf(e.target) != -1)
                    thirdArg(...args);
            });
    }

    one(firstArg, secondArg) {
        let event = firstArg;
        let callback = secondArg;
        let that = this;

        function click(...args) {
            callback(...args);
            that.elements[0].removeEventListener(event, click);
        }

        this.elements[0].addEventListener(event, click);
    }

    each(callback) {
        let res = this.elements.every((el,i) => {
            if (callback.call(this.elements[i], i, this.elements[i]) === false)
                return false;
            else
                return true;
        });
        return res ? this : res;
    }
}

window.$ = function(selector) {
    return new customJQuery(selector);
};
