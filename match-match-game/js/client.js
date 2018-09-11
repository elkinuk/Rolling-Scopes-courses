let http = require('http');

import { Game } from './game';

function main() {
    let game = new Game();
    game.start();
    document.getElementById('startBtn').onclick = () => {
        game.field.stopwatch.start();
    }
    document.getElementById('menuBtn').onclick = () => {
        game.field.stopwatch.stop();
    }
}

document.addEventListener('DOMContentLoaded', main);
