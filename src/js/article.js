document.addEventListener("DOMContentLoaded", () => {
  const articleTitle = document.getElementById("article-title");
  const articleImage = document.getElementById("article-image");
  const articleAuthor = document.getElementById("article-author");
  const articleDate = document.getElementById("article-date");
  const articleBody = document.getElementById("article-body");
  const relatedArticlesList = document.getElementById("related-articles-list");
  const citationsList = document.getElementById("citations-list");

  // Get article ID from URL
  const getArticleId = () => {
    const params = new URLSearchParams(window.location.search);
    return parseInt(params.get("id"), 10);
  };

  // Fetch a single article and all articles for context
  const fetchArticleData = async () => {
    try {
      const response = await fetch("assets/data/articles.json");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const allArticles = await response.json();
      const articleId = getArticleId();
      const article = allArticles.find((a) => a.id === articleId);

      if (article) {
        renderArticle(article, allArticles);
      } else {
        document.querySelector(".article-container").innerHTML =
          "<p>Article not found.</p>";
      }
    } catch (error) {
      console.error("Could not fetch article data:", error);
      document.querySelector(".article-container").innerHTML =
        "<p>Error loading article. Please try again later.</p>";
    }
  };

  // Render the article content
  const renderArticle = async (article, allArticles) => {
    document.title = `UNI - ${article.title}`; // Update page title
    articleTitle.textContent = article.title;
    articleImage.src = article.image;
    articleImage.alt = article.title;
    articleAuthor.textContent = article.author;
    articleDate.textContent = new Date(
      article.publishDate
    ).toLocaleDateString();

    // Clear existing body content
    articleBody.innerHTML = "";

    if (article.contentType === "myth-fact" && Array.isArray(article.content)) {
      const response = await fetch("components/myth-fact-card.html");
      const cardTemplate = await response.text();
      article.content.forEach((item) => {
        const card = document.createElement("div");
        card.innerHTML = cardTemplate;
        card.querySelector(".myth-text").textContent = item.myth;
        card.querySelector(".fact-text").textContent = item.fact;
        const sourceLink = card.querySelector(".source-link");
        sourceLink.href = item.source.url;
        sourceLink.textContent = item.source.text;
        articleBody.appendChild(card);
      });
    } else if (
      article.contentType === "support-tips" &&
      Array.isArray(article.content)
    ) {
      const response = await fetch("components/support-tip-card.html");
      const cardTemplate = await response.text();
      article.content.forEach((item) => {
        const card = document.createElement("div");
        card.innerHTML = cardTemplate;
        card.querySelector(".tip-title").textContent = item.tip;
        card.querySelector(".tip-description").textContent = item.description;
        articleBody.appendChild(card);
      });
    } else {
      articleBody.innerHTML = article.content;
    }

    // Render citations
    if (article.citations && article.citations.length > 0) {
      citationsList.innerHTML = article.citations
        .map((citation) => `<li class="mb-2">${citation}</li>`)
        .join("");
      document.getElementById("citations-section").style.display = "block";
    } else {
      document.getElementById("citations-section").style.display = "none";
    }

    // Render related articles
    if (article.relatedArticleIds && article.relatedArticleIds.length > 0) {
      const relatedArticles = allArticles.filter((a) =>
        article.relatedArticleIds.includes(a.id)
      );
      relatedArticlesList.innerHTML = relatedArticles
        .map(
          (related) => `
                <li class="mb-2"><a href="article.html?id=${related.id}" class="text-warm-rose hover:underline">${related.title}</a></li>
            `
        )
        .join("");
    }
  };

  // Initial fetch
  fetchArticleData();
});
