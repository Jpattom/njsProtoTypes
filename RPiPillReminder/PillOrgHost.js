// JavaScript source code
const Gpio = require('pigpio').Gpio; //include pigpio to interact with the GPIO

const RGBLEDOutputController = require('./IOControllers/RGBLEDOutputController');
const BtnDrivenPillOrganizerSchedulerIOControler = require('./IOControllers/BtnDrivenPillOrganizerSchedulerIOControler');

var rgbLEDOutputController = new RGBLEDOutputController();
const LED = new Gpio(4, { mode: Gpio.OUTPUT }); //use GPIO pin 4 as output

function shutdown() {
    LED.digitalWrite(0);
    console.clear();
    rgbLEDOutputController.LedOff();
    console.log('\nThank you for using the Product Bye....................');

    setTimeout(function () {
        process.exit(0);
    }, 1000);
}



const btnDrivenPillOrganizerSchedulerIOControler = new BtnDrivenPillOrganizerSchedulerIOControler(function (pressedbtNumber) {


    console.log('Button ' + pressedbtNumber + ' Pressed');

    switch (pressedbtNumber % 3) {
        case 0: {
            rgbLEDOutputController.Light(0, 0, 255);
            break;
        }
        case 1: {
            rgbLEDOutputController.Light(0, 255, 0);
            break;
        }
        case 2: {
            rgbLEDOutputController.Light(255, 0, 0);
            break;
        }
        default:
            break;
    }
});

process.on('SIGHUP', shutdown);
process.on('SIGHUP', shutdown);
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
process.on('SIGCONT', shutdown);

LED.digitalWrite(1);
