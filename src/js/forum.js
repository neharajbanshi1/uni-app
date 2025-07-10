function initForum() {
  const postList = document.getElementById("posts-container");
  const filterBtns = document.querySelectorAll(".filter-btn");
  const newPostForm = document.getElementById("new-post-form");
  const newPostText = document.getElementById("new-post-text");

  if (!postList) return;

  let posts = [];

  fetch("/assets/data/forum.json")
    .then((response) => response.json())
    .then((data) => {
      posts = data;
      renderPosts(posts);
    });

  function renderPosts(filteredPosts) {
    if (!postList) return;
    postList.innerHTML = "";
    filteredPosts.forEach((post) => {
      const postElement = document.createElement("div");
      postElement.className =
        "border border-light-taupe rounded-lg p-6 bg-white shadow-md";
      postElement.innerHTML = `
                <div class="flex items-center gap-4 mb-4">
                    <div class="w-10 h-10 rounded-full bg-warm-rose text-white flex items-center justify-center font-bold text-xl">A</div>
                    <div class="flex-grow">
                        <span class="inline-block bg-ivory text-warm-rose py-1 px-3 rounded-full text-sm mb-2">${
                          post.category
                        }</span>
                        <h3 class="text-xl font-bold">${post.title}</h3>
                        <p class="text-sm text-charcoal-gray">by ${
                          post.author
                        }</p>
                    </div>
                </div>
                <div class="mb-4">
                    <p>${post.body}</p>
                </div>
                <div class="border-t border-light-taupe pt-4">
                    ${post.thread
                      .map(
                        (reply) => `
                        <div class="ml-4 pl-4 border-l-2 border-warm-rose mb-4">
                            <p class="font-bold text-sm text-charcoal-gray">by ${reply.author}</p>
                            <p>${reply.comment}</p>
                        </div>
                    `
                      )
                      .join("")}
                </div>
            `;
      postList.appendChild(postElement);
    });
  }

  if (filterBtns) {
    filterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        filterBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        const category = btn.dataset.category;
        if (category === "all") {
          renderPosts(posts);
        } else {
          const filteredPosts = posts.filter(
            (post) => post.category === category
          );
          renderPosts(filteredPosts);
        }
      });
    });
  }

  if (newPostForm) {
    newPostForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const postBody = newPostText.value.trim();

      if (postBody) {
        const newPost = {
          id: posts.length + 1,
          author: "Anonymous",
          category: "Anonymous Concerns",
          title: "A New Story",
          body: postBody,
          thread: [],
        };

        posts.unshift(newPost);
        renderPosts(posts);
        newPostText.value = "";
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", initForum);
window.initForum = initForum;
