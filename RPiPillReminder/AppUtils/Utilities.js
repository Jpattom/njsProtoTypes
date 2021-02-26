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
 * example parameterizedString("my name is %s1 and surname is %s2", "John", "Doe");
 * return "my name is John and surname is Doe"
 *
 * firstArgument {String} like "my name is %s1 and surname is %s2"
 * otherArguments {String | Number}
 * returns {String}
 */
function Format(...args) {
    const str = args[0];
    const params = args.filter((arg, index) => index !== 0);
    if (!str) return "";
    return str.replace(/%s[0-9]+/g, matchedStr => {
        const variableIndex = matchedStr.replace("%s", "") - 1;
        return params[variableIndex];
    });
}



