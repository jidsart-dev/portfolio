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
     */
    const navbarLinks = document.querySelectorAll(".navbar-link");

    const currentPage = window.location.pathname.split("/").pop() || "blogs.html";

    navbarLinks.forEach(link => {
      const href = link.getAttribute("href");

      // Highlight current page
      if (href === currentPage || (currentPage === "blogs.html" && (href === "./" || href === "#"))) {
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
  });


