const sideMenu = document.getElementsByClassName('side-menu')[0]
const sideMenuOpenButton = document.getElementsByClassName('side-menu-open-button')[0]
const sideMenuCloseButton = document.getElementsByClassName('side-menu-close-button')[0]
const backdrop = document.getElementsByClassName('backdrop')[0]

sideMenuOpenButton.addEventListener("click", () => {
    sideMenu.classList.add("side-menu-open")
    sideMenu.classList.remove("side-menu-close")
    document.body.classList.add("no-scroll")
    backdrop.style.display = "block"
})

sideMenuCloseButton.addEventListener("click", () => {
    sideMenu.classList.add("side-menu-close")
    sideMenu.classList.remove("side-menu-open")
    document.body.classList.remove("no-scroll")
    backdrop.style.display = "none"
})