document.addEventListener("DOMContentLoaded", function () {
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

  // About Me Contact Button
  const aboutcontactButton = document.getElementById('contact-button-about');
  if (aboutcontactButton) {
    aboutcontactButton.addEventListener('click', function () {
      gtag('event', 'contact_click_about', {
        event_category: 'Button',
        event_label: 'Contact Me (About Section)'
      });
    });
  }

  // Navbar Contact Button
  const navcontactButton = document.getElementById('contact-button-nav');
  if (navcontactButton) {
    navcontactButton.addEventListener('click', function () {
      gtag('event', 'contact_click_nav', {
        event_category: 'Button',
        event_label: 'Contact Me (Navbar)'
      });
    });
  }
});
