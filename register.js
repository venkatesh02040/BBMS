document.getElementById("registerForm").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const name = document.getElementById("name").value.trim();
    const aadhar = document.getElementById("aadhar").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const bloodGroup = document.getElementById("bloodGroup").value;
    const city = document.getElementById("city").value.trim();
    const willing = document.getElementById("willing").checked;
    const message = document.getElementById("message");
  
    // Aadhaar validation
    if (!/^\d{12}$/.test(aadhar)) {
      message.textContent = "Aadhaar must be 12 digits";
      message.style.color = "red";
      return;
    }
  
    const donor = {
      id: Date.now(),
      name,
      aadhar,
      phone,
      bloodGroup,
      city,
      willing,
      lastDonated: null,
      isAccepted: false
    };
  
    // Get existing donors
    const donors = JSON.parse(localStorage.getItem("donors")) || [];
  
    // Check for duplicate Aadhaar
    const exists = donors.some((d) => d.aadhar === aadhar);
    if (exists) {
      message.textContent = "Aadhaar already registered";
      message.style.color = "red";
      return;
    }
  
    donors.push(donor);
    localStorage.setItem("donors", JSON.stringify(donors));
  
    message.textContent = "Registration successful!";
    message.style.color = "green";
    document.getElementById("registerForm").reset();
  });
  