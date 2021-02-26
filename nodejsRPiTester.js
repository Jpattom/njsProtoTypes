// JavaScript source code
const Gpio = require('pigpio').Gpio; //include pigpio to interact with the GPIO
const slot1LED = new Gpio(16, { mode: Gpio.OUTPUT }); //use GPIO pin 5 as output for Blue
const Slot2LED = new Gpio(6, { mode: Gpio.OUTPUT }); //use GPIO pin 6 as output for GREEN

var intervalFuction

intervalFuction = setInterval(function () {
    var second = new Date().getSeconds();
    console.log("Showing Alarm in", second);
    switch (second % 2) {
        case 0:
            slot1LED.digitalWrite(1);
            Slot2LED.digitalWrite(0);
            break;
        case 1:
            slot1LED.digitalWrite(0);
            Slot2LED.digitalWrite(1);
            break;
        case 2:
            lightLED(0, 0, 255);
            break;
    }


}, 1000);

setTimeout(function () {
    clearInterval(intervalFuction); // Stop blinking  
    slot1LED.digitalWrite(0);
    Slot2LED.digitalWrite(0);
}, 60000);