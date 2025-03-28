document.addEventListener("DOMContentLoaded", function () {
    const fileInput = document.getElementById("upload-wallpaper-file");
    const previewImage = document.getElementById("upload-wallpaper-preview");
    const uploadBox = document.getElementById("upload-wallpaper-box");
    const tagsContainer = document.getElementById("upload-wallpaper-tags-container");
    const categoryBox = document.getElementById("upload-wallpaper-category-box");
    const uploadWallpaperBtn = document.getElementsByClassName("upload-wallpaper-btn")[0];
    const uploadWallpaperCardBtn = document.querySelectorAll(".upload-wallpaper");
    const uploadWallpaperCard = document.getElementsByClassName("upload-wallpaper-card")[0];
    const uploadSubmitBtn = document.getElementsByClassName("upload-wallpaper-submit-btn")[0];
    const titleInput = document.getElementById("wallpaper-title");

    uploadWallpaperCardBtn.forEach(button => {        
        button.addEventListener("click", function () {
            showPopup(uploadWallpaperCard, document.querySelector(".backdrop"));
        });
    });

    // Select close button
    document.querySelector(".upload-wallpaper-card-close-button").addEventListener("click", function () {
        hidePopup(uploadWallpaperCard, document.querySelector(".backdrop"));
    });

    function showPopup(popup, backdrop) {
        console.log("Inside showPopup function!");
        popup.style.display = "block"; // Make visible before animation
        popup.classList.add("show");
        backdrop.style.display = "block";
        document.body.classList.add("no-scroll");
    }

    function hidePopup(popup, backdrop) {
        console.log("Inside hidePopup function!");
        popup.classList.remove("show");
        popup.classList.add("hide");
        backdrop.style.display = "none";
        document.body.classList.remove("no-scroll");

        // Wait for animation to finish before hiding completely
        setTimeout(() => {
            popup.style.display = "none";
            popup.classList.remove("hide"); // Reset for next use
        }, 300); // Matches animation duration in CSS
    }

    // Clicking the upload box triggers file input
    uploadBox.addEventListener("click", function () {
        if (e.target !== previewImage) {
            fileInput.click();
        }
    });

    // File input change event to preview wallpaper
    fileInput.addEventListener("change", function () {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                previewImage.src = e.target.result;
                previewImage.style.display = "block"; // Show wallpaper preview
                uploadWallpaperBtn.style.display = "none";
            };
            reader.readAsDataURL(file);
        }
    });

    // Tags Input (Tagging System)
    categoryBox.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === "," || e.keyCode === 32) {
            e.preventDefault();
            let text = categoryBox.textContent.trim();
            if (text !== "") {
                addTag(text);
                categoryBox.textContent = ""; // Clear input field
            }
        }
    });

    // Function to create tags
    function addTag(tagText) {
        // Check if tag already exists
        const existingTags = document.querySelectorAll(".upload-wallpaper-tag");
        for (let tag of existingTags) {
            if (tag.textContent.trim() === tagText) {
                return; // Prevent duplicate tags
            }
        }

        let tag = document.createElement("div");
        tag.classList.add("upload-wallpaper-tag");
        tag.innerHTML = `${tagText} <span>&times;</span>`;
        tagsContainer.appendChild(tag);
    }

    // Remove tag on click
    tagsContainer.addEventListener("click", function (e) {
        if (e.target.tagName === "SPAN") {
            e.target.parentElement.remove();
        }
    });

    // Upload Wallpaper Function
    uploadSubmitBtn.addEventListener("click", function () {
        uploadWallpaper();
    });

    function uploadWallpaper() {
        const file = fileInput.files[0]; // Get selected file
        const title = titleInput.value.trim(); // Get title
        const tags = [...document.querySelectorAll(".upload-wallpaper-tag")].map(element => {
            let tag = element.textContent.trim().split(" ")[0]; // Get first word as tag
            return tag;
        }); 

        if (!file || !title) {
            alert("Please select a wallpaper and enter a title.");
            return;
        }

        const filteredTags = new Set(tags)

        if(filteredTags.length < 7) {
            alert("Please enter atleast 7 tags")
            return;
        }

        let formData = new FormData();
        formData.append("wallpaper", file); // Append file
        formData.append("title", title); // Append title
        formData.append("tags", JSON.stringify([...filteredTags])); // Append tags as JSON string

        fetch("/upload", {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            console.log("Upload successful:", data);
            alert("Wallpaper uploaded successfully!");

            // Clear input fields after upload
            titleInput.value = "";
            fileInput.value = "";
            previewImage.style.display = "none";
            uploadWallpaperBtn.style.display = "block";
            tagsContainer.innerHTML = ""; // Remove all tags
        })
        .catch(error => {
            console.error("Upload failed:", error);
            alert("Failed to upload wallpaper.");
        });
    }
});



