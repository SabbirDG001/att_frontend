// Loading screen functionality
document.addEventListener('DOMContentLoaded', function() {
    // Show loading screen when clicking any link
    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function(e) {
            // Only show loading screen for internal links
            if (this.href && !this.href.startsWith('http') || 
                this.href.includes(window.location.host)) {
                showLoadingScreen();
            }
        });
    });

    // Show loading screen when submitting forms that navigate
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', function() {
            showLoadingScreen();
        });
    });

    // Show loading screen when programmatically navigating
    window.addEventListener('beforeunload', function() {
        showLoadingScreen();
    });

    // Hide loading screen when page is fully loaded
    window.addEventListener('load', function() {
        hideLoadingScreen();
    });
});

function showLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
        loadingScreen.classList.add('active');
    }
}

function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
        loadingScreen.classList.remove('active');
    }
}

// Override window.location.href to show loading screen
const originalLocationHref = Object.getOwnPropertyDescriptor(window.Location.prototype, 'href');
Object.defineProperty(window.Location.prototype, 'href', {
    set: function(value) {
        showLoadingScreen();
        setTimeout(() => {
            originalLocationHref.set.call(this, value);
        }, 100);
    },
    get: originalLocationHref.get
});

// Override window.location.replace to show loading screen
const originalLocationReplace = window.location.replace;
window.location.replace = function(url) {
    showLoadingScreen();
    setTimeout(() => {
        originalLocationReplace.call(window.location, url);
    }, 100);
};