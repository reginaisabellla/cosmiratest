document.addEventListener("DOMContentLoaded", function () {
  const reviewsContainer = document.querySelector(".reviews-container");
  const createReviewButton = document.querySelector(".create-review");

  // Redirect to Write Review Page
  if (createReviewButton) {
    createReviewButton.addEventListener("click", function () {
      window.location.href = "writereview.html";
    });
  }

  // Load Reviews on Page Load
  loadReviews();

  function loadReviews() {
    let reviews = JSON.parse(localStorage.getItem("reviews")) || [];
    reviewsContainer.innerHTML = "";

    reviews.forEach((review, index) => {
      const reviewElement = document.createElement("div");
      reviewElement.classList.add("review");

      const tagClass = formatTagClass(review.tag);

      reviewElement.innerHTML = `
              <div class="review-header">
                  <img src="/cosmira/assests/img/profilepicture1.jpg" alt="Profile Pic" class="profile-pic">
                  <span class="username">${review.username}</span>
                  <span class="tag ${tagClass}">${review.tag}</span>
                  <span class="skin-tone-circle" style="background-color: ${getSkinToneColor(review.skinTone)};"></span>
                  <div class="rating">⭐ ${review.rating}</div>
              </div>
              <p>${review.review}</p>
              ${review.image ? `<img src="${review.image}" alt="User uploaded image" class="review-image">` : ""}
              <button class="styled-delete-button" data-index="${index}">Delete</button>
          `;
      reviewsContainer.prepend(reviewElement);
    });

    document.querySelectorAll(".styled-delete-button").forEach((button) => {
      button.addEventListener("click", function () {
        deleteReview(this.getAttribute("data-index"));
      });
    });
  }

  function deleteReview(index) {
    let reviews = JSON.parse(localStorage.getItem("reviews")) || [];
    reviews.splice(index, 1);
    localStorage.setItem("reviews", JSON.stringify(reviews));
    loadReviews();
  }

  function getSkinToneColor(skinTone) {
    const skinToneColors = {
      Fair: "#f3d8c7",
      Light: "#e0b899",
      Medium: "#c98e67",
      Tan: "#a56a44",
      Deep: "#6b3f27",
    };
    return skinToneColors[skinTone] || "#c98e67"; // Default to Medium
  }

  function formatTagClass(tag) {
    const tagClasses = {
      "Medium Coverage": "medium-coverage",
      "Natural Finish": "natural-finish",
      "Long Wear": "long-wear",
    };
    return tagClasses[tag] || "default-tag";
  }
});
