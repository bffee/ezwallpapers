console.log("script is running!")

document.addEventListener("DOMContentLoaded", function () {
    const popupCard = document.querySelector(".userInfoPopupCard");
    const popupCardBtn = document.querySelectorAll(".user-popup-card");
    const popupCardCloseBtn = document.querySelector(".popup-card-close-button");
    const backdrop = document.querySelector(".backdrop");
    
    // console.log("document is loaded!")
    console.log(popupCardBtn)
    popupCardBtn.forEach((button) => {
        // console.log("inside forEach!")
        let key = button.getAttribute("username");
        console.log(key)

        button.addEventListener("click", function () {
            // console.log("event listner triggered!")
            showUserInfoCard(popupCard, backdrop, key);
        });
    });

    // Select all close buttons
    popupCardCloseBtn.addEventListener("click", function () {
            hideUserInfoCard(popupCard, backdrop);
        });
    });

function showUserInfoCard(popupCard, backdrop, key, zIndex="1231") {
    // console.log("inside showPupup function!")
    console.log(key)
    const userObject = usersMap.get(key);
    const popupCardProfilePic = document.getElementsByClassName('user-info-popup-card-profile-pic')[0];
    const popupCardUserFullName = document.getElementsByClassName('user-info-popup-card-user-name')[0];
    const popupCardUsername = document.getElementsByClassName('user-info-popup-card-username')[0];
    const popupCardEmail = document.getElementsByClassName('user-info-popup-card-email')[0];
    const popupCardRole = document.getElementsByClassName('user-info-popup-card-role')[0];
    const popupCardStatus = document.getElementsByClassName('user-info-popup-card-status')[0];
    const viewReportBtn = document.getElementsByClassName("user-info-popup-card-view-reports")[0]

    popupCard.style.display = "flex"; // Make it visible before animation
    popupCard.style.zIndex = zIndex;
    popupCard.classList.add("show");
    backdrop.style.display = "block"
    document.body.classList.add("no-scroll")

    popupCardProfilePic.src = userObject.profilePicture
    popupCardUserFullName.firstElementChild.innerText = `${userObject.fname} ${userObject.lname}`
    popupCardUsername.firstElementChild.innerText = userObject.username
    popupCardEmail.firstElementChild.innerText = userObject.email
    popupCardRole.firstElementChild.innerText = userObject.privilege
    popupCardStatus.firstElementChild.innerText = userObject.state
    viewReportBtn.setAttribute('username', userObject.username)
    
    if(userObject.state === 'active'){
        popupCardStatus.classList.remove(popupCardStatus.classList[1])
        popupCardStatus.classList.add('user-info-popup-card-active')
    }
    else if(userObject.state === 'suspended'){
        popupCardStatus.classList.remove(popupCardStatus.classList[1])
        popupCardStatus.classList.add('user-info-popup-card-suspended')
    }
    else{
        popupCardStatus.classList.remove(popupCardStatus.classList[1])
        popupCardStatus.classList.add('user-info-popup-card-deleted')
    }
}

function hideUserInfoCard(popupCard, backdrop) {
    // console.log("inside hidePupup function!")
    popupCard.classList.remove("show");
    popupCard.classList.add("hide");

    if(backdrop){
        backdrop.style.display = "none"
        document.body.classList.remove("no-scroll")
    }
    
    // Wait for animation to finish before hiding completely
    setTimeout(() => {
        popupCard.style.display = "none";
        popupCard.classList.remove("hide"); // Reset for next use
    }, 300); // Matches animation duration in CSS
}
