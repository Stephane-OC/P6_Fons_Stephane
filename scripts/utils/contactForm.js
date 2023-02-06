// Function to display contact modal
function displayModal() {
  // Select modal element
  const modal = document.getElementById("contact_modal");
  // Select all elements outside modal
  const outsideElements = document.querySelectorAll("body *");
  // Select submit button in modal
  const submitButton = document.querySelector('.contact_button[type="submit"]');
  // Select close button in modal
  const closeButton = document.querySelector("#contact_modal img");

  // For each element outside modal, set tabindex to -1
  outsideElements.forEach((element) => {
    if (!element.closest("#contact_modal")) {
      element.setAttribute("tabindex", "-1");
    }
  });
  closeButton.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      closeModal();
      document.getElementById("contactForm").reset();
    }
  });
  
  // Display modal
  modal.style.display = "block";
  // Select all focusable elements within modal (excluding tabindex -1)
  const focusableElements = document.querySelectorAll(
    '#contact_modal *[tabindex]:not([tabindex="-1"])'
  );
  // If there are no focusable elements within modal, return
  if (!focusableElements.length) {
    return;
  }
  // For each focusable element, set tabindex to 0
  for (let i = 0; i < focusableElements.length; i++) {
    focusableElements[i].setAttribute("tabindex", "0");
  }
  // If there is a first focusable element, focus on it
  if (focusableElements[0]) {
    focusableElements[0].focus();
  }
  // When submit button is in focus and Tab key is pressed,
  submitButton.addEventListener("keydown", (event) => {
    // prevent default behaviour
    if (event.key === "Tab") {
      event.preventDefault();
      // focus on close button
      closeButton.focus();
      
    }
  });

  modal.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeModal();
      document.getElementById("contactForm").reset();
    }   
  });
}

function closeModal() {
  // Select modal element by its ID
  const modal = document.getElementById("contact_modal");
  // Set display property of modal to "none" to hide it
  modal.style.display = "none";
  // Select all elements inside body
  const outsideElements = document.querySelectorAll("body *");
  // Loop through each element and remove 'tabindex' attribute
  // if it is not inside modal
  outsideElements.forEach((element) => {
    if (!element.closest("#contact_modal")) {
      element.removeAttribute("tabindex");
    }
  });
  // Select all elements inside modal that have a 'tabindex' attribute
  const focusableElements = modal.querySelectorAll("*[tabindex]");
  // Remove 'tabindex' attribute from each element
  focusableElements.forEach((el) => el.removeAttribute("tabindex"));
}
