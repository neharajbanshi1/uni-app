document.addEventListener('DOMContentLoaded', () => {
    const profileContainer = document.getElementById('expert-profile-container');
    const urlParams = new URLSearchParams(window.location.search);
    const expertId = parseInt(urlParams.get('id'));

    if (!expertId) {
        profileContainer.innerHTML = '<p>Expert not found. Please return to the directory.</p>';
        return;
    }

    fetch('assets/data/experts.json')
        .then(response => response.json())
        .then(experts => {
            const expert = experts.find(e => e.id === expertId);
            if (expert) {
                renderProfile(expert);
            } else {
                profileContainer.innerHTML = '<p>Expert not found. Please return to the directory.</p>';
            }
        })
        .catch(error => {
            console.error('Error fetching expert data:', error);
            profileContainer.innerHTML = '<p>Could not load expert details. Please try again later.</p>';
        });

    function renderProfile(expert) {
        profileContainer.innerHTML = `
            <div class="profile-header">
                <img src="${expert.photo}" alt="${expert.name}" class="profile-photo">
                <div class="profile-title">
                    <h1>${expert.name}</h1>
                    <p>${expert.credentials}</p>
                </div>
            </div>
            <div class="profile-body">
                <div class="profile-details">
                    <h3>Details</h3>
                    <ul>
                        <li><strong>Specialties:</strong> ${expert.specialties.join(', ')}</li>
                        <li><strong>Experience:</strong> ${expert.experience} years</li>
                        <li><strong>Languages:</strong> ${expert.languages.join(', ')}</li>
                        <li><strong>Location:</strong> ${expert.location}</li>
                        <li><strong>Consultation Fees:</strong> ${expert.fees}</li>
                    </ul>
                </div>
                <div class="profile-bio">
                    <h3>About ${expert.name.split(' ')[1]}</h3>
                    <p>${expert.bio}</p>
                </div>
                <div class="mock-booking-form">
                    <h3>Contact ${expert.name} (Mock Form)</h3>
                    <form onsubmit="event.preventDefault(); alert('This is a mock form and does not send real messages.');">
                        <div class="form-group">
                            <label for="name">Your Name</label>
                            <input type="text" id="name" required>
                        </div>
                        <div class="form-group">
                            <label for="email">Your Email</label>
                            <input type="email" id="email" required>
                        </div>
                        <div class="form-group">
                            <label for="message">Your Message</label>
                            <textarea id="message" rows="5" required></textarea>
                        </div>
                        <button type="submit">Send Message</button>
                    </form>
                </div>
            </div>
        `;
    }
});