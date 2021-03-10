// JavaScript source code

const slot1 = 12;
const slot2 = 13;
const slot3 = 6;
const slot4 = 5;

const Gpio = require('pigpio').Gpio; //include pigpio to interact with the GPIO
const slot1LED = new Gpio(slot1, { mode: Gpio.OUTPUT }); //use GPIO pin output for AM
const slot2LED = new Gpio(slot2, { mode: Gpio.OUTPUT }); //use GPIO pin output for PM
const slot3LED = new Gpio(slot3, { mode: Gpio.OUTPUT }); //use GPIO pin output for AM
const slot4LED = new Gpio(slot4, { mode: Gpio.OUTPUT }); //use GPIO pin output for PM
var TwoSlotLEDOutputController = function () { slot3LED.digitalWrite(0); slot4LED.digitalWrite(0);}

var blinker
var blinkerTimeOut

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
            blinker = setInterval(function () { led1Control(new Date().getSeconds() % 2); }, 1000);
            blinkerTimeOut = setTimeout(function () {
                clearInterval(blinker); // Stop blinking  
                led1Control(1);
            }, 60000);
            break;
        case 2:
            blinker = setInterval(function () { led2Control(new Date().getSeconds() % 2); }, 1000);
            blinkerTimeOut = setTimeout(function () {
                clearInterval(blinker); // Stop blinking  
                led2Control(1);
            }, 60000);
            break;


    }

}

TwoSlotLEDOutputController.prototype.OffAlarmOnLed = function (ledNo) {
    clearInterval(blinker); // Stop blinking  
    clearInterval(blinkerTimeOut); // Stop the automatic stopper
    switch (ledNo) {
        case 1:
            led1Control(0);
            break;
        case 2:
            led2Control(0);
            break;
    }
}

module.exports = TwoSlotLEDOutputController
