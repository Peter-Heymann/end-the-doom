// Function to remove elements matching a selector
function removeElements(selector) {
  const elements = document.querySelectorAll(selector);
  elements.forEach(element => element.remove());
  if (elements.length > 0) {
    console.log(`Removed ${elements.length} elements matching "${selector}".`);
  }
}

// Initial cleanup when the page loads
document.addEventListener("DOMContentLoaded", () => {
  // Define the selector for the Shorts link
  const shortsSelector = 'ytd-guide-entry-renderer[is-primary] a#endpoint[title="Shorts"]';

  // Find and remove the 'Shorts' link if it exists
  const shortsElement = document.querySelector(shortsSelector);
  if (shortsElement) {
    const parentRenderer = shortsElement.closest('ytd-guide-entry-renderer');
    if (parentRenderer) {
      parentRenderer.remove();
      console.log("Removed 'Shorts' link from YouTube.");
    }
  }

  // Remove dynamic content ('ytd-rich-section-renderer') when page loads
  const initialSelector = 'ytd-rich-section-renderer';
  removeElements(initialSelector);
});

// Set up a MutationObserver to watch for changes in the DOM
const observer = new MutationObserver(mutations => {
  let hasChanges = false;

  mutations.forEach(mutation => {
    if (mutation.type === 'childList') {
      // Define the selector for the Shorts link
      const shortsSelector = 'ytd-guide-entry-renderer[is-primary] a#endpoint[title="Shorts"]';

      // Find and remove the 'Shorts' link if it exists
      const shortsElement = document.querySelector(shortsSelector);
      if (shortsElement) {
        const parentRenderer = shortsElement.closest('ytd-guide-entry-renderer');
        if (parentRenderer) {
          parentRenderer.remove();
          console.log("Removed 'Shorts' link from YouTube.");
          hasChanges = true;
        }
      }

      // Remove unwanted 'ytd-rich-section-renderer' elements
      const richSectionSelector = 'ytd-rich-section-renderer';
      if (document.querySelector(richSectionSelector)) {
        removeElements(richSectionSelector);
        hasChanges = true;
      }
    }
  });

  // Log changes if any elements were removed
  if (hasChanges) {
    console.log("Dynamic content updated and unwanted elements removed.");
  }
});

// Start observing the entire document for changes
observer.observe(document.body, {
  childList: true, // Watch for added or removed child nodes
  subtree: true    // Monitor all descendant nodes
});
