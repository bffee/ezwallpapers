const toggleButton = document.getElementById('authToggle');
const dropdown = document.getElementById('authDropdown');

toggleButton.addEventListener('click', (e) => {
  e.stopPropagation();
  dropdown.classList.toggle('show');
});

// Close dropdown when clicking outside the auth container
document.addEventListener('click', (e) => {
  if (!e.target.closest('.auth-container')) {
    dropdown.classList.remove('show');
  }
});
