//Initial starting location of mars lander;
//gravity, engine set points and heatup are constant
const initialAltitude = 240000;
const initialSpeed = 4600;
const gravity = 3.7;
const engHeatRate = 20;
const engHeatSet = 1500;

//initial 'dummy lights' showing at simulation start;
//engine warmup light is off, parachute is on, GCS is off,
//landing arm is off, and thrusters are off
let engWarmUp = false;
let parachute = true;
let GCS = false;
let landArm = false;
let thrusters = false;

//Two gauges showing Engine Temperature and Thrust;
//drag is from parachute and removed when parachute is dropped
let engCurrentTemp = 0;
let drag = 45;
let thrust = 0;

//setting Speed and Altitude to the starting values when
//entering mars atmosphere
let currentSpeed = initialSpeed;
let currentAltitude = initialAltitude;

//Timing control runs until broken by clearInterval;
//engineControl function is repeated every 1000 ms (1 second)
let i = setInterval(engineControl, 1000);

//Counter is 'Mission Time' and counts in seconds
//(e.g. {exempli gratia} 1 second since descent starts, 2 seconds since descent starts, etc.)
//controls the entire entry, descrent, GCS control and eventually landing of the mars lander
function engineControl(){

  let counter = 0;
    //Phase 3 - Parachute released and terminal descent start
    if (engCurrentTemp === engHeatSet){
        currentSpeed = currentSpeed + gravity - thrust;
        parachute = false;
        GCS = true;
        engWarmUp = false;
    }
    //Phase 1 - Parachute Descent; immediately transition to
    //Phase 2 - Engine Warmup
    else {
        currentSpeed = currentSpeed + gravity - thrust - drag;
        engCurrentTemp = engCurrentTemp + engHeatRate;
        engWarmUp = true;
    }

    //Phase 5 - Touchdown
    if (currentAltitude <= 0){
        currentSpeed = 0;
        currentAltitude = 0;
        landArm = true;
        thrust = 0;
        thrusters = false;
        GCS = false;
        //Stops the engineControl function loop and Mission Time
        clearInterval(i);
    }
    //Phase 4 - Drop and engine on/off
    else {
        currentAltitude = currentAltitude - currentSpeed;
    }

    //Phase 3 - Parachute released and terminal descent start
    // %100 Thrust during Phase 3 until terminal descent is arrested
    if (currentSpeed > 150 && GCS === true){
        thrust = 150;
        thrusters = true;
    }

    //Phase 4 - Drop and engine on/off
    // %50 Thrust while engine 'on' combination to approach ground slowly
    else if (currentSpeed > 10 && GCS === true){
        thrust = 5;
        thrusters = true;
    }
    //Phase 4 - Drop and engine on/off
    //The 'drop' part where thrusters are 'off' to conserve fuel and get to ground faster
    else {
        thrust = 0;
        thrusters = false;
    }

    //Increments Mission Timer by 1 second
    counter++;
    //Displays in the console (for code testing) status of monitored systems
    document.write(Math.round(counter) + ' seconds.');
    document.write(Math.round(currentSpeed) + ' meters/second.');
    document.write(Math.round(currentAltitude) + ' meters.');
    document.write(Math.round(engCurrentTemp) + ' K.');
    document.write('Parachute attached? ' + parachute);
    document.write('Engine Warmup Cycle? ' + engWarmUp);
    document.write('GCS Enabled? ' + GCS);
    document.write('Thrusters active? ' + thrusters);
    document.write('Landing arm contact? ' + landArm);
}

//Mission ends with lander coming to a stop on surface of mars
document.write('Landing Success!');