// document.addEventListener("DOMContentLoaded", function () {
//     const fileInput = document.getElementById("upload-wallpaper-file");
//     const previewImage = document.getElementById("upload-wallpaper-preview");
//     const uploadBox = document.getElementById("upload-wallpaper-box");
//     const tagsContainer = document.getElementById("upload-wallpaper-tags-container");
//     const categoryBox = document.getElementById("upload-wallpaper-category-box");
//     const uploadWallpaperBtn = document.getElementsByClassName("upload-wallpaper-btn")[0]
//     const uploadWallpaperCardBtn = document.getElementsByClassName("upload-button")[0];
//     const uploadWallpaperCard = document.getElementsByClassName("upload-wallpaper-card")[0];

//     uploadWallpaperCardBtn.addEventListener("click", function () {
//         console.log("event listner triggered!")
//         showPopup(
//             uploadWallpaperCard,
//             document.querySelector(".backdrop")
//         );
//     });

//     // Select all close buttons
//     document.querySelector(".upload-wallpaper-card-close-button").addEventListener("click", function () {
//         hidePopup(
//             uploadWallpaperCard,
//             document.querySelector(".backdrop")
//         );
//     });

//     function showPopup(popup, backdrop) {
//         console.log("inside showPupup function!")
//         popup.style.display = "block"; // Make it visible before animation
//         popup.classList.add("show");
//         backdrop.style.display = "block"
//         document.body.classList.add("no-scroll")
//     }

//     function hidePopup(popup, backdrop) {
//         console.log("inside hidePupup function!")
//         popup.classList.remove("show");
//         popup.classList.add("hide");
//         backdrop.style.display = "none"
//         document.body.classList.remove("no-scroll")

//         // Wait for animation to finish before hiding completely
//         setTimeout(() => {
//             popup.style.display = "none";
//             popup.classList.remove("hide"); // Reset for next use
//         }, 300); // Matches animation duration in CSS
//     }

//     // Clicking the upload box also triggers file input
//     uploadBox.addEventListener("click", function () {
//         // if (e.target !== previewImage) {
//         //     fileInput.click();
//         // }
//         fileInput.click()
//     });

//     // File input change event to preview wallpaper
//     fileInput.addEventListener("change", function () {
//         const file = this.files[0];
//         if (file) {
//             const reader = new FileReader();
//             reader.onload = function (e) {
//                 previewImage.src = e.target.result;
//                 previewImage.style.display = "block"; // Show wallpaper preview
//                 uploadWallpaperBtn.style.display = "none";
//             };
//             reader.readAsDataURL(file);
//         }
//     });

//     // Tags Input (Tagging System)
//     categoryBox.addEventListener("keydown", function (e) {
//         if (e.key === "Enter" || e.key === "," || e.keyCode === 32) {
//             e.preventDefault();
//             let text = categoryBox.textContent.trim();
//             if (text !== "") {
//                 addTag(text);
//                 categoryBox.textContent = ""; // Clear input field
//             }
//         }
//     });

//     // Function to create tags
//     function addTag(tagText) {
//         // Check if tag already exists
//         const existingTags = document.querySelectorAll(".upload-wallpaper-tag");
//         for (let tag of existingTags) {
//             if (tag.textContent.trim() === tagText) {
//                 return; // Prevent duplicate tags
//             }
//         }

//         let tag = document.createElement("div");
//         tag.classList.add("upload-wallpaper-tag");
//         tag.innerHTML = `${tagText} <span>&times;</span>`;
//         tagsContainer.appendChild(tag);
//     }

//     // Remove tag on click
//     tagsContainer.addEventListener("click", function (e) {
//         if (e.target.tagName === "SPAN") {
//             e.target.parentElement.remove();
//         }
//     });
// });
