// JavaScript source code
//const Gpio = require('pigpio').Gpio; //include pigpio to interact with the GPIO
//const schedule = require('node-schedule');

const TwoSlotLEDOutputController = require('./IOControllers/TwoSlotLEDOutputController');
const RGBLEDOutputController = require('./IOControllers/RGBLEDOutputController');
const MatrixSwitchInputControler = require('./IOControllers/MatrixSwitchInputControler');
const TwoBySevenPillOrganizer = require('./TwoBySevenPillOrganizer');

var twoSlotLEDOutputController = new TwoSlotLEDOutputController();
var rgbLEDOutputController = new RGBLEDOutputController();
//const LED = new Gpio(4, { mode: Gpio.OUTPUT }); //use GPIO pin 4 as output


function shutdown() {
    rgbLEDOutputController.LedOff();
    console.clear();

    twoSlotLEDOutputController.LEDOnOff(1, 0);
    twoSlotLEDOutputController.LEDOnOff(2, 0);

    console.log('\nThank you for using the Product Bye....................');
    setTimeout(function () {
        process.exit(0);
    }, 1000);
}

twoBySevenPillOrganizer = new TwoBySevenPillOrganizer(twoSlotLEDOutputController.ShowAlarmOnLed
    ,twoSlotLEDOutputController.OffAlarmOnLed
    , OnDayChangesinPillOrganizer
    , twoSlotLEDOutputController.LEDOnOff
    , twoSlotLEDOutputController.LEDOnOff
);

const matrixSwitchInputControler = new MatrixSwitchInputControler(
    twoBySevenPillOrganizer.WhenPillInSlot
    , twoBySevenPillOrganizer.WhenPillOutOfSlot
    , twoBySevenPillOrganizer.WhenDayChangeAtInputController
    , twoBySevenPillOrganizer.GetNumberOfDays()
    , twoBySevenPillOrganizer.GetNumberOfSlotsPerDay()
    , new Date().getDay());

function OnDayChangesinPillOrganizer(dayNumber) {
    matrixSwitchInputControler.SetActiveRow(dayNumber);
}

process.on('SIGHUP', shutdown);
process.on('SIGHUP', shutdown);
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
process.on('SIGCONT', shutdown);
rgbLEDOutputController.LitBlue();
//LED.digitalWrite(1);
