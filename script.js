document.addEventListener("DOMContentLoaded", () => {
  
  // 1. MOBILE NAVIGATION TOGGLE
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");
  const navLinkItems = document.querySelectorAll(".nav-link");

  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    const icon = hamburger.querySelector("i");
    icon.classList.toggle("fa-bars");
    icon.classList.toggle("fa-xmark");
  });

  navLinkItems.forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      const icon = hamburger.querySelector("i");
      icon.classList.add("fa-bars");
      icon.classList.remove("fa-xmark");
    });
  });

  // 2. DARK / LIGHT THEME TOGGLE
  const themeToggleBtn = document.getElementById("theme-toggle");
  const body = document.body;
  const themeIcon = themeToggleBtn.querySelector("i");

  themeToggleBtn.addEventListener("click", () => {
    if (body.classList.contains("dark-theme")) {
      body.classList.replace("dark-theme", "light-theme");
      themeIcon.classList.replace("fa-moon", "fa-sun");
    } else {
      body.classList.replace("light-theme", "dark-theme");
      themeIcon.classList.replace("fa-sun", "fa-moon");
    }
  });

  // 3. SCROLL REVEAL ANIMATIONS
  const revealElements = document.querySelectorAll(".scroll-reveal");

  const revealOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  revealElements.forEach(el => revealOnScroll.observe(el));

  // 4. CONTACT FORM VALIDATION
  const contactForm = document.getElementById("contact-form");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const messageInput = document.getElementById("message");
  const formStatus = document.getElementById("form-status");

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    let isValid = true;

    document.getElementById("name-error").textContent = "";
    document.getElementById("email-error").textContent = "";
    document.getElementById("message-error").textContent = "";
    formStatus.textContent = "";

    if (nameInput.value.trim() === "") {
      document.getElementById("name-error").textContent = "Name is required.";
      isValid = false;
    }

    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (emailInput.value.trim() === "") {
      document.getElementById("email-error").textContent = "Email is required.";
      isValid = false;
    } else if (!emailInput.value.match(emailPattern)) {
      document.getElementById("email-error").textContent = "Please enter a valid email address.";
      isValid = false;
    }

    if (messageInput.value.trim() === "") {
      document.getElementById("message-error").textContent = "Message cannot be empty.";
      isValid = false;
    }

    if (isValid) {
      formStatus.style.color = "#22c55e";
      formStatus.textContent = "Thank you! Your message has been sent successfully.";
      contactForm.reset();
    }
  });
});