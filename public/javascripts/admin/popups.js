document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".wallpaperContainer").forEach((button) => {
        button.addEventListener("click", function () {
            showPopup(document.querySelector(".wallpaperInfoPopupCard"));
        });
    });

    // Select all close buttons
    document.querySelector(".popup-card-close-button").addEventListener("click", function () {
            hidePopup(document.querySelector(".wallpaperInfoPopupCard"));
        });
    });

function showPopup(popup) {
    popup.style.display = "flex"; // Make it visible before animation
    popup.classList.add("show");
}

function hidePopup(popup) {
    popup.classList.remove("show");
    popup.classList.add("hide");

    // Wait for animation to finish before hiding completely
    setTimeout(() => {
        popup.style.display = "none";
        popup.classList.remove("hide"); // Reset for next use
    }, 300); // Matches animation duration in CSS
}
