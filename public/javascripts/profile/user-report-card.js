document.addEventListener("DOMContentLoaded", function (){
    const reportUserBtn = document.getElementById("report-user-button")
    const cancelBtn = document.getElementsByClassName("cancel")[0]
    const reportUserCard = document.getElementsByClassName('report-user-card')[0];
    const backdrop = document.querySelector(".backdrop");
    
    reportUserBtn.addEventListener("click", function() {
        showPopup(reportUserCard, backdrop)  
    })
    cancelBtn.addEventListener("click", function() {
        hidePopup(reportUserCard, backdrop)  
    })

})

function showPopup(popupCard, backdrop) {
    popupCard.style.display = "flex"; // Make it visible before animation
    popupCard.classList.add("show");
    backdrop.style.display = "block"
    document.body.classList.add("no-scroll")
}

function hidePopup(popupCard, backdrop) {
    popupCard.classList.remove("show");
    popupCard.classList.add("hide");
    backdrop.style.display = "none"
    document.body.classList.remove("no-scroll")
    
    // Wait for animation to finish before hiding completely
    setTimeout(() => {
        popupCard.style.display = "none";
        popupCard.classList.remove("hide"); // Reset for next use
    }, 300); // Matches animation duration in CSS
}
