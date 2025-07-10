document.addEventListener('DOMContentLoaded', () => {
    const profileContainer = document.getElementById('expert-profile-container');
    const urlParams = new URLSearchParams(window.location.search);
    const expertId = parseInt(urlParams.get('id'));

    // Mock login status
    const isLoggedIn = () => sessionStorage.getItem('isLoggedIn') === 'true';

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
                <div class="booking-section">
                    <h3>Book an Appointment</h3>
                    <div class="form-group">
                        <input type="date" id="appointment-date" class="form-control">
                    </div>
                    <p><strong>Availability:</strong> <span id="availability-status" class="availability-status"></span></p>
                    <button id="book-appointment-btn" class="btn btn-primary" disabled>Book Appointment</button>
                    <p id="booking-confirmation" class="booking-confirmation" style="display:none;">Your appointment has been successfully booked!</p>
                </div>
            </div>
        `;

        const datePicker = document.getElementById('appointment-date');
        const availabilityStatus = document.getElementById('availability-status');
        const bookBtn = document.getElementById('book-appointment-btn');

        availabilityStatus.textContent = 'Select a Date';

        datePicker.addEventListener('change', () => {
            const selectedDate = new Date(datePicker.value);
            const dayOfWeek = selectedDate.getDay();
            let status = 'Not Available';

            // Mock availability logic
            if (dayOfWeek > 0 && dayOfWeek < 6) { // Monday to Friday
                status = 'Available';
            }

            availabilityStatus.textContent = status;
            availabilityStatus.className = `availability-status ${status === 'Available' ? 'available' : 'not-available'}`;
            bookBtn.disabled = status !== 'Available';
        });

        const loginModal = document.getElementById('login-modal');
        const closeBtn = document.querySelector('.close-btn');

        if (bookBtn) {
            bookBtn.addEventListener('click', () => {
                if (!isLoggedIn()) {
                    loginModal.style.display = 'block';
                    return;
                }
                const confirmationMsg = document.getElementById('booking-confirmation');
                confirmationMsg.style.display = 'block';
                setTimeout(() => {
                    confirmationMsg.style.display = 'none';
                }, 3000);
            });
        }

        closeBtn.onclick = function() {
            loginModal.style.display = "none";
        }

        window.onclick = function(event) {
            if (event.target == loginModal) {
                loginModal.style.display = "none";
            }
        }
    }
});