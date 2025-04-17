
// ---- SLIDERS on the home page

var swiper = new Swiper(".swiper__main", {
  loop: true,
  slidesPerView: 'auto',
  spaceBetween: 20,
  autoplay: {
    delay: 2000,
    disableOnInteraction: true,
  },
  navigation: {
    nextEl: '.s-button-next-ah',
    prevEl: '.s-button-prev-ah',
  },
  breakpoints: {
    414: {
      slidesPerView: 'auto',
      spaceBetween: 20,
    },
    1024: {
      slidesPerView: 'auto',
      spaceBetween: 40,
    },
    1280: {
      slidesPerView: 'auto',
      spaceBetween: 40,
    },
  },
});

var swiper1 = new Swiper(".swiper__main_1", {
  loop: true,
  slidesPerView: 'auto',
  spaceBetween: 20,
  autoplay: {
    delay: 2000,
    disableOnInteraction: true,
    reverseDirection: true,
  },
  navigation: {
    nextEl: '.s-button-next-ar',
    prevEl: '.s-button-prev-ar',
  },
  breakpoints: {
    414: {
      slidesPerView: 'auto',
      spaceBetween: 20,
    },
    1024: {
      slidesPerView: 'auto',
      spaceBetween: 40,
    },
    1280: {
      slidesPerView: 'auto',
      spaceBetween: 40,
    },
  },
});

var swiper2 = new Swiper(".swiper__main_2", {
  loop: true,
  slidesPerView: 'auto',
  spaceBetween: 20,
  autoplay: {
    delay: 2000,
    disableOnInteraction: true,
  },
  navigation: {
    nextEl: '.s-button-prev-dr',
    prevEl: '.s-button-next-dr',
  },
  breakpoints: {
    414: {
      slidesPerView: 'auto',
      spaceBetween: 20,
    },
    1024: {
      slidesPerView: 'auto',
      spaceBetween: 34,
    },
    1280: {
      slidesPerView: 'auto',
      spaceBetween: 86,
    },
  },
});

var swiper3 = new Swiper(".swiper__main_3", {
  loop: true,
  slidesPerView: 'auto',
  spaceBetween: 20,
  autoplay: {
    delay: 2000,
    disableOnInteraction: true,
  },
  navigation: {
    nextEl: '.s-button-prev-dh',
    prevEl: '.s-button-next-dh',
  },
  breakpoints: {
    414: {
      slidesPerView: 'auto',
      spaceBetween: 20,
    },
    1024: {
      slidesPerView: 'auto',
      spaceBetween: 34,
    },
    1280: {
      slidesPerView: 'auto',
      spaceBetween: 86,
    },
  },
});

var swiper4 = new Swiper(".swiper__main_4", {
  loop: true,
  slidesPerView: 'auto',
  spaceBetween: 20,
  autoplay: {
    delay: 2000,
    disableOnInteraction: true,
  },
  navigation: {
    nextEl: '.s-button-next-drah',
    prevEl: '.s-button-prev-drah',
  },
  breakpoints: {
    414: {
      slidesPerView: 'auto',
      spaceBetween: 20,
    },
    1024: {
      slidesPerView: 'auto',
      spaceBetween: 40,
    },
    1280: {
      slidesPerView: 'auto',
      spaceBetween: 40,
    },
  },
});


// ---- SLIDERS on the room page

var swiper = new Swiper('.js-swiper-hotel-room', {
  loop: true,
  autoplay: {
  delay: 2000,
  disableOnInteraction: true,
  },
  navigation: {
    nextEl: '.s-button-next',
    prevEl: '.s-button-prev',
  },
});