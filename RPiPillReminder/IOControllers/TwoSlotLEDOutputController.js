// JavaScript source code

const slot1 = 12;
const slot2 = 13;

const Gpio = require('pigpio').Gpio; //include pigpio to interact with the GPIO
const slot1LED = new Gpio(slot1, { mode: Gpio.OUTPUT }); //use GPIO pin 16 as output for BLUE
const slot2LED = new Gpio(slot2, { mode: Gpio.OUTPUT }); //use GPIO pin 6 as output for GREEN
var TwoSlotLEDOutputController = function () { }

var intervalFuction
/*
 Two LEd Experiment Section 
 */

function led1Control(onoff) {
    slot1LED.digitalWrite(onoff);
    console.log("LED 1", onoff === 0 ? "Off" : "On" );
}

function led2Control(onoff) {
    slot2LED.digitalWrite(onoff);
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
