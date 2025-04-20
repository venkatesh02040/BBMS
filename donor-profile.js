// Example donor data (ideally passed via URL or localStorage)
const donor = JSON.parse(localStorage.getItem("selectedDonor")) || {
    name: "Anjali Sharma",
    aadhar: "1234-5678-9012",
    age: 29,
    bloodGroup: "O+",
    city: "Mumbai",
    lastDonation: "2024-10-10"
  };
  
  function calculateNextEligibility(lastDate) {
    const nextDate = new Date(lastDate);
    nextDate.setMonth(nextDate.getMonth() + 6);
    return nextDate.toDateString();
  }
  
  function loadProfile() {
    const card = document.getElementById("profileCard");
  
    const nextEligible = calculateNextEligibility(donor.lastDonation);
  
    card.innerHTML = `
      <p><strong>Name:</strong> ${donor.name}</p>
      <p><strong>Aadhaar:</strong> ${donor.aadhar}</p>
      <p><strong>Age:</strong> ${donor.age}</p>
      <p><strong>Blood Group:</strong> ${donor.bloodGroup}</p>
      <p><strong>City:</strong> ${donor.city}</p>
      <p><strong>Last Donated:</strong> ${new Date(donor.lastDonation).toDateString()}</p>
      <p><strong>Next Eligible To Donate:</strong> ${nextEligible}</p>
    `;
  }
  
  window.onload = loadProfile;
  