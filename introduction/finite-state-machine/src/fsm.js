class FSM {
    constructor(config) {
        if (config == null)
            throw new Error("Config isn\'t passed!"); 
        else {
            this.configuration = config;
            this.transitionHistory = [];
            this.currentStateIndex = 0;
            this.currentState = this.configuration.initial;
            this.addEvent();
            this.lockRedo = false;
        }
    }

    getState() {
        return this.currentState;
    }

    changeState(state) {
        if (state == null)
            throw new Error("State isn\'t exist!");
        else {
            var existingStates = this.getStates();

            var flag = 0;

            for (var i = 0; i < existingStates.length; i++)
                if (state == existingStates[i]) {
                    flag = 1;
                    break;
                }

            if (flag == 0)
                throw new Error("State isn\'t exist!");
            else {
                this.currentState = state;
                this.addEvent();
            }

            this.lockRedo = true;
        }
    }

    trigger(event) {
        var states = this.getStates(), i = 0, existingEvents = new Array(), j = 0;

        for (var stt in this.configuration.states) {
            states[i] = stt;
            existingEvents[i] = new Array();
            for (var evt in this.configuration.states[states[i]].transitions) {
                existingEvents[i][j] = evt;
                j++;
            } 

            i++;
            j = 0;
        }

        var flag = 0;

        for (var l = 0; l < i; l++) 
            for (var k = 0; k < existingEvents[l].length; k++)
                if (event == existingEvents[l][k]) {
                    flag = 1;
                    break;
                }

        if (flag == 0)
            throw new Error("Event isn\'t exist!");
        else 
            switch (this.currentState) {
                case states[0]: 
                    if (event == existingEvents[0][0]) {
                        this.currentState = states[1];
                        this.addEvent();
                        this.lockRedo = true;
                        break;
                    } else
                        throw new Error("Event is invalid!");                    
                    break;
                case states[1]:
                    if (event == existingEvents[1][0]) {
                        this.currentState = states[3];
                        this.addEvent();
                        this.lockRedo = true;
                        break;
                    } else if (event == existingEvents[1][1]) {
                        this.currentState = states[2];
                        this.addEvent();
                        this.lockRedo = true;
                        break;
                    } else
                        throw new Error("Event is invalid!"); 
                    break;
                case states[2]:
                    if (event == existingEvents[2][0]) {
                        this.currentState = states[0];
                        this.addEvent();
                        this.lockRedo = true;
                        break;
                    } else
                        throw new Error("Event is invalid!"); 
                    break;
                case states[3]:
                    if (event == existingEvents[3][1]) {
                        this.currentState = states[0];
                        this.addEvent();
                        this.lockRedo = true;
                        break;
                    } else if (event == existingEvents[3][0]) {
                        this.currentState = states[2];
                        this.addEvent();
                        this.lockRedo = true;
                        break;
                    } else
                        throw new Error("Event is invalid!"); 
                    break;
                default:
                    break;
            }
    }

    reset() {
        this.currentState = this.configuration.initial;
    }

    getStates(event) {
        if (event == null) {
            var existingStates = [], i = 0;

            for (var stt in this.configuration.states) {
                existingStates[i] = stt;
                i++;
            }

            return existingStates;
        } else { 
            var existingStates = [], i = 0, existingEvents = new Array(), j = 0;;

            for (var stt in this.configuration.states) {
                existingStates[i] = stt;
                existingEvents[i] = new Array();
                for (var evt in this.configuration.states[existingStates[i]].transitions) {
                    existingEvents[i][j] = evt;
                    j++;
                } 

                i++;
                j = 0;
            }

            var flag = 0;

            for (var l = 0; l < i; l++) 
                for (var k = 0; k < existingEvents[l].length; k++)
                    if (event == existingEvents[l][k]) {
                        flag = 1;
                        break;
                    }

            if (flag == 0)
                return [];
            else {
                var states = [];

                for (var k = 0; k < i; k++)
                    for (var l = 0; l < existingEvents[l].length; l++) 
                        if (existingEvents[k][l] == event) 
                            states.push(existingStates[k])

                return states;                        
            } 
        }
    }

    undo() {
        if (this.currentStateIndex > 1) {
            this.currentStateIndex -= 2;
            this.currentState = this.transitionHistory[this.currentStateIndex];
            this.currentStateIndex++;
            this.lockRedo = false;
            return true;
        } else
            return false;
    }

    redo() {
        if (this.currentStateIndex < this.transitionHistory.length && !this.lockRedo) {
            this.currentState = this.transitionHistory[this.currentStateIndex];
            this.currentStateIndex++;
            return true;
        } else 
            return false;
    }

    clearHistory() {
        this.transitionHistory = [];
        this.currentStateIndex = 0;
    }

    addEvent() {
        this.transitionHistory.push(this.currentState);
        this.currentStateIndex++;
    }
}

module.exports = FSM;
