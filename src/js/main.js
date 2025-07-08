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
                new google.translate.TranslateElement({pageLanguage: 'en'}, 'google_translate_element');
            };
            // Load the Google Translate script with the callback
            return loadScript('//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit');
        })
        .catch(error => {
            console.error('Failed to load header or scripts:', error);
        });
});