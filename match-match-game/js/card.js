export class Card {
    constructor(value, dom_el) {
        this.value = value; //значение карточки
        this.dom_el = dom_el; //элемент из DOM, закрепленный за карточкой
    }
    show_me() {
        this.set_class('flipIn');
    }
    show_hide(show) {
        let time;
        if (show) { //если нужно показать и спрятать
            this.set_class('flipInOut');
            time = 2000;
        } else { //если нужно только спрятать
            this.set_class('flipOut');
            time = 1000;
        }
        setTimeout(() => { //таймаут нужен, чтобы дать завершиться перевороту
            this.dom_el.className = 'card move';
        }, time);
    }
    show_remove(show) {
        let css_class;
        if (show) this.set_class('showAndRemove'); //если нужно показать и удалить
        else this.set_class('getOut'); //если нужно только удалить
        this.dom_el.onclick = () => {};
    }
    set_class(css_class) {
        this.dom_el.style.animationDelay = ''; //уберем рандомность для постоянного движения карт
        this.dom_el.className = 'card ' + css_class + ' card_' + this.value;
    }
}