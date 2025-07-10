document.addEventListener("DOMContentLoaded", function() {
    // Function to load a component
    const loadComponent = (componentPath, placeholderId) => {
        return fetch(componentPath)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.text();
            })
            .then(html => {
                const placeholder = document.getElementById(placeholderId);
                if (placeholder) {
                    placeholder.innerHTML = html;
                } else {
                    console.error(`Placeholder with ID '${placeholderId}' not found.`);
                }
            })
            .catch(error => {
                console.error(`Error loading component from ${componentPath}:`, error);
            });
    };

    // Function to load a script
    const loadScript = (src) => {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            script.async = true;
            script.onload = resolve;
            script.onerror = reject;
            document.body.appendChild(script);
        });
    };

    // Load the header, then load the scripts
    loadComponent('components/header.html', 'header-placeholder')
        .then(() => {
            // Make the init function global
            window.googleTranslateElementInit = function() {
                new google.translate.TranslateElement({pageLanguage: 'en', includedLanguages: 'en,ne'}, 'google_translate_element');
            };
            // Load the Google Translate script with the callback
            return loadScript('//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit');
        })
        .then(() => {
            return loadScript('src/js/text-to-speech.js');
        })
        .catch(error => {
            console.error('Failed to load header or scripts:', error);
        });

    // Load the footer
    loadComponent('components/footer.html', 'footer-placeholder');
    // Register service worker
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js').then(registration => {
                console.log('ServiceWorker registration successful with scope: ', registration.scope);
            }, err => {
                console.log('ServiceWorker registration failed: ', err);
            });
        });
    }

    const handleLinkClick = (e) => {
        const link = e.target.closest('a');

        if (link && link.href && new URL(link.href).origin === window.location.origin && !link.href.includes('#')) {
            e.preventDefault();
            const url = new URL(link.href);

            document.body.classList.add('is-transitioning');

            setTimeout(() => {
                fetch(url.href)
                    .then(response => response.text())
                    .then(html => {
                        const parser = new DOMParser();
                        const doc = parser.parseFromString(html, 'text/html');
                        const newMain = doc.querySelector('main');
                        const newTitle = doc.querySelector('title').innerText;

                        if (newMain) {
                            document.querySelector('main').innerHTML = newMain.innerHTML;
                            document.title = newTitle;
                            history.pushState({ path: url.href }, newTitle, url.href);
                        }
                        
                        const pageName = url.pathname.split('/').pop().replace('.html', '');
                        if (pageName && pageName !== 'index') {
                            loadScript(`src/js/${pageName}.js`).catch(err => console.log(`No specific script for ${pageName} or it failed to load.`));
                        }

                        document.body.classList.remove('is-transitioning');
                        window.scrollTo(0, 0);
                    })
                    .catch(err => {
                        console.error('Failed to fetch page: ', err);
                        window.location.href = url.href;
                    });
            }, 300);
        }
    };

    document.addEventListener('click', handleLinkClick);

    window.addEventListener('popstate', (e) => {
        if (e.state && e.state.path) {
            document.body.classList.add('is-transitioning');
            setTimeout(() => {
                fetch(e.state.path)
                    .then(response => response.text())
                    .then(html => {
                        const parser = new DOMParser();
                        const doc = parser.parseFromString(html, 'text/html');
                        const newMain = doc.querySelector('main');
                        const newTitle = doc.querySelector('title').innerText;

                        if (newMain) {
                            document.querySelector('main').innerHTML = newMain.innerHTML;
                            document.title = newTitle;
                        }
                        
                        const pageName = new URL(e.state.path).pathname.split('/').pop().replace('.html', '');
                        if (pageName && pageName !== 'index') {
                            loadScript(`src/js/${pageName}.js`).catch(err => console.log(`No specific script for ${pageName} or it failed to load.`));
                        }

                        document.body.classList.remove('is-transitioning');
                        window.scrollTo(0, 0);
                    })
                    .catch(err => {
                        console.error('Failed to fetch page on popstate: ', err);
                        window.location.reload();
                    });
            }, 300);
        }
    });
});