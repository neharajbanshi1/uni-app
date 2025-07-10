document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Mock successful login
            sessionStorage.setItem('isLoggedIn', 'true');
            alert('Login successful! You will now be redirected.');
            window.history.back();
        });
    }
});