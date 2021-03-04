// JavaScript source code


//const slot1 = 12;
//const slot2 = 13;
//const slot3 = 6;
//const slot4 = 5;


const Gpio = require('pigpio').Gpio; //include pigpio to interact with the GPIO
//const slot1LED = new Gpio(slot1, { mode: Gpio.OUTPUT }); //use GPIO pin 5 as output for Blue
//const slot2LED = new Gpio(slot2, { mode: Gpio.OUTPUT }); //use GPIO pin 6 as output for GREEN
//const slot3LED = new Gpio(slot3, { mode: Gpio.OUTPUT }); //use GPIO pin 5 as output for Blue
//const slot4LED = new Gpio(slot4, { mode: Gpio.OUTPUT }); //use GPIO pin 6 as output for GREEN

const redPin = 4;
const greenPin = 17;
const bluePin = 27;

const ledRed = new Gpio(redPin, { mode: Gpio.OUTPUT }); //use GPIO pin 5 as output for RED
const ledGreen = new Gpio(greenPin, { mode: Gpio.OUTPUT }); //use GPIO pin 6 as output for GREEN
const ledBlue = new Gpio(bluePin, { mode: Gpio.OUTPUT }); //use GPIO pin 16 as output for BLUE


function lightLED(redRGB = 0, greenRGB = 0, blueRGB = 0) {
    ledRed.pwmWrite(redRGB); //set RED LED to specified value
    ledGreen.pwmWrite(greenRGB); //set GREEN LED to specified value
    ledBlue.pwmWrite(blueRGB); //set BLUE LED to specified value
}

//slot1LED.digitalWrite(0);
//slot2LED.digitalWrite(0);
//slot3LED.digitalWrite(0);
//slot4LED.digitalWrite(0);

console.log("Showing of");

setTimeout(function () { lightLED(255, 0, 0); console.log("Showing LED GPIO", redPin); }, 4000);
setTimeout(function () { lightLED(0, 255, 0); console.log("Showing LED GPIO", greenPin); }, 8000);
setTimeout(function () { lightLED(0, 0, 255); console.log("Showing LED GPIO", bluePin); }, 12000);

//setTimeout(function () { slot1LED.digitalWrite(1); console.log("Showing LED GPIO", slot1); }, 4000);
//setTimeout(function () { slot2LED.digitalWrite(1); console.log("Showing LED GPIO", slot2); }, 8000);
//setTimeout(function () { slot3LED.digitalWrite(1); console.log("Showing LED GPIO", slot3); }, 12000);
//setTimeout(function () { slot4LED.digitalWrite(1); console.log("Showing LED GPIO", slot4); }, 16000);

//var intervalFuction

//intervalFuction = setInterval(function () {
//    var second = new Date().getSeconds();
//    //console.log("Showing Alarm in", second);
//    switch (second % 4) {
//        case 0:
//            slot1LED.digitalWrite(1);
//            Slot2LED.digitalWrite(0);
//            slot3LED.digitalWrite(0);
//            Slot4LED.digitalWrite(0);
//            console.log("Showing LED GPIO", slot1);
//            break;
//        case 1:
//            slot1LED.digitalWrite(0);
//            Slot2LED.digitalWrite(1);
//            slot3LED.digitalWrite(0);
//            Slot4LED.digitalWrite(0);
//            console.log("Showing LED GPIO", slot2);
//            break;
//        case 2:
//            slot1LED.digitalWrite(0);
//            Slot2LED.digitalWrite(0);
//            slot3LED.digitalWrite(1);
//            Slot4LED.digitalWrite(0);
//            console.log("Showing LED GPIO", slot3);
//            break;
//        case 3:
//            slot1LED.digitalWrite(0);
//            Slot2LED.digitalWrite(0);
//            slot3LED.digitalWrite(0);
//            Slot4LED.digitalWrite(1);
//            console.log("Showing LED GPIO", slot4);
//            break;
//    }


//}, 1000);

setTimeout(function () {
//    clearInterval(intervalFuction); // Stop blinking  
    console.log("Going off");
    lightLED(0, 0, 0);
    //slot1LED.digitalWrite(0);
    //slot2LED.digitalWrite(0);
    //slot3LED.digitalWrite(0);
    //slot4LED.digitalWrite(0);
}, 60000);