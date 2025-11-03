const slider = document.querySelector('.slider');
const cards = slider.querySelectorAll('.project-card');
const leftBtn = document.querySelector('.slider-btn.left');
const rightBtn = document.querySelector('.slider-btn.right');

const cardWidth = cards[0].offsetWidth + 16;

leftBtn.addEventListener('click', () => {
  slider.scrollBy({ left: -cardWidth, behavior: 'smooth' });
});

rightBtn.addEventListener('click', () => {
  slider.scrollBy({ left: cardWidth, behavior: 'smooth' });
});
