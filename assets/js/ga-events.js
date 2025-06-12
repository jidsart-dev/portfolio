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

