document.addEventListener("DOMContentLoaded", () => {
  const expertGrid = document.getElementById("expert-grid");
  const specialtyFilter = document.getElementById("specialty-filter");
  const locationFilter = document.getElementById("location-filter");

  let experts = [];

  // Fetch expert data from JSON file
  fetch("assets/data/experts.json")
    .then((response) => response.json())
    .then((data) => {
      experts = data;
      populateFilters(experts);
      renderExperts(experts);
    })
    .catch((error) => console.error("Error fetching expert data:", error));

  // Populate filter dropdowns with unique values
  function populateFilters(data) {
    const specialties = [
      ...new Set(data.flatMap((expert) => expert.specialties)),
    ];
    const locations = [...new Set(data.map((expert) => expert.location))];

    specialties.forEach((specialty) => {
      const option = document.createElement("option");
      option.value = specialty;
      option.textContent = specialty;
      specialtyFilter.appendChild(option);
    });

    locations.forEach((location) => {
      const option = document.createElement("option");
      option.value = location;
      option.textContent = location;
      locationFilter.appendChild(option);
    });
  }

  // Render expert cards in the grid
  function renderExperts(data) {
    expertGrid.innerHTML = "";
    data.forEach((expert) => {
      const expertCard = document.createElement("div");
      expertCard.className =
        "bg-white border border-light-taupe rounded-lg overflow-hidden shadow-md transition-transform duration-200 hover:-translate-y-1";
      expertCard.innerHTML = `
                <img src="${expert.photo}" alt="${expert.name}" class="w-full h-48 object-cover">
                <div class="p-4">
                    <h3 class="text-xl font-bold mb-1">${expert.name}</h3>
                    <p class="text-charcoal-gray mb-1">${expert.credentials}</p>
                    <p class="text-charcoal-gray text-sm mb-4">${expert.location}</p>
                    <a href="expert-profile.html?id=${expert.id}" class="inline-block mt-4 px-4 py-2 bg-warm-rose text-white rounded-md text-center hover:bg-darker-warm-rose transition-colors">View Profile</a>
                </div>
            `;
      expertGrid.appendChild(expertCard);
    });
  }

  // Filter experts based on selected criteria
  function filterExperts() {
    const selectedSpecialty = specialtyFilter.value;
    const selectedLocation = locationFilter.value;

    let filteredExperts = experts;

    if (selectedSpecialty !== "all") {
      filteredExperts = filteredExperts.filter((expert) =>
        expert.specialties.includes(selectedSpecialty)
      );
    }

    if (selectedLocation !== "all") {
      filteredExperts = filteredExperts.filter(
        (expert) => expert.location === selectedLocation
      );
    }

    renderExperts(filteredExperts);
  }

  // Add event listeners to filters
  specialtyFilter.addEventListener("change", filterExperts);
  locationFilter.addEventListener("change", filterExperts);
});
