const { isNull } = require('util');
const Gpio = require('pigpio').Gpio; //include pigpio to interact with the GPIO
const schedule = require('node-schedule');

class BtnDrivenPillOrganizerSchedulerIOControler {

    constructor(buttonPressed, buttonReleased) {
        var btnNumberDay = new Date().getDay();
        const job = schedule.scheduleJob('00 00 * * *', function () {
            btnNumberDay = new Date().getDay();
        })
        
        var btnNumber = 0;
        var raiseEvent = true;
        var captureB1 = true;
        var captureB2 = true;

        var numberofSlotsPerDay = 3;//3 is for Rx-Rx-Rx style, 2 for 1-0-1 style this can be 2 if need to schedule only two times a day read from config or db later
        var numberOfDays = 7; // 7 days a week initial setup 3 times 7 days
        var startDayOftheWeek = 0;// Considering 0 for Sunday
        
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

        const pushButton5 = new Gpio(24, {
            mode: Gpio.INPUT, pullupdon: Gpio.PUD_OFF, edge: Gpio.RISING_EDGE, alert: false, timeout: 10
        }); //use GPIO pin 27 as input, and 'both' button presses, and releases should be handled

        pushButton5.glitchFilter(10000);
		
		var captureB5 = true;
		
        pushButton5.on('interrupt', (value) => { //Watch for hardware interrupts on pushButton1 GPIO, specify callback function
            if (value === 1 && captureB2) {
                btnNumber = btnNumber + 4;
                captureB5 = false;
                if (raiseEvent) {
                    raiseEvent = false;
                    setTimeout(RaiseButtonPress, 1000);
                }
            }
        });
		
        function RaiseButtonPress() {
            if (btnNumber != 0 &&  btnNumber <=  numberofSlotsPerDay) {
                var btnRaised = btnNumber + (btnNumberDay - startDayOftheWeek)  * numberofSlotsPerDay;
                if (!isNull(buttonPressed))
                    buttonPressed(btnRaised);
			}
                resetStatuses();
            
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
            btnNumberDay -= 1;
            if (btnNumberDay < 0)
                btnNumberDay = numberOfDays - 1;
            resetStatuses();
        }

        function next() {
            btnNumberDay += 1;
            if (btnNumberDay >= numberOfDays)
                btnNumberDay = 0;
            resetStatuses();
        }

        function resetStatuses() {
            btnNumber = 0;
            raiseEvent = true;
            captureB1 = true;
            captureB2 = true;
            captureB3 = true;
            captureB4 = true;
			captureB5 = true;
        }
    }
}

module.exports = BtnDrivenPillOrganizerSchedulerIOControler

