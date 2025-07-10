function initForum() {
    const postList = document.getElementById('posts-container');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const newPostForm = document.getElementById('new-post-form');
    const newPostText = document.getElementById('new-post-text');

    if (!postList) return;

    let posts = [];

    fetch('/assets/data/forum.json')
        .then(response => response.json())
        .then(data => {
            posts = data;
            renderPosts(posts);
        });

    function renderPosts(filteredPosts) {
        if (!postList) return;
        postList.innerHTML = '';
        filteredPosts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.classList.add('post-preview');
            postElement.innerHTML = `
                <div class="post-header">
                    <div class="post-avatar">A</div>
                    <div class="post-header-info">
                        <span class="post-category">${post.category}</span>
                        <h3 class="post-title">${post.title}</h3>
                        <p class="post-author">by ${post.author}</p>
                    </div>
                </div>
                <div class="post-body">
                    <p>${post.body}</p>
                </div>
                <div class="post-thread">
                    ${post.thread.map(reply => `
                        <div class="reply">
                            <p class="reply-author">by ${reply.author}</p>
                            <p>${reply.comment}</p>
                        </div>
                    `).join('')}
                </div>
            `;
            postList.appendChild(postElement);
        });
    }

    if (filterBtns) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const category = btn.dataset.category;
                if (category === 'all') {
                    renderPosts(posts);
                } else {
                    const filteredPosts = posts.filter(post => post.category === category);
                    renderPosts(filteredPosts);
                }
            });
        });
    }

    if (newPostForm) {
        newPostForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const postBody = newPostText.value.trim();

            if (postBody) {
                const newPost = {
                    id: posts.length + 1,
                    author: 'Anonymous',
                    category: 'Anonymous Concerns',
                    title: 'A New Story',
                    body: postBody,
                    thread: []
                };

                posts.unshift(newPost);
                renderPosts(posts);
                newPostText.value = '';
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', initForum);
window.initForum = initForum;