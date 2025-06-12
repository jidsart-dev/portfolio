// Delay to make sure header.html is loaded
document.addEventListener("DOMContentLoaded", function () {
  setTimeout(function () {
    // Download CV Button
    const downloadBtn = document.getElementById("download-cv-btn");
    if (downloadBtn) {
      downloadBtn.addEventListener("click", function () {
        gtag('event', 'download_cv_click', {
          event_category: 'engagement',
          event_label: 'Download CV Button',
          value: 1
        });
      });
    }

    // About Page Contact Button
    const aboutContactButton = document.getElementById("contact-button-about");
    if (aboutContactButton) {
      aboutContactButton.addEventListener("click", function () {
        gtag('event', 'contact_click', {
          event_category: 'Button',
          event_label: 'Contact Me (About)'
        });
      });
    }

    // Navbar Contact Button (from header.html)
    const navContactButton = document.getElementById("contact-button-nav");
    if (navContactButton) {
      navContactButton.addEventListener("click", function () {
        gtag('event', 'contact_click', {
          event_category: 'Button',
          event_label: 'Contact Me (Navbar)'
        });
      });
    }
  }, 300); // slight delay to ensure header.html is loaded
});
