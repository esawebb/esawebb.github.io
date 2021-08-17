const rocket = document.querySelector('.c-rocket');
const flames = [...document.querySelectorAll('.c-rocket__flame')];
const delay = 40;
let now = Date.now();
let then = Date.now();
let elapsed = 0;

const random = (min, max) => Math.random() * (max - min) + min;

const animeFlames = () => {
  //console.log(random(1, 2));
  now = Date.now();
  elapsed = now - then;

  if(elapsed > delay) {
    flames.map(flame => {
      flame.style.transform = `scale(${random(0.8, 1)}, ${random(0.8, 1)})`;
    });
    
    then = Date.now();
  }
  
  requestAnimationFrame(animeFlames);
};

const createStar = () => {
  const star = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  star.setAttribute('r', random(4.5, 22.5));
  star.setAttribute('cx', random(50, 2550));
  star.setAttribute('cy', random(-450, -2550));
  star.setAttribute('fill', '#898989');
  
  return star;
};

const animeStars = () => {
  let starDuration = 0;
  const randomStar = random(0, 5);

  if (randomStar > 4.5) {
    const star = createStar();
    
    rocket.insertBefore(star, rocket.firstChild);
    
    const starSize = star.getAttribute('r');
    
    if (starSize < 7) {
      starDuration = 25000;
      star.style.opacity = random(0.5, 0.7);
    } else if (starSize < 10) {
      starDuration = 20000;
      star.style.opacity = random(0.6, 0.8);
    } else if (starSize < 18) {
      starDuration = 15000;
      star.style.opacity = random(0.7, 0.9);
    } else {
      starDuration = 10000;
      star.style.opacity = random(0.8, 0.95);
    }
    
    anime({
      targets: star,
      translateX: [
        { value: -3000, duration: starDuration, easing: 'linear', }
      ],
      translateY: [
        { value: 3000, duration: starDuration, easing: 'linear', }
      ],
      complete: () => {
        star.remove();
      },
    });
  }
  
  requestAnimationFrame(animeStars);
};

const space = () => {
  requestAnimationFrame(animeFlames);
  requestAnimationFrame(animeStars);
}

requestAnimationFrame(space);