
// Save the settings to storage when the save button is pressed.
document.getElementById("save").addEventListener("click", () => {
  let openai_api_key = document.getElementById("openai_api_key").value;
  browser.storage.local.set({
    "openai_api_key": openai_api_key
  });
});

// Restore the saved settings when the page is loaded.
browser.storage.local.get("openai_api_key").then((result) => {
  document.getElementById("openai_api_key").value = result.openai_api_key || "e.g. sk-*********************";
});
