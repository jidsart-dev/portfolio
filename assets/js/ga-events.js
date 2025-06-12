document.addEventListener("DOMContentLoaded", function () {
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
});


// About Me Contact Button
const aboutcontactButton = document.getElementById('contact-button-about');
if (aboutcontactButton) {
  aboutcontactButton.addEventListener('click', function() {
    gtag('event', 'contact_click', {
      'event_category': 'Button',
      'event_label': 'Contact Me'
    });
  });
}

// Nav Contact Button
const navcontactButton = document.getElementById('contact-button-nav');
if (navcontactButton) {
  navcontactButton.addEventListener('click', function() {
    gtag('event', 'contact_click', {
      'event_category': 'Button',
      'event_label': 'Contact Me'
    });
  });
}

