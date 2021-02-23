// JavaScript source code

Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

Date.prototype.addHours = function (hours) {
    var date = new Date(this.valueOf());
    date.setHours(date.getHours() + hours);
    return date;
}

Date.prototype.addMinutes = function (minutes) {
    var date = new Date(this.valueOf());
    date.setMinutes(date.getMinutes() + minutes);
    return date;
}

const schedule = require('node-schedule');

const numberOfSlotsPerDay = 2;
const numberOfDays = 7;

const Slot1Startime = '8:00:00';
const Slot1Endtime = '11:59:00';

const Slot2Startime = '20:00:00';
const Slot2Endtime = '23:59:59';

const WeekStartDay = 0;

class TwoBySevenPillOrganizer {

    constructor() { }
    WhenPillInSlot(slotNumber) {
        console.log('Pills Placed in Slot ' + slotNumber);
        GetDate(slotNumber);
    }

    WhenPillOutOfSlot(slotNumber) {
        console.log('Pills taken from Slot ' + slotNumber);
    }

    GetNumberOfSlotsPerDay() { return numberOfSlotsPerDay; }
    GetNumberOfDays() { return numberOfDays; }

}

function GetDate(slotNumber) {
    var dateObj = new Date();
    var today = Date.now();
    var todaysNumber = dateObj.getDay();
    var dayOfSlot = slotNumber;
    var isAM = (dayOfSlot % 2) != 0; 
    if (isAM) {
        dayOfSlot++; 
    }
    dayOfSlot = (dayOfSlot / 2) - 1
}

module.exports = TwoBySevenPillOrganizer 
