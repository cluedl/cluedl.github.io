Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

Date.prototype.toIsoShort = function() {
    var date = new Date(this.valueOf())
    return date.toISOString().split('T')[0]
}

//var date = new Date();
//console.log(date.addDays(5));