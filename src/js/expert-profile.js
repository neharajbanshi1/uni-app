document.addEventListener("DOMContentLoaded", () => {
  const profileContainer = document.getElementById("expert-profile-container");
  const urlParams = new URLSearchParams(window.location.search);
  const expertId = parseInt(urlParams.get("id"));

  // Mock login status
  const isLoggedIn = () => sessionStorage.getItem("isLoggedIn") === "true";

  if (!expertId) {
    profileContainer.innerHTML =
      "<p>Expert not found. Please return to the directory.</p>";
    return;
  }

  fetch("assets/data/experts.json")
    .then((response) => response.json())
    .then((experts) => {
      const expert = experts.find((e) => e.id === expertId);
      if (expert) {
        renderProfile(expert);
      } else {
        profileContainer.innerHTML =
          "<p>Expert not found. Please return to the directory.</p>";
      }
    })
    .catch((error) => {
      console.error("Error fetching expert data:", error);
      profileContainer.innerHTML =
        "<p>Could not load expert details. Please try again later.</p>";
    });

  function renderProfile(expert) {
    profileContainer.innerHTML = `
            <div class="flex items-center gap-8 mb-8">
                <img src="${expert.photo}" alt="${
      expert.name
    }" class="w-36 h-36 rounded-full object-cover">
                <div>
                    <h1 class="text-4xl font-bold">${expert.name}</h1>
                    <p class="text-xl text-charcoal-gray">${
                      expert.credentials
                    }</p>
                </div>
            </div>
            <div class="mt-8">
                <div>
                    <h3 class="text-2xl font-bold mb-4">Details</h3>
                    <ul class="list-none p-0 m-0">
                        <li class="mb-2"><strong>Specialties:</strong> ${expert.specialties.join(
                          ", "
                        )}</li>
                        <li class="mb-2"><strong>Experience:</strong> ${
                          expert.experience
                        } years</li>
                        <li class="mb-2"><strong>Languages:</strong> ${expert.languages.join(
                          ", "
                        )}</li>
                        <li class="mb-2"><strong>Location:</strong> ${
                          expert.location
                        }</li>
                        <li class="mb-2"><strong>Consultation Fees:</strong> ${
                          expert.fees
                        }</li>
                    </ul>
                </div>
                <div class="mt-8">
                    <h3 class="text-2xl font-bold mb-4">About ${
                      expert.name.split(" ")[1]
                    }</h3>
                    <p>${expert.bio}</p>
                </div>
                <div class="mt-8 pt-6 border-t border-light-taupe">
                    <h3 class="text-2xl font-bold mb-4">Book an Appointment</h3>
                    <div class="mb-4">
                        <input type="date" id="appointment-date" class="w-full p-2 border border-gray-300 rounded-md">
                    </div>
                    <p class="mb-4"><strong>Availability:</strong> <span id="availability-status"></span></p>
                    <button id="book-appointment-btn" class="w-full bg-warm-rose text-white font-bold py-2 px-4 rounded-md hover:bg-darker-warm-rose transition-colors disabled:bg-gray-400" disabled>Book Appointment</button>
                    <p id="booking-confirmation" class="mt-4 text-green-600" style="display:none;">Your appointment has been successfully booked!</p>
                </div>
            </div>
        `;

    const datePicker = document.getElementById("appointment-date");
    const availabilityStatus = document.getElementById("availability-status");
    const bookBtn = document.getElementById("book-appointment-btn");

    availabilityStatus.textContent = "Select a Date";

    datePicker.addEventListener("change", () => {
      const selectedDate = new Date(datePicker.value);
      const dayOfWeek = selectedDate.getDay();
      let status = "Not Available";

      // Mock availability logic
      if (dayOfWeek > 0 && dayOfWeek < 6) {
        // Monday to Friday
        status = "Available";
      }

      availabilityStatus.textContent = status;
      availabilityStatus.className = `availability-status ${
        status === "Available" ? "available" : "not-available"
      }`;
      bookBtn.disabled = status !== "Available";
    });

    const loginModal = document.getElementById("login-modal");
    const closeBtn = document.querySelector(".close-btn");

    if (bookBtn) {
      bookBtn.addEventListener("click", () => {
        if (!isLoggedIn()) {
          loginModal.style.display = "flex";
          return;
        }
        const confirmationMsg = document.getElementById("booking-confirmation");
        confirmationMsg.style.display = "block";
        setTimeout(() => {
          confirmationMsg.style.display = "none";
        }, 3000);
      });
    }

    closeBtn.onclick = function () {
      loginModal.style.display = "none";
    };

    window.onclick = function (event) {
      if (event.target == loginModal) {
        loginModal.style.display = "none";
      }
    };
  }
});
