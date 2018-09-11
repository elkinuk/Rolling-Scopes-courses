export class Stopwatch {
    constructor(display) {
        this.running = false;
        this.display = display || document.querySelector('.stopwatch');
        this.times = [0, 0, 0];
        this.print(this.times);
    }
    start() {
        if (!this.time) this.time = performance.now();
        if (!this.running) {
            this.running = true;
            requestAnimationFrame(this.step.bind(this));
        }
    }
    stop() {
        this.running = false;
        this.time = null;
    }
    step(timestamp) {
        if (!this.running) return;
        this.calculate(timestamp);
        this.time = timestamp;
        this.print();
        requestAnimationFrame(this.step.bind(this));
    }
    calculate(timestamp) {
        let diff = timestamp - this.time;
        this.times[2] += diff / 10;
        if (this.times[2] >= 100) {
            this.times[1] += 1;
            this.times[2] -= 100;
        }
        if (this.times[1] >= 60) {
            this.times[0] += 1;
            this.times[1] -= 60;
        }
    }
    print() {
        let formated = `\
        ${this.pad0(this.times[0], 2)}:\
        ${this.pad0(this.times[1], 2)}:\
        ${this.pad0(Math.floor(this.times[2]), 2)}`;
        this.display.innerText = formated;
    }
    pad0(value, count) {
        let result = value.toString();
        for (; result.length < count; --count)
            result = '0' + result;
        return result;
    }
}