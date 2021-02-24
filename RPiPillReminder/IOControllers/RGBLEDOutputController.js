
const Gpio = require('pigpio').Gpio; //include pigpio to interact with the GPIO
const ledRed = new Gpio(5, { mode: Gpio.OUTPUT }); //use GPIO pin 5 as output for RED
const ledGreen = new Gpio(6, { mode: Gpio.OUTPUT }); //use GPIO pin 6 as output for GREEN
const ledBlue = new Gpio(16, { mode: Gpio.OUTPUT }); //use GPIO pin 16 as output for BLUE

var RGBLEDOutputController = function () { }

function lightLED(redRGB = 0, greenRGB = 0, blueRGB = 0) {
    ledRed.pwmWrite(redRGB); //set RED LED to specified value
    ledGreen.pwmWrite(greenRGB); //set GREEN LED to specified value
    ledBlue.pwmWrite(blueRGB); //set BLUE LED to specified value
}

RGBLEDOutputController.prototype.Light = lightLED;

function ledOff () {
    ledRed.digitalWrite(0); // Turn RED LED off
    ledGreen.digitalWrite(0); // Turn GREEN LED off
    ledBlue.digitalWrite(0); // Turn BLUE LED off
}

RGBLEDOutputController.prototype.LedOff = ledOff;

RGBLEDOutputController.prototype.LitBlue = function () {
    lightLED(0, 0, 255);
}

RGBLEDOutputController.prototype.LitGreen = function () {
    lightLED(0, 255, 0);
}

RGBLEDOutputController.prototype.LitRed = function () {
    lightLED(255, 0, 0);
}

RGBLEDOutputController.prototype.LitYellow = function () {
    lightLED(255, 255, 0);
}

RGBLEDOutputController.prototype.LitOrange = function () {
    lightLED(255, 165, 0);
}

var intervalFuction

RGBLEDOutputController.prototype.ShowAlarm = function () {
    console.log("Showing Alarm");
    intervalFuction = setInterval(function () {
        var second = new Date().getSeconds();
        console.log("Showing Alarm in", second);
        switch (second % 3) {
            case 0:
                lightLED(255, 0, 0);
                break;
            case 1:
                lightLED(0, 255, 0);
                break;
            case 2:
                lightLED(0, 0, 255);
                break;
        }

        
    }, 1000);

    setTimeout(function () {
        clearInterval(intervalFuction); // Stop blinking  
        ledOff(); // Turn LED off.  
    }, 60000);  
}

RGBLEDOutputController.prototype.OffAlarm = function () {
    clearInterval(intervalFuction); // Stop blinking  
    ledOff(); // Turn LED off. 
}


module.exports = RGBLEDOutputController
