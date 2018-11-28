class Sound {
    constructor() {
        this.bell = new Audio();
        this.bell.src = '../audio/bell.wav';
        this.bell.volume = 0.5;

        //musical notes for pitches
        this.lowG = 392.0;
        this.lowGsharp = 415.3;
        this.A = 440.0;
        this.Bb = 466.2;
        this.B = 493.9;
        this.C = 523.3;
        this.D = 587.3;
        this.E = 659.3;
        this.F = 698.5;
        this.G = 784.0;
        this.highA = 880;
        this.highB = 987.8;
        this.highC = 1047;
        //        this.playDingDongDang()
        //        this.playAlarm();
        //variables
        let stopAlarmId;
    }


    playDing(duration = 3, volume = .5, pitch = this.A) {
        const context = new AudioContext();
        const oscillator = context.createOscillator();
        const gain = context.createGain();

        //set the pitch of the bell
        oscillator.frequency.value = pitch;

        //connect oscillator to gain
        oscillator.connect(gain);

        //connect the module to output destination
        gain.connect(context.destination);

        //set initial gain
        gain.gain.value = volume;

        //play the sound
        oscillator.start(0);

        //gradually decrease volume so that the sound fades out.
        gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + duration);

        oscillator.stop(context.currentTime + duration);
    }

    playDingDongDang() {

        console.log(this.C);
        window.setTimeout(this.playDing, 1000, 3, 1, this.C);
        window.setTimeout(this.playDing, 1500, 3, 1, this.E);
        window.setTimeout(this.playDing, 2000, 3, 1, this.G);
        window.setTimeout(this.playDing, 2500, 3, 1, this.highC);
        window.setTimeout(this.playDing, 3000, 3, 1, this.G);
        window.setTimeout(this.playDing, 3500, 3, 1, this.E);
        window.setTimeout(this.playDing, 4000, 3, 1, this.C);
    }

    playAlarm() {
        this.stopAlarmId = window.setInterval(this.playDing, 2000, 3, 1, this.C)
    }

    stopAlarm() {
        window.clearInterval(this.stopAlarmId);
    }
}
