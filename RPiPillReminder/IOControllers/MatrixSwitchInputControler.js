const { exception } = require('console');
const { isNullOrUndefined } = require('util');
const Gpio = require('pigpio').Gpio; //include pigpio to interact with the GPIO
const fs = require('fs');

const btnNextPin = 22;
const btn1n3Pin = 23;
const btn2Pin = 24;
const btn4Pin = 25;

var btnStateData = require(__dirname + '/buttonstate.json');  //new Object();

var currentRow = 7;
var numberOfRows = 7;
var numberOfColumnsPerRow
var ButtonPressed;
var ButtonReleased;

var RowChangeEvent = function (rowNumber) { };


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

    constructor(buttonPressed, buttonReleased, onRowChange, paramNumberOfRows = 7, nuberOfColumns = 3, initRow = 0) {
        numberOfRows = paramNumberOfRows;
        numberOfColumnsPerRow = nuberOfColumns;
        ButtonPressed = buttonPressed;
        ButtonReleased = buttonReleased;

        RowChangeEvent = onRowChange;


        Object.keys(btnStateData).forEach(function (key) {
            switch (parseInt(btnStateData[key])) {
                case 0:
                    ButtonPressed(parseInt(key));
                    break;
                case 1:
                    ButtonPressed(parseInt(key));
            }

        });

        if (initRow < numberOfRows) {
            currentRow = initRow;
        } else
            throw exception('businnesslayerexception:Cannot set current row to ' + initRow + ' row number based on 0; if number of is 7 max of init row can be between 0 and 6')

        ProcessButtonStateEventForCurrentRow();

        var raiseEvent = true;
        var btnNumber = 0;

        const btn1n3 = new Gpio(btn1n3Pin, {
            mode: Gpio.INPUT, pullupdon: Gpio.PUD_OFF, edge: Gpio.RISING_EDGE, alert: false, timeout: 10
        }); 

        btn1n3.glitchFilter(10000);

        var captureB1 = true;

        btn1n3.on('interrupt', (value) => { 
            if (value === 1 && captureB1) {
                btnNumber = btnNumber + 1;
                captureB1 = false;
                if (raiseEvent) {
                    raiseEvent = false;
                    setTimeout(RaiseButtonPress, 1000);
                }
            }
        });

        const btn2n3 = new Gpio(btn2Pin, {
            mode: Gpio.INPUT, pullupdon: Gpio.PUD_OFF, edge: Gpio.RISING_EDGE, alert: false, timeout: 10
        }); 

        btn2n3.glitchFilter(10000);

        var captureB2 = true;

        btn2n3.on('interrupt', (value) => { 
            if (value === 1 && captureB2) {
                btnNumber = btnNumber + 2;
                captureB2 = false;
                if (raiseEvent) {
                    raiseEvent = false;
                    setTimeout(RaiseButtonPress, 1000);
                }
            }
        });

        const btn4 = new Gpio(btn4Pin, {
            mode: Gpio.INPUT, pullupdon: Gpio.PUD_OFF, edge: Gpio.RISING_EDGE, alert: false, timeout: 10
        }); 

        btn4.glitchFilter(10000);

        var captureB5 = true;

        btn4.on('interrupt', (value) => { 
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

        

        const btnNext = new Gpio(btnNextPin, {
            mode: Gpio.INPUT, pullupdon: Gpio.PUD_OFF, edge: Gpio.RISING_EDGE, alert: false, timeout: 10
        });

        btnNext.glitchFilter(10000);

        var captureB4 = true;

        btnNext.on('interrupt', (value) => { 
            if (value === 1 && captureB4) {
                captureB4 = false;
                if (raiseEvent) {
                    raiseEvent = false;
                    setTimeout(setToNextRow, 1000);
                }
            }
        });

        

        function setToNextRow() {
            currentRow += 1;
            if (currentRow >= numberOfRows)
                currentRow = 0;
            ProcessButtonStateEventForCurrentRow();
            resetStatuses();
            RowChangeEvent(currentRow);
        }

        function resetStatuses() {
            btnNumber = 0;
            raiseEvent = true;
            captureB1 = true;
            captureB2 = true;
           // captureB3 = true;
            captureB4 = true;
            captureB5 = true;
        }
    }

    SetActiveRow(postionOfRow) {
        if (currentRow != postionOfRow) {
            currentRow = postionOfRow;
            if (currentRow >= numberOfRows)
                currentRow = 0;
            ProcessButtonStateEventForCurrentRow();          
        }
    }

}

module.exports = MatrixSwitchInputControler

