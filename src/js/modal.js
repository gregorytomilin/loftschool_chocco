// Модальное окно
let $hamburgerMenuBtn = document.querySelector('.hamburger');
let $closeMenuBtn = document.querySelector('.menu__closeBTn');
let $menu = document.querySelector('.menu');

$hamburgerMenuBtn.addEventListener('click', (e) => {
    e.preventDefault();
    $menu.classList.add('visible');
    $hamburgerMenuBtn.style.display = 'none';
    document.body.style.overflow = 'hidden';

})

$closeMenuBtn.addEventListener('click', (e) => {
    e.preventDefault();
    $menu.classList.remove('visible');
    $hamburgerMenuBtn.style.display = 'flex';
    document.body.style.overflow = 'visible';
})

// END Модальное окно