class Timer {
    constructor() {
        this.minuteContainer = document.querySelector('.minute'); //Timer
        this.secondContainer = document.querySelector('.second'); //Timer
        this.minute; //Timer
        this.second; //Timer
        this.stopID; //Timer
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
    }

    /** 
     * Starts the timer. 
     * Calls the State object's manage() method when the timer hits 0.
     * @return null
     */
    start() {
        if (pomoState.state == 'ready') {
            pomoState.state = 'go';
            pomoState.changeState();
        }
        this.stopID = setInterval(() => {
            if (this.second === 0) { //When second hits 0
                if (this.minute === 0) { // When timer hits 0, call State object.
                    pomoState.manage()
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
     * Updates and displays the timer.
     * @return null
     */
    render() { // I think some of this part should be part of the page object.
        if (this.minute < 10) {
            this.minuteContainer.textContent = '0' + this.minute;
            pomoPage.titleText = '0' + this.minute
        } else {
            this.minuteContainer.textContent = this.minute;
            pomoPage.titleText = String(this.minute);
        }
        pomoPage.titleText += ':';
        if (this.second < 10) {
            this.secondContainer.textContent = '0' + this.second;
            pomoPage.titleText += '0' + this.second;
        } else {
            this.secondContainer.textContent = this.second;
            pomoPage.titleText += String(this.second);
        }
        pomoPage.titleText += " " + pomoState.toUpperCase();
        pomoPage.title.text = pomoPage.titleText;
    }

}
