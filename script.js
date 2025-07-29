document.addEventListener("DOMContentLoaded", () => {
  const projectsContainer = document.getElementById("projects-container");
  const prevButton = document.getElementById("prev-project");
  const nextButton = document.getElementById("next-project");

  const baseScrollAmount = 320 + 32;
  const mdScrollAmount = 384 + 32;

  const getScrollAmount = () => {
    return window.innerWidth >= 768 ? mdScrollAmount : baseScrollAmount;
  };

  nextButton.addEventListener("click", () => {
    projectsContainer.scrollBy({
      left: getScrollAmount(),
      behavior: "smooth",
    });
  });

  prevButton.addEventListener("click", () => {
    projectsContainer.scrollBy({
      left: -getScrollAmount(),
      behavior: "smooth",
    });
  });

  const updateButtonVisibility = () => {
    prevButton.style.display =
      projectsContainer.scrollLeft > 0 ? "block" : "none";

    const isAtEnd =
      projectsContainer.scrollLeft + projectsContainer.clientWidth >=
      projectsContainer.scrollWidth - 1;
    nextButton.style.display = isAtEnd ? "none" : "block";
  };

  projectsContainer.addEventListener("scroll", updateButtonVisibility);
  window.addEventListener("resize", updateButtonVisibility);
  updateButtonVisibility();
});

// Animate Skills Bars
document.addEventListener("DOMContentLoaded", function () {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const bars = entry.target.querySelectorAll(".progress-bar");
          bars.forEach((bar) => {
            const target = parseInt(bar.getAttribute("data-percentage"));
            let current = 0;
            const interval = setInterval(() => {
              if (current >= target) {
                clearInterval(interval);
              } else {
                current++;
                bar.style.width = current + "%";
              }
            }, 10);
          });
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );

  document.querySelectorAll(".skills-card").forEach((card) => {
    observer.observe(card);
  });
});
