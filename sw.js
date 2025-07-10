const CACHE_NAME = 'uni-app-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/article.html',
  '/articles-and-guides.html',
  '/expert-profile.html',
  '/experts.html',
  '/forum.html',
  '/login.html',
  '/smart-search.html',
  '/components/footer.html',
  '/components/header.html',
  '/src/css/responsive.css',
  '/src/css/search.css',
  '/src/css/styles.css',
  '/src/js/article.js',
  '/src/js/expert-profile.js',
  '/src/js/experts.js',
  '/src/js/forum.js',
  '/src/js/knowledge-base.js',
  '/src/js/login.js',
  '/src/js/main.js',
  '/src/js/search.js',
  '/src/js/text-to-speech.js',
  '/assets/data/articles.json',
  '/assets/data/experts.json',
  '/assets/data/forum.json',
  '/assets/images/articles-and-guides.jpeg',
  '/assets/images/Bikash Shrestha.jpeg',
  '/assets/images/community-forum.jpeg',
  '/assets/images/cultural-myths.jpeg',
  '/assets/images/Dr. Anjali Gurung.jpeg',
  '/assets/images/Dr. Gita Rai.jpeg',
  '/assets/images/Dr. Sunita Sharma.jpeg',
  '/assets/images/experts.jpeg',
  '/assets/images/family-support.jpeg',
  '/assets/images/medical-overview.jpeg',
  '/assets/images/professional-help.jpeg',
  '/assets/images/Rajesh Thapa.jpeg',
  '/assets/images/Sanjay Lama.jpeg',
  '/assets/images/self-care.jpeg',
  '/assets/images/sutkeri.jpeg',
  '/assets/uni.jpeg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});