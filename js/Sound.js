class Sound {
    constructor() {
        this.bell = new Audio();
        this.bell.src = '../audio/bell.wav';
        this.bell.volume = 0.5;
        this.context = new AudioContext();
    }

}
