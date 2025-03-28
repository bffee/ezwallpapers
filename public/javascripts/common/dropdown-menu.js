const dropdownMenuTrigger = document.getElementsByClassName('dropdown-menu-trigger')[0]
const dropdownMenu = document.getElementsByClassName('dropdown-menu')[0]

if(dropdownMenuTrigger){
    dropdownMenuTrigger.addEventListener("click", () => {
        if (dropdownMenu.classList.contains("show")) {
            dropdownMenu.classList.add("hidden")
            dropdownMenu.classList.remove("show")
        }
        else{
            dropdownMenu.classList.add("show")
            dropdownMenu.classList.remove("hidden")
        }})
}