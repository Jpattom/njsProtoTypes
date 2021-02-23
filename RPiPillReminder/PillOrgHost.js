// JavaScript source code
const Gpio = require('pigpio').Gpio; //include pigpio to interact with the GPIO
const schedule = require('node-schedule');

const RGBLEDOutputController = require('./IOControllers/RGBLEDOutputController');
const MatrixSwitchInputControler = require('./IOControllers/MatrixSwitchInputControler');
const TwoBySevenPillOrganizer = require('./TwoBySevenPillOrganizer');

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

twoBySevenPillOrganizer = new TwoBySevenPillOrganizer();

const matrixSwitchInputControler = new MatrixSwitchInputControler(
    twoBySevenPillOrganizer.WhenPillInSlot
    , twoBySevenPillOrganizer.WhenPillOutOfSlot
    , twoBySevenPillOrganizer.GetNumberOfDays()
    , twoBySevenPillOrganizer.GetNumberOfSlotsPerDay()
    , new Date().getDay());


const job = schedule.scheduleJob('00 00 * * *', function () {
    matrixSwitchInputControler.SetActiveRow();
})

process.on('SIGHUP', shutdown);
process.on('SIGHUP', shutdown);
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
process.on('SIGCONT', shutdown);

LED.digitalWrite(1);
