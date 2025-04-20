const donorListContainer = document.getElementById("donorList");

function monthsSince(dateString) {
  const pastDate = new Date(dateString);
  const now = new Date();
  const diff = now.getTime() - pastDate.getTime();
  const months = diff / (1000 * 60 * 60 * 24 * 30);
  return months;
}

function displayDonors() {
  const donors = JSON.parse(localStorage.getItem("donors")) || [];

  const acceptedDonors = donors.filter(d => d.isAccepted);

  if (acceptedDonors.length === 0) {
    donorListContainer.innerHTML = "<p>No accepted donors yet.</p>";
    return;
  }

  acceptedDonors.forEach((donor, index) => {
    const card = document.createElement("div");
    card.className = "donor-card";

    const lastDonation = donor.lastDonationDate || "Not donated yet";
    let eligible = true;

    if (donor.lastDonationDate) {
      const months = monthsSince(donor.lastDonationDate);
      eligible = months >= 6;
    }

    if (!eligible) {
      card.classList.add("ineligible");
    }

    card.innerHTML = `
      <h3>${donor.name} (${donor.bloodGroup})</h3>
      <p><strong>City:</strong> ${donor.city}</p>
      <p><strong>Contact:</strong> ${donor.phone || "Not Provided"}</p>
      <p><strong>Aadhaar:</strong> ${donor.aadhar}</p>
      <p><strong>Last Donation:</strong> ${lastDonation}</p>
      <p><strong>Status:</strong> ${eligible ? "Eligible to donate" : "Not eligible (wait 6 months)"}</p>
      <button class="view-profile-btn" onclick="viewProfile(${index})">View Profile</button>
    `;

    donorListContainer.appendChild(card);
  });
}

function viewProfile(index) {
  const donors = JSON.parse(localStorage.getItem("donors")) || [];
  const acceptedDonors = donors.filter(d => d.isAccepted);
  const selectedDonor = acceptedDonors[index];

  localStorage.setItem("selectedDonor", JSON.stringify(selectedDonor));
  window.location.href = "donor-profile.html";
}

displayDonors();
