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


    let deadline = '2018-09-20';

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
    };

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
                clearInterval(timeInterval);
            }
        }
        updateClock();

        let timeInterval = setInterval(updateClock, 1000);

    }

    setClock('timer', deadline);



});



