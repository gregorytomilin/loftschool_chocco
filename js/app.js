let $hamburgerMenuBtn = document.querySelector('.hamburger');
let $closeMenuBtn = document.querySelector('.menu__closeBTn');
let $menu = document.querySelector('.menu');

$hamburgerMenuBtn.addEventListener('click', (e) => {
    e.preventDefault();
    $menu.classList.add('visible')

})

$closeMenuBtn.addEventListener('click', (e) => {
    e.preventDefault();
    $menu.classList.remove('visible')

})






// ************************  Слайдер товаров

const arrowsRight = document.querySelector('.slider__right');
const arrowsLeft = document.querySelector('.slider__left');


const slideWidth = document.querySelector('.slider__item');
const rootSlider = document.querySelector('#sliderRoot');
const sliderList = document.querySelector('.slider__list');
const sliderItem = document.querySelectorAll('.slider__item');



// обработчики нажатия правых стрелок
arrowsRight.addEventListener('click', () => moveRight());
// обработчики нажатия левых стрелок
arrowsLeft.addEventListener('click', () => moveLeft());

// Свайпы
// sliderList.addEventListener('swiped-right', ()=> moveLeft());
// sliderList.addEventListener('swiped-left', ()=> moveRight());

let sliderPosition = 0;

let slideStep = sliderList.offsetWidth;
let maxTranslate = slideStep * sliderItem.length;


window.addEventListener('resize', ()=>{
    console.log('Изменён размер документа')

    rootSlider.style.transform = `translate(0px)`;
    slideStep = sliderList.offsetWidth;
    maxTranslate = slideStep * sliderItem.length;

    console.log(slideStep);
    console.log(maxTranslate);
})



function moveRight() {

    sliderPosition += slideStep;

    if (sliderPosition === maxTranslate) {
        sliderPosition = 0;
    }

    rootSlider.style.transform = `translate(-${sliderPosition}px)`;
}

function moveLeft() {


    sliderPosition -= slideStep;

    if (sliderPosition < 0) {
        sliderPosition = maxTranslate - slideStep;
    }


    rootSlider.style.transform = `translate(-${sliderPosition}px)`;
}


// ************************  END Слайдер товаров