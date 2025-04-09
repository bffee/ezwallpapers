const container = document.querySelector('.wallpaper-container');
const loader = document.getElementById('loading');
let masonry = null;

// Function to initialize Masonry
function initializeMasonry() {
    if (!container) return;

    // Show loader before recalculating layout
    if (loader){
        loader.style.display = 'flex';
        loader.style.position = 'absolute'
        loader.style.top = '50%'
        loader.style.left = '50%'
    } 
    
    // Destroy old Masonry instance if it exists
    if (container.masonryInstance) {
        container.masonryInstance.destroy();
    }
    
    // Initialize Masonry
    masonry = new Masonry(container, {
        itemSelector: '.masonry-item',
        columnWidth: '.masonry-item',
        gutter: 10,
        horizontalOrder: true
    });
    
    // Save Masonry instance for future reference
    container.masonryInstance = masonry;
    
    // Hide loader after layout is done
    masonry.on('layoutComplete', () => {
        if (loader){
            loader.style.display = 'none';
            loader.style.position = 'relative'
            loader.style.top = '0'
            loader.style.left = '0'
        }
        container.style.visibility = 'visible';
        container.style.opacity = '1';
    });
    
    // Ensure layout updates after navigation
    setTimeout(() => masonry.layout(), 300);
}

// Run Masonry on initial page load
initializeMasonry();

// Recalculate Masonry when navigating between pages
window.addEventListener('popstate', initializeMasonry);
