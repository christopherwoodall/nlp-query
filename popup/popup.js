// When the popup is loaded, display the custom message
browser.storage.local.get('customMessage').then((result) => {
  document.getElementById('message').textContent = result.customMessage || 'Hello, world!';
});