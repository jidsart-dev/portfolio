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

    
    const navbarLinks = document.querySelectorAll(".navbar-link");

    const currentPage = window.location.pathname.split("/").pop() || "index.html";

    const normalizeHref = href => href.replace(/^\.?\//, '').replace(/index\.html$/, '');
    const normalizePath = path => path.replace(/^\/?/, '').replace(/index\.html$/, '');

    navbarLinks.forEach(link => {
      const href = normalizeHref(link.getAttribute("href"));
      const path = normalizePath(currentPage);

      if (href && path && href === path) {
        link.classList.add("active");
      }

      // Anchor links (scroll links)
      if (link.getAttribute("href").startsWith("#")) {
        link.addEventListener("click", () => {
          navbarLinks.forEach(l => l.classList.remove("active"));
          link.classList.add("active");
        });
      }
    });


    /**
     * SCROLLSPY FEATURE
     */
    const sections = document.querySelectorAll("section[id]");
    const sectionOffset = 150;

    function activateScrollSpy() {
      let scrollY = window.pageYOffset;

      sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - sectionOffset;
        const sectionId = current.getAttribute("id");

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
          navbarLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${sectionId}`) {
              link.classList.add("active");
            }
          });
        }
      });
    }

    window.addEventListener("scroll", activateScrollSpy);

      }
    });
  });
