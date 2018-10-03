function timer() {
    let deadline = '2018-10-20';

    function getTimeRemaining(end) {
        let t = Date.parse(end) - Date.parse(new Date()),
            seconds = Math.floor((t/1000) % 60),
            minutes = Math.floor((t/1000/60) % 60),
            hours = Math.floor((t/(1000*60*60)));

        return {
            'total': t,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function setClock(id, endTime) {
        let timer = document.getElementById(id),
            seconds = timer.querySelector('.seconds'),
            minutes = timer.querySelector('.minutes'),
            hours = timer.querySelector('.hours');


        function updateClock() {
            let t = getTimeRemaining(endTime);
            hours.innerHTML = t.hours;
            seconds.innerHTML = t.seconds;
            minutes.innerHTML = t.minutes;

            if (t.total <= 0){
                hours.innerHTML = "00";
                seconds.innerHTML = "00";
                minutes.innerHTML = "00";
                clearInterval(timeInterval);
            }
        }
        updateClock();

        let timeInterval = setInterval(updateClock, 1000);

    }

    setClock('timer', deadline);

}

module.exports = timer;
