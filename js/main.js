document.addEventListener("DOMContentLoaded", () => {

  // Hero "See My Impact" button -> auto expand Case Studies
const impactBtn = document.querySelector(".impact-btn");
const caseList = document.getElementById("caseList");
const toggleCaseBtn = document.getElementById("toggleCaseList");

if (impactBtn && caseList && toggleCaseBtn) {
  impactBtn.addEventListener("click", e => {
    e.preventDefault();

    // Expand case studies if not already open
    if (!caseList.classList.contains("show")) {
      caseList.classList.add("show");
      toggleCaseBtn.textContent = "Hide Case Studies";
    }

    // Smooth scroll to the case studies section
    document.getElementById("cases").scrollIntoView({ 
      behavior: "smooth", 
      block: "start" 
    });
  });
}


  // Toggle Recommendations with smooth scroll
const toggleRecBtn = document.getElementById("toggleRecommendations");
const recList = document.getElementById("recommendationsList");
if (toggleRecBtn && recList) {
  toggleRecBtn.addEventListener("click", () => {
    recList.classList.toggle("show");
    const isOpen = recList.classList.contains("show");

    toggleRecBtn.textContent = isOpen
      ? "Hide Recommendations"
      : "View Recommendations";

    // Smooth scroll into view when opening
    if (isOpen) {
      const firstCard = recList.querySelector(".recommendation-card");
      if (firstCard) {
        firstCard.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  });
}


  // Open case study (state 2 -> 3)
  document.querySelectorAll(".read-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const target = document.getElementById(btn.dataset.target);
      if (!target) return;

      // Close all case studies first
      document.querySelectorAll(".case-details").forEach(d => d.classList.remove("open"));

      // Open the selected one
      target.classList.add("open");
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  // Hide case study (back to previews)
  document.querySelectorAll(".hide-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const caseDetails = btn.closest(".case-details");
      if (caseDetails) {
        caseDetails.classList.remove("open");
        caseDetails.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  // Contact Me buttons
  document.querySelectorAll(".contact-btn").forEach(btn => {
    btn.addEventListener("click", e => {
      e.preventDefault();
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // Contact form handler (demo only)
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", e => {
      e.preventDefault();
      alert("Thanks for reaching out! This form is not wired to a backend yet.");
    });
  }
});
// Open case study
document.querySelectorAll(".read-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const target = document.getElementById(btn.dataset.target);
    if (!target) return;
    document.querySelectorAll(".case-details").forEach(d => d.classList.remove("open"));
    target.classList.add("open");
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

// Hide case study
document.querySelectorAll(".hide-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const caseDetails = btn.closest(".case-details");
    if (caseDetails) caseDetails.classList.remove("open");
  });
});

