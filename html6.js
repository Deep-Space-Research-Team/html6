(() => {
  "use strict";

  const VERSION = "0.27.7";
  const BASE_URL = `https://cdn.jsdelivr.net/pyodide/v${VERSION}/full/`;
  const state = { runtime: null, runtimePromise: null };

  const byId = (id) => document.getElementById(id);
  const setStatus = (message) => {
    const element = byId("engine-status");
    if (element) element.textContent = message;
  };
  const setOutput = (message) => {
    const element = byId("output");
    if (element) element.textContent = message;
  };

  function loadLoader() {
    if (typeof window.loadPyodide === "function") return Promise.resolve();

    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = `${BASE_URL}pyodide.js`;
      script.async = true;
      script.dataset.html6Loader = "true";
      script.onload = () => typeof window.loadPyodide === "function"
        ? resolve()
        : reject(new Error("Pyodide loader API was not found after download."));
      script.onerror = () => reject(new Error("Could not download Pyodide. Check your connection and CDN access."));
      document.head.appendChild(script);
    });
  }

  async function getRuntime() {
    if (state.runtime) return state.runtime;
    if (!state.runtimePromise) {
      state.runtimePromise = (async () => {
        await loadLoader();
        const runtime = await window.loadPyodide({ indexURL: BASE_URL });
        state.runtime = runtime;
        return runtime;
      })().catch((error) => {
        state.runtimePromise = null;
        throw error;
      });
    }
    return state.runtimePromise;
  }

  async function runPscScripts(runtime) {
    const scripts = Array.from(document.querySelectorAll('script[type="text/psc"][src]'));
    if (!scripts.length) throw new Error('No external <script type="text/psc" src="..."> files were found.');

    for (const script of scripts) {
      if (script.dataset.html6Executed === "true") continue;
      const url = new URL(script.getAttribute("src"), document.baseURI);

      if (url.protocol !== "https:" && url.origin !== location.origin) {
        throw new Error(`Refusing insecure cross-origin PSC script: ${url.href}`);
      }

      setStatus(`Loading Python application: ${url.pathname}`);
      const response = await fetch(url.href, {
        credentials: url.origin === location.origin ? "same-origin" : "omit"
      });
      if (!response.ok) throw new Error(`Could not load ${url.pathname} (HTTP ${response.status}).`);

      const source = await response.text();
      if (!source.trim()) throw new Error(`${url.pathname} is empty.`);

      await runtime.runPythonAsync(source);
      script.dataset.html6Executed = "true";
    }
  }

  async function boot() {
    const button = byId("transform-button");
    if (button) button.disabled = true;
    setOutput("Loading HTML6 Python Engine...");
    setStatus("Downloading the Python WebAssembly runtime…");

    try {
      const runtime = await getRuntime();
      setStatus("Python runtime ready. Loading application…");
      await runPscScripts(runtime);
      const version = runtime.runPython("import sys; sys.version.split()[0]");
      setStatus(`HTML6 ready · Python ${version}`);
    } catch (error) {
      console.error("[HTML6]", error);
      setOutput("HTML6 could not start. Check the connection and console, then reload.");
      setStatus(`Engine error: ${error.message}`);
      if (button) button.disabled = true;
    }
  }

  window.HTML6 = Object.freeze({
    version: "0.1.0",
    get ready() { return Boolean(state.runtime); }
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot, { once: true });
  } else {
    boot();
  }
})();
