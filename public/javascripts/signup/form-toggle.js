const loginFormToggle = document.getElementsByClassName('login-form-toggle')[0];
const signupFormToggle = document.getElementsByClassName('signup-form-toggle')[0];
const loginCard = document.getElementsByClassName('login-card')[0];
const signupCard = document.getElementsByClassName('signup-card')[0];

loginFormToggle.addEventListener('click', () => {
    signupFormToggle.classList.remove('active');
    loginFormToggle.classList.add('active');

    signupCard.style.right = "0";
    loginCard.style.left = "0";
});

signupFormToggle.addEventListener('click', () => {
    loginFormToggle.classList.remove('active');
    signupFormToggle.classList.add('active');

    loginCard.style.left = "-100%";
    signupCard.style.right = "100%";
});