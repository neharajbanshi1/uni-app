document.addEventListener('DOMContentLoaded', () => {
    const articleGrid = document.getElementById('article-grid');
    const filterBtns = document.querySelectorAll('.filter-btn');

    let allArticles = [];

    // Fetch articles from the JSON file
    const fetchArticles = async () => {
        try {
            const response = await fetch('assets/data/articles.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            allArticles = await response.json();
            renderArticles(allArticles);
        } catch (error) {
            console.error("Could not fetch articles:", error);
            articleGrid.innerHTML = '<p>Error loading articles. Please try again later.</p>';
        }
    };

    // Render articles to the grid
    const renderArticles = (articles) => {
        if (!articleGrid) return;
        articleGrid.innerHTML = ''; // Clear existing articles

        if (articles.length === 0) {
            articleGrid.innerHTML = '<p>No articles found.</p>';
            return;
        }

        articles.forEach(article => {
            const articleCard = document.createElement('div');
            articleCard.className = 'post-preview'; // Use the same class as forum posts
            articleCard.innerHTML = `
                <div class="post-header">
                    <span class="post-category">${article.category}</span>
                    <h3 class="post-title">${article.title}</h3>
                </div>
                <div class="post-body">
                    <p>${article.summary}</p>
                    <a href="article.html?id=${article.id}" class="profile-link">Read More</a>
                </div>
            `;
            articleGrid.appendChild(articleCard);
        });
    };

    // Filter functionality
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button style
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const category = btn.dataset.category;
            if (category === 'all') {
                renderArticles(allArticles);
            } else {
                const filteredArticles = allArticles.filter(article => article.category === category);
                renderArticles(filteredArticles);
            }
        });
    });

    // Initial fetch
    fetchArticles();
});