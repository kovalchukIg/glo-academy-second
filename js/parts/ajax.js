function ajax() {
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
}
module.exports = ajax;
