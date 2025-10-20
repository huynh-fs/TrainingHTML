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
      imgSrc: "./image 7.png",
      name: "Polo with Contrast Trims",
      rating: 4.0,
      price: 212,
      originalPrice: 242,
      discount: -20,
    },
    {
      imgSrc: "./image 8.png",
      name: "Gradient Graphic T-shirt",
      rating: 3.5,
      price: 145,
    },
    {
      imgSrc: "./image 9.png",
      name: "Polo with Tipping Details",
      rating: 4.5,
      price: 180,
    },
    {
      imgSrc: "./image 10.png",
      name: "Black Striped T-shirt",
      rating: 5.0,
      price: 120,
      originalPrice: 150,
      discount: -30,
    },
    {
      imgSrc: "./image 7.png",
      name: "Polo with Contrast Trims",
      rating: 4.0,
      price: 212,
      originalPrice: 242,
      discount: -20,
    },
    {
      imgSrc: "./image 8.png",
      name: "Gradient Graphic T-shirt",
      rating: 3.5,
      price: 145,
    },
    {
      imgSrc: "./image 9.png",
      name: "Polo with Tipping Details",
      rating: 4.5,
      price: 180,
    },
    {
      imgSrc: "./image 10.png",
      name: "Black Striped T-shirt",
      rating: 5.0,
      price: 120,
      originalPrice: 150,
      discount: -30,
    },
  ];

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
      starsHTML += '<img src="./star.png" alt="star" />';
    }
    if (hasHalfStar) {
      starsHTML += '<img src="./star-half.png" alt="star-half" />';
    }
    return starsHTML;
  }

  function renderReviews(reviewsToRender) {
    if (!reviewsGrid) return;
    reviewsGrid.innerHTML = "";

    if (reviewsToRender.length === 0) {
      reviewsGrid.innerHTML = "<p>No reviews match the selected filter.</p>";
      return;
    }

    reviewsToRender.forEach((review) => {
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
                    ? `<span class="review-card__verified-badge" title="Verified Purchaser"><img src="./check.png" alt="" /></span>`
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

  function createProductStarsHTML(rating) {
    let starsHTML = "";
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      starsHTML += `<img src="./star-min.png" alt="" />`;
    }
    if (hasHalfStar) {
      starsHTML += `<img src="./star-half-min.png" alt="" />`;
    }
    return starsHTML;
  }

  function renderRecommendations() {
    if (!recommendationsTrack) return;
    recommendationsTrack.innerHTML = "";

    const totalItems = recommendationsData.length;
    const itemsVisible = 4;

    const totalTrackWidth = (totalItems / itemsVisible) * 100;
    recommendationsTrack.style.width = `${totalTrackWidth}%`;

    const itemWidth = 100 / totalItems;

    recommendationsData.forEach((product) => {
      const productCard = document.createElement("article");
      productCard.className = "product-card";
      productCard.style.width = `${itemWidth}%`;

      productCard.innerHTML = `
          <div class="product-card__image-wrapper">
            <img src="${product.imgSrc}" alt="${product.name}" />
          </div>
          <h3 class="product-card__name">${product.name}</h3>
          <div class="product-card__rating">
            <div class="product-card__stars">
              ${createProductStarsHTML(product.rating)}
            </div>
            <span class="product-card__score">
              ${product.rating.toFixed(
                1
              )}/<span class="product-card__score-total">5</span>
            </span>
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

  // LOGIC SLIDER
  let currentItemIndex = 0;
  const totalItems = recommendationsData.length;
  const itemsVisible = 4;
  const maxIndex = totalItems - itemsVisible;
  let autoplayInterval = null;

  function updateSliderPosition() {
    if (!recommendationsTrack) return;
    const itemWidthPercentage = 100 / totalItems;
    const offset = -currentItemIndex * itemWidthPercentage;
    recommendationsTrack.style.transform = `translateX(${offset}%)`;
  }

  function showNextSlide() {
    if (currentItemIndex < maxIndex) {
      currentItemIndex++;
    } else {
      currentItemIndex = 0;
    }
    updateSliderPosition();
  }

  function showPrevSlide() {
    if (currentItemIndex > 0) {
      currentItemIndex--;
    } else {
      currentItemIndex = maxIndex;
    }
    updateSliderPosition();
  }

  function startAutoplay() {
    stopAutoplay();
    autoplayInterval = setInterval(showNextSlide, 30000);
  }

  function stopAutoplay() {
    clearInterval(autoplayInterval);
  }

  if (nextBtn && prevBtn) {
    nextBtn.addEventListener("click", () => {
      showNextSlide();
      startAutoplay();
    });

    prevBtn.addEventListener("click", () => {
      showPrevSlide();
      startAutoplay();
    });
  }

  renderReviews(reviewsData);
  renderRecommendations();
  startAutoplay();
});
