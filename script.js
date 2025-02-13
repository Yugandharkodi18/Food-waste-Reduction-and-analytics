document.addEventListener("DOMContentLoaded", function () {
    /* ============================
       LOGIN & PROFILE SETUP
    ============================ */
    const loginModal = document.getElementById("loginModal");
    const loginForm = document.getElementById("loginForm");
    const userProfile = document.getElementById("userProfile");
    const profileSection = document.getElementById("profileSection");
    const profileInfo = document.getElementById("profileInfo");
    const profileTableBody = document.querySelector("#profileTable tbody");
    const closeProfileButton = document.getElementById("closeProfileButton");
  
    let currentUser = null; // To store logged-in user data, including donations
  
    // Show the login modal on page load
    loginModal.style.display = "flex";
  
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const phone = document.getElementById("phoneNumber").value;
      const name = document.getElementById("userName").value;
  
      // Simulate successful login
      currentUser = { phone, name, totalDonations: 0, donations: [] };
  
      // Hide the login modal
      loginModal.style.display = "none";
  
      // Update the header profile display
      userProfile.textContent = `Welcome, ${name}`;
      userProfile.style.cursor = "pointer";
  
      // Auto-fill the donor name in the donate form
      document.getElementById("donorName").value = name;
    });
  
    // When the user clicks on their profile, show the full profile page
    userProfile.addEventListener("click", function () {
      if (currentUser) {
        // Populate profile info
        profileInfo.innerHTML = `<p><strong>Name:</strong> ${currentUser.name}</p>
                                 <p><strong>Phone:</strong> ${currentUser.phone}</p>
                                 <p><strong>Total Donated (kg):</strong> ${currentUser.totalDonations.toFixed(2)}</p>`;
        // Clear existing table rows
        profileTableBody.innerHTML = "";
        // Populate donation history
        currentUser.donations.forEach(donation => {
          const tr = document.createElement("tr");
          tr.innerHTML = `<td>${donation.date}</td>
                          <td>${donation.foodItem}</td>
                          <td>${donation.quantity}</td>
                          <td>${donation.category}</td>
                          <td>${donation.peopleFed}</td>
                          <td>${donation.location}</td>`;
          profileTableBody.appendChild(tr);
        });
        // Show profile section and hide others
        hideAllSections();
        profileSection.classList.remove("hidden");
      }
    });
  
    // Close profile button
    closeProfileButton.addEventListener("click", function () {
      profileSection.classList.add("hidden");
    });
  
    /* ============================
       NAVIGATION & SECTION HANDLING
    ============================ */
    const homeButton = document.getElementById("homeButton");
    const donateButton = document.getElementById("donateButton");
    const insightsButton = document.getElementById("insightsButton");
    const volunteerButton = document.getElementById("volunteerButton");
    const strategiesButton = document.getElementById("strategiesButton");
  
    const donateSection = document.getElementById("donateSection");
    const insightsSection = document.getElementById("insightsSection");
    const volunteerSection = document.getElementById("volunteerSection");
    const strategiesSection = document.getElementById("strategiesSection");
  
    function hideAllSections() {
      donateSection.classList.add("hidden");
      insightsSection.classList.add("hidden");
      volunteerSection.classList.add("hidden");
      strategiesSection.classList.add("hidden");
      profileSection.classList.add("hidden");
    }
  
    function showSection(section) {
      hideAllSections();
      section.classList.remove("hidden");
    }
  
    donateButton.addEventListener("click", () => showSection(donateSection));
    insightsButton.addEventListener("click", () => showSection(insightsSection));
    volunteerButton.addEventListener("click", () => showSection(volunteerSection));
    strategiesButton.addEventListener("click", () => showSection(strategiesSection));
    homeButton.addEventListener("click", () => hideAllSections());
  
    /* ============================
       DONATION FORM HANDLING & REAL‑TIME UPDATE
    ============================ */
    const donateForm = document.getElementById("donateForm");
    const donateResponse = document.getElementById("donateResponse");
    const donorsTableBody = document.querySelector("#donorsTable tbody");
    const partyEffect = document.getElementById("partyEffect");
  
    donateForm.addEventListener("submit", function (e) {
      e.preventDefault();
  
      const donorName = document.getElementById("donorName").value;
      const foodItem = document.getElementById("foodItem").value;
      const quantity = parseFloat(document.getElementById("quantity").value);
      const category = document.getElementById("donationCategory").value;
      const peopleFed = document.getElementById("peopleFed").value;
      const donationLocation = document.getElementById("donationLocation").value;
      const date = new Date().toLocaleDateString();
  
      // Update user's total donations and add donation detail
      currentUser.totalDonations += quantity;
      const donationDetail = { date, foodItem, quantity, category, peopleFed, location: donationLocation };
      currentUser.donations.push(donationDetail);
  
      // Display a thank-you message above the form
      donateResponse.innerHTML = `Awesome, eee! Thank you for donating ${quantity} kg of ${foodItem} to help feed people in ${donationLocation}.`;
  
      // Trigger confetti effect
      triggerPartyEffect();
  
      // Add donation data to the Insights table
      addDonationToTable(donorName, foodItem, quantity, category, peopleFed, donationLocation, date);
  
      donateForm.reset();
      // Refill donor name from currentUser
      document.getElementById("donorName").value = currentUser.name;
    });
  
    function addDonationToTable(name, food, quantity, category, peopleFed, location, date) {
      const tr = document.createElement("tr");
      tr.innerHTML = `<td>${name}</td>
                      <td>${food}</td>
                      <td>${quantity}</td>
                      <td>${category}</td>
                      <td>${peopleFed}</td>
                      <td>${location}</td>
                      <td>${date}</td>`;
      tr.classList.add("fade-in");
      donorsTableBody.appendChild(tr);
      setTimeout(() => {
        tr.classList.remove("fade-in");
      }, 1000);
    }
  
    // Trigger a confetti effect using falling emojis
    function triggerPartyEffect() {
      for (let i = 0; i < 10; i++) {
        const confetti = document.createElement("div");
        confetti.className = "confetti";
        confetti.textContent = "🎉";
        confetti.style.left = Math.random() * 100 + "%";
        confetti.style.animationDelay = Math.random() * 0.5 + "s";
        partyEffect.appendChild(confetti);
        confetti.addEventListener("animationend", () => {
          confetti.remove();
        });
      }
    }
  
    /* ============================
       VOLUNTEER FORM HANDLING
    ============================ */
    const volunteerForm = document.getElementById("volunteerForm");
    const volunteerResponse = document.getElementById("volunteerResponse");
  
    volunteerForm.addEventListener("submit", function (e) {
      e.preventDefault();
  
      const volunteerName = document.getElementById("volunteerName").value;
      const volunteerEmail = document.getElementById("volunteerEmail").value;
      const volunteerLocation = document.getElementById("volunteerLocation").value;
  
      volunteerResponse.innerHTML = `Thanks, ${volunteerName}! You're now a volunteer from ${volunteerLocation}. We'll contact you at ${volunteerEmail}.`;
  
      volunteerForm.reset();
    });
  });
  