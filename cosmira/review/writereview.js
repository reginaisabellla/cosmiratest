document.addEventListener("DOMContentLoaded", function () {
  const skinTypeBtn = document.getElementById("skinTypeBtn");
  const productTypeBtn = document.getElementById("productTypeBtn");
  const skinTypeDropdown = document.getElementById("skinTypeDropdown");
  const productTypeDropdown = document.getElementById("productTypeDropdown");
  const skinTypeOptions = document.getElementById("skinTypeOptions");
  const productTypeOptions = document.getElementById("productTypeOptions");

  const skinTypeCheckboxes = skinTypeOptions.querySelectorAll(
    "input[type='checkbox']"
  );
  const productTypeCheckboxes = productTypeOptions.querySelectorAll(
    "input[type='checkbox']"
  );

  // Toggle dropdown visibility
  skinTypeBtn.addEventListener("click", function () {
    skinTypeDropdown.classList.toggle("active");
    productTypeDropdown.classList.remove("active"); // Close the other dropdown
  });

  productTypeBtn.addEventListener("click", function () {
    productTypeDropdown.classList.toggle("active");
    skinTypeDropdown.classList.remove("active"); // Close the other dropdown
  });

  // Close dropdowns when clicking outside
  document.addEventListener("click", function (event) {
    if (
      !skinTypeBtn.contains(event.target) &&
      !skinTypeDropdown.contains(event.target)
    ) {
      skinTypeDropdown.classList.remove("active");
    }
    if (
      !productTypeBtn.contains(event.target) &&
      !productTypeDropdown.contains(event.target)
    ) {
      productTypeDropdown.classList.remove("active");
    }
  });

  // Limit selection to 2 for both categories
  function limitSelection(checkboxes) {
    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", function () {
        let checkedCount = Array.from(checkboxes).filter(
          (c) => c.checked
        ).length;
        if (checkedCount >= 2) {
          checkboxes.forEach((c) => {
            if (!c.checked) c.disabled = true;
          });
        } else {
          checkboxes.forEach((c) => (c.disabled = false));
        }
      });
    });
  }

  limitSelection(skinTypeCheckboxes);
  limitSelection(productTypeCheckboxes);
});
