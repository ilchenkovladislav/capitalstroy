function newYearIn() {
    const now = new Date();
    const newYear = new Date(2025, 0, 1);
    const totalRemains = newYear.getTime() - now.getTime();

        const RemainsSec = Math.floor(totalRemains / 1000);
        const RemainsFullDays = Math.floor(RemainsSec / (24 * 60 * 60));

        const secInLastDay = RemainsSec - RemainsFullDays * 24 * 3600;
        let RemainsFullHours = Math.floor(secInLastDay / 3600);

        RemainsFullHours = RemainsFullHours < 10 ? "0" + RemainsFullHours : RemainsFullHours;

        const secInLastHour = secInLastDay - RemainsFullHours * 3600;
        let RemainsMinutes = Math.floor(secInLastHour / 60);

        RemainsMinutes = RemainsMinutes < 10 ? "0" + RemainsMinutes : RemainsMinutes;

        document.querySelector(".timer__day").innerHTML = RemainsFullDays;
        document.querySelector(".timer__hour").innerHTML = RemainsFullHours;
        document.querySelector(".timer__minute").innerHTML = RemainsMinutes;

        setTimeout(newYearIn, 60000); // Обновляем таймер каждую минуту
}

newYearIn();
