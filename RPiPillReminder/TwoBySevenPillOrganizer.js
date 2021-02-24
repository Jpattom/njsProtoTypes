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


/***
 * @example parameterizedString("my name is %s1 and surname is %s2", "John", "Doe");
 * @return "my name is John and surname is Doe"
 *
 * @firstArgument {String} like "my name is %s1 and surname is %s2"
 * @otherArguments {String | Number}
 * @returns {String}
 */
function Format (...args) {
    const str = args[0];
    const params = args.filter((arg, index) => index !== 0);
    if (!str) return "";
    return str.replace(/%s[0-9]+/g, matchedStr => {
        const variableIndex = matchedStr.replace("%s", "") - 1;
        return params[variableIndex];
    });
}

const schedule = require('node-schedule');
const { isNullOrUndefined } = require('util');

const numberOfSlotsPerDay = 2;
const numberOfDays = 7;
/*

*    *    *    *    *    *
┬    ┬    ┬    ┬    ┬    ┬
│    │    │    │    │    │
│    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
│    │    │    │    └───── month (1 - 12)
│    │    │    └────────── day of month (1 - 31)
│    │    └─────────────── hour (0 - 23)
│    └──────────────────── minute (0 - 59)
└───────────────────────── second (0 - 59, OPTIONAL)

*/

var morningSchedule = "*/5 8-12 * * %s1";
var nightschdule = "*/5 19-23 * * %s1";

var WhenScheduleElapse;
var WhenScheduleExpires;
const pillreminderJobs = {};

class TwoBySevenPillOrganizer {

    constructor(whenScheduleElapse, whenScheduleExpires) {
        WhenScheduleElapse = whenScheduleElapse;
        WhenScheduleExpires = whenScheduleExpires;
    }

    WhenPillInSlot(slotNumber) {
        var dateScheduled = GetSchedule(slotNumber);
        console.log(dateScheduled);
        var job = schedule.scheduleJob(dateScheduled, function (slotNumber) {
            if (!isNullOrUndefined(WhenScheduleElapse)) {
                WhenScheduleElapse();
            }
            console.log("Please Take medicine in slot number", slotNumber);
        }.bind(null, slotNumber));

        pillreminderJobs[slotNumber] = job;

    }

    WhenPillOutOfSlot(slotNumber) {

        var job = pillreminderJobs[slotNumber];
        if (!isNullOrUndefined(job)) {
            job.cancel();
            delete pillreminderJobs[slotNumber];

        }
        pillreminderJobs[slotNumber]
        console.log('Pills taken from Slot ' + slotNumber);
        WhenScheduleExpires();
    }

    GetNumberOfSlotsPerDay() { return numberOfSlotsPerDay; }
    GetNumberOfDays() { return numberOfDays; }

}

function GetSchedule(slotNumber) {
    var dayOfSlot = (slotNumber % 2) == 0 ? (slotNumber / 2) - 1 : ((slotNumber + 1) / 2) - 1;
    return (slotNumber % 2) === 0 ? Format(nightschdule, dayOfSlot) : Format(morningSchedule, dayOfSlot);
}

module.exports = TwoBySevenPillOrganizer 
