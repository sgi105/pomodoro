const title = document.querySelector('title');
const header = document.querySelector('header');
const stateMessage = document.querySelector('.state-message');
const menuButton = document.querySelector('.menu-icon');
const settingsButton = document.querySelector('.settings-icon');
const minuteContainer = document.querySelector('.minute');
const secondContainer = document.querySelector('.second');
const buttonContainer = document.querySelector('.button-container');
const progressContainer = document.querySelector('.progress');
const form = document.querySelector('form');
const formXButton = document.querySelector('.form-x-button');
const formOKButton = document.querySelector('.form-ok-button');
var state = 'ready'; // ready, go, rest, longRest
var sessionLength = 25;
var restLength = 5;
var longRestLength = 15;
var targetSessionNumber = 12;
var progress;
var minute;
var second;
var stopID;
var titleText;


//-------------- Dynamically created Elements ------------------------
const playButton = document.createElement('img');
playButton.className = 'play-button pointer';
playButton.src = 'img/play.png';
playButton.alt = 'play button';
const pauseButton = document.createElement('img');
pauseButton.className = 'pause-button pointer';
pauseButton.src = 'img/pause.png';
pauseButton.alt = 'pause button';
const resetButton = document.createElement('img');
resetButton.className = 'reset-button pointer';
resetButton.src = 'img/reset.png';
resetButton.alt = 'reset button';
const resetAllButton = document.createElement('img');
resetAllButton.className = 'reset-all-button pointer';
resetAllButton.src = 'img/reset.png';
resetAllButton.alt = 'reset-all-button';

var bell = new Audio();
bell.src = "../audio/bell.wav";
bell.volume = 0.5;

//------------ Basic functions --------------------------------------
function display() { // updates and displays the clock
    if (minute < 10) {
        minuteContainer.textContent = '0' + minute;
        titleText = '0' + minute
    } else {
        minuteContainer.textContent = minute;
        titleText = String(minute);
    }
    titleText += ':';
    if (second < 10) {
        secondContainer.textContent = '0' + second;
        titleText += '0' + second;
    } else {
        secondContainer.textContent = second;
        titleText += String(second);
    }
    titleText += " " + state.toUpperCase();
    title.text = titleText;

}

function buttonClear() { // clear all buttons from the buttonContainer
    while (buttonContainer.firstElementChild) {
        buttonContainer.removeChild(buttonContainer.firstElementChild);
    }
}


//------------- Timer Functions: begin, stop -----------------
function startTimer() {
    if (state == 'ready') {
        state = 'go';
        changeState();
    }
    stopID = setInterval(() => {
        if (second === 0) { //When second hits 0
            if (minute === 0) { // When timer hits 0, check current state
                if (state == 'go') { // When state is 'go', go to 'rest', 'longRest', or 'finish'.
                    if (progress == targetSessionNumber) {
                        state = 'finish';
                        changeState();
                    } else if (progress % 4 == 0) {
                        state = 'longRest';
                        changeState();
                    } else {
                        state = 'rest';
                        changeState();
                    }
                } else if (state == 'rest' || state == 'longRest') { //when state is rest or longRest, go to next session.
                    state = 'go';
                    changeState();
                }
            } else {
                minute--;
                second = 59;
            } // when second hits 0, decrease minute by 1
        } else second--;
        // when second is not 0, decrease second by 1
        display();
    }, 1000);
};

function stopTimer() {
    clearInterval(stopID);
};

//------------- changeState Function: conditions for each state---------------------

changeState('ready');

function changeState() {
    second = 0;
    if (state != 'ready' && progress != 0) { //don't play the sound when starting for the first time.
        bell.play();
    }
    if (state == 'ready') {
        buttonClear();
        buttonContainer.appendChild(playButton);
        header.style.background = 'rgb(29, 158, 255, 0.8)';
        minute = sessionLength;
        stateMessage.textContent = 'READY';
        display();
        progress = 0;
        progressContainer.textContent = `- ${progress+1}/${targetSessionNumber} -`;

    } else if (state == 'go') {
        header.style.background = 'rgb(95, 207, 128, 0.8)';
        progress++;
        progressContainer.textContent = `- ${progress}/${targetSessionNumber} -`;
        minute = sessionLength;
        stateMessage.textContent = 'GO';
    } else if (state == 'rest') {
        header.style.background = 'rgb(252, 136, 126, 0.8)';
        minute = restLength;
        stateMessage.textContent = 'REST';
    } else if (state == 'longRest') {
        header.style.background = 'rgb(252, 136, 126)';
        minute = longRestLength;
        stateMessage.textContent = 'LONG REST';
    } else if (state == 'finish') {
        header.style.background = '#5b5b5b';
        stopTimer();
        stateMessage.textContent = 'FINISHED';
        buttonClear();
        buttonContainer.appendChild(resetAllButton);
    }

}



//------------- Event Listeners: play, pause, reset -------------

playButton.addEventListener('click', () => {
    startTimer();
    buttonClear();
    buttonContainer.appendChild(pauseButton);
});

pauseButton.addEventListener('click', () => {
    stopTimer();
    buttonClear();
    buttonContainer.appendChild(playButton);
    buttonContainer.appendChild(resetButton);
});

resetButton.addEventListener('click', () => {
    switch (state) {
        case 'go':
            minute = sessionLength;
            second = 0;
            break;

        case 'rest':
            minute = restLength;
            second = 0;
            break;

        case 'longRest':
            minute = longRestLength;
            second = 0;
            break;
    }
    display();
    buttonClear();
    buttonContainer.appendChild(playButton);
});

resetAllButton.addEventListener('click', () => {
    state = 'ready';
    changeState();
})

settingsButton.addEventListener('click', () => {
    if (form.style.display == 'block') {
        form.style.display = 'none';
    } else form.style.display = 'block';
})

formXButton.addEventListener('click', () => {
    form.style.display = 'none';
})

//------------- Function related to form -------------

formOKButton.onclick = function () {
    //    sessionLength = document.querySelector('#session').value;
    header.style.color = 'black';
}
