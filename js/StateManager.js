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
     * Calls the method activateState().
     * @return null 
     */
    toNextState() {
        if (this.progress != 0) pomoSound.bell.play();
        this.state = this.stateArray.shift();
        if (this.state.name == 'go') this.progress++;
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
        if (this.progress == 0) this.progressContainer.textContent = `- ${this.progress+1}/${pomoSetting.targetSessionNumber} -`;
        else if (pomoSetting.targetSessionNumber == 1000) this.progressContainer.textContent = `- ${this.progress} -`; //targetSessionNumber == 1000 means that the user set the sessions to repeat forever. So, hide the total number of sessions
        else this.progressContainer.textContent = `- ${this.progress}/${pomoSetting.targetSessionNumber} -`;
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
