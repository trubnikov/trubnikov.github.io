/**
 * Dima Trubnikov Portfolio - Main JavaScript
 * Handles page transitions, navigation, and image loading
 */

document.addEventListener('DOMContentLoaded', () => {
    // Add render class after brief delay for smooth page load
    setTimeout(() => {
        document.body.classList.add('render');
    }, 60);

    // Initialize image loading handler
    initImageLoader();

    // Initialize keyboard navigation (only if navigation elements exist)
    initKeyboardNavigation();
});

/**
 * Initialize image loading with imagesLoaded library
 */
function initImageLoader() {
    if (typeof imagesLoaded === 'function') {
        imagesLoaded('.glitch__img', { background: true }, () => {
            document.body.classList.remove('loading');
            document.body.classList.add('imgloaded');
        });
    } else {
        // Fallback if imagesLoaded is not available
        document.body.classList.remove('loading');
        document.body.classList.add('imgloaded');
    }
}

/**
 * Handle page navigation with transition effect
 * @param {HTMLElement} linkElement - The clicked link element
 */
function navigateToPage(linkElement) {
    document.body.classList.remove('render');
    
    const onTransitionEnd = () => {
        window.location.href = linkElement.href;
        document.body.removeEventListener('transitionend', onTransitionEnd);
    };
    
    document.body.addEventListener('transitionend', onTransitionEnd);
}

/**
 * Initialize keyboard navigation for demo switching
 */
function initKeyboardNavigation() {
    const navDemos = Array.from(document.querySelectorAll('nav.demos > .demo'));
    
    if (navDemos.length === 0) return;

    const totalDemos = navDemos.length;
    const currentIndex = navDemos.findIndex(element => 
        element.classList.contains('demo--current')
    );

    // Add click handlers to navigation demos
    navDemos.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            navigateToPage(event.currentTarget);
        });
    });

    // Add keyboard navigation
    document.addEventListener('keydown', (event) => {
        const { key } = event;
        let targetLink = null;

        if (key === 'ArrowLeft') {
            // Navigate to previous demo
            targetLink = currentIndex > 0 
                ? navDemos[currentIndex - 1] 
                : navDemos[totalDemos - 1];
        } else if (key === 'ArrowRight') {
            // Navigate to next demo
            targetLink = currentIndex < totalDemos - 1 
                ? navDemos[currentIndex + 1] 
                : navDemos[0];
        } else {
            return; // Ignore other keys
        }

        if (targetLink) {
            navigateToPage(targetLink);
        }
    });
}
