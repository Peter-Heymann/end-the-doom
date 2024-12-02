// Background Service Worker is running
console.log('Background Service Worker is running');

// Utility function to check if a redirect is needed based on URL
function shouldRedirect(url) {
  const currentUrl = new URL(url);

  // Redirect if the URL is from Instagram Reels
  if (currentUrl.hostname === "www.instagram.com" && currentUrl.pathname.startsWith("/reels")) {
    return { redirectUrl: "https://www.instagram.com/" }; // Redirect to Instagram homepage
  }

  // Redirect if the URL is from YouTube Shorts
  if (currentUrl.hostname === "www.youtube.com" && currentUrl.pathname.startsWith("/shorts")) {
    return { redirectUrl: "https://www.youtube.com/" }; // Redirect to YouTube homepage
  }

  // Redirect if the URL is from TikTok
  if (currentUrl.hostname === "www.tiktok.com") {
    return { redirectUrl: "https://www.tiktok.com/" }; // Redirect to TikTok homepage
  }

  // If no match, no redirect
  return {};
}

// Function to check the current tab URL and decide if we need to redirect
function checkForRedirect() {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tab = tabs[0];

    if (tab && tab.url) {
      const redirection = shouldRedirect(tab.url);
      if (redirection.redirectUrl) {
        console.log(`Redirecting from: ${tab.url} to: ${redirection.redirectUrl}`);
        chrome.tabs.update(tab.id, { url: redirection.redirectUrl });
      }
    }
  });
}

// Frequency for checking the page
let checkInterval = 5000; // Default check interval (5 seconds)

// Regularly check if you're on a page that needs a redirect
function startChecking() {
  setInterval(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0];
      
      if (tab && tab.url) {
        const currentUrl = new URL(tab.url);
        
        // If we're on Instagram Reels, YouTube Shorts, or TikTok, check more frequently
        if (
          currentUrl.hostname === "www.instagram.com" && currentUrl.pathname.startsWith("/reels") ||
          currentUrl.hostname === "www.youtube.com" && currentUrl.pathname.startsWith("/shorts") ||
          currentUrl.hostname === "www.tiktok.com"
        ) {
          checkInterval = 1000; // Check every second (for Shorts/Reels/TikTok)
        } else {
          checkInterval = 5000; // Default check interval (5 seconds)
        }

        // Perform the check and redirect if necessary
        checkForRedirect();
      }
    });
  }, checkInterval);
}

// Start checking for the redirects
startChecking();
