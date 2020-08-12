let $hamburgerMenuBtn = document.querySelector('.hamburger');
let $closeMenuBtn = document.querySelector('.menu__closeBTn');
let $menu = document.querySelector('.menu');

$hamburgerMenuBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    $menu.classList.add('visible')

})

$closeMenuBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    $menu.classList.remove('visible')

})






// ************************  Слайдер товаров

const arrowsRight = document.querySelector('.slider__right');
const arrowsLeft = document.querySelector('.slider__left');


const slideWidth = document.querySelector('.slider__item');
const rootSlider = document.getElementById('sliderRoot');
const sliderList = document.querySelector('.slider__list');

console.log(rootSlider.scrollWidth);
console.log(sliderList.scrollWidth);
console.log(sliderList.clientWidth);


let sliderPosition = 0;



// обработчики нажатия правых стрелок
arrowsRight.addEventListener('click', () => moveRight());
// обработчики нажатия левых стрелок
arrowsLeft.addEventListener('click', () => moveLeft());

// Свайпы
// sliderList.addEventListener('swiped-right', ()=> moveLeft());
// sliderList.addEventListener('swiped-left', ()=> moveRight());


function moveRight() {
    sliderPosition+= slideWidth.clientWidth;
    console.log(sliderPosition);


    if (sliderPosition === sliderList.scrollWidth){
        sliderPosition = 0;
    }
    rootSlider.style.transform = `translate(-${sliderPosition}px)`;
}

function moveLeft() {
    console.log(sliderPosition);

    if (sliderPosition === 0){
        sliderPosition = sliderList.scrollWidth - slideWidth.clientWidth;
    }else{
        sliderPosition -= slideWidth.clientWidth;
    }
    rootSlider.style.transform = `translate(-${sliderPosition}px)`;
}


// ************************  END Слайдер товаров