document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("smartSearchInput");
  if (searchInput) {
    searchInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        const query = searchInput.value;
        if (window.location.pathname.endsWith("smart-search.html")) {
          performSmartSearch(query);
        } else {
          window.location.href = `smart-search.html?q=${encodeURIComponent(
            query
          )}`;
        }
      }
    });
  }

  if (window.location.pathname.endsWith("smart-search.html")) {
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get("q");
    if (query) {
      document.getElementById("smartSearchInput").value = query;
      performSmartSearch(query);
    }
  }
});

function performSmartSearch(query) {
  const loadingState = document.getElementById("loadingState");
  const searchResults = document.getElementById("searchResults");

  loadingState.style.display = "block";
  searchResults.style.display = "none";

  setTimeout(() => {
    Promise.all([
      fetch("../assets/data/articles.json").then((res) => res.json()),
      fetch("../assets/data/forum.json").then((res) => res.json()),
      fetch("../assets/data/experts.json").then((res) => res.json()),
    ]).then(([articles, forum, experts]) => {
      const results = analyzeQuery(query, articles, forum, experts);
      displayResults(results);
      loadingState.style.display = "none";
      searchResults.style.display = "block";
    });
  }, 500);
}

function analyzeQuery(query, articles, forum, experts) {
  const lowerCaseQuery = query.toLowerCase();
  let urgency = "low";

  const keywords = {
    crisis: ["hurt", "suicide", "can't cope", "emergency"],
    high: ["depressed", "anxious", "hopeless"],
    moderate: ["sad", "tired", "pain", "restrictions"],
    low: [
      "family",
      "tradition",
      "mother-in-law",
      "feeding",
      "milk",
      "nursing",
      "latch",
    ],
  };

  if (keywords.crisis.some((k) => lowerCaseQuery.includes(k)))
    urgency = "crisis";
  else if (keywords.high.some((k) => lowerCaseQuery.includes(k)))
    urgency = "high";
  else if (keywords.moderate.some((k) => lowerCaseQuery.includes(k)))
    urgency = "moderate";

  const queryTags = lowerCaseQuery.split(/\s+/);

  const filterByTags = (items, isExpert = false) => {
    return items
      .filter((item) => {
        const searchableContent = [
          ...(item.tags || []),
          ...(isExpert ? item.specialties || [] : []),
          isExpert ? item.name || "" : "",
          isExpert ? item.credentials || "" : "",
          isExpert ? item.bio || "" : "",
        ]
          .join(" ")
          .toLowerCase();

        return queryTags.some((tag) => searchableContent.includes(tag));
      })
      .slice(0, 3);
  };

  return {
    knowledge: filterByTags(articles),
    community: filterByTags(forum),
    experts: filterByTags(experts, true),
    context: { query, urgency },
  };
}

function displayResults(data) {
  populateKnowledgePanel(data.knowledge);
  populateCommunityPanel(data.community);
  populateExpertPanel(data.experts);
  generateAIResponse(data.context);
  showActionButtons(data.context.urgency);
}

function populateKnowledgePanel(articles) {
  const panel = document.getElementById("knowledgePanel");
  const header = `<h2 class="text-xl font-bold mb-4 border-b pb-2 flex items-center gap-2"><span class="text-2xl">📚</span> Articles and Guides</h2>`;
  panel.innerHTML = header;
  if (articles.length === 0) {
    panel.innerHTML +=
      '<p class="text-charcoal-gray">No relevant articles found.</p>';
    return;
  }
  const articlesHTML = articles
    .map(
      (article) => `
        <div class="py-2">
            <h3 class="font-bold text-charcoal-gray">${article.title}</h3>
            <p class="text-sm text-charcoal-gray mb-2">${article.summary}</p>
            <a href="article.html?id=${article.id}" class="text-sm text-warm-rose font-bold">Read more</a>
        </div>
    `
    )
    .join("");
  panel.innerHTML += articlesHTML;
}

function populateCommunityPanel(posts) {
  const panel = document.getElementById("communityPanel");
  const header = `<h2 class="text-xl font-bold mb-4 border-b pb-2 flex items-center gap-2"><span class="text-2xl">👥</span> Community</h2>`;
  panel.innerHTML = header;
  if (posts.length === 0) {
    panel.innerHTML +=
      '<p class="text-charcoal-gray">No relevant discussions found.</p>';
    return;
  }
  const postsHTML = posts
    .map(
      (post) => `
        <div class="py-2">
            <h3 class="font-bold text-charcoal-gray">${post.title}</h3>
            <p class="text-sm text-charcoal-gray">${post.body.substring(
              0,
              100
            )}...</p>
            <p class="text-xs text-green-600 font-bold my-2"><em>${
              post.activity
            }</em></p>
            <a href="forum.html?id=${
              post.id
            }" class="inline-block bg-blush-pink text-warm-rose px-6 py-2 rounded-full font-bold hover:bg-opacity-80 transition">Join discussion</a>
        </div>
    `
    )
    .join("");
  panel.innerHTML += postsHTML;
}

