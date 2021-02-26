// JavaScript source code
const Gpio = require('pigpio').Gpio; //include pigpio to interact with the GPIO
const ledGreen = new Gpio(6, { mode: Gpio.OUTPUT }); //use GPIO pin 6 as output for GREEN
const ledBlue = new Gpio(16, { mode: Gpio.OUTPUT }); //use GPIO pin 16 as output for BLUE
var TwoSlotLEDOutputController = function () { }

var intervalFuction
/*
 Two LEd Experiment Section 
 */

function led1Control(onoff) {
    ledBlue.digitalWrite(onoff);
    console.log("LED 1", onoff === 0 ? "Off" : "On" );
}

function led2Control(onoff) {
    ledGreen.digitalWrite(onoff);
    console.log("LED 2", onoff === 0 ? "Off" : "On");
}


TwoSlotLEDOutputController.prototype.LEDOnOff = function (ledNo, onOff) {
    ledNo === 1 ? led1Control(onOff) : led2Control(onOff);
}

TwoSlotLEDOutputController.prototype.ShowAlarmOnLed = function (ledNo) {
    switch (ledNo) {
        case 1:
            intervalFuction = setInterval(function () { led1Control(new Date().getSeconds() % 2); }, 1000);
            setTimeout(function () {
                clearInterval(intervalFuction); // Stop blinking  
                led1Control(1);
            }, 60000);
            break;
        case 2:
            intervalFuction = setInterval(function () { led2Control(new Date().getSeconds() % 2); }, 1000);
            setTimeout(function () {
                clearInterval(intervalFuction); // Stop blinking  
                led2Control(1);
            }, 60000);
            break;


    }

}

TwoSlotLEDOutputController.prototype.OffAlarmOnLed = function (ledNo) {
    switch (ledNo) {
        case 1:
            clearInterval(intervalFuction); // Stop blinking  
            led1Control(0);
            break;
        case 2:
            clearInterval(intervalFuction); // Stop blinking  
            led2Control(0);
            break;
    }
}

module.exports = TwoSlotLEDOutputController
