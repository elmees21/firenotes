document.addEventListener("DOMContentLoaded", function () {
  const openWindowButton = document.getElementById("openWindowButton");

  openWindowButton.textContent = chrome.i18n.getMessage("externWindow");

  openWindowButton.addEventListener("click", function () {
    window.open("editor/index.html", "FireNotes", "width=800,height=600");
  });
});
