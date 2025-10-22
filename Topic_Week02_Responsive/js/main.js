document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".header__hamburger");
  const navList = document.querySelector(".header__nav-list");
  const navItems = document.querySelectorAll(".header__nav-item");
  const allSubmenuParents = document.querySelectorAll(".has-submenu");

  if (hamburger && navList) {
    hamburger.addEventListener("click", function (event) {
      event.stopPropagation();
      this.classList.toggle("is-active");
      navList.classList.toggle("is-open");
    });
  }

  navItems.forEach(function (item) {
    item.addEventListener("click", function (event) {
      event.stopPropagation();

      if (this.classList.contains("has-submenu")) {
        event.preventDefault();

        const isAlreadyOpen = this.classList.contains("submenu-open");

        allSubmenuParents.forEach(function (parent) {
          parent.classList.remove("submenu-open");
        });

        if (!isAlreadyOpen) {
          this.classList.add("submenu-open");
        }
      } else {
        allSubmenuParents.forEach(function (parent) {
          parent.classList.remove("submenu-open");
        });
      }
    });
  });

  document.addEventListener("click", function () {
    if (hamburger && navList) {
      hamburger.classList.remove("is-active");
      navList.classList.remove("is-open");
    }
    allSubmenuParents.forEach(function (item) {
      item.classList.remove("submenu-open");
    });
  });

  const images = document.querySelectorAll(".main-visual__image");
  let currentIndex = 0;
  if (images.length > 1) {
    function showNextImage() {
      images[currentIndex].classList.remove("main-visual__image--active");
      currentIndex = (currentIndex + 1) % images.length;
      images[currentIndex].classList.add("main-visual__image--active");
    }
    setInterval(showNextImage, 10000);
  }
});
