const textArea = document.getElementById("keywords");

textArea.addEventListener("keyup", event => {
    let newHeight = event.target.scrollHeight;
    textArea.style.height = `${newHeight}px`;
})
