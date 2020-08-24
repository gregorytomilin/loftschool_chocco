// Модальное окно


let $hamburgerMenuBtn = document.querySelector('.hamburger');
let $closeMenuBtn = document.querySelector('.menu__closeBTn');
let $menu = document.querySelector('.menu');

$hamburgerMenuBtn.addEventListener('click', (e) => {
    e.preventDefault();
    $menu.classList.add('visible')
    document.body.style.overflow = 'hidden';

})

$closeMenuBtn.addEventListener('click', (e) => {
    e.preventDefault();
    $menu.classList.remove('visible');
    document.body.style.overflow = 'visible';
})

// END Модальное окно





// Слайдер товаров

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


window.addEventListener('resize', () => {

    rootSlider.style.transform = `translate(0px)`;
    slideStep = sliderList.offsetWidth;
    maxTranslate = slideStep * sliderItem.length;

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


// END - Слайдер товаров




// Аккордеон Команда

let teamMemberName = document.querySelectorAll('.teamMember__name');
let teamMemberDesc = document.querySelectorAll('.teamMember__desc');
let teamMemberAvatar = document.querySelectorAll('.teamMember__avatar');


teamMemberName.forEach((item, index) => {

    item.addEventListener('click', (e) => {

        e.preventDefault();

        let parent = teamMemberName[index].parentNode;
        let thisDesc = parent.querySelector('.teamMember__desc');
        let thisAvatar = parent.querySelector('.teamMember__avatar');

        let clearClass = () => {
            teamMemberDesc.forEach(desc => {
                desc.classList.remove('teamMember__desc--active');
            });
            teamMemberName.forEach(name => {
                name.classList.remove('teamMember__name--active');
            });
            teamMemberAvatar.forEach(avatar => {
                avatar.classList.remove('teamMember__avatar--active');
            });
        }


        if (item.classList.contains('teamMember__name--active')) {
            clearClass();

        } else {

            clearClass()

            item.classList.add('teamMember__name--active');
            thisDesc.classList.add('teamMember__desc--active');
            thisAvatar.classList.add('teamMember__avatar--active');
        }



    }
    )
})

// END - Аккордеон Команда

function removeClassOfArray(arrayName, className){
    arrayName.forEach(arrayItem => {
        arrayItem.classList.remove(className);
    });
}

function addClassOfArray(arrayName, className){
    arrayName.forEach(arrayItem => {
        arrayItem.classList.add(className);
    });
}

// СлайдШоу Отзывы

let feedbacks = document.querySelectorAll('.reviews__display');
let feedbackUser = document.querySelectorAll('.reviews__swither-item');


feedbackUser.forEach((user, number) => {
    user.addEventListener('click', (e) => {

        e.preventDefault();
        removeClassOfArray(feedbackUser, 'interactive-avatar--active');
        addClassOfArray(feedbacks, 'reviews__display--hidden');
        feedbacks[number].classList.remove('reviews__display--hidden');
        user.classList.add('interactive-avatar--active');
    })
})

// Отправка данных на сервер

const closeResponceForm = document.querySelector('.app-closeResponceForm');
const responseModal = document.querySelector('.responseModal');
const responseModalForm = responseModal.querySelector('.responseModal__title');

closeResponceForm.addEventListener('click', ()=>{
    responseModal.style.display = 'none';
    document.body.style.overflow = 'visible';
})

$('.form').submit(e=>{
    e.preventDefault();
    const form = $(e.currentTarget);
    const name = form.find("[name='name']");
    const phone = form.find("[name='phone']");
    const comment = form.find("[name='comment']");
    const to = form.find("[name='to']");

    [name, phone, comment, to].forEach(field => {
        if (field.val().trim() === ''){
            field.addClass("inputError");
        } else {
            field.removeClass("inputError");

}
});

    const inputError = form.find('.inputError');

    if(inputError.length === 0){

        $.ajax({
            url: "https://webdev-api.loftschool.com/sendmail",
            method: "post",
            data: {
                name: name.val(),
                phone: phone.val(),
                comment: comment.val(),
                to: to.val()
            },

            success: data => {
                responseModal.style.display = 'flex';
                responseModalForm.innerHTML = data.message;
                document.body.style.overflow = 'hidden';
                name.val('');
                phone.val('');
                comment.val('');
            },
            error: data =>{
                responseModal.style.display = 'flex'
                responseModalForm.innerHTML = data.responseJSON.message;
                document.body.style.overflow = 'hidden';
            }
        })

    }

})