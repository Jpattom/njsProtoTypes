
const Gpio = require('pigpio').Gpio; //include pigpio to interact with the GPIO
const ledRed = new Gpio(5, { mode: Gpio.OUTPUT }); //use GPIO pin 5 as output for RED
const ledGreen = new Gpio(6, { mode: Gpio.OUTPUT }); //use GPIO pin 6 as output for GREEN
const ledBlue = new Gpio(16, { mode: Gpio.OUTPUT }); //use GPIO pin 16 as output for BLUE

var RGBLEDOutputController = function () { }

RGBLEDOutputController.prototype.Light = function (redRGB = 0, greenRGB = 0, blueRGB = 0) {
    ledRed.pwmWrite(redRGB); //set RED LED to specified value
    ledGreen.pwmWrite(greenRGB); //set GREEN LED to specified value
    ledBlue.pwmWrite(blueRGB); //set BLUE LED to specified value
}

RGBLEDOutputController.prototype.LedOff = function () {
    ledRed.digitalWrite(0); // Turn RED LED off
    ledGreen.digitalWrite(0); // Turn GREEN LED off
    ledBlue.digitalWrite(0); // Turn BLUE LED off
}

RGBLEDOutputController.prototype.LitBlue = function () {
    RGBLEDOutputController.Light(0, 0, 255);
}

RGBLEDOutputController.prototype.LitGreen = function () {
    RGBLEDOutputController.Light(0, 255, 0);
}

RGBLEDOutputController.prototype.LitRed = function () {
    RGBLEDOutputController.Light(255, 0, 0);
}

RGBLEDOutputController.prototype.LitYellow = function () {
    RGBLEDOutputController.Light(255, 255, 0);
}

RGBLEDOutputController.prototype.LitOrange = function () {
    RGBLEDOutputController.Light(255, 165, 0);
}

module.exports = RGBLEDOutputController
