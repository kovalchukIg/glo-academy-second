function culc() {
    let persons = document.getElementsByClassName('counter-block-input')[0],
        restDay = document.getElementsByClassName('counter-block-input')[1],
        place = document.getElementById('select'),
        totalValue = document.getElementById('total'),
        personSum = 0,
        daySum = 0,
        total = 0;

    totalValue.innerHTML = 0;

    persons.addEventListener('change', function () {
        personSum = +this.value;
        total = (daySum + personSum)*4000;
        totalValue.innerHTML = total;

        if (restDay.value == ''){
            totalValue.innerHTML = 0;
        }else {
            totalValue.innerHTML = total;
        }
    });

    restDay.addEventListener('change', function () {
        daySum = +this.value;
        total = (daySum + personSum)*4000;
        totalValue.innerHTML = total;

        if (persons.value == ''){
            totalValue.innerHTML = 0;
        }else {
            totalValue.innerHTML = total;
        }
    });

    place.addEventListener('change', function () {
        if (restDay.value == '' || persons.value == ''){
            totalValue.innerHTML = 0;
        }else {
            let a = total;
            totalValue.innerHTML = a * this.options[this.selectedIndex].value;

        }
    })

}

module.exports = culc;
