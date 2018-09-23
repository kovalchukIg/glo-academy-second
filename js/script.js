window.addEventListener("DOMContentLoaded", function () {
    let infoTab = document.getElementsByClassName('info-header-tab'),
        infoHeader = document.getElementsByClassName('info-header')[0],
        infoContent = document.getElementsByClassName('info-tabcontent');

    function hideTab(a) {
        for (let i = a; i < infoContent.length; i++){
            infoContent[i].classList.remove('show');
            infoContent[i].classList.add('hide');
        }
    }

    hideTab(1);

    function showTab(b) {
        if (infoContent[b].classList.contains('hide')){
            hideTab(0);
            infoContent[b].classList.remove('hide');
            infoContent[b].classList.add('show');
        }
    }

    infoHeader.addEventListener('click', function (event) {
        let target = event.target;
        if (target.className == 'info-header-tab'){
            for (let i = 0; i < infoTab.length; i++){
                if(target == infoTab[i]){
                    showTab(i);
                    break;
                }
            }
        }
    })


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


    let more = document.querySelector('.more'),
        overlay = document.querySelector('.overlay'),
        popupClose = document.querySelector('.popup-close'),
        descriptionBtn = document.querySelectorAll('.description-btn');

    for (let i = 0; i < descriptionBtn.length; i++){
            descriptionBtn[i].addEventListener('click', function () {
            overlay.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    }



    more.addEventListener('click', function () {
        overlay.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });

    popupClose.addEventListener('click', function () {
        overlay.style.display = 'none';
        document.body.style.overflow = '';
    });


    let messege = new Object();
    messege.loading = "Загрузка...";
    messege.success = "Спасибо скоро мы с вами сважемся";
    messege.failrule = "Что-то пошло не так...";


    let form = document.getElementsByClassName('main-form')[0],
        contactForm = document.getElementById('form'),
        contactInput = contactForm.querySelectorAll('input'),
        input = form.getElementsByTagName("input"),
        statusMassage = document.createElement('div');
        statusMassage.classList.add('status');


    form.addEventListener('submit', function (event) {
        event.preventDefault();
        form.appendChild(statusMassage);

        let request = new XMLHttpRequest();
        request.open("POST", "server.php");
        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

        let formData = new FormData(form);

        request.send(formData);

        request.onreadystatechange = function () {
            if (request.readyState < 4){
                statusMassage.innerHTML = messege.loading;
            }else if (request.readyState === 4){
                if(request.status == 200 && request.status < 300){
                    statusMassage.innerHTML = messege.success;
                }
                else {
                    statusMassage.innerHTML = messege.failrule;
                }
            }
        };
        for (let i = 0; i < input.length; i++){
            input[i].value = '';
        }
    });


    //comtactForm

    contactForm.addEventListener('submit', function (event) {
        event.preventDefault();

        contactForm.appendChild(statusMassage);

    let json = JSON.stringify(contactForm),
        contactRequest = new XMLHttpRequest();
    contactRequest.open("POST", "server.php");
    contactRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    contactRequest.send(json);

    contactRequest.onreadystatechange = function () {
        if (contactRequest.readyState < 4){
            statusMassage.innerHTML = messege.loading;
        }else if (contactRequest.readyState === 4){
            if (contactRequest.status == 200 && contactRequest.status < 300){
                statusMassage.innerHTML = messege.success;
            }
            else {
                statusMassage.innerHTML = messege.failrule;
            }
        }
    }
        for (let i = 0; i < contactInput.length; i++){
            contactInput[i].value = '';
        }

    });

    let slideIndex = 1,
        sliders = document.getElementsByClassName('slider-item'),
        prev = document.querySelector('.prev'),
        next = document.querySelector('.next'),
        sliderDots = document.querySelector('.slider-dots'),
        dots = sliderDots.getElementsByClassName('dot');

    showSlides(slideIndex);

    function showSlides(n) {
        if (n > sliders.length){
            slideIndex = 1;
        };

        if(n < 1){
            slideIndex = sliders.length;
        }

        for(i = 0; i < sliders.length; i++){
            sliders[i].style.display = "none";
        }

        for (i = 0; i < dots.length; i++){
            dots[i].classList.remove("dot-active");
        }

        sliders[slideIndex - 1].style.display = 'block';
        dots[slideIndex -1].classList.add("dot-active");


    }


    function plusSides(n) {
        showSlides(slideIndex += n);
    }
    
    function currentSides(n) {
        showSlides(slideIndex = n);
    }
    
    prev.addEventListener('click', function () {
        plusSides(-1);
    });
    next.addEventListener('click', function () {
        plusSides(1);
    });

    sliderDots.addEventListener('click', function (event) {
        for (let i = 0; i < dots.length + 1; i++){
            if (event.target.classList.contains('dot') && event.target == dots[i-1]){
                currentSides(i);
            }
        }
    })

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

});



