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

  // ===== Open case study (accordion style, slower smooth scroll + button → label) =====
function bindReadButton(btn, index) {
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
      if (openDetail !== target) {
        openDetail.classList.remove("open");
        // Reset that preview’s button if it was converted to a label
        const otherPreview = openDetail.closest(".case-preview");
        const labelEl = otherPreview.querySelector(".case-label");
        if (labelEl) {
          const newBtn = document.createElement("button");
          newBtn.className = "btn btn-outline-dark read-btn";
          newBtn.textContent = "Read";
          newBtn.dataset.target = openDetail.id;
          labelEl.replaceWith(newBtn);
          // Re-bind properly
          const caseIndex = [...document.querySelectorAll(".case-preview")].indexOf(otherPreview);
          bindReadButton(newBtn, caseIndex);
        }
      }
    });

    // Toggle the clicked case study
    const willOpen = !target.classList.contains("open");
    target.classList.toggle("open", willOpen);

    // If opening, turn "Read" button into label
    if (willOpen) {
      const label = document.createElement("span");
      label.className = "case-label";
      label.textContent = `Case Study ${index + 1}`;
      btn.replaceWith(label);
    }

    // Delay scroll until after accordion animation is applied
    setTimeout(() => {
      smoothScrollTo(previewCard, -80, 1000);
    }, 350);
  });
}

// Attach to all initial read buttons
document.querySelectorAll(".read-btn").forEach((btn, index) => {
  bindReadButton(btn, index);
});


  // ===== Hide case study (back to previews, smooth scroll + restore button) =====
document.querySelectorAll(".hide-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const caseDetails = btn.closest(".case-details");
    const previewCard = btn.closest(".case-preview");
    if (caseDetails) {
      caseDetails.classList.remove("open");

      // Restore "Read" button if label exists
      const oldLabel = previewCard.querySelector(".case-label");
      if (oldLabel) {
        const newBtn = document.createElement("button");
        newBtn.className = "btn btn-outline-dark read-btn";
        newBtn.textContent = "Read";
        newBtn.dataset.target = caseDetails.id;

        // replace the label with button
        oldLabel.replaceWith(newBtn);

        // get case index
        const caseIndex = [...document.querySelectorAll(".case-preview")].indexOf(previewCard);
        bindReadButton(newBtn, caseIndex); // rebind proper logic
      }
    }

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

// ===== Auto-open Recommendations if URL includes "?open=recommendations" =====
const urlParams = new URLSearchParams(window.location.hash.split("?")[1]);
if (urlParams.get("open") === "recommendations") {
  const recList = document.getElementById("recommendationsList");
  const toggleRecBtn = document.getElementById("toggleRecommendations");

  if (recList && toggleRecBtn) {
    // Open recommendations
    recList.classList.add("show");
    toggleRecBtn.textContent = "Hide Recommendations";
    toggleRecBtn.setAttribute("aria-expanded", "true");

    // Scroll to first recommendation card (not just section header)
    const firstCard = recList.querySelector(".recommendation-card");
    if (firstCard) {
      const yOffset = -80; // adjust for fixed navbar height
      const y = firstCard.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }
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

document.addEventListener("DOMContentLoaded", () => {
  const careerGoalsLink = document.querySelector('a[href="experience.html#career-goals"]');
  
  if (careerGoalsLink) {
    careerGoalsLink.addEventListener("click", (e) => {
      // Let the browser navigate to the page
      setTimeout(() => {
        const careerGoalsSection = document.getElementById("career-goals");
        if (careerGoalsSection) {
          const y = careerGoalsSection.getBoundingClientRect().top + window.pageYOffset - 120;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      }, 300); // wait for navigation
    });
  }
});

// ===== Smooth scroll when Preview Resume opens =====
const resumePreviewBtn = document.querySelector('.hero-preview-btn a');
const resumePreviewSection = document.getElementById('resumePreview');

if (resumePreviewBtn && resumePreviewSection) {
  resumePreviewBtn.addEventListener('click', () => {
    // wait for Bootstrap collapse animation (~350ms)
    setTimeout(() => {
      const yOffset = -80; // offset for navbar
      const y = resumePreviewSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }, 400);
  });
}

<script>
document.addEventListener("DOMContentLoaded", () => {
  const previewBtn = document.getElementById("resumePreviewBtnIndex");
  const accordion  = document.getElementById("resumePreviewAccordionIndex");
  const closeLink  = document.getElementById("closeResumePreviewIndex");

  if (previewBtn && accordion && closeLink) {
    previewBtn.addEventListener("click", () => {
      accordion.classList.add("show");       // show overlay
      previewBtn.style.display = "none";     // hide button while open
    });

    closeLink.addEventListener("click", (e) => {
      e.preventDefault();
      accordion.classList.remove("show");    // hide overlay
      previewBtn.style.display = "inline-block"; // restore button
    });
  }
});
</script>



});
