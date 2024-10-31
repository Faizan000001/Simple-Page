
// Selecting all necessary elements
const menuBtns = document.querySelectorAll('.menu-btn');
const menu = document.querySelector('.menu');
const links = document.querySelectorAll('.menu li');
const cntrl = document.querySelectorAll('.slider-cntrl');
const cntrlMob = document.querySelectorAll('.pagination-mobile > li');
const title = document.querySelector('.title');
const subTitle = document.querySelectorAll('.sub-title');
const count = document.querySelector('.slider-count');
const progress = document.querySelector('.progress div');
const mainImage = document.querySelector('.main-image');

// Toggle the side navigation menu
menuBtns.forEach(btn => {
    btn.addEventListener('click', sideNavToggle);
});

function sideNavToggle() {
    let delay = 100;
    menu.classList.toggle('menu-open');
    
    // Slide-in animation for menu links
    links.forEach((link, index) => {
        link.style.opacity = "0";
        link.style.animation = `slideIn 400ms ease-in-out forwards ${delay * (index + 1)}ms`;
        delay += 100;
    });
    
    // Reset animations after the delay
    setTimeout(() => {
        links.forEach(link => {
            link.style.animation = "none";
            link.style.opacity = "1";
        });
    }, delay + 100);
}

// Slider logic
let id = 0;
const images = [
    'image/faizan3.jpg',
    'image/faizan2.jpg',
    'image/faizan4.jpg',
];
const progressWidth = ['33%', '66%', '100%'];
const text = ['Work', 'Active', 'Travel'];

// Slider control events
cntrl.forEach((control, index) => {
    control.addEventListener('click', () => {
        updateSlider(index);
        id = index;
        resetAutoSlide();
    });
});

cntrlMob.forEach((mobileControl, index) => {
    mobileControl.addEventListener('click', () => {
        updateSlider(index);
        id = index;
        resetAutoSlide();
    });
});

function updateSlider(i) {
    // Update main image, title, and subtitle
    mainImage.src = images[i];
    progress.style.width = progressWidth[i];
    title.innerText = `${text[i]} Collection`;
    subTitle.forEach(sub => {
        sub.innerText = `${text[i]} Collection`;
    });

    // Update slide count and active class for controls
    count.innerText = "/0" + (i + 1);
    cntrl.forEach(ctrl => ctrl.classList.remove('active'));
    cntrlMob.forEach(mobileCtrl => mobileCtrl.classList.remove('pag-active'));

    // Set active class on the current controls
    cntrl[i].classList.add('active');
    if (cntrlMob[i]) cntrlMob[i].classList.add('pag-active');
}

// Automatic slide control
function nextSlide() {
    id = (id + 1) % cntrl.length;
    updateSlider(id);
}

// Reset auto-slide interval
let autoSlide = setInterval(nextSlide, 10000);

function resetAutoSlide() {
    clearInterval(autoSlide);
    autoSlide = setInterval(nextSlide, 10000);
}


