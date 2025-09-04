document.addEventListener("DOMContentLoaded", () => {
  // ===== Helpers =====
  const smoothScrollTo = (el, yOffset = -80, duration = 800) => {
    if (!el) return;
    const startY = window.pageYOffset;
    const targetY = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
    const diff = targetY - startY;
    let start;

    const step = (timestamp) => {
      if (!start) start = timestamp;
      const time = timestamp - start;
      const percent = Math.min(time / duration, 1);
      window.scrollTo(0, startY + diff * percent);
      if (time < duration) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
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
      if (isOpen) smoothScrollTo(caseListEl, -80);
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
      smoothScrollTo(casesSection, -80);
    });
  }

  // ===== Open case study (accordion style, slower smooth scroll) =====
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

      // Close all case studies first
      document.querySelectorAll(".case-details.open").forEach((openDetail) => {
        if (openDetail !== target) openDetail.classList.remove("open");
      });

      // Toggle the clicked case study
      const willOpen = !target.classList.contains("open");
      target.classList.toggle("open", willOpen);

      // Delay scroll until after accordion animation is applied
      setTimeout(() => {
        smoothScrollTo(previewCard, -80, 1000); // slower duration
      }, 350); // matches CSS transition duration
    });
  });

  // ===== Hide case study (back to previews, smooth scroll) =====
  document.querySelectorAll(".hide-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const caseDetails = btn.closest(".case-details");
      const previewCard = btn.closest(".case-preview");
      if (caseDetails) caseDetails.classList.remove("open");
      setTimeout(() => {
        smoothScrollTo(previewCard, -80, 800);
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

  // ===== Recommendations Toggle (all cards visible) =====
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
          // delay scroll until visible so header isn’t cut off
          setTimeout(() => {
            smoothScrollTo(firstCard, -80, 800);
          }, 350);
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
  // ===== Auto-close navbar on link click (mobile + desktop) =====
document.querySelectorAll(".navbar-nav .nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    const navbarCollapse = document.querySelector(".navbar-collapse");
    if (navbarCollapse && navbarCollapse.classList.contains("show")) {
      const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
      if (bsCollapse) {
        bsCollapse.hide();
      }
    }
  });
});

  // ===== Nav "Case Studies" link -> expand section & scroll =====
  document.querySelectorAll('.nav-link[href="#cases"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      // Open the case studies if closed
      if (caseListEl && !caseListEl.classList.contains("show")) {
        caseListEl.classList.add("show");
        if (toggleCaseBtn) {
          toggleCaseBtn.textContent = "Hide Case Studies";
          toggleCaseBtn.setAttribute("aria-expanded", "true");
        }
      }

      // Smooth scroll to the section
      if (casesSection) {
        smoothScrollTo(casesSection, -80, 800);
      }
    });
  });


});
