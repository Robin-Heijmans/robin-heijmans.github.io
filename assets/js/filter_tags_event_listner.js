document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('filter-toggle');
  const menu = document.getElementById('filter-menu');
  const checkboxes = document.querySelectorAll('.filter-checkbox');
  const cards = document.querySelectorAll('.project-card');

  // Toggle dropdown visibility
  toggleBtn.addEventListener('click', () => {
    menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
  });

  // Hide dropdown if clicking outside
  document.addEventListener('click', (e) => {
    if (!toggleBtn.contains(e.target) && !menu.contains(e.target)) {
      menu.style.display = 'none';
    }
  });

  // Filter projects based on checked checkboxes (AND logic)
  checkboxes.forEach((cb) => {
    cb.addEventListener('change', () => {
      const activeTags = Array.from(checkboxes)
        .filter((chk) => chk.checked)
        .map((chk) => chk.value);

      cards.forEach((card) => {
        const cardTags = card.dataset.tags.split(',');

        // Show card only if it contains all selected tags
        const hasAllTags = activeTags.every((tag) => cardTags.includes(tag));
        if (activeTags.length === 0 || hasAllTags) {
          card.parentElement.style.display = ''; // show
        } else {
          card.parentElement.style.display = 'none'; // hide
        }
      });
    });
  });
});
