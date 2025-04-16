const showMenuBtn = document.querySelector(".js-show-menu");

const goToMenu = () => {
  window.scrollTo({
    top: document.querySelector(".restaurant-menu-section").offsetTop - 75,
    behavior: "smooth",
  })
}

showMenuBtn.addEventListener('click', goToMenu);

