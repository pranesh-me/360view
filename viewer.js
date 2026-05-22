(() => {
  "use strict";

  const viewer = document.querySelector("#jewelryViewer");
  const stage = document.querySelector("#viewerStage");
  const loadingOverlay = document.querySelector("#loadingOverlay");
  const progressBar = document.querySelector("#progressBar");
  const progressValue = document.querySelector("#progressValue");
  const progressTrack = document.querySelector(".progress-track");
  const rotateToggle = document.querySelector("#rotateToggle");
  const fullscreenToggle = document.querySelector("#fullscreenToggle");

  if (!viewer || !stage) {
    return;
  }

  // Normalize model-viewer's fractional progress value for UI and assistive tech.
  const setProgress = (value) => {
    const percent = Math.max(0, Math.min(100, Math.round(value * 100)));

    if (progressBar) {
      progressBar.style.width = `${percent}%`;
    }

    if (progressValue) {
      progressValue.textContent = `${percent}%`;
    }

    if (progressTrack) {
      progressTrack.setAttribute("aria-valuenow", String(percent));
    }

    return percent;
  };

  // Leave a short finish delay so the progress animation resolves smoothly.
  const hideLoader = () => {
    setProgress(1);

    window.setTimeout(() => {
      loadingOverlay?.classList.add("is-hidden");
    }, 240);
  };

  const showError = (title, message) => {
    loadingOverlay?.classList.add("has-error");

    const loadingCopy = loadingOverlay?.querySelector(".loading-copy");
    if (loadingCopy) {
      loadingCopy.textContent = title;
    }

    if (progressValue) {
      progressValue.textContent = message;
    }
  };

  const checkModelPath = async () => {
    const modelUrl = viewer.getAttribute("src");

    if (!modelUrl) {
      showError("Missing model source.", "Add a valid src attribute to the model-viewer element.");
      return;
    }

    if (window.location.protocol === "file:") {
      showError("Open this page with a local server.", "Use VSCode Live Server. Browsers block GLB loading from file:// URLs.");
      return;
    }

    try {
      const response = await fetch(modelUrl, { method: "HEAD" });

      if (!response.ok) {
        showError("The 3D model path returned an error.", `${modelUrl} returned HTTP ${response.status}.`);
      }
    } catch (error) {
      showError("The 3D model path could not be reached.", `${modelUrl}: ${error.message}`);
    }
  };

  viewer.addEventListener("progress", (event) => {
    const percent = setProgress(event.detail.totalProgress || 0);

    if (percent >= 100) {
      hideLoader();
    }
  });

  viewer.addEventListener("load", hideLoader);

  viewer.addEventListener("error", (event) => {
    const source = event.detail?.sourceError || event.detail || {};
    const message = source.message || "Open DevTools Console for the detailed Model Viewer error.";

    showError("The 3D model could not be loaded.", message);
  });

  window.setTimeout(() => {
    if (customElements.get("model-viewer")) {
      return;
    }

    showError("Model Viewer did not load.", "Check your internet connection because the component is imported from the CDN.");
  }, 8000);

  checkModelPath();

  // The attribute is the source of truth, so this also stays in sync with markup.
  rotateToggle?.addEventListener("click", () => {
    const shouldRotate = !viewer.hasAttribute("auto-rotate");

    if (shouldRotate) {
      viewer.setAttribute("auto-rotate", "");
    } else {
      viewer.removeAttribute("auto-rotate");
    }

    rotateToggle.setAttribute("aria-pressed", String(shouldRotate));
  });

  // Fullscreen is requested on the stage so controls and the 3D view stay together.
  fullscreenToggle?.addEventListener("click", async () => {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else {
        await stage.requestFullscreen();
      }
    } catch (error) {
      console.warn("Fullscreen is not available in this browser.", error);
    }
  });

  document.addEventListener("fullscreenchange", () => {
    const isFullscreen = document.fullscreenElement === stage;
    fullscreenToggle?.setAttribute("aria-pressed", String(isFullscreen));
  });
})();
