const mobileMenu = document.getElementsByClassName("mobile-menu")[0]
const mobileMenuOpenBtn = document.getElementsByClassName('mobile-menu-open-button')[0]
const mobileMenuCloseBtn = document.getElementsByClassName('mobile-menu-close-button')[0]

mobileMenuOpenBtn.addEventListener("click", () => {
    mobileMenu.style.display = "flex"
    document.body.classList.add("no-scroll")
})

mobileMenuCloseBtn.addEventListener("click", () => {
    mobileMenu.style.display = "none"
    document.body.classList.remove("no-scroll")
})