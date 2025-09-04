document.addEventListener("DOMContentLoaded", () => {
  // ===== Helpers =====
  const scrollToEl = (el, yOffset = -80) => {
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  const casesSection = document.getElementById("cases");
  const caseListEl = document.getElementById("caseList");
  const toggleCaseBtn = document.getElementById("toggleCaseList");
  const impactBtn = document.querySelector(".impact-btn");
  const contactSection = document.getElementById("contact");

  // ===== Case Studies Toggle (State 1 <-> 2) =====
  if (toggleCaseBtn && caseListEl) {
    toggleCaseBtn.addEventListener("click", (e) => {
      e.preventDefault();
      caseListEl.classList.toggle("show");
      const isOpen = caseListEl.classList.contains("show");
      toggleCaseBtn.textContent = isOpen ? "Hide Case Studies" : "View Case Studies";
      toggleCaseBtn.setAttribute("aria-expanded", String(isOpen));
      if (isOpen) scrollToEl(caseListEl, -80);
    });
  }

  // ===== Hero "See My Impact" -> Expand Case Studies & scroll =====
  if (impactBtn && caseListEl && toggleCaseBtn && casesSection) {
    impactBtn.addEventListener("click", (e) => {
      e.preventDefault();
      if (!caseListEl.classList.contains("show")) {
        caseListEl.classList.add("show");
        toggleCaseBtn.textContent = "Hide Case Studies";
        toggleCaseBtn.setAttribute("aria-expanded", "true");
      }
      scrollToEl(casesSection, -80);
    });
  }

  // ===== Open case study (accordion style, smooth scroll) =====
  document.querySelectorAll(".read-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = document.getElementById(btn.dataset.target);
      if (!target) return;

      const previewCard = btn.closest(".case-preview");

      // Ensure State 2 if user is in State 1
      if (caseListEl && !caseListEl.classList.contains("show")) {
        caseListEl.classList.add("show");
        if (toggleCaseBtn) {
          toggleCaseBtn.textContent = "Hide Case Studies";
          toggleCaseBtn.setAttribute("aria-expanded", "true");
        }
      }

      // Close other case studies
      document.querySelectorAll(".case-details.open").forEach((openDetail) => {
        if (openDetail !== target) openDetail.classList.remove("open");
      });

      // Toggle the clicked case study
      const willOpen = !target.classList.contains("open");
      target.classList.toggle("open", willOpen);

      // Smooth scroll AFTER expand/collapse animation
      setTimeout(() => {
        scrollToEl(previewCard, -80);
      }, 350); // matches CSS transition/animation duration
    });
  });

  // ===== Hide case study (back to previews, smooth scroll) =====
  document.querySelectorAll(".hide-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const caseDetails = btn.closest(".case-details");
      const previewCard = btn.closest(".case-preview");
      if (caseDetails) caseDetails.classList.remove("open");
      setTimeout(() => {
        scrollToEl(previewCard, -80);
      }, 300);
    });
  });

  // ===== Contact Me buttons =====
  document.querySelectorAll(".contact-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // ===== Recommendations Toggle =====
  const toggleRecBtn = document.getElementById("toggleRecommendations");
  const recList = document.getElementById("recommendationsList");
  if (toggleRecBtn && recList) {
    toggleRecBtn.addEventListener("click", () => {
      recList.classList.toggle("show");
      const isOpen = recList.classList.contains("show");
      toggleRecBtn.textContent = isOpen ? "Hide Recommendations" : "View Recommendations";
      if (isOpen) {
        const firstCard = recList.querySelector(".recommendation-card");
        if (firstCard) {
          firstCard.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    });
  }

  // ===== Contact form handler (demo only) =====
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Thanks for reaching out! This form is not wired to a backend yet.");
    });
  }
});
