function previewImage(event) {
    const reader = new FileReader();
    reader.onload = function() {
        document.querySelector('.form-profile-picture img').src = reader.result;
    }
    reader.readAsDataURL(event.target.files[0]);
}

function removeAllWhitespaces(str) {
    return str.replace(/\s+/g, ''); // \s+ matches all spaces (including tabs, newlines, etc.)
  }
  

function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

function addTag(event) {
    if (event.key === ' ' || event.key === ',' || event.key === "Enter") {
        event.preventDefault();
        const input = event.target;
        const tagContainer = document.querySelector('.tag-input-container');
        const tagText = input.textContent.trim();
        if (tagText) {
            const tag = document.createElement('span');
            tag.classList.add('tag');
            tag.innerHTML = `${tagText} <span class='remove-tag' onclick='removeTag(this)'>&times;</span>`;
            tagContainer.insertBefore(tag, input);
            // tagContainer.insertAdjacentElement(tag, tagContainer)
            input.textContent = '';
        }
    }
}

function removeTag(element) {
    element.parentElement.remove();
}

document.getElementById("form-submit-btn").addEventListener("click", async function(event) {
    event.preventDefault();
    console.log("event triggered")

    let img = document.getElementById("form-profile-picture").files[0];
    
    const fname = document.getElementById("first-name").value.trim()
    const lname = document.getElementById("last-name").value.trim()
    const username = document.getElementById("username").value.trim()
    const email = document.getElementById("email").value.trim()
    const password = document.getElementById("password").value.trim()
    const bio = document.getElementById("bio").value.trim()
    const categories = [...document.getElementsByClassName("tag")].map(element => element.textContent.trim().split(" ")[0].toLowerCase())

    if(!fname || !lname || !username || !email || !password || password.length < 7 || !bio || categories.length < 5 || !email.includes("@") || !email.includes(".")) {
        console.log("iside checking")
        if(!fname){
            document.getElementById('first-name').style.border = '1px solid tomato'
            document.getElementById('required-fname').style.display = 'inline'
            console.log("inside fname")
        }
        if(!lname){
            document.getElementById('last-name').style.border = '1px solid tomato'
            document.getElementById('required-lname').style.display = 'inline'
            console.log("inside lname")
        }
        if(!username){
            document.getElementById('username').style.border = '1px solid tomato'
            document.getElementById('required-username').style.display = 'inline'
            console.log("inside uname")
        }
        if(!email){
            document.getElementById('email').style.border = '1px solid tomato'
            document.getElementById('required-email').style.display = 'inline'
            console.log("inside email")
        }
        if(!email.includes("@") || !email.includes(".") && email){
            document.getElementById('email').style.border = '1px solid tomato'
            document.getElementById('invalid-email').style.display = 'inline'
            console.log("inside email includes @ and .")
        }
        if(!password){
            document.getElementById('password').style.border = '1px solid tomato'
            document.getElementById('required-password').style.display = 'inline'
            console.log("inside password")
        }
        if(password.length > 0 && password.length < 7){
            document.getElementById('password').style.border = '1px solid tomato'
            document.getElementById('short-password').style.display = 'inline'
            console.log("inside password len")
        }
        if(!bio){
            document.getElementById('bio').style.border = '1px solid tomato'
            document.getElementById('required-bio').style.display = 'inline'
            console.log("inside bio")
        }
        if(categories.length === 0){
            document.getElementsByClassName('tag-input-container')[0].style.border = '1px solid tomato'
            document.getElementById('required-tags').style.display = 'inline'
            console.log("inside tags")

        }else if(categories.length > 0 && categories.length < 5){
            document.getElementsByClassName('tag-input-container')[0].style.border = '1px solid tomato'
            document.getElementById('minimum-tags').style.display = 'inline'
            console.log("inside tags req")
        }
        return
    }
    console.log("outsite the checking")
    document.getElementById('short-password').style.display = 'none'
    document.getElementById("invalid-email").style.display = 'none'
    document.getElementById("minimum-tags").style.display = 'none';

    const formData = new FormData();
    formData.append("fname", removeAllWhitespaces(capitalizeFirstLetter(fname)))
    formData.append("lname", removeAllWhitespaces(capitalizeFirstLetter(lname)))
    formData.append("username", username.toLowerCase())
    formData.append("email", removeAllWhitespaces(email))
    formData.append("password", removeAllWhitespaces(password))
    formData.append("bio", capitalizeFirstLetter(bio))
    formData.append("categories", JSON.stringify([...new Set(categories)]))
    formData.append("profilePicture", img)

    console.log("form created")

    try {
        const response = await fetch("/auth/signup", {method: "POST", body: formData})
        if(response.ok){
            window.location.href = '/'
        }
        else if(response.status === 400){
            const data = await response.json()
            if(data.email){
                document.getElementById("existing-email").style.display = 'inline'
                return
            }
            else if(data.username){
                document.getElementById("existing-username").style.display = 'inline'
                return
            }
            else if(data.both){
                document.getElementById("existing-username").style.display = 'inline'
                document.getElementById("existing-email").style.display = 'inline'
                return
            }
            throw new Error("something went wrong")
        }
        else{
            throw new Error("failed to submit the form data")
        }
    } catch (error) {
        console.log(error)
    }
})

document.querySelectorAll(".form-inputs").forEach(element => {
    element.addEventListener("click", event => {
        if(event.target.classList.contains("tag-input-container") || event.target.classList.contains("tag-input")){
            event.target.style.border = '1px solid var(--hover-colour)'
            document.getElementById('required-tags').style.display = 'none'
            return
        }
        else{
            if(event.target.classList.contains("form-inputs")){
                event.target.style.border = 'none'
                event.target.nextElementSibling.style.display = 'none'
                return
            }
            return
        }
    })
})
