document.addEventListener('DOMContentLoaded', () => {
  const postList = document.getElementById('posts-container');
  const filterBtns = document.querySelectorAll('.filter-btn');

  let posts = [];

  fetch('/assets/data/forum.json')
    .then(response => response.json())
    .then(data => {
      posts = data;
      renderPosts(posts);
    });

  function renderPosts(filteredPosts) {
    postList.innerHTML = '';
    filteredPosts.forEach(post => {
      const postElement = document.createElement('div');
      postElement.classList.add('post-preview');
      postElement.innerHTML = `
        <div class="post-header">
          <span class="post-category">${post.category}</span>
          <h3 class="post-title">${post.title}</h3>
          <p class="post-author">by ${post.author}</p>
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
});