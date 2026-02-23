/* =====================================================
   PROJECT FILTERS
===================================================== */
document.addEventListener('DOMContentLoaded', () => {

  const filterBtns = document.querySelectorAll('.filter-btn');
  const filterSelect = document.getElementById('filter-select');
  const projectCards = document.querySelectorAll('.project-card');

  // Function to filter projects
  function filterProjects(filter) {
    projectCards.forEach(card => {
      const category = card.dataset.category;
      
      if (filter === 'all' || category === filter) {
        card.style.display = 'block';
        // Force reflow
        void card.offsetWidth;
        card.style.opacity = '1';
        card.style.transform = 'scale(1)';
      } else {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.95)';
        setTimeout(() => {
          card.style.display = 'none';
        }, 300);
      }
    });
  }

  // Desktop: Button filters
  filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const filter = this.dataset.filter;
      
      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      
      // Filter projects
      filterProjects(filter);
    });
  });

  // Mobile: Dropdown filter
  if (filterSelect) {
    filterSelect.addEventListener('change', function() {
      const filter = this.value;
      console.log('Filter changed to:', filter); // Debug
      filterProjects(filter);
    });
  }

  /* =====================================================
     SMOOTH SCROLL
  ===================================================== */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const offsetTop = targetElement.offsetTop - 80;
        
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });

});
