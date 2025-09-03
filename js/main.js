// Init swiper for case study carousels
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".caseSwiper").forEach(swiperEl => {
    new Swiper(swiperEl, {
      slidesPerView: 1,
      spaceBetween: 20,
      navigation: {
        nextEl: swiperEl.querySelector(".swiper-button-next"),
        prevEl: swiperEl.querySelector(".swiper-button-prev"),
      }
    });
  });

  const toggleBtn = document.getElementById("toggleCaseList");
  const caseList = document.getElementById("caseList");
  const contactSection = document.getElementById("contact");

  // Toggle case list
  if (toggleBtn && caseList) {
    toggleBtn.addEventListener("click", () => {
      caseList.classList.toggle("show");
      toggleBtn.textContent = caseList.classList.contains("show") ? "Hide Case Studies" : "View Case Studies";
    });
  }

  // Expand/collapse case details
  document.querySelectorAll(".read-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const target = document.getElementById(btn.dataset.target);
      document.querySelectorAll(".case-details").forEach(d => {
        if (d !== target) d.classList.remove("open");
      });
      target.classList.toggle("open");
    });
  });

  // View full case study
  document.querySelectorAll(".view-full").forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const caseDetails = link.closest(".case-details");
      caseDetails.querySelector(".swiper").style.display = "none";
      caseDetails.querySelector(".full-view").classList.add("active");
    });
  });

  // Collapse full case study
  document.querySelectorAll(".collapse-full").forEach(btn => {
    btn.addEventListener("click", () => {
      const caseDetails = btn.closest(".case-details");
      caseDetails.querySelector(".swiper").style.display = "block";
      caseDetails.querySelector(".full-view").classList.remove("active");
    });
  });

  // Contact Me buttons
  document.querySelectorAll(".contact-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
});
