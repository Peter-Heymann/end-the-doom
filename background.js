// Define a mapping of target hosts and their corresponding redirection URLs
const redirectMap = {
    "www.instagram.com": "/reels",
    "www.youtube.com": "/shorts",
    "www.tiktok.com": ""
  };
  
  // Base URLs for redirection
  const homepageMap = {
    "www.instagram.com": "https://www.instagram.com/",
    "www.youtube.com": "https://www.youtube.com/",
    "www.tiktok.com": "https://www.tiktok.com/"
  };
  
  // Function to determine if the current URL matches the target paths
  function getRedirectUrl(details) {
    const url = new URL(details.url);
    const path = url.pathname;
  
    // Check if the URL belongs to a mapped domain and matches a redirection path
    if (url.hostname in redirectMap && path.startsWith(redirectMap[url.hostname])) {
      return { redirectUrl: homepageMap[url.hostname] };
    }
  
    // No redirection needed
    return {};
  }
  
  // Listen to web requests and intercept them for potential redirection
  chrome.webRequest.onBeforeRequest.addListener(
    getRedirectUrl,
    {
      urls: [
        "*://www.instagram.com/reels/*",
        "*://www.youtube.com/shorts/*",
        "*://www.tiktok.com/*"
      ]
    },
    ["blocking"]
  );
  