class Controller {
    constructor() {
        this.buttonContainer = document.querySelector('.button-container');
        this.playState = 'ready';


        //-------------- Dynamically created Elements ------------------------
        this.playButton = document.createElement('img'); //Button
        this.playButton.className = 'play-button pointer';
        this.playButton.src = 'img/play.png';
        this.playButton.alt = 'play button';

        this.pauseButton = document.createElement('img'); //Button
        this.pauseButton.className = 'pause-button pointer';
        this.pauseButton.src = 'img/pause.png';
        this.pauseButton.alt = 'pause button';

        this.resetButton = document.createElement('img'); //Button
        this.resetButton.className = 'reset-button pointer';
        this.resetButton.src = 'img/reset.png';
        this.resetButton.alt = 'reset button';

        this.resetAllButton = document.createElement('img'); //Button
        this.resetAllButton.className = 'reset-all-button pointer';
        this.resetAllButton.src = 'img/reset.png';
        this.resetAllButton.alt = 'reset-all-button';

    }

    /**
     * Creates an array of states that are going to be played once the app is started.
     * @param {number} targetSessions - The number of sessions targeted.
     * @return null 
     */
    buttonClear() { // clear all buttons from the buttonContainer
        while (this.buttonContainer.firstElementChild) {
            this.buttonContainer.removeChild(this.buttonContainer.firstElementChild);
        }
    }

    /**
     * Creates all the event listeners for the buttons.
     * @return null 
     */
    createEventListeners() {

        this.playButton.addEventListener('click', () => {
            this.render('play');
        });

        this.pauseButton.addEventListener('click', () => {
            this.render('pause');
        });

        this.resetButton.addEventListener('click', () => {
            this.render('reset');
        });

        document.addEventListener('keypress', function (event) {
            this.handleKeyboardShortCuts(event);
        });
    }

    /**
     * 'SPACE' for toggle between play and stop.
     * 'S' key for opening/closing the setting window
     * 'R' key for resetting the timer and it is paused.
     * @param {event} event - event from 'keypress'
     * @return null 
     */
    handleKeyboardShortCuts(event) {
        switch (event.key.toLowerCase()) {
            case ' ':
                if (this.playState == 'pause' || this.playState == 'ready') this.render('play');
                else this.render('pause');
                break;

            case 's':
                pomoSetting.settingsButton.click();
                break;

            case 'r':
                if (this.playState == 'pause') this.render('reset');
                break;
        }
    }


    /**
     * Performs series of actions related to the current playState
     * updates the playState variable to the current playState.
     * Renders appropriate button set for each case.
     * @param {string} playState - current play state
     * @return null 
     */
    render(playState) {

        this.playState = playState;

        switch (playState) {
            case 'ready':
                this.buttonClear();
                this.buttonContainer.appendChild(this.playButton);
                break;

            case 'play':
                pomoTimer.start();
                this.buttonClear();
                this.buttonContainer.appendChild(this.pauseButton);
                break;

            case 'pause':
                pomoTimer.stop();
                this.buttonClear();
                this.buttonContainer.appendChild(this.playButton);
                this.buttonContainer.appendChild(this.resetButton);
                break;

            case 'finish':
                this.buttonClear();
                this.buttonContainer.appendChild(this.resetAllButton);
                break;

            case 'reset':
                pomoState.render(pomoState.state);
                this.buttonClear();
                this.buttonContainer.appendChild(this.playButton);
                break;
        }
    }



    /**
     * Creates an array of states that are going to be played once the app is started.
     * @param {number} targetSessions - The number of sessions targeted.
     * @return null 
     */









    /**
     * Creates an array of states that are going to be played once the app is started.
     * @param {number} targetSessions - The number of sessions targeted.
     * @return null 
     */


    // take care of buttons, 



}
