const wallpaper_container = document.getElementsByClassName('wallpaper-container')[0];


function handleImage(container) {
  const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;

  container.style.backgroundColor = randomColor;

  const img = container.querySelector('img');

  img.addEventListener('load', () => {
    container.style.backgroundColor = 'transparent';
  });
}

// async function loadImages() {
//   console.log("function is called")
//   try {
//     const response = await fetch(`${window.location.href}?cursor=${cursor}`);

//     if (!response.ok) {
//       throw new Error(`Response status: ${response.status}`);
//     }

//     const responseJson = await response.json();
//     cursor = responseJson.cursor

//     for (let responseJson.wallpapers[index] of responseJson.responseJson.wallpapers[index]s) {
//       const a = document.createElement('a');
//       const img = document.createElement('img');
//       const masonry_item = document.createElement('masonry_item');

//       console.log("adding the responseJson.wallpapers[index] with the id of ", responseJson.wallpapers[index]._id)

//       a.href = `http://localhost:3000/preview?id=${responseJson.wallpapers[index]._id}`;
//       img.src = `/${responseJson.wallpapers[index].source}`;
//       img.loading = "lazy";

//       masonry_item.style.aspectRatio = responseJson.wallpapers[index].aspect_ratio;
//       masonry_item.classList.add("masonry-item")

//       masonry_item.appendChild(a)
//       a.appendChild(img);
//       handleImage(masonry_item);
//       responseJson.wallpapers[index]_container.appendChild(masonry_item);
//     }
//   }
//   catch (error) {
//     console.error(error.message);
//   }
// }

async function loadImages() {
  console.log("function is called");

  try {
    const response = await fetch(`${window.location.href}?cursor=${cursor}`);

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const responseJson = await response.json();
    cursor = responseJson.cursor;
    console.log(responseJson)

    let newElements = []; // Store new elements for Masonry


    for (let index = 0; index < responseJson.wallpapers.length; index++) {
      const wallpaper_img_container = document.createElement('a');
      const wallpaper_img = document.createElement('img');
      const masonry_item = document.createElement('div');
      const masonry_item_option_button_container = document.createElement('div')
      const masonry_item_option_button1 = document.createElement('button')
      const masonry_item_option_button2 = document.createElement('button')
      const masonry_item_option_button_icon1 = document.createElement('i')
      const masonry_item_option_button_icon2 = document.createElement('i')
      const user_profile_container = document.createElement('div')
      const user_details_container = document.createElement('a')
      const user_profile_picture = document.createElement('img')
      const user_username = document.createElement('span')
      const wallpaper_download_button = document.createElement('button')
      const wallpaper_download_button_icon = document.createElement('i')

      user_profile_container.classList.add("masonry-item-user-profile");
      
      if(true){        
        user_details_container.href =`/profile/@${responseJson.creators.username}`
        user_profile_picture.src = responseJson.creators.profilePicture
        user_username.innerText = `${responseJson.creators.fname} ${responseJson.creators.lname}`
      }else{
        user_details_container.href =`/profile/@${responseJson.creators[index].username}`
        user_profile_picture.src = responseJson.creators[index].profilePicture
        user_username.innerText = `${responseJson.creators[index].fname} ${responseJson.creators[index].lname}`
      }
      wallpaper_download_button.setAttribute("wallpaper", responseJson.wallpapers[index]._id)
      wallpaper_download_button.classList.add("download-button")
      wallpaper_download_button.addEventListener("click", function(){
        downloadImg(responseJson.wallpapers[index]._id)
      })

      wallpaper_download_button_icon.classList.add("fa-solid", "fa-arrow-down")

      user_details_container.appendChild(user_profile_picture)
      user_details_container.appendChild(user_username)
      wallpaper_download_button.appendChild(wallpaper_download_button_icon)
      user_profile_container.appendChild(user_details_container)
      user_profile_container.appendChild(wallpaper_download_button)

      masonry_item_option_button_container.classList.add("masonry-item-option-buttons")
      masonry_item_option_button_icon1.classList.add("fa-solid", "fa-flag")
      masonry_item_option_button_icon2.classList.add("fa-solid", "fa-share")

      masonry_item_option_button1.appendChild(masonry_item_option_button_icon1)
      masonry_item_option_button2.appendChild(masonry_item_option_button_icon2)
      masonry_item_option_button_container.appendChild(masonry_item_option_button1)
      masonry_item_option_button_container.appendChild(masonry_item_option_button2)


      console.log("adding the wallpaper with the id of ", responseJson.wallpapers[index]._id);

      wallpaper_img_container.href = `/preview?id=${responseJson.wallpapers[index]._id}`;
      wallpaper_img.src = `/${responseJson.wallpapers[index].source}`;
      wallpaper_img.loading = "lazy";

      masonry_item.style.aspectRatio = responseJson.wallpapers[index].aspect_ratio;
      wallpaper_img.id = responseJson.wallpapers[index]._id
      wallpaper_img.classList.add('wallpaper')
      masonry_item.classList.add("masonry-item");


      masonry_item.appendChild(wallpaper_img_container);
      masonry_item.appendChild(masonry_item_option_button_container);
      masonry_item.appendChild(user_profile_container);
      wallpaper_img_container.appendChild(wallpaper_img);
      handleImage(masonry_item);
      wallpaper_container.appendChild(masonry_item);

      newElements.push(masonry_item); // Add new elements to the array
    }

    // Wait for images to fully load before updating Masonry
    imagesLoaded(wallpaper_container, function () {
      masonry.appended(newElements); // Add new items to Masonry
      masonry.layout(); // Recalculate layout
    });

  } catch (error) {
    console.error(error.message);
  }
}


window.addEventListener('scroll', () => {
  if (window.scrollY >= 0 && cursor) {
    if (document.documentElement.scrollHeight - (window.innerHeight + window.scrollY) <= (window.innerHeight * 2) / 2) {
      loadImages();
    }
  }
})



