document.getElementById("searchForm").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const bloodGroupSearch = document.getElementById("bloodGroupSearch").value;
    const citySearch = document.getElementById("citySearch").value.toLowerCase();
  
    const donors = JSON.parse(localStorage.getItem("donors")) || [];
  
    // Filter donors based on search criteria
    const filteredDonors = donors.filter(donor => {
      const matchesBloodGroup = bloodGroupSearch ? donor.bloodGroup === bloodGroupSearch : true;
      const matchesCity = citySearch ? donor.city.toLowerCase().includes(citySearch) : true;
      return matchesBloodGroup && matchesCity;
    });
  
    const donorResultsContainer = document.getElementById("donorResults");
  
    donorResultsContainer.innerHTML = ""; // Clear previous results
  
    if (filteredDonors.length === 0) {
      donorResultsContainer.innerHTML = "<p>No donors found</p>";
    } else {
      filteredDonors.forEach(donor => {
        const donorCard = document.createElement("div");
        donorCard.classList.add("donor-card");
  
        donorCard.innerHTML = `
          <h3>${donor.name} (${donor.bloodGroup})</h3>
          <p>City: ${donor.city}</p>
          <p>Aadhaar: ${donor.aadhar}</p>
          <button onclick="acceptDonor(${donor.id})">Accept</button>
        `;
  
        donorResultsContainer.appendChild(donorCard);
      });
    }
  });
  
  // Accept donor
  function acceptDonor(id) {
    const donors = JSON.parse(localStorage.getItem("donors"));
    const donor = donors.find(d => d.id === id);
    donor.isAccepted = true;
  
    // Save updated donor list to localStorage
    localStorage.setItem("donors", JSON.stringify(donors));
  
    alert(`${donor.name} has been accepted as a donor.`);
  }
  