import { Stopwatch } from './stopwatch';
import { Card } from './card';
import { Game } from './game';

export class Field{ //класс Поле отвечает за передачу карточкам значений и проверку карт на совпадения
    constructor(fld_width, fld_height) {
        this.active_cards = fld_width * fld_height; //количество карт на столе
        this.card_to_compare; //уже открытая карта
        this.stopwatch = new Stopwatch(); //таймер
    }
    fill_cells(cards_elements) { //заполняем "ячейки" поля значениями
        let values = this.generate_vals();
        let cells = [];
        values.forEach((item, i) => {
            cells[i] = new Card(item, cards_elements[i]); //в ячейку поля записывается Карта с
            cards_elements[i].onclick = () => { //уникальным значением и собственным элементом в DOM
                Game.count_clicks(); //подсчет кликов
                this.compare(cells[i]); //сравнивание открытых карт
            };
        });
    }
    generate_vals() {
        let vals = [];
        for (let i = 0; i < this.active_cards; i++)
            vals[i] = Math.floor(i / 2); //заполняем массив парными значениями
        vals.sort(() => Math.random() - 0.5); //рандомим их
        return vals;
    }

    compare(card) {
        if (this.card_to_compare === undefined) { //если раньше ни одна карта не была открыта
            this.card_to_compare = card; //записываем открытую в буфер
            card.show_me(); //показываем ее
        } else {
            if (this.card_to_compare.value === card.value && this.card_to_compare != card) { //если значения совпали
                card.show_remove(true); //показываем и убираем карту
                this.active_cards -= 2; //уменьшаем количество карт на столе
                this.card_to_compare.show_remove(false); //просто убираем карту
            } else {
                if (this.card_to_compare != card) { //если значения не совали
                    card.show_hide(true); //показываем и прячем карту
                    this.card_to_compare.show_hide(false); //просто прячем карту
                } else { //если кликнул сам на себя
                    card.show_hide(false); //просто прячем карту
                }
            }
            this.card_to_compare = undefined; //очищаем буфер
        }
        if (this.active_cards == 0) { //если все карты убраны с поля
            Game.show_winPage(); //показываем поле поздравления
            this.stopwatch.stop();
        }
    }
}
