class Timer {
    constructor() {
        this.minuteContainer = document.querySelector('.minute');
        this.secondContainer = document.querySelector('.second');
        this.minute;
        this.second;
        this.stopID;
        this.title = document.querySelector('title');
        this.titleText;
    }


    /**
     * Sets the timer to the given value.
     * @param {number} min - The minute value.
     * @param {number} sec - The second value.
     * @return null
     */
    set(min, sec) {
        this.minute = min;
        this.second = sec;
        this.render();
    }

    /** 
     * Starts the timer. 
     * Calls the State object's manage() method when the timer hits 0.
     * @return null
     */
    start() {
        if (pomoStateManager.state.name == 'ready') {
            pomoStateManager.toNextState();
        }
        this.stopID = setInterval(() => {
            if (this.second === 0) { //When second hits 0
                if (this.minute === 0) { // When timer hits 0, call State object.
                    pomoStateManager.toNextState();
                } else { // when this.second hits 0, decrease this.minute by 1
                    this.minute--;
                    this.second = 59;
                }
            } else this.second--; // when this.second is not 0, decrease this.second by 1
            this.render();
        }, 1000);
    };

    /** 
     * Stops the timer.
     * @return null
     */
    stop() {
        clearInterval(this.stopID);
    };

    /** 
     * Updates and displays the timer. Both on the screen, and on the title bar.
     * @return null
     */
    render() {
        if (this.minute < 10) {
            this.minuteContainer.textContent = '0' + this.minute;
            this.titleText = '0' + this.minute
        } else {
            this.minuteContainer.textContent = this.minute;
            this.titleText = String(this.minute);
        }
        this.titleText += ':';
        if (this.second < 10) {
            this.secondContainer.textContent = '0' + this.second;
            this.titleText += '0' + this.second;
        } else {
            this.secondContainer.textContent = this.second;
            this.titleText += String(this.second);
        }
        this.titleText += " " + pomoStateManager.state.name.toUpperCase();
        this.title.text = this.titleText;
    }

}
