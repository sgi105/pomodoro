class State {
    constructor() {

        //selectors
        this.stateMessage = document.querySelector('.state-message');
        this.progressContainer = document.querySelector('.progress');
        this.header = document.querySelector('header');

        //variables
        this.stateArray = [];
        this.state = 'ready'; // ready, go, rest, longRest 
        this.playState = 'stop';
        this.progress = 0;

        //colors
        this.readyColor = 'rgba(29, 158, 255, 0.8)';
        this.goColor = 'rgba(95, 207, 128, 0.8)';
        this.restColor = 'rgba(252, 136, 126, 0.8)';
        this.longRestColor = 'rgba(252, 136, 126, 1)';
        this.finishColor = '#5b5b5b';
    }

    /**
     * Creates an array of states that are going to be played once the app is started.
     * @param {number} targetSessions - The number of sessions targeted.
     * @return null 
     */
    createStateArray(targetSessions) {
        this.stateArray = [];
        for (let i = 1; i <= targetSessions; i++) {
            if (i === targetSessions) this.stateArray.push('go', 'finish');
            else if (i % 4 !== 0) this.stateArray.push('go', 'rest');
            else this.stateArray.push('go', 'longRest');
        }
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
     * Calls the method activateState().
     * @return null 
     */
    toNextState() {
        this.state = this.stateArray.shift();
        this.progress++;
        this.render(this.state);
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
        if (pomoSetting.targetSessionNumber == 1000) this.progressContainer.textContent = `- ${this.progress+1} -`; //targetSessionNumber == 1000 means that the user set the sessions to repeat forever. So, hide the total number of sessions
        else this.progressContainer.textContent = `- ${this.progress}/${pomoSetting.targetSessionNumber} -`;
    }



    /**
     * Performs series of actions related to the current state
     * Sets the timer, changes background color, updates state message and progress, manages buttons.
     * @param {string} state - current state
     * @return null 
     */
    render(state) {
        this.updateStateMessage(state);
        this.updateProgressMessage();

        switch (state) {
            case 'ready':
                pomoTimer.set(pomoSetting.sessionLength, 0);
                this.header.style.background = this.readyColor;
                pomoButton.render('ready');
                break;

            case 'go':
                pomoTimer.set(pomoSetting.sessionLength, 0);
                this.header.style.background = this.goColor;
                break;

            case 'rest':
                pomoTimer.set(pomoSetting.restLength, 0);
                this.header.style.background = this.restColor;
                break;

            case 'longRest':
                pomoTimer.set(pomoSetting.longRestLength, 0);
                this.header.style.background = this.longRestColor;
                break;

            case 'finish':
                this.header.style.background = this.finishColor;
                pomoButton.render('finish');
                break;
        }
    }
}
