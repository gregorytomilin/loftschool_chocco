let $hamburgerMenuBtn = document.querySelector('.hamburger');
let $closeMenuBtn = document.querySelector('.menu__closeBTn');
let $menu = document.querySelector('.menu');

$hamburgerMenuBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    $menu.classList.add('visible')
    // $menu.style.visibility = 'visible';
    // $menu.style.opacity = '1';

})

$closeMenuBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    $menu.classList.remove('visible')
    // $menu.style.visibility = 'hidden';
    // $menu.style.opacity = '0';
})