function tab() {
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

}


module.exports = tab;
