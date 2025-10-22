document.addEventListener("DOMContentLoaded", function () {
  const reviewsData = [
    {
      author: "Samantha D.",
      rating: 4.5,
      verified: true,
      text: '"I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It\'s become my favorite go-to shirt."',
      date: "2023-08-14",
      displayDate: "Posted on August 14, 2023",
    },
    {
      author: "Alex M.",
      rating: 4,
      verified: true,
      text: '"The t-shirt exceeded my expectations! The colors are vibrant and the print quality is top-notch. Being a UI/UX designer myself, I\'m quite picky about aesthetics, and this t-shirt definitely gets a thumbs up from me."',
      date: "2023-08-15",
      displayDate: "Posted on August 15, 2023",
    },
    {
      author: "Ethan R.",
      rating: 3.5,
      verified: true,
      text: '"This t-shirt is a must-have for anyone who appreciates good design. The minimalistic yet stylish pattern caught my eye, and the fit is perfect. I can see the designer\'s touch in every aspect of this shirt."',
      date: "2023-08-16",
      displayDate: "Posted on August 16, 2023",
    },
    {
      author: "Olivia P.",
      rating: 4,
      verified: true,
      text: '"As a UI/UX enthusiast, I value simplicity and functionality. This t-shirt not only represents those principles but also feels great to wear. It\'s evident that the designer poured their creativity into making this t-shirt stand out."',
      date: "2023-08-17",
      displayDate: "Posted on August 17, 2023",
    },
    {
      author: "Liam K.",
      rating: 5,
      verified: true,
      text: "\"This t-shirt is a fusion of comfort and creativity. The fabric is soft, and the design speaks volumes about the designer's skill. It's like wearing a piece of art that reflects my passion for both design and fashion.\"",
      date: "2023-08-18",
      displayDate: "Posted on August 18, 2023",
    },
    {
      author: "Ava H.",
      rating: 4.5,
      verified: true,
      text: "\"I'm not just wearing a t-shirt; I'm wearing a piece of design philosophy. The intricate details and thoughtful layout of the design make this shirt a conversation starter.\"",
      date: "2023-08-19",
      displayDate: "Posted on August 19, 2023",
    },
  ];

  const recommendationsData = [
    {
      imgSrc: "./images/image 7.png",
      name: "Polo with Contrast Trims",
      rating: 4.0,
      price: 212,
      originalPrice: 242,
      discount: -20,
    },
    {
      imgSrc: "./images/image 8.png",
      name: "Gradient Graphic T-shirt",
      rating: 3.5,
      price: 145,
    },
    {
      imgSrc: "./images/image 9.png",
      name: "Polo with Tipping Details",
      rating: 4.5,
      price: 180,
    },
    {
      imgSrc: "./images/image 10.png",
      name: "Black Striped T-shirt",
      rating: 5.0,
      price: 120,
      originalPrice: 150,
      discount: -30,
    },
    {
      imgSrc: "./images/image 7.png",
      name: "Polo with Contrast Trims",
      rating: 4.0,
      price: 212,
      originalPrice: 242,
      discount: -20,
    },
    {
      imgSrc: "./images/image 8.png",
      name: "Gradient Graphic T-shirt",
      rating: 3.5,
      price: 145,
    },
    {
      imgSrc: "./images/image 9.png",
      name: "Polo with Tipping Details",
      rating: 4.5,
      price: 180,
    },
    {
      imgSrc: "./images/image 10.png",
      name: "Black Striped T-shirt",
      rating: 5.0,
      price: 120,
      originalPrice: 150,
      discount: -30,
    },
  ];

  // PRODUCT OPTIONS LOGIC

  // Color và Size
  const colorSwatches = document.querySelectorAll(".product__color-swatch");
  const sizeBtns = document.querySelectorAll(".product__size-btn");

  function handleActiveState(elements, activeClass) {
    elements.forEach((element) => {
      element.addEventListener("click", () => {
        elements.forEach((el) => el.classList.remove(activeClass));
        element.classList.add(activeClass);
      });
    });
  }

  if (colorSwatches.length > 0) {
    handleActiveState(colorSwatches, "product__color-swatch--active");
  }

  if (sizeBtns.length > 0) {
    handleActiveState(sizeBtns, "product__size-btn--active");
  }

  // Quantity Selector
  const quantityContainer = document.querySelector(".product__quantity");

  if (quantityContainer) {
    const decreaseBtn = quantityContainer.querySelector(
      '.product__quantity-btn[aria-label="Decrease quantity"]'
    );
    const increaseBtn = quantityContainer.querySelector(
      '.product__quantity-btn[aria-label="Increase quantity"]'
    );
    const quantityValueEl = quantityContainer.querySelector(
      ".product__quantity-value"
    );

    increaseBtn.addEventListener("click", () => {
      let currentValue = parseInt(quantityValueEl.textContent);
      currentValue++;
      quantityValueEl.textContent = currentValue;
    });

    decreaseBtn.addEventListener("click", () => {
      let currentValue = parseInt(quantityValueEl.textContent);
      if (currentValue > 1) {
        currentValue--;
        quantityValueEl.textContent = currentValue;
      }
    });
  }

  // TABS LOGIC
  const tabs = document.querySelectorAll(".tabs__item");
  const tabContents = document.querySelectorAll(".content-section");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((item) => item.classList.remove("tabs__item--active"));
      tabContents.forEach((content) =>
        content.classList.remove("content-section--active")
      );

      const targetContentId = tab.getAttribute("data-tab");
      const targetContent = document.getElementById(targetContentId);

      tab.classList.add("tabs__item--active");
      if (targetContent) {
        targetContent.classList.add("content-section--active");
      }
    });
  });

  // REVIEWS FILTER LOGIC
  const reviewsGrid = document.getElementById("reviews-grid");

  function createReviewStarsHTML(rating) {
    let starsHTML = "";
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      starsHTML += '<img src="./images/star.png" alt="star" />';
    }
    if (hasHalfStar) {
      starsHTML += '<img src="./images/star-half.png" alt="star-half" />';
    }
    return starsHTML;
  }

  function renderReviews(reviewsToRender) {
    if (!reviewsGrid) return;
    reviewsGrid.innerHTML = "";

    const isMobile = window.innerWidth <= 480;

    const reviewsToDisplay = isMobile
      ? reviewsToRender.slice(0, 3)
      : reviewsToRender;

    if (reviewsToDisplay.length === 0) {
      reviewsGrid.innerHTML = "<p>No reviews match the selected filter.</p>";
      return;
    }

    reviewsToDisplay.forEach((review) => {
      const reviewCard = `
        <article class="review-card">
          <div class="review-card__header">
            <div class="review-card__info">
              <div class="review-card__rating" aria-label="${
                review.rating
              } out of 5 stars">
                ${createReviewStarsHTML(review.rating)}
              </div>
              <div class="review-card__author">
                <span class="review-card__author-name">${review.author}</span>
                ${
                  review.verified
                    ? `<span class="review-card__verified-badge" title="Verified Purchaser"><img src="./images/check.png" alt="" /></span>`
                    : ""
                }
              </div>
            </div>
            <button class="review-card__options" aria-label="More options">•••</button>
          </div>
          <p class="review-card__body">${review.text}</p>
          <time class="review-card__date" datetime="${review.date}">${
        review.displayDate
      }</time>
        </article>
      `;
      reviewsGrid.innerHTML += reviewCard;
    });
  }

  const filterBtn = document.getElementById("filter-btn");
  const filterDropdown = document.querySelector(".filter__dropdown");
  const filterItems = document.querySelectorAll(".filter__item");

  filterBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    filterDropdown.classList.toggle("filter__dropdown--show");
  });

  filterItems.forEach((item) => {
    item.addEventListener("click", () => {
      const selectedRating = parseInt(item.getAttribute("data-rating"), 10);
      filterDropdown.classList.remove("filter__dropdown--show");

      if (selectedRating === 0) {
        renderReviews(reviewsData);
      } else {
        const filteredReviews = reviewsData.filter(
          (review) => Math.floor(review.rating) === selectedRating
        );
        renderReviews(filteredReviews);
      }
    });
  });

  window.addEventListener("click", function (e) {
    if (
      filterDropdown &&
      !filterDropdown.contains(e.target) &&
      e.target !== filterBtn
    ) {
      filterDropdown.classList.remove("filter__dropdown--show");
    }
  });

  // RECOMMENDATIONS SLIDER LOGIC
  const recommendationsTrack = document.getElementById("recommendations-track");
  const nextBtn = document.getElementById("next-slide-btn");
  const prevBtn = document.getElementById("prev-slide-btn");
  let autoplayInterval = null;

  function renderRecommendations() {
    if (!recommendationsTrack) return;
    recommendationsTrack.innerHTML = "";

    function createProductStarsHTML(rating) {
      let starsHTML = "";
      const fullStars = Math.floor(rating);
      const hasHalfStar = rating % 1 !== 0;
      for (let i = 0; i < fullStars; i++) {
        starsHTML += `<img src="./images/star-min.png" alt="" />`;
      }
      if (hasHalfStar) {
        starsHTML += `<img src="./images/star-half-min.png" alt="" />`;
      }
      return starsHTML;
    }

    recommendationsData.forEach((product) => {
      const productCard = document.createElement("article");
      productCard.className = "product-card";
      productCard.innerHTML = `
        <div class="product-card__image-wrapper">
          <img src="${product.imgSrc}" alt="${product.name}" />
        </div>
        <h3 class="product-card__name">${product.name}</h3>
        <div class="product-card__rating">
          <div class="product-card__stars">${createProductStarsHTML(
            product.rating
          )}</div>
          <span class="product-card__score">${product.rating.toFixed(
            1
          )}/<span class="product-card__score-total">5</span></span>
        </div>
        <div class="product-card__price-container">
          <span class="product-card__price">$${product.price}</span>
          ${
            product.originalPrice
              ? `<span class="product-card__price--original">$${product.originalPrice}</span>`
              : ""
          }
          ${
            product.discount
              ? `<span class="product-card__discount">${product.discount}%</span>`
              : ""
          }
        </div>
      `;
      recommendationsTrack.appendChild(productCard);
    });
  }

  function setupSlider() {
    if (!recommendationsTrack || !nextBtn || !prevBtn) return;

    let currentIndex = 0;
    const slides = Array.from(recommendationsTrack.children);
    if (!slides.length) return;
    const totalItems = slides.length;

    let isDragging = false;
    let startPos = 0;
    let currentTranslate = 0;
    let animationID;

    function getSliderMetrics() {
      const slideWidth = slides[0].offsetWidth;
      const itemsVisible = Math.round(
        recommendationsTrack.parentElement.offsetWidth / slideWidth
      );
      const maxIndex = totalItems - itemsVisible;
      return { slideWidth, itemsVisible, maxIndex };
    }

    function updatePosition() {
      const { slideWidth, maxIndex } = getSliderMetrics();

      if (currentIndex > maxIndex) currentIndex = maxIndex;
      if (currentIndex < 0) currentIndex = 0;

      currentTranslate = -currentIndex * slideWidth;
      recommendationsTrack.style.transform = `translateX(${currentTranslate}px)`;
    }

    function showNextSlide() {
      const { maxIndex } = getSliderMetrics();
      if (currentIndex < maxIndex) {
        currentIndex++;
      } else {
        currentIndex = 0;
      }
      updatePosition();
    }

    function showPrevSlide() {
      const { maxIndex } = getSliderMetrics();
      if (currentIndex > 0) {
        currentIndex--;
      } else {
        currentIndex = maxIndex;
      }
      updatePosition();
    }

    // Autoplay
    function startAutoplay() {
      stopAutoplay();
      autoplayInterval = setInterval(showNextSlide, 5000);
    }

    function stopAutoplay() {
      clearInterval(autoplayInterval);
    }

    function getPositionX(event) {
      if (event.type.includes("mouse")) {
        return event.pageX;
      } else if (event.touches && event.touches.length > 0) {
        return event.touches[0].clientX;
      } else if (event.changedTouches && event.changedTouches.length > 0) {
        return event.changedTouches[0].clientX;
      }
      return 0;
    }

    function touchStart(event) {
      stopAutoplay();
      isDragging = true;
      startPos = getPositionX(event);

      const transformMatrix = window
        .getComputedStyle(recommendationsTrack)
        .getPropertyValue("transform");
      if (transformMatrix !== "none") {
        currentTranslate = parseInt(transformMatrix.split(",")[4].trim());
      } else {
        currentTranslate = 0;
      }

      recommendationsTrack.style.transition = "none";
      recommendationsTrack.style.cursor = "grabbing";
    }

    function touchMove(event) {
      if (isDragging) {
        const currentPosition = getPositionX(event);
        const moveX = currentPosition - startPos;
        recommendationsTrack.style.transform = `translateX(${
          currentTranslate + moveX
        }px)`;
      }
    }

    function touchEnd(event) {
      if (!isDragging) return;
      isDragging = false;

      const endPos = getPositionX(event);
      const movedBy = startPos - endPos;
      const { slideWidth, maxIndex } = getSliderMetrics();

      if (movedBy > slideWidth / 4 && currentIndex < maxIndex) {
        currentIndex++;
      }
      if (movedBy < -slideWidth / 4 && currentIndex > 0) {
        currentIndex--;
      }

      recommendationsTrack.style.transition = "transform 0.5s ease-in-out";
      recommendationsTrack.style.cursor = "grab";
      updatePosition();
      startAutoplay();
    }

    nextBtn.onclick = () => {
      showNextSlide();
      startAutoplay();
    };
    prevBtn.onclick = () => {
      showPrevSlide();
      startAutoplay();
    };

    slides.forEach((slide) => {
      slide
        .querySelector("img")
        .addEventListener("dragstart", (e) => e.preventDefault());

      slide.addEventListener("touchstart", touchStart, { passive: true });
      slide.addEventListener("touchend", touchEnd);
      slide.addEventListener("touchmove", touchMove, { passive: true });

      slide.addEventListener("mousedown", touchStart);
      slide.addEventListener("mouseup", touchEnd);
      slide.addEventListener("mouseleave", touchEnd);
      slide.addEventListener("mousemove", touchMove);
    });

    window.addEventListener("resize", () => {
      currentIndex = 0;
      updatePosition();
    });

    startAutoplay();
  }

  renderReviews(reviewsData);
  renderRecommendations();
  setupSlider();
});
