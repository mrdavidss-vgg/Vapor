/**
 * basically...
 * this gets the current settings and applies them on start
 * anything i add to settings i'll need to add here
 */

(function () {
  if (window !== window.top) {
    return;
  }

  const abCloak = localStorage.getItem("abCloak");

  if (abCloak === "true") {
    const cloakUrl = localStorage.getItem("abCloakUrl") || "https://google.com";
    const originalHostname = location.hostname;

    const newTab = window.open("about:blank", "_blank");
    newTab.document.write(`
            <style>
              body { margin: 0; padding: 0; overflow: hidden; }
              iframe { width: 100vw; height: 100vh; border: none; }
            </style>
            <iframe src="https://${originalHostname}"></iframe>
      `);
    newTab.document.close();

    window.location.href = cloakUrl;
  }

  const closePrevent = localStorage.getItem("closePrevent");

  if (closePrevent === "true") {
    window.addEventListener("beforeunload", (event) => {
      event.returnValue = true;
    });
  } else {
    window.removeEventListener("beforeunload", (event) => {
      event.returnValue = true;
    });
  }
})();
