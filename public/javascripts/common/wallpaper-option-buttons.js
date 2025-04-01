const downloadButtons = document.querySelectorAll(".download-button")
downloadButtons.forEach(button => {
    const wallpaper = button.getAttribute('wallpaper')
    button.addEventListener("click", function () {
        console.log("event triggered")
        downloadImg(wallpaper)
    });
});

function downloadImg(id) {
    console.log("id is ", id)
    const img = document.getElementById(id);
    console.log("img is ", img)
    const imgUrl = img.src;

    // Create an anchor link for the download
    const link = document.createElement("a");
    link.href = imgUrl;
    link.download = imgUrl.split('/').pop();  // Extract the image filename from the URL

    // Trigger the download by clicking the link
    link.click();
}

// Select all buttons with the class "logout"
document.querySelectorAll('.logout').forEach(button => {
    button.addEventListener('click', async () => {
        try {
            const response = await fetch('/logout', { method: 'POST', credentials: 'include' });
            const data = await response.json();
            alert(data.message); // Show logout message
            window.location.reload(); // Reload to reflect logout
        } catch (error) {
            console.error('Logout failed:', error);
        }
    });
});

