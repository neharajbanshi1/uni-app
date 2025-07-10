document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('smartSearchInput');
    if (searchInput) {
        searchInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                const query = searchInput.value;
                if (window.location.pathname.endsWith('smart-search.html')) {
                    performSmartSearch(query);
                } else {
                    window.location.href = `smart-search.html?q=${encodeURIComponent(query)}`;
                }
            }
        });
    }

    if (window.location.pathname.endsWith('smart-search.html')) {
        const urlParams = new URLSearchParams(window.location.search);
        const query = urlParams.get('q');
        if (query) {
            document.getElementById('smartSearchInput').value = query;
            performSmartSearch(query);
        }
    }
});

function performSmartSearch(query) {
    const loadingState = document.getElementById('loadingState');
    const searchResults = document.getElementById('searchResults');

    loadingState.style.display = 'block';
    searchResults.style.display = 'none';

    setTimeout(() => {
        Promise.all([
            fetch('../assets/data/articles.json').then(res => res.json()),
            fetch('../assets/data/forum.json').then(res => res.json()),
            fetch('../assets/data/experts.json').then(res => res.json())
        ]).then(([articles, forum, experts]) => {
            const results = analyzeQuery(query, articles, forum, experts);
            displayResults(results);
            loadingState.style.display = 'none';
            searchResults.style.display = 'block';
        });
    }, 500);
}

function analyzeQuery(query, articles, forum, experts) {
    const lowerCaseQuery = query.toLowerCase();
    let urgency = 'low';

    const keywords = {
        crisis: ['hurt', 'suicide', 'can\'t cope', 'emergency'],
        high: ['depressed', 'anxious', 'hopeless'],
        moderate: ['sad', 'tired', 'pain', 'restrictions'],
        low: ['family', 'tradition', 'mother-in-law', 'feeding', 'milk', 'nursing', 'latch']
    };

    if (keywords.crisis.some(k => lowerCaseQuery.includes(k))) urgency = 'crisis';
    else if (keywords.high.some(k => lowerCaseQuery.includes(k))) urgency = 'high';
    else if (keywords.moderate.some(k => lowerCaseQuery.includes(k))) urgency = 'moderate';

    const queryTags = lowerCaseQuery.split(/\s+/);

    const filterByTags = (items, isExpert = false) => {
        return items.filter(item => {
            const searchableContent = [
                ...(item.tags || []),
                ...(isExpert ? item.specialties || [] : []),
                (isExpert ? item.name || '' : ''),
                (isExpert ? item.credentials || '' : ''),
                (isExpert ? item.bio || '' : '')
            ].join(' ').toLowerCase();

            return queryTags.some(tag => searchableContent.includes(tag));
        }).slice(0, 3);
    };

    return {
        knowledge: filterByTags(articles),
        community: filterByTags(forum),
        experts: filterByTags(experts, true),
        context: { query, urgency }
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
    const panel = document.getElementById('knowledgePanel');
    panel.innerHTML = '<h2>📚 Articles and Guides</h2>';
    if (articles.length === 0) {
        panel.innerHTML += '<p>No relevant articles found.</p>';
        return;
    }
    articles.forEach(article => {
        panel.innerHTML += `
            <div class="result-item">
                <h3>${article.title}</h3>
                <p>${article.summary}</p>
                <a href="article.html?id=${article.id}" class="btn btn-secondary">Read more</a>
            </div>
        `;
    });
}

function populateCommunityPanel(posts) {
    const panel = document.getElementById('communityPanel');
    panel.innerHTML = '<h2>👥 Community</h2>';
    if (posts.length === 0) {
        panel.innerHTML += '<p>No relevant discussions found.</p>';
        return;
    }
    posts.forEach(post => {
        panel.innerHTML += `
            <div class="result-item">
                <h3>${post.title}</h3>
                <p>${post.body.substring(0, 100)}...</p>
                <p><em>${post.activity}</em></p>
                <a href="forum.html?id=${post.id}" class="btn btn-secondary">Join discussion</a>
            </div>
        `;
    });
}

function populateExpertPanel(experts) {
    const panel = document.getElementById('expertPanel');
    panel.innerHTML = '<h2>🩺 Experts</h2>';
    if (experts.length === 0) {
        panel.innerHTML += '<p>No relevant experts found.</p>';
        return;
    }
    experts.forEach(expert => {
        panel.innerHTML += `
            <div class="result-item">
                <h3>${expert.name}</h3>
                <p>${expert.credentials}</p>
                <p><strong>${expert.availability}</strong></p>
                <p>⭐ ${expert.rating}</p>
                <a href="expert-profile.html?id=${expert.id}" class="btn btn-secondary">View Profile</a>
            </div>
        `;
    });
}

function generateAIResponse(context) {
    const aiResponse = document.getElementById('aiResponse');
    let responseHTML = `<p>It's brave to ask for help. It sounds like you're going through a lot right now.</p>`;
    let recommendations = [];

    switch (context.urgency) {
        case 'crisis':
            responseHTML = `<p>It sounds like you are in crisis. Please reach out for immediate help.</p>`;
            recommendations = [
                { text: 'Contact a crisis hotline immediately.', priority: 'red' },
                { text: 'Talk to a trusted friend or family member.', priority: 'yellow' },
                { text: 'Find a safe space.', priority: 'green' }
            ];
            break;
        case 'high':
            recommendations = [
                { text: 'Book an appointment with a mental health professional.', priority: 'red' },
                { text: 'Read our article on Postpartum Depression.', priority: 'yellow' },
                { text: 'Join an anonymous discussion to share your feelings.', priority: 'green' }
            ];
            break;
        case 'moderate':
            recommendations = [
                { text: 'Read our articles on self-care and family support.', priority: 'yellow' },
                { text: 'Join a community discussion on similar topics.', priority: 'green' },
                { text: 'Consider talking to a counselor.', priority: 'green' }
            ];
            break;
        default: // low
            recommendations = [
                { text: 'Explore our knowledge base for more information.', priority: 'green' },
                { text: 'See what others are saying in the community forum.', priority: 'green' },
                { text: 'Learn about the experts available to help.', priority: 'green' }
            ];
    }

    recommendations.forEach(rec => {
        responseHTML += `<div class="recommendation priority-${rec.priority}">${rec.text}</div>`;
    });

    aiResponse.innerHTML = responseHTML;
}

function showActionButtons(urgency) {
    const actionButtons = document.getElementById('actionButtons');
    actionButtons.innerHTML = `
        <a href="#" class="btn btn-primary">Create my support plan</a>
        <a href="forum.html" class="btn btn-primary">Join anonymous discussion</a>
        <a href="experts.html" class="btn btn-primary">Book expert consultation</a>
        <a href="#" class="btn btn-primary">Get daily check-ins</a>
    `;
}