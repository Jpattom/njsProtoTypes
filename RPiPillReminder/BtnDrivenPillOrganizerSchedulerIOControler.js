const { isNull } = require('util');
const RGBLEDOutputController = require('./RGBLEDOutputController');

const Gpio = require('pigpio').Gpio; //include pigpio to interact with the GPIO
const LED = new Gpio(4, { mode: Gpio.OUTPUT }); //use GPIO pin 4 as output

class BtnDrivenPillOrganizerSchedulerIOControler {

    constructor(buttonPressed, buttonReleased) {


        var btnNumberDay = 0;
        var btnNumber = 0;
        var raiseEvent = true;
        var captureB1 = true;
        var captureB2 = true;

        var incrementBy = 3;//3 is for Rx-Rx-Rx style this can be 2 if need to schedule only two times a day read from config or db later

        const pushButton1 = new Gpio(17, {
            mode: Gpio.INPUT, pullupdon: Gpio.PUD_OFF, edge: Gpio.RISING_EDGE, alert: false, timeout: 10
        }); //use GPIO pin 17 as input, and 'both' button presses, and releases should be handled

        pushButton1.glitchFilter(10000);

        pushButton1.on('interrupt', (value) => { //Watch for hardware interrupts on pushButton GPIO, specify callback function
            if (value === 1 && captureB1) {
                btnNumber = btnNumber + 1;
                captureB1 = false;
                if (raiseEvent) {
                    raiseEvent = false;
                    setTimeout(RaiseButtonPress, 1000);
                }
            }
        });

        const pushButton2 = new Gpio(27, {
            mode: Gpio.INPUT, pullupdon: Gpio.PUD_OFF, edge: Gpio.RISING_EDGE, alert: false, timeout: 10
        }); //use GPIO pin 27 as input, and 'both' button presses, and releases should be handled

        pushButton2.glitchFilter(10000);

        pushButton2.on('interrupt', (value) => { //Watch for hardware interrupts on pushButton1 GPIO, specify callback function
            if (value === 1 && captureB2) {
                btnNumber = btnNumber + 2;
                captureB2 = false;
                if (raiseEvent) {
                    raiseEvent = false;
                    setTimeout(RaiseButtonPress, 1000);
                }
            }
        });

        function RaiseButtonPress() {
            if (btnNumber != 0) {
                var btnRaised = btnNumber + btnNumberDay;
                if (!isNull(buttonPressed))
                    buttonPressed(btnRaised);
                resetStatuses();
            }
        }

        const pushButton3 = new Gpio(22, {
            mode: Gpio.INPUT, pullupdon: Gpio.PUD_OFF, edge: Gpio.RISING_EDGE, alert: false, timeout: 10
        }); //use GPIO pin 22 as input, and 'both' button presses, and releases should be handled

        pushButton3.glitchFilter(10000);

        var captureB3 = true;

        pushButton3.on('interrupt', (value) => { //Watch for hardware interrupts on pushButton1 GPIO, specify callback function
            if (value === 1 && captureB3) {
                captureB3 = false;
                if (raiseEvent) {
                    raiseEvent = false;
                    setTimeout(previous, 1000);
                }
            }
        });


        const pushButton4 = new Gpio(23, {
            mode: Gpio.INPUT, pullupdon: Gpio.PUD_OFF, edge: Gpio.RISING_EDGE, alert: false, timeout: 10
        }); //use GPIO pin 23 as input, and 'both' button presses, and releases should be handled

        pushButton4.glitchFilter(10000);

        var captureB4 = true;

        pushButton4.on('interrupt', (value) => { //Watch for hardware interrupts on pushButton1 GPIO, specify callback function
            if (value === 1 && captureB4) {
                captureB4 = false;
                if (raiseEvent) {
                    raiseEvent = false;
                    setTimeout(next, 1000);
                }
            }
        });

        function previous() {
            btnNumberDay -= incrementBy;
            if (btnNumberDay < 0)
                btnNumberDay = 0;
            resetStatuses();
        }

        function next() {
            btnNumberDay += incrementBy;
            resetStatuses();
        }

        function resetStatuses() {
            btnNumber = 0;
            raiseEvent = true;
            captureB1 = true;
            captureB2 = true;
            captureB3 = true;
            captureB4 = true;
        }
    }
}

rgbLEDOutputController = new RGBLEDOutputController();

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
            rgbLEDOutputController.Light(255, 0, 0);
            break;
        }
        case 1: {
            rgbLEDOutputController.Light(0, 255, 0);
            break;
        }
        case 2: {
            rgbLEDOutputController.Light(0, 0, 255);
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
