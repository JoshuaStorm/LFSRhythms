var noise0, env0, filter0, rhythmGenerator0;
var noise1, env1, filter1, rhythmGenerator1;
var noise2, env2, filter2, rhythmGenerator2;
var noise3, env3, filter3, rhythmGenerator3;

var TIME_DELTA = 100;
var END_TIME = 60 * 1000;
var playing = false;

var count = 0;
var totalTime = 0;

function mouseClicked() {
    playing = !playing;
}

function perTimer() {
    if (!playing) return;

    count++;
    totalTime += TIME_DELTA;

    if (count % 2 == 0) {
        var onOff;
        if (totalTime > END_TIME) onOff = rhythmGenerator0.shiftNoReplace();
        else                      onOff = rhythmGenerator0.shift();
        if (onOff == 1) env0.play(noise0);
    }

    if (count % 4 == 0) {
        var onOff;
        if (totalTime > END_TIME) onOff = rhythmGenerator1.shiftNoReplace();
        else                      onOff = rhythmGenerator1.shift();
        if (onOff == 1) env1.play(noise1);
    }

    if (count % 4 == 0) {
        var onOff;
        if (totalTime > END_TIME) onOff = rhythmGenerator2.shiftNoReplace();
        else                      onOff = rhythmGenerator2.shift();
        if (onOff == 1) env2.play(noise2);
    }

    if (count % 8 == 0) {
        var onOff;
        if (totalTime > END_TIME) onOff = rhythmGenerator3.shiftNoReplace();
        else                      onOff = rhythmGenerator3.shift();
        if (onOff == 1) env3.play(noise3);
    }
}

function setup() {
    createCanvas(displayWidth, displayHeight);

    // HIGHER - 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
    rhythmGenerator0 = new LFSR(20, 0, 1);

    noise0 = new p5.Noise('pink'); // other types include 'brown' and 'pink'
    noise0.disconnect();
    noise0.start();
    noise0.amp(0);
    noise0.pan(-0.7);


    filter0 = new p5.BandPass();
    filter0.process(noise0);
    filter0.set(14000, 20);

    env0 = new p5.Env();
    // set attackTime, decayTime, sustainRatio, releaseTime
    env0.setADSR(0.001, 0.05, 1, 0.05);
    // set attackLevel, releaseLevel
    env0.setRange(0.8, 0);

    // HIGH - 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
    rhythmGenerator1 = new LFSR(20, 0, 1);

    noise1 = new p5.Noise(); // other types include 'brown' and 'pink'
    noise1.disconnect();
    noise1.start();
    noise1.amp(0);
    noise1.pan(0.8);


    filter1 = new p5.BandPass();
    filter1.process(noise1);
    filter1.set(5000, 20);

    env1 = new p5.Env();
    // set attackTime, decayTime, sustainRatio, releaseTime
    env1.setADSR(0.001, 0.1, 1, 0.1);
    // set attackLevel, releaseLevel
    env1.setRange(0.2, 0);

    // BASS - 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
    rhythmGenerator2 = new LFSR(20, 0, 1);

    noise2 = new p5.Noise('brown'); // other types include 'brown' and 'pink'
    noise2.disconnect();
    noise2.start();
    noise2.amp(0);

    filter2 = new p5.BandPass();
    filter2.process(noise2);
    filter2.set(80, 20);

    env2 = new p5.Env();
    // set attackTime, decayTime, sustainRatio, releaseTime
    env2.setADSR(0.00001, 0.1, 1, 0.3);
    // set attackLevel, releaseLevel
    env2.setRange(1.2, 0);

    // MID - 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3
    rhythmGenerator3 = new LFSR(20, 0, 1);

    noise3 = new p5.Noise(); // other types include 'brown' and 'pink'
    noise3.disconnect();
    noise3.start();
    noise3.amp(0);
    noise3.pan(0.1);


    filter3 = new p5.BandPass();
    filter3.process(noise3);
    filter3.set(2000, 20);

    env3 = new p5.Env();
    // set attackTime, decayTime, sustainRatio, releaseTime
    env3.setADSR(0.0001, 0.1, 1, 0.1);
    // set attackLevel, releaseLevel
    env3.setRange(0.2, 0);


    // Setup an interval event
    setInterval(perTimer, TIME_DELTA);
}

function draw() {
    clear();
    var state0 = rhythmGenerator0.getState().toString().replace(/,/g, '');
    var state1 = rhythmGenerator1.getState().toString().replace(/,/g, '');
    var state2 = rhythmGenerator2.getState().toString().replace(/,/g, '');
    var state3 = rhythmGenerator3.getState().toString().replace(/,/g, '');
    textSize(48);
    textFont('Courier');

    text(state0, displayWidth / 2 - 300, displayHeight / 2 - 150);
    text(state1, displayWidth / 2 - 300, displayHeight / 2 - 100);
    text(state2, displayWidth / 2 - 300, displayHeight / 2 - 50);
    text(state3, displayWidth / 2 - 300, displayHeight / 2 - 0);


}
