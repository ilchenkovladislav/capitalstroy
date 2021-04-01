function newYearIn() {
    var now = new Date();
    var newYear = new Date(2021, 5, 25);
    var totalRemains = (newYear.getTime()-now.getTime());
    
    if (totalRemains>1)
    {
        var RemainsSec=(parseInt(totalRemains/1000));
        var RemainsFullDays=(parseInt(RemainsSec/(24*60*60)));

        var secInLastDay=RemainsSec-RemainsFullDays*24*3600;
        var RemainsFullHours=(parseInt(secInLastDay/3600));

        if (RemainsFullHours<10) {
            RemainsFullHours="0"+RemainsFullHours
        };
        
        var secInLastHour=secInLastDay-RemainsFullHours*3600;
        var RemainsMinutes=(parseInt(secInLastHour/60));

        if (RemainsMinutes<10) {
            RemainsMinutes = "0" + RemainsMinutes
        };

        var lastSec=secInLastHour-RemainsMinutes*60;

        if (lastSec<10) {
            lastSec = "0" + lastSec
        };

        document.querySelector(".timer__day").innerHTML = RemainsFullDays;
        document.querySelector(".timer__hour").innerHTML = RemainsFullHours;
        document.querySelector(".timer__minute").innerHTML = RemainsMinutes;

        setTimeout("newYearIn()", 10000);
    }
}
newYearIn();