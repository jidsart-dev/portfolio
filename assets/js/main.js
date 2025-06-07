'use strict';

fetch('./header.html')
  .then(res => res.text())
  .then(html => {
    document.getElementById('header-placeholder').innerHTML = html;

    /**
     * Add event listener on multiple elements
     */
    const addEventOnElements = function (elements, eventType, callback) {
      for (let i = 0, len = elements.length; i < len; i++) {
        elements[i].addEventListener(eventType, callback);
      }
    };

    /**
     * MOBILE NAVBAR TOGGLER
     */
    const navbar = document.querySelector("[data-navbar]");
    const navTogglers = document.querySelectorAll("[data-nav-toggler]");

    const toggleNav = () => {
      navbar.classList.toggle("active");
      document.body.classList.toggle("nav-active");
    };

    addEventOnElements(navTogglers, "click", toggleNav);

    // Click outside to close
    document.addEventListener("click", (event) => {
      const clickedOutside = !navbar.contains(event.target) &&
        ![...navTogglers].some(btn => btn.contains(event.target));

      if (clickedOutside && navbar.classList.contains("active")) {
        navbar.classList.remove("active");
        document.body.classList.remove("nav-active");
      }
    });

    /**
     * HEADER ANIMATION
     */
    const header = document.querySelector("[data-header]");
    const backTopBtn = document.querySelector("[data-back-top-btn]");

    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        header.classList.add("active");
        if (backTopBtn) backTopBtn.classList.add("active");
      } else {
        header.classList.remove("active");
        if (backTopBtn) backTopBtn.classList.remove("active");
      }
    });

    /**
     * ACTIVE NAV LINK HANDLING (MOVED INSIDE!)
     
    const navbarLinks = document.querySelectorAll(".navbar-link");

    const currentPage = window.location.pathname.split("/").pop() || "index.html";

    navbarLinks.forEach(link => {
      const href = link.getAttribute("href");

      // Highlight current page
      if (href === currentPage || (currentPage === "index.html" && (href === "./" || href === "#"))) {
        link.classList.add("active");
      }

      // Highlight on click for anchor links
      if (href.startsWith("#")) {
        link.addEventListener("click", () => {
          navbarLinks.forEach(l => l.classList.remove("active"));
          link.classList.add("active");
        });
      }
    });
  */
  });


/**
 * Load Footer
 */
fetch('./footer.html')
  .then(res => res.text())
  .then(html => {
    const placeholder = document.getElementById('footer-placeholder');
    if (placeholder) placeholder.innerHTML = html;
  });


/**
 * search
 */

const searchInput = document.querySelector(".search-box input");
const imageBoxes = document.querySelectorAll(".image-box");
const filterButtons = document.querySelectorAll(".tag-btn");
const noResultsMessage = document.querySelector(".no-results");

let activeFilter = "all";

// Common filter function for both search & filter
function filterImages() {
    const searchValue = searchInput.value.toLowerCase();
    let visibleCount = 0;

    imageBoxes.forEach(box => {
        const name = box.getAttribute("data-name").toLowerCase();
        const tags = box.getAttribute("data-tags").toLowerCase();

        const matchesSearch = name.includes(searchValue) || tags.includes(searchValue);
        const matchesFilter = activeFilter === "all" || tags.includes(activeFilter);

        const isVisible = matchesSearch && matchesFilter;
        box.style.display = isVisible ? "block" : "none";

        if (isVisible) visibleCount++;
    });

    noResultsMessage.style.display = visibleCount === 0 ? "block" : "none";
}

// Search Logic
searchInput.addEventListener("keyup", filterImages);

// Filter Button Logic
filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        filterButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        activeFilter = button.getAttribute("data-filter");

        filterImages(); // Apply both search + filter logic
    });
});

/**
 * loader
 */

const form = document.getElementById("contactForm");
const loader = document.getElementById("formLoader");
const successPopup = document.getElementById("successPopup");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  loader.classList.remove("hidden");

  // Simulate sending...
  setTimeout(() => {
    loader.classList.add("hidden");
    successPopup.classList.remove("hidden");

    // Optionally reset form
    form.reset();

    setTimeout(() => {
      successPopup.classList.add("hidden");
    }, 3000);
  }, 2000);
});



















