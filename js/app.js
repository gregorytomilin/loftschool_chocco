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
            removeClassOfArray(teamMemberDesc, 'teamMember__desc--active');
            removeClassOfArray(teamMemberName, 'teamMember__name--active');
            removeClassOfArray(teamMemberAvatar, 'teamMember__avatar--active');
        }


        if (item.classList.contains('teamMember__name--active')) {
            clearClass();
        } else {
            clearClass();
            item.classList.add('teamMember__name--active');
            thisDesc.classList.add('teamMember__desc--active');
            thisAvatar.classList.add('teamMember__avatar--active');
        }



    }
    )
})

// END - Аккордеон Команда

function removeClassOfArray(arrayName, className) {
    arrayName.forEach(arrayItem => {
        arrayItem.classList.remove(className);
    });
}

function addClassOfArray(arrayName, className) {
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

// Отправка данных на сервер + валидация формы

const closeResponceForm = document.querySelector('.app-closeResponceForm');
const responseModal = document.querySelector('.responseModal');
const responseModalForm = responseModal.querySelector('.responseModal__title');

closeResponceForm.addEventListener('click', () => {
    responseModal.style.display = 'none';
    document.body.style.overflow = 'visible';
})

$('.form').submit(e => {
    e.preventDefault();
    const form = $(e.currentTarget);
    const name = form.find("[name='name']");
    const phone = form.find("[name='phone']");
    const comment = form.find("[name='comment']");
    const to = form.find("[name='to']");

    [name, phone, comment, to].forEach(field => {
        if (field.val().trim() === '') {
            field.addClass("inputError");
        } else {
            field.removeClass("inputError");

        }
    });

    const inputError = form.find('.inputError');

    if (inputError.length === 0) {

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
            error: data => {
                responseModal.style.display = 'flex'
                responseModalForm.innerHTML = data.responseJSON.message;
                document.body.style.overflow = 'hidden';
            }
        })

    }

})


// Видео плеер


const containerVideo = document.querySelector('.video');
const video = containerVideo.querySelector('video');
const playpause = containerVideo.querySelector('.video__playpause');
const play = containerVideo.querySelector('.video__play');
const controls = containerVideo.querySelector('.video__controls');
const total = containerVideo.querySelector('.video__total');
const progress = containerVideo.querySelector('.video__current');
const dynamic = containerVideo.querySelector('.video__volume-control');
const volume = containerVideo.querySelector('.video__volume-progress');
const volumeProgress = volume.firstElementChild;

playpause.addEventListener('click', togglePlay);
play.addEventListener('click', togglePlay);
video.addEventListener('play', playPause);
video.addEventListener('pause', playPause);
total.addEventListener('click', setCurrentTime);
video.addEventListener('timeupdate', timeUpdate);
dynamic.addEventListener('click', mute);
volume.addEventListener('click', setVolume);

function setVolume(e) {
    volumeProgress.style.width = `${e.offsetX - 6}px`;
    video.volume = e.offsetX / volume.clientWidth;
}

function mute(e) {
    dynamic.classList.toggle('muted');
    video.muted = !video.muted;
    if (video.muted) {
        dynamic.innerHTML = `
        <svg class="video__play-iconSound">
        <use xlink:href="img/icons/sprite.svg#player-mute" />
    </svg>
        `
    } else {
        dynamic.innerHTML = `
        <svg class="video__play-iconSound">
        <use xlink:href="img/icons/sprite.svg#player-sound" />
    </svg>
        `
    }
}

function playPause() {
    controls.classList.toggle('paused');
    if (video.paused) {
        playpause.innerHTML =
            `
        <svg class="video__playpause-icon">
        <use xlink:href="img/icons/sprite.svg#player-play" />
    </svg>
        `;

    } else {
        playpause.innerHTML =
            `
        <svg class="video__playpause-icon">
            <use xlink:href="img/icons/sprite.svg#player-pause" />
        </svg>
        `

    }
}

function togglePlay() {
    video.paused ? video.play() : video.pause();
}

function setCurrentTime(e) {
    const offsetX = e.offsetX / total.clientWidth;
    video.currentTime = offsetX * video.duration;
}

function timeUpdate() {
    const progressTime = video.currentTime / video.duration;
    progress.style.width = `${progressTime * total.clientWidth - 6}px`;
}

// Аккордеон меню

const accordeonTabs = document.querySelectorAll('.choccoTypes__list li');
const accordeonItems = document.querySelectorAll('.choccoTypes__item-description');
const accordeonItemsDescription = document.querySelectorAll('.choccoTypes__item-description p');


const tabWidth = document.querySelector('.choccoTypes__item-title').offsetWidth;
const windowWidth = document.documentElement.clientWidth;
const maxAccordeonItemWidth = windowWidth - tabWidth * accordeonItems.length;

