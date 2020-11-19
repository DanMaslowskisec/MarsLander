const initialAltitude = 240000;
const initialSpeed = 4600;
const gravity = 3.7;
const engHeatRate = 20;
const engHeatSet = 1500;

let engWarmUp = false;
let parachute = true;
let GCS = false;
let landArm = false;
let thrusters = false;

let engCurrentTemp = 0;
let drag = 45;
let thrust = 0;

let currentSpeed = initialSpeed;
let currentAltitude = initialAltitude;


let i = setInterval(function () {
    engineControl();
    engTempVscurrentSpeed();
    retroBurnEntry();
    confirmLandingOrDescent();
}, 1000);

let counter = 0;
// let text = document.getElementById('texArea');

function engTempVscurrentSpeed(){
    
    if (engCurrentTemp === engHeatSet){
        currentSpeed = currentSpeed + gravity - thrust;
        parachute = false;
        GCS = true;
        engWarmUp = false;
    }
    else {
        currentSpeed = currentSpeed + gravity - thrust - drag;
        engCurrentTemp = engCurrentTemp + engHeatRate;
        engWarmUp = true;
    }
    }

function confirmLandingOrDescent(){
    if (currentAltitude <= 0){
        currentSpeed = 0;
        currentAltitude = 0;
        landArm = true;
        thrust = 0;
        thrusters = false;
        GCS = false;
        engineControl();
        document.write('Landing Success!' + '<br>');
        clearInterval(i);
    }
    else {
        currentAltitude = currentAltitude - currentSpeed;
    }
    }

function retroBurnEntry(){
    if (currentSpeed > 150 && GCS === true){
        thrust = 150;
        thrusters = true;
        }
    
    else if (currentSpeed > 10 && GCS === true){
        thrust = 5;
        thrusters = true;
        }
        
    else {
        thrust = 0;
        thrusters = false;
        }
        }

// engine control
function engineControl() {
    counter++;
    document.write((Math.round(counter) + ' seconds.' + '<br>'));
    document.write(Math.round(currentSpeed) + ' meters/second.' + '<br>');
    document.write(Math.round(currentAltitude) + ' meters.' + '<br>');
    document.write(Math.round(engCurrentTemp) + ' K.' + '<br>');
    document.write('Parachute attached? ' + parachute + '<br>');
    document.write('Engine Warmup Cycle? ' + engWarmUp + '<br>');
    document.write('GCS Enabled? ' + GCS + '<br>');
    document.write('Thrusters active? ' + thrusters + '<br>');
    document.write('Landing arm contact? ' + landArm + '<br>');
    window.scrollTo(0, document.body.scrollHeight);
    var body = document.getElementsByTagName('body')[0];
    body.style.backgroundImage = 'url(./images/rocket.png)';
}

