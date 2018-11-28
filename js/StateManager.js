class StateManager {
    constructor() {

        //selectors
        this.stateMessage = document.querySelector('.state-message');
        this.progressContainer = document.querySelector('.progress');
        this.header = document.querySelector('header');

        //variables
        this.stateArray;
        this.state = new State('ready'); // ready, go, rest, longRest 
        this.progress = 0;
        this.pastStateArray = [];

        //colors
        this.readyColor = 'rgba(29, 158, 255, 0.8)';
        this.goColor = 'rgba(95, 207, 128, 0.8)';
        this.restColor = 'rgba(252, 136, 126, 0.8)';
        this.longRestColor = 'rgba(252, 136, 126, 1)';
        this.finishColor = '#5b5b5b';

        //init
        //        this.render('ready');
        this.createStateArray(12);
    }

    /**
     * Creates an array of states that are going to be played once the app is started.
     * @param {number} targetSessions - The number of sessions targeted.
     * @return null 
     */
    createStateArray(targetSessions) {
        this.stateArray = [];
        for (let i = 1; i <= targetSessions; i++) {
            if (i == targetSessions) this.stateArray.push(new State('go', pomoSetting.sessionLength), new State('finish'));
            else if (i % 4 != 0) this.stateArray.push(new State('go', pomoSetting.sessionLength), new State('rest', pomoSetting.restLength));
            else this.stateArray.push(new State('go', pomoSetting.sessionLength), new State('longRest', pomoSetting.longRestLength));
        }
        console.log('this is the state array created:', this.stateArray);
    }

    /**
     * Pushes a new state at the end
     * @param {string} state - The state to push to the state array.
     * @return null 
     */
    addState(state) {
        this.stateArray.push(state);
    }

    /**
     * Deletes the state at the end of the state array.
     * @return null 
     */
    deleteState() {
        this.stateArray.pop();
    }

    /**
     * Deletes everything in the state array.
     * @return null 
     */
    resetArray() {
        this.stateArray = [];
    }

    /**
     * Proceeds to next state, and increase progress by 1.
     * Calls the method render().
     * Saves the past states into an array for later reference.
     * @return null 
     */
    toNextState() {
        if (this.progress != 0 && pomoController.playAlarm == true) pomoSound.playDing();
        this.state = this.stateArray.shift();
        this.pastStateArray.push(this.state);
        if (this.state.name == 'go') this.progress++;
        this.render(this.state);
        console.log('this is after toNextState() is run', this.stateArray);
    }

    /**
     * Returns to previous state, and decrease progress by 1.
     * Calls the method render().
     * Takes care of the progress count.
     * @return null 
     */
    toPrevState() {
        this.progress--;
        //if current state is the first one, go back to ready state
        if (this.pastStateArray.length <= 1) {
            this.stateArray.unshift(this.state);
            this.state = new State('ready');
            this.render(this.state);
        } else {
            //get the last two elements from the past state array, and delete them.
            console.log('this is the past array before splice', JSON.parse(JSON.stringify(this.pastStateArray)));
            let prevStates = this.pastStateArray.splice(-2, 2);
            console.log('this is the past array after splice', JSON.parse(JSON.stringify(this.pastStateArray)));
            //add this element to the beginning of the state array.

            console.log('this is the prevStates', ...prevStates);
            this.stateArray.unshift(...prevStates);
            //call toNextState()

            console.log('this is the restored state array', JSON.parse(JSON.stringify(this.stateArray)));
            this.toNextState();
        }
    }

    /**
     * Returns to the start of the whole state array sequence.
     * @return null 
     */
    resetAllStates() {
        console.log(this.pastStateArray);
        this.stateArray = this.pastStateArray;
        this.pastStateArray = [];
        this.render(new State('ready'));
    }


    /**
     * Updates the state message.
     * @param {string} message - message to show
     * @return null 
     */
    updateStateMessage(message) {
        if (message === 'longRest') {
            this.stateMessage.textContent = 'LONG REST';
        } else this.stateMessage.textContent = message.toUpperCase();
    }


    /**
     * Updates the progress message.
     * @return null 
     */
    updateProgressMessage() {
        let target = pomoSetting.targetSessionNumber;

        //targetSessionNumber == 1000 means that the user set the sessions to repeat forever. So, hide the total number of sessions

        if (target == 1000) {

            if (this.progress == 0) {
                this.progressContainer.textContent = `- ${this.progress+1} -`;
            } else {
                this.progressContainer.textContent = `- ${this.progress} -`;
            }
        } else {
            if (this.progress == 0) {
                this.progressContainer.textContent = `- ${this.progress+1}/${target} -`;
            } else {
                this.progressContainer.textContent = `- ${this.progress}/${target} -`;
            }
        }
    }



    /**
     * Performs series of actions related to the current state
     * Sets the timer, changes background color, updates state message and progress, manages buttons.
     * @param {string} state - current state
     * @return null 
     */
    render(state) {
        switch (state.name) {
            case 'ready':
                this.progress = 0;
                pomoTimer.stop();
                pomoTimer.set(this.stateArray[0].length, 0);
                pomoTimer.render();
                this.header.style.background = this.readyColor;
                pomoController.render('ready');
                break;

            case 'go':
                pomoTimer.set(state.length, 0);
                this.header.style.background = this.goColor;
                break;

            case 'rest':
                pomoTimer.set(state.length, 0);
                this.header.style.background = this.restColor;
                break;

            case 'longRest':
                pomoTimer.set(state.length, 0);
                this.header.style.background = this.longRestColor;
                break;

            case 'finish':
                this.header.style.background = this.finishColor;
                pomoTimer.stop();
                pomoController.render('finish');
                break;
        }
        this.updateStateMessage(state.name);
        this.updateProgressMessage();
    }
}
