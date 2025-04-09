const moreOptionsBtn = document.getElementById('moreOptionsBtn');
const moreOptionsDropdown = document.getElementById('moreOptionsDropdown');

// Toggle dropdown on click
moreOptionsBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  moreOptionsDropdown.classList.toggle('show');
});

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
  if (!e.target.closest('.more-options-container')) {
    moreOptionsDropdown.classList.remove('show');
  }
});

