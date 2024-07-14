// import Swiper bundle with all modules installed
import Swiper from "swiper/bundle";

// import styles bundle
import "swiper/css/bundle";

// init Swiper visual:
const swiperVisual = new Swiper(".visual-swiper", {
  loop: true,
  loopAdditionalSlides: 1,
  speed: 800,
  autoplay: {
    delay: 2000,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination-visual",
    type: "fraction",
  },
  navigation: {
    nextEl: ".swiper-visual-button-next",
    prevEl: ".swiper-visual-button-prev",
  },
  parallax: true,
  observer: true,
  observeSlideChildren: true,
  observeParents: true,
});

// init Swiper product:
const swiperProductRecomd = new Swiper(".product-swiper-recomd", {
  slidesPerView: 4,
  spaceBetween: 30,
  loop: false,
  loopAdditionalSlides: 1,
  navigation: {
    nextEl: ".swiper-product-recomd-button-next",
    prevEl: ".swiper-product-recomd-button-prev",
  },
  parallax: true,
  observer: true,
  observeSlideChildren: true,
  observeParents: true,
});

const swiperProductSale = new Swiper(".product-swiper-sale", {
  slidesPerView: 4,
  spaceBetween: 30,
  loop: false,
  loopAdditionalSlides: 1,
  navigation: {
    nextEl: ".swiper-product-Sale-button-next",
    prevEl: ".swiper-product-Sale-button-prev",
  },
  parallax: true,
  observer: true,
  observeSlideChildren: true,
  observeParents: true,
});
