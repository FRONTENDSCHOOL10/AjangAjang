// import Swiper bundle with all modules installed
import Swiper from "swiper/bundle";

// import styles bundle
import "swiper/css/bundle";

// init Swiper visual:
const swiperVisual = new Swiper(".visual-swiper", {
  loop: true,
  loopAdditionalSlides: 1,
  speed: 800,
  pagination: {
    el: ".swiper-pagination-visual",
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  parallax: true,
  observer: true,
  observeSlideChildren: true,
  observeParents: true,
});

// init Swiper product:
// const swiperProduct = new Swiper(".visual-swiper", {
//   loop: true,
//   loopAdditionalSlides: 1,
//   speed: 800,
//   pagination: {
//     el: ".swiper-pagination-visual",
//   },
//   navigation: {
//     nextEl: ".swiper-button-next",
//     prevEl: ".swiper-button-prev",
//   },
//   parallax: true,
//   observer: true,
//   observeSlideChildren: true,
//   observeParents: true,
// });
