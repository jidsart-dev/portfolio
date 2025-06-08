
  const portfolioList = document.getElementById('portfolio-list');
  const searchInput = document.querySelector('.search-box input');
  const noResults = document.querySelector('.no-results');
  let portfolioItems = [];

  async function loadPortfolio() {
    try {
      const response = await fetch('data/data.json'); // adjust if path is different
      portfolioItems = await response.json();
      displayItems(portfolioItems);
    } catch (error) {
      console.error("Failed to load portfolio data:", error);
    }
  }

  function displayItems(items) {
    portfolioList.innerHTML = '';
    if (!items.length) {
      noResults.style.display = 'block';
      return;
    }
    noResults.style.display = 'none';

    items.forEach(item => {
      const tags = item.category.map(tag => `<a href="#" class="span hover-2">${tag}</a>`).join('');
      const listItem = document.createElement('li');
      listItem.className = 'image-box';
      listItem.setAttribute('data-name', item.name);
      listItem.setAttribute('data-tags', item.tags.join(' '));

      listItem.innerHTML = `
        <div class="card feature-card p-2 border-radius-16">
          <figure class="card-banner img-holder" style="--width: 1602; --height: 1602;" data-tilt>
            <img src="${item.image}" width="1602" height="903" loading="lazy"
              alt="${item.title}" class="img-cover">
          </figure>
          <div class="card-content">
            <div class="card-wrapper">
              <div class="card-tag">${tags}</div>
            </div>
            <h3 class="headline headline-3">
              <a href="#" class="card-title hover-2">${item.title}</a>
            </h3>
          </div>
        </div>
      `;
      portfolioList.appendChild(listItem);
    });
  }

  searchInput.addEventListener('input', () => {
    const keyword = searchInput.value.trim().toLowerCase();
    const filtered = portfolioItems.filter(item =>
      item.name.toLowerCase().includes(keyword) ||
      item.title.toLowerCase().includes(keyword) ||
      item.tags.some(tag => tag.toLowerCase().includes(keyword))
    );
    displayItems(filtered);
  });

  loadPortfolio();
