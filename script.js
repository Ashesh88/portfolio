  <!-- JavaScript for Project Navigation -->
     
    <script>
      document.addEventListener("DOMContentLoaded", () => {
        const projectsContainer = document.getElementById("projects-container");
        const prevButton = document.getElementById("prev-project");
        const nextButton = document.getElementById("next-project");

        
        const baseScrollAmount = 320 + 32; // For smaller screens (mobile)
        const mdScrollAmount = 384 + 32; // For medium and larger screens (tablet/desktop)

       
        const getScrollAmount = () => {
          if (window.innerWidth >= 768) {
            // Tailwind's 'md' breakpoint
            return mdScrollAmount;
          }
          return baseScrollAmount;
        };

       
        nextButton.addEventListener("click", () => {
          projectsContainer.scrollBy({
            left: getScrollAmount(),
            behavior: "smooth", // Smooth scrolling animation
          });
        });


        
       
        prevButton.addEventListener("click", () => {
          projectsContainer.scrollBy({
            left: -getScrollAmount(),
            behavior: "smooth", // Smooth scrolling animation
          });
        });

      
        const updateButtonVisibility = () => {
          // Show/hide 'Previous' button
          // If scrollLeft is greater than 0, it means we are not at the very beginning
          if (projectsContainer.scrollLeft > 0) {
            prevButton.style.display = "block";
          } else {
            prevButton.style.display = "none";
          }

          
          const isAtEnd =
            projectsContainer.scrollLeft + projectsContainer.clientWidth >=
            projectsContainer.scrollWidth - 1;
          if (isAtEnd) {
            nextButton.style.display = "none";
          } else {
            nextButton.style.display = "block";
          }
        };

        
        projectsContainer.addEventListener("scroll", updateButtonVisibility);
        window.addEventListener("resize", updateButtonVisibility);

        // Initial check when the page loads to set the correct button visibility
        updateButtonVisibility();
      });
    </script>
   <!-- AOS Library -->
<script src="https://unpkg.com/aos@2.3.4/dist/aos.js"></script>
<script>
  AOS.init();
</script>

<!-- Animate bars from 0% to target -->
<script>
  document.addEventListener("DOMContentLoaded", function () {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bars = entry.target.querySelectorAll(".progress-bar");
          bars.forEach(bar => {
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
    }, { threshold: 0.4 });

    document.querySelectorAll(".skills-card").forEach(card => {
      observer.observe(card);
    });
  });
</script>