const { exception } = require('console');
const { isNullOrUndefined } = require('util');
const Gpio = require('pigpio').Gpio; //include pigpio to interact with the GPIO
const fs = require('fs');
var btnStateData = require(__dirname + '/buttonstate.json');  //new Object();

var currentRow = 7;
var numberOfRows = 7;
var numberOfColumnsPerRow
var ButtonPressed;
var ButtonReleased;
//var RowChangeEvent = function (rowNumber) { };


function ProcessButtonStateEventForCurrentRow() {

    var firstColumn = currentRow * numberOfColumnsPerRow + 1;
    var lastColumn = (currentRow * numberOfColumnsPerRow) + numberOfColumnsPerRow;
    console.log("current row:", currentRow, "number of columns per row:", numberOfColumnsPerRow, "first column:", firstColumn, "last column:", lastColumn )
    for (var i = firstColumn; i <= lastColumn; i++) {
        if (isNullOrUndefined(btnStateData[i])) {
            console.log("column ", i , "state not found in button state date raising switch off")
            ButtonReleased(i);
        } else {
            console.log("column", i, " state found in button state date raising switch accordingly", btnStateData[i])
            parseInt(btnStateData[i]) === 0 ? ButtonReleased(i) : ButtonPressed(i);
        }
    }
}

class MatrixSwitchInputControler {

    constructor(buttonPressed, buttonReleased, paramNumberOfRows = 7, nuberOfColumns = 3, initRow = 0) {
        numberOfRows = paramNumberOfRows;
        numberOfColumnsPerRow = nuberOfColumns;
        ButtonPressed = buttonPressed;
        ButtonReleased = buttonReleased;

        //RowChangeEvent = onRowChange;


        Object.keys(btnStateData).forEach(function (key) {
            switch (parseInt(btnStateData[key])) {
                case 0:
                    ButtonPressed(parseInt(key));
                    break;
                case 1:
                    ButtonPressed(parseInt(key));
            }

            //console.log(key + " " + btnStateData[key]);
        });

        if (initRow < numberOfRows) {
            currentRow = initRow;
        } else
            throw exception('businnesslayerexception:Cannot set current row to ' + initRow + ' row number based on 0; if number of is 7 max of init row can be between 0 and 6')

        ProcessButtonStateEventForCurrentRow();

        var raiseEvent = true;
        var btnNumber = 0;

        const pushButton1 = new Gpio(17, {
            mode: Gpio.INPUT, pullupdon: Gpio.PUD_OFF, edge: Gpio.RISING_EDGE, alert: false, timeout: 10
        }); //use GPIO pin 17 as input, and 'both' button presses, and releases should be handled

        pushButton1.glitchFilter(10000);

        var captureB1 = true;

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

        var captureB2 = true;

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
            if (value === 1 && captureB5) {
                btnNumber = btnNumber + 4;
                captureB5 = false;
                if (raiseEvent) {
                    raiseEvent = false;
                    setTimeout(RaiseButtonPress, 1000);
                }
            }
        });

        function RaiseButtonPress() {
            if (btnNumber != 0 && btnNumber <= numberOfColumnsPerRow) {
                var btnRaised = btnNumber + (currentRow) * numberOfColumnsPerRow;
                var btnCurrentState = btnRaised in btnStateData ? btnStateData[btnRaised] : 0;
                if (!isNullOrUndefined(ButtonPressed) && btnCurrentState == 0) {
                    ButtonPressed(btnRaised);
                    btnStateData[btnRaised] = 1;
                } else if (!isNullOrUndefined(ButtonReleased) && btnCurrentState == 1) {
                    ButtonReleased(btnRaised);
                    btnStateData[btnRaised] = 0;
                }
                let data = JSON.stringify(btnStateData);
                fs.writeFileSync(__dirname + '/buttonstate.json', data);
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
                    setTimeout(setToPrevRow, 1000);
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
                    setTimeout(setToNextRow, 1000);
                }
            }
        });

        function setToPrevRow() {
            currentRow -= 1;
            if (currentRow < 0)
                currentRow = numberOfRows - 1;
            ProcessButtonStateEventForCurrentRow();
            resetStatuses();

        }

        function setToNextRow() {
            currentRow += 1;
            if (currentRow >= numberOfRows)
                currentRow = 0;
            ProcessButtonStateEventForCurrentRow();
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

    SetActiveRow(postionOfRow) {
        currentRow = postionOfRow;
        if (currentRow >= numberOfRows)
            currentRow = 0;
        ProcessButtonStateEventForCurrentRow();
    }

    //ReleaseButton(btnNumber) {
    //    btnStateData[btnNumber] = 0;
    //    let data = JSON.stringify(btnStateData);
    //    fs.writeFileSync(__dirname + '/buttonstate.json', data);
    //}
}

module.exports = MatrixSwitchInputControler

