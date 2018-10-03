function slider() {
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
}

module.exports = slider;