function populateExpertPanel(experts) {
  const panel = document.getElementById("expertPanel");
  const header = `<h2 class="text-xl font-bold mb-4 border-b pb-2 flex items-center gap-2"><span class="text-2xl">🩺</span> Experts</h2>`;
  panel.innerHTML = header;
  if (experts.length === 0) {
    panel.innerHTML +=
      '<p class="text-charcoal-gray">No relevant experts found.</p>';
    return;
  }
  const expertsHTML = experts
    .map(
      (expert) => `
        <div class="py-2">
            <h3 class="font-bold text-charcoal-gray">${expert.name}</h3>
            <p class="text-sm text-charcoal-gray">${expert.credentials}</p>
            <p class="text-sm font-bold text-green-600">${expert.availability}</p>
            <p class="text-sm">⭐ ${expert.rating}</p>
            <a href="expert-profile.html?id=${expert.id}" class="text-sm text-warm-rose font-bold mt-2 inline-block">View Profile</a>
        </div>
    `
    )
    .join("");
  panel.innerHTML += expertsHTML;
}

function generateAIResponse(context) {
  const aiResponse = document.getElementById("aiResponse");
  let responseHTML = `<p class="font-bold text-charcoal-gray mb-4">It's brave to ask for help. It sounds like you're going through a lot right now.</p>`;
  let recommendations = [];

  const priorityClasses = {
    red: "bg-red-100 border-red-500",
    yellow: "bg-yellow-100 border-yellow-500",
    green: "bg-green-100 border-green-500",
  };

  switch (context.urgency) {
    case "crisis":
      responseHTML = `<p class="font-bold text-red-700 mb-4">It sounds like you are in crisis. Please reach out for immediate help.</p>`;
      recommendations = [
        { text: "Contact a crisis hotline immediately.", priority: "red" },
        {
          text: "Talk to a trusted friend or family member.",
          priority: "yellow",
        },
        { text: "Find a safe space.", priority: "green" },
      ];
      break;
    case "high":
      recommendations = [
        {
          text: "Book an appointment with a mental health professional.",
          priority: "red",
        },
        {
          text: "Read our article on Postpartum Depression.",
          priority: "yellow",
        },
        {
          text: "Join an anonymous discussion to share your feelings.",
          priority: "green",
        },
      ];
      break;
    case "moderate":
      recommendations = [
        {
          text: "Read our articles on self-care and family support.",
          priority: "yellow",
        },
        {
          text: "Join a community discussion on similar topics.",
          priority: "green",
        },
        { text: "Consider talking to a counselor.", priority: "green" },
      ];
      break;
    default: // low
      recommendations = [
        {
          text: "Explore our knowledge base for more information.",
          priority: "green",
        },
        {
          text: "See what others are saying in the community forum.",
          priority: "green",
        },
        {
          text: "Learn about the experts available to help.",
          priority: "green",
        },
      ];
  }

  recommendations.forEach((rec) => {
    responseHTML += `<div class="border-l-4 p-3 my-2 rounded-r-lg ${
      priorityClasses[rec.priority]
    }">${rec.text}</div>`;
  });

  aiResponse.innerHTML = responseHTML;
}

function showActionButtons(urgency) {
  const actionButtons = document.getElementById("actionButtons");
  actionButtons.innerHTML = `
        <a href="#" class="bg-muted-lilac text-white font-bold py-3 px-6 rounded-full hover:bg-opacity-90 transition">Create my support plan</a>
        <a href="forum.html" class="bg-muted-lilac text-white font-bold py-3 px-6 rounded-full hover:bg-opacity-90 transition">Join anonymous discussion</a>
        <a href="experts.html" class="bg-muted-lilac text-white font-bold py-3 px-6 rounded-full hover:bg-opacity-90 transition">Book expert consultation</a>
        <a href="#" class="bg-muted-lilac text-white font-bold py-3 px-6 rounded-full hover:bg-opacity-90 transition">Get daily check-ins</a>
    `;
}
