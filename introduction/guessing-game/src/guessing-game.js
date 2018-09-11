class GuessingGame {
    constructor() {
	    this.max = 0;
        this.min = 0;
    }

    setRange(min, max) {
		this.max = max;
        this.min = min;
    }

    guess() {
		return this.max - Math.floor((this.max - this.min) / 2);
    }

    lower() {
		this.max = Math.round((this.max - this.min) / 2) + this.min;
    }

    greater() {
		this.min = Math.round((this.max - this.min) / 2) + this.min;
    }
}

module.exports = GuessingGame;
