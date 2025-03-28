const container = document.querySelectorAll('.wallpaper-container')[0]


    const masonry = new Masonry(container, {
        itemSelector: '.masonry-item',
        columnWidth: '.masonry-item', 
        gutter: 10, 
        horizontalOrder: true, 
    });
