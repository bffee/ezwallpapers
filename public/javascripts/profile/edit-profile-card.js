document.addEventListener("DOMContentLoaded", function () {
    const fileInput = document.getElementById("edit-profile-file");
    const profileImage = document.getElementById("edit-profile-image");
    const categoryBox = document.getElementById("edit-profile-category-box");
    const tagsContainer = document.getElementById("edit-profile-tags-container");
    const editProfileBtn = document.getElementById("edit-profile-button");
    const editProfileCard = document.getElementsByClassName("edit-profile-card")[0];

    editProfileBtn.addEventListener("click", function () {
        console.log("event listner triggered!")
        showPopup(
            editProfileCard,
            document.querySelector(".backdrop")
        );
    });

    // Select all close buttons
    document.querySelector(".edit-profile-close-button").addEventListener("click", function () {
        hidePopup(
            editProfileCard,
            document.querySelector(".backdrop")
        );
    });

    function showPopup(popup, backdrop) {
        console.log("inside showPupup function!")
        popup.style.display = "block"; // Make it visible before animation
        popup.classList.add("show");
        backdrop.style.display = "block"
        document.body.classList.add("no-scroll")
    }

    function hidePopup(popup, backdrop) {
        console.log("inside hidePupup function!")
        popup.classList.remove("show");
        popup.classList.add("hide");
        backdrop.style.display = "none"
        document.body.classList.remove("no-scroll")

        // Wait for animation to finish before hiding completely
        setTimeout(() => {
            popup.style.display = "none";
            popup.classList.remove("hide"); // Reset for next use
        }, 300); // Matches animation duration in CSS
    }

    // Clicking profile picture also triggers file input
    profileImage.addEventListener("click", function () {
        fileInput.click();
    });

    // File input change event to preview image
    fileInput.addEventListener("change", function () {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                profileImage.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    // Categories Input (Tagging System)
    categoryBox.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            let text = categoryBox.textContent.trim();
            if (text !== "") {
                addCategoryTag(text);
                categoryBox.textContent = ""; // Clear input field
            }
        }
    });

    // Function to create category tags
    function addCategoryTag(tagText) {
        // Check if tag already exists
        const existingTags = document.querySelectorAll(".edit-profile-tag");
        for (let tag of existingTags) {
            if (tag.textContent.trim() === tagText) {
                return; // Prevent duplicate tags
            }
        }

        let tag = document.createElement("div");
        tag.classList.add("edit-profile-tag");
        tag.innerHTML = `${tagText} <span>&times;</span>`;
        tagsContainer.appendChild(tag); // Append tag inside the tags container
    }

    // Remove tag on click
    tagsContainer.addEventListener("click", function (e) {
        if (e.target.tagName === "SPAN") {
            e.target.parentElement.remove();
        }
    });
});
