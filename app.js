
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
    'https://files.oaiusercontent.com/file-UMoOENrX4aryarC7hlURho5r?se=2024-10-31T11%3A59%3A20Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3D7968bc39-0c86-4012-b7fb-9309286d7a28.webp&sig=x336go3LZgLRBRiGpBT1rX6tC3E8pghbOBSDZgtYPtI%3D',
    'https://files.oaiusercontent.com/file-uJbnhd3SfLGBBHcq8ONKhOWY?se=2024-10-31T12%3A01%3A17Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3D1170ba20-82c9-4fed-878d-5933e09b123f.webp&sig=Q0OZHmqRBJfU7ydriplCkopbvOMOVVjKDkIOw5OAVt8%3D',
    'https://files.oaiusercontent.com/file-TcCcARhIT0gIqTFNHq6J8tmY?se=2024-10-31T12%3A02%3A48Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3D22b2d740-d6c4-4ac1-b021-5761efbb91c6.webp&sig=4o5RsNNcfHYS2V16EqGJNlMtBPncw3eRpzZPnZYj/SY%3D',
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