accordeonTabs.forEach((item, index) => {
    item.addEventListener('click', (e) => {
        let descriptionBlock = accordeonItems[index].querySelector('p')
        if (windowWidth < 480) {
            accordeonItems[index].style.width = maxAccordeonItemWidth + 'px';
            descriptionBlock.style.minWidth = maxAccordeonItemWidth + 'px';
        }

        if (accordeonItems[index].classList.contains('choccoTypes__item-description_active')) {
            accordeonItems[index].classList.toggle('choccoTypes__item-description_active');
            descriptionBlock.classList.toggle('visible');

        } else {

            removeClassOfArray(accordeonItems, 'choccoTypes__item-description_active');
            removeClassOfArray(accordeonItemsDescription, 'visible');
            accordeonItems[index].classList.toggle('choccoTypes__item-description_active');
            descriptionBlock.classList.toggle('visible');
        }


    })
})



const sections = $('section');
const display = $('.maincontent');
const sideMenu = $('.fixed-menu');
const menuItems = sideMenu.find('.fixed-menu__item');

const mobileDetect = new MobileDetect(window.navigator.userAgent);;
const isMobile = mobileDetect.mobile();


let inScroll = false;

sections.first().addClass('active');

const countSectionPosition = sectionEq => {
    const position = sectionEq * -100
    if (isNaN(position)) {
        return 0;
    }
    return position;
}

const changeMenuThemeForSection = sectionEq => {
    const currentSection = sections.eq(sectionEq);
    const menuTheme = currentSection.attr('data-side-menu');
    const activeClass = "fixed-menu--shadowed"


    if (menuTheme === 'black') {
        sideMenu.addClass(activeClass);
    } else {
        sideMenu.removeClass(activeClass);
    }
}

const resetActiveClassForItem = (items, itemEq, activeClass) => {
    items.eq(itemEq).addClass(activeClass).siblings().removeClass(activeClass);
}

const performTransition = (sectionEq) => {

    if (inScroll) return;

    const transitionOver = 1000;
    const mouseInertionOver = 300;
    inScroll = true;
    const position = countSectionPosition(sectionEq);
    changeMenuThemeForSection(sectionEq);
    display.css({
        transform: `translateY(${position}%)`
    });


    resetActiveClassForItem(sections, sectionEq, 'active');

    setTimeout(() => {
        inScroll = false;

        resetActiveClassForItem(menuItems, sectionEq, 'fixed-menu__item--active')
    }, transitionOver + mouseInertionOver);


}

const viewportScroller = () => {

    const activeSection = sections.filter('.active');
    const nextSection = activeSection.next();
    const prevSection = activeSection.prev();

    return {
        next() {
            if (nextSection.length) {
                performTransition(nextSection.index());
            }
        },
        prev() {
            if (prevSection.length) {
                performTransition(prevSection.index());
            }
        }
    }




};

$(window).on('wheel', e => {
    const deltaY = e.originalEvent.deltaY;
    const scroller = viewportScroller();


    if (deltaY > 0) {
        scroller.next()
    }
    if (deltaY < 0) {
        scroller.prev()
    }
});

$(window).on('keydown', e => {
    const tagName = e.target.tagName.toLowerCase();
    const userTypingInInputs = tagName === 'input' || tagName === 'textarea';
    const scroller = viewportScroller();


    if (userTypingInInputs) return;
    switch (e.keyCode) {
        case 38:
            scroller.prev();
            break;
        case 40:
            scroller.next();
            break;

    }


});

// https://github.com/mattbryson/TouchSwipe-Jquery-Plugin
$('.wrapper').on('touchmove', e => {
    e.preventDefault();
})

if (isMobile) {

    $("body").swipe({
        swipe: function (event, direction) {
            const scroller = viewportScroller();
            let scrollDirection = '';
            if (direction === 'up') scrollDirection = 'next';
            if (direction === 'down') scrollDirection = 'prev';
            scroller[scrollDirection]();

        }
    });

}

const navMenuItems = document.querySelectorAll('.menu__link');
const navFixedMenuItems = document.querySelectorAll('.fixed-menu__item');
const viewPort = document.querySelector('.maincontent');
const sectionsNav = document.querySelectorAll('section');


navFixedMenuItems.forEach((item, index) => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        goToSection(index);
    });

})

function goToSection(index) {
    viewPort.style.transform = `translateY(${(index) * (-100)}%)`;
    removeClassOfArray(sectionsNav, 'active');
    removeClassOfArray(navFixedMenuItems, 'fixed-menu__item--active');
    navFixedMenuItems[index].classList.add('fixed-menu__item--active');
    changeMenuThemeForSection(index);
    sectionsNav[index].classList.add('active');
}

navMenuItems.forEach((item, index) => {
    item.addEventListener('click', (e) => {
        e.preventDefault();

        switch (index) {
            case 0:
                goToSection(1)
                break;
            case 1:
                goToSection(2)
                break;
            case 2:
                goToSection(3)
                break;
            case 3:
                goToSection(4)
                break;
            case 4:
                goToSection(5)
                break;
            case 5:
                goToSection(6)
                break;
            case 6:
                goToSection(8)
                break;

        }

    })
});


const linkToOrder = document.querySelectorAll('.linkToOrder');
linkToOrder.forEach((item)=>{
    item.addEventListener('click', (e)=>{
        e.preventDefault();
        goToSection(7)
    })
})


