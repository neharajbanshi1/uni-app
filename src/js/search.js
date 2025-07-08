document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    const articleGrid = document.getElementById('article-grid');

    let articles = [];

    // Fetch articles to search against
    const fetchSearchableData = async () => {
        try {
            const response = await fetch('assets/data/articles.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            articles = await response.json();
        } catch (error) {
            console.error("Could not fetch articles for search:", error);
        }
    };

    // Re-usable render function for search results
    const renderSearchResults = (results) => {
        if (!articleGrid) return;
        articleGrid.innerHTML = ''; // Clear existing articles

        if (results.length === 0) {
            articleGrid.innerHTML = '<p>No articles match your search.</p>';
            return;
        }

        results.forEach(article => {
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

    const handleSearch = (event) => {
        event.preventDefault();
        const searchTerm = searchInput.value.toLowerCase().trim();

        if (searchTerm === '') {
            // If search is cleared, render all articles (or delegate back to knowledge-base.js)
            // For simplicity here, we'll just show all.
            renderSearchResults(articles);
            return;
        }

        const filteredArticles = articles.filter(article => {
            return article.title.toLowerCase().includes(searchTerm) ||
                   article.summary.toLowerCase().includes(searchTerm) ||
                   article.content.toLowerCase().includes(searchTerm);
        });

        renderSearchResults(filteredArticles);
    };

    // Event Listeners
    if (searchForm) {
        searchForm.addEventListener('submit', handleSearch);
        searchInput.addEventListener('keyup', handleSearch); // Live search
    }

    // Initial data fetch
    fetchSearchableData();
});