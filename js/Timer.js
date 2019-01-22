class Timer {
    constructor() {
        this.minuteContainer = document.querySelector('.minute');
        this.secondContainer = document.querySelector('.second');
        this.minute;
        this.second;
        this.stopID;
        this.title = document.querySelector('title');
        this.titleText;


        this.totalHourContainer = document.querySelector('.totalHour');
        this.totalMinuteContainer = document.querySelector('.totalMinute');
        this.totalSecondContainer = document.querySelector('.totalSecond');
        this.totalHour;
        this.totalMinute;

    }

    /**
     * Initializes the total timer. Converts minutes into hours : minute format.
     * @param {number} mins - total session length in minutes.
     * @return null
     */
    setTotalTime(min) {
        this.totalHour = Math.floor(min / 60);
        this.totalMinute = min - Math.floor(min / 60) * 60;
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

                //                if (this.totalMinute === 0) { // When total minute is also 0
                //                    if (this.totalHour === 0) this.stop(); // When hour is also 0, stop the timer.
                //                    else this.totalHour--; // else reduce this.totalHour by 1
                //                } else { // when this.second hits 0, decrease this.totalMinute by 1
                //                    this.totalMinute--;
                //                }

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


        if (pomoStateManager.state.name == 'ready') this.setTotalTime(pomoStateManager.getTotalTime(pomoStateManager.stateArray));
        else this.setTotalTime(pomoStateManager.getTotalTime(pomoStateManager.stateArray) + this.minute);


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

        //totalTimer rendering

        if (this.totalHour < 10) {
            this.totalHourContainer.textContent = '0' + this.totalHour;
        } else {
            this.totalHourContainer.textContent = this.totalHour;
        }

        if (this.totalMinute < 10) {
            this.totalMinuteContainer.textContent = '0' + this.totalMinute;
        } else {
            this.totalMinuteContainer.textContent = this.totalMinute;
        }

        if (this.second < 10) {
            this.totalSecondContainer.textContent = '0' + this.second;
        } else {
            this.totalSecondContainer.textContent = this.second;
        }


    }

}
