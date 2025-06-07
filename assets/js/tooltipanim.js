
  document.addEventListener("DOMContentLoaded", function () {
    const tooltip = document.createElement("div");
    tooltip.className = "tooltip";
    tooltip.style.position = "absolute";
    tooltip.style.pointerEvents = "none";
    tooltip.style.transition = "opacity 0.3s ease";
    tooltip.style.padding = "10px 14px";
    tooltip.style.background = "#111";
    tooltip.style.color = "#fff";
    tooltip.style.borderRadius = "8px";
    tooltip.style.fontSize = "14px";
    tooltip.style.zIndex = "1000";
    tooltip.style.minWidth = "120px";
    tooltip.style.textAlign = "center";

    const textNode = document.createTextNode("");
    tooltip.appendChild(textNode);

    const progressWrapper = document.createElement("div");
    progressWrapper.style.marginTop = "8px";
    progressWrapper.style.width = "100%";
    progressWrapper.style.background = "#444";
    progressWrapper.style.height = "6px";
    progressWrapper.style.borderRadius = "3px";
    progressWrapper.style.overflow = "hidden";
    tooltip.appendChild(progressWrapper);

    const progressBar = document.createElement("div");
    progressBar.style.height = "100%";
    progressBar.style.width = "0%";
    progressBar.style.transition = "width 0.4s ease-out";
    progressWrapper.appendChild(progressBar);

    const percentText = document.createElement("div");
    percentText.style.fontSize = "12px";
    percentText.style.marginTop = "6px";
    percentText.style.textAlign = "center";
    tooltip.appendChild(percentText);

    document.body.appendChild(tooltip);

    let typeInterval, sound;

    function showTooltip(icon) {
      const text = icon.getAttribute("data-tooltip") || "";
      const color = icon.getAttribute("data-bar-color") || "#4caf50";
      const percentTarget = parseInt(icon.getAttribute("data-percent")) || 100;
      const soundSrc = icon.getAttribute("data-sound");

      textNode.nodeValue = "";
      progressBar.style.width = "0%";
      percentText.textContent = "0%";
      progressBar.style.backgroundColor = color;
      tooltip.style.opacity = "1";

      const rect = icon.getBoundingClientRect();
      tooltip.style.left = `${rect.left + rect.width / 2}px`;
      tooltip.style.top = `${window.scrollY + rect.top - 10}px`;

      if (soundSrc) {
        if (sound) sound.pause();
        sound = new Audio(soundSrc);
        sound.volume = 0.4;
        sound.play();
      }

      let index = 0;
      clearInterval(typeInterval);

      typeInterval = setInterval(() => {
        if (index < text.length) {
          textNode.nodeValue += text.charAt(index);

          const progress = Math.floor((index / text.length) * percentTarget);
          progressBar.style.width = `${progress}%`;
          percentText.textContent = `${progress}%`;

          index++;
        } else {
          progressBar.style.width = `${percentTarget}%`;
          percentText.textContent = `${percentTarget}%`;
          clearInterval(typeInterval);
        }
      }, 50);
    }

    function hideTooltip() {
      tooltip.style.opacity = "0";
      textNode.nodeValue = "";
      progressBar.style.width = "0%";
      percentText.textContent = "0%";
      clearInterval(typeInterval);
      if (sound) {
        sound.pause();
        sound.currentTime = 0;
      }
    }

    document.querySelectorAll(".shape-icon").forEach(icon => {
      icon.addEventListener("mouseenter", () => showTooltip(icon));
      icon.addEventListener("mouseleave", hideTooltip);

      // 👇 Tap support for mobile
      icon.addEventListener("touchstart", (e) => {
        e.preventDefault(); // Prevent zoom
        showTooltip(icon);
      });

      icon.addEventListener("touchend", () => {
        setTimeout(hideTooltip, 2000); // Hide tooltip after 2s
      });
    });
  });
