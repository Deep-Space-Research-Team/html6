
(() => {
  "use strict";

  // HTML6 runtime version and pinned Pyodide dependency.
  const HTML6_VERSION = "0.2.0";
  const PYODIDE_VERSION = "0.27.7";
  const PYODIDE_BASE_URL =
    `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/`;

  const state = {
    runtime: null,
    runtimePromise: null,
    bootPromise: null,
    status: "loading",
    debugEnabled: false,
    debugPanel: null,
    debugOutput: null,
    debugToggle: null,
    readyResolve: null,
    readyReject: null
  };

  const readyPromise = new Promise((resolve, reject) => {
    state.readyResolve = resolve;
    state.readyReject = reject;
  });

  // Prevent an unhandled-rejection warning when an application does not
  // subscribe to HTML6.ready. Awaiting HTML6.ready still rejects on failure.
  readyPromise.catch(() => {});

  const byId = (id) => document.getElementById(id);

  function safeString(value) {
    if (value instanceof Error) {
      return value.stack || `${value.name}: ${value.message}`;
    }

    if (typeof value === "string") return value;

    try {
      return JSON.stringify(value, null, 2) ?? String(value);
    } catch {
      return String(value);
    }
  }

  function appendDebug(level, args) {
    if (!state.debugOutput) return;

    const line = document.createElement("div");
    line.className = `html6-debug-line html6-debug-${level}`;
    line.textContent =
      `[${new Date().toLocaleTimeString()}] ` +
      args.map(safeString).join(" ");

    state.debugOutput.appendChild(line);
    state.debugOutput.scrollTop = state.debugOutput.scrollHeight;

    // Keep the console bounded for long-running applications.
    while (state.debugOutput.children.length > 300) {
      state.debugOutput.firstElementChild.remove();
    }
  }

  function log(...args) {
    console.info("[HTML6]", ...args);
    appendDebug("info", args);
  }

  function debug(...args) {
  state.debugEnabled = true;
  console.debug("[HTML6:debug]", ...args);
  appendDebug("debug", args);
}

  function setStatus(status, message) {
    state.status = status;

    const element = byId("engine-status");
    if (element) {
      element.textContent = message || `HTML6 ${status}`;
      element.dataset.html6Status = status;
    }

    debug("Status changed:", status, message || "");
  }

  function setOutput(message) {
    const element = byId("output");
    if (element) element.textContent = message;
  }

  function createDebugConsole() {
    if (state.debugPanel) return;

    const style = document.createElement("style");
    style.dataset.html6Runtime = "debug-style";
    style.textContent = `
      #html6-debug-toggle {
        position: fixed;
        right: 16px;
        bottom: 16px;
        z-index: 99998;
        border: 1px solid #46546b;
        border-radius: 999px;
        background: #172235;
        color: #f4f7fb;
        padding: 10px 15px;
        font: 600 13px system-ui, sans-serif;
        cursor: pointer;
        box-shadow: 0 5px 20px #0004;
      }

      #html6-debug-panel {
        position: fixed;
        right: 16px;
        bottom: 64px;
        z-index: 99999;
        width: min(560px, calc(100vw - 32px));
        max-height: min(360px, 55vh);
        display: none;
        flex-direction: column;
        overflow: hidden;
        color: #e7edf6;
        background: #0b1120;
        border: 1px solid #344258;
        border-radius: 12px;
        box-shadow: 0 12px 40px #0008;
        font: 12px/1.5 ui-monospace, SFMono-Regular, Consolas, monospace;
      }

      #html6-debug-panel[data-open="true"] {
        display: flex;
      }

      .html6-debug-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        padding: 10px 12px;
        background: #151f31;
        border-bottom: 1px solid #344258;
      }

      .html6-debug-header button {
        color: inherit;
        background: transparent;
        border: 1px solid #526078;
        border-radius: 6px;
        padding: 4px 8px;
        cursor: pointer;
      }

      #html6-debug-output {
        overflow: auto;
        padding: 10px 12px;
        overflow-wrap: anywhere;
      }

      .html6-debug-line {
        white-space: pre-wrap;
        padding: 2px 0;
        border-bottom: 1px solid #ffffff0b;
      }

      .html6-debug-error {
        color: #ff9999;
      }

      .html6-debug-debug {
        color: #9db5d8;
      }

      @media (max-width: 480px) {
        #html6-debug-toggle {
          right: 10px;
          bottom: 10px;
        }

        #html6-debug-panel {
          right: 8px;
          bottom: 58px;
          width: calc(100vw - 16px);
        }
      }
    `;

    const toggle = document.createElement("button");
    toggle.id = "html6-debug-toggle";
    toggle.type = "button";
    toggle.textContent = "HTML6 Debug";
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-controls", "html6-debug-panel");

    const panel = document.createElement("section");
    panel.id = "html6-debug-panel";
    panel.setAttribute("aria-label", "HTML6 developer console");
    panel.setAttribute("aria-live", "polite");

    const header = document.createElement("div");
    header.className = "html6-debug-header";

    const title = document.createElement("strong");
    title.textContent = `HTML6 ${HTML6_VERSION} · Developer Console`;

    const clearButton = document.createElement("button");
    clearButton.type = "button";
    clearButton.textContent = "Clear";
    clearButton.addEventListener("click", () => {
      state.debugOutput.replaceChildren();
    });

    header.append(title, clearButton);

    const output = document.createElement("div");
    output.id = "html6-debug-output";

    panel.append(header, output);
    document.head.appendChild(style);
    document.body.append(toggle, panel);

    toggle.addEventListener("click", () => {
      const isOpen = panel.dataset.open === "true";
      panel.dataset.open = String(!isOpen);
      toggle.setAttribute("aria-expanded", String(!isOpen));
    });

    state.debugPanel = panel;
    state.debugOutput = output;
    state.debugToggle = toggle;

    appendDebug("info", [
      `HTML6 ${HTML6_VERSION} starting. Pyodide ${PYODIDE_VERSION}.`
    ]);
  }

  function showDebug() {
    if (!state.debugPanel) createDebugConsole();

    state.debugPanel.dataset.open = "true";
    state.debugToggle.setAttribute("aria-expanded", "true");
  }

  function hideDebug() {
    if (!state.debugPanel) return;

    state.debugPanel.dataset.open = "false";
    state.debugToggle.setAttribute("aria-expanded", "false");
  }

  function reportError(context, error) {
    const detail = error instanceof Error
      ? `${error.name}: ${error.message}`
      : String(error);

    console.error(`[HTML6] ${context}`, error);
    appendDebug("error", [context, detail]);

    if (error instanceof Error && error.stack) {
      appendDebug("error", [error.stack]);
    }

    setStatus("error", `HTML6 error: ${context}. Open the developer console.`);

    setOutput(
      `HTML6 could not start: ${context}. ` +
      "Open the HTML6 Debug console or browser developer console for details."
    );

    showDebug();
  }

  function loadLoader() {
    if (typeof window.loadPyodide === "function") {
      return Promise.resolve();
    }

    const existing = document.querySelector(
      'script[data-html6-loader="true"]'
    );

    if (existing) {
      return new Promise((resolve, reject) => {
        if (typeof window.loadPyodide === "function") {
          resolve();
          return;
        }

        existing.addEventListener("load", () => {
          typeof window.loadPyodide === "function"
            ? resolve()
            : reject(new Error("Pyodide loaded without exposing loadPyodide."));
        }, { once: true });

        existing.addEventListener("error", () => {
          reject(new Error("The Pyodide loader failed to download."));
        }, { once: true });
      });
    }

    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = `${PYODIDE_BASE_URL}pyodide.js`;
      script.async = true;
      script.dataset.html6Loader = "true";

      script.onload = () => {
        if (typeof window.loadPyodide === "function") {
          resolve();
        } else {
          reject(new Error(
            "Pyodide downloaded, but its loadPyodide API was not found."
          ));
        }
      };

      script.onerror = () => {
        reject(new Error(
          "Could not download Pyodide. Check your internet connection, " +
          "CDN access, and browser network settings."
        ));
      };

      document.head.appendChild(script);
    });
  }

  function getRuntime() {
    if (state.runtime) return Promise.resolve(state.runtime);
    if (state.runtimePromise) return state.runtimePromise;

    state.runtimePromise = (async () => {
      log("Loading Pyodide", PYODIDE_VERSION);
      await loadLoader();

      const runtime = await window.loadPyodide({
        indexURL: PYODIDE_BASE_URL
      });

      state.runtime = runtime;
      log("Pyodide initialized successfully.");
      return runtime;
    })().catch((error) => {
      state.runtimePromise = null;
      throw error;
    });

    return state.runtimePromise;
  }

  async function runPscScripts(runtime) {
    const scripts = Array.from(
      document.querySelectorAll('script[type="text/psc"][src]')
    );

    if (scripts.length === 0) {
      throw new Error(
        'No external .psc scripts found. Add ' +
        '<script type="text/psc" src="./app.psc"></script>.'
      );
    }

    for (const script of scripts) {
      if (script.dataset.html6Executed === "true") {
        debug("Skipping previously executed script:", script.src);
        continue;
      }

      const url = new URL(script.getAttribute("src"), document.baseURI);

      if (url.protocol !== "https:" && url.origin !== location.origin) {
        throw new Error(
          `Refusing insecure cross-origin PSC script: ${url.href}`
        );
      }

      log("Loading Python application:", url.pathname);
      setStatus("loading", `Loading Python application: ${url.pathname}`);

      let response;

      try {
        response = await fetch(url.href, {
          credentials: url.origin === location.origin ? "same-origin" : "omit"
        });
      } catch (error) {
        throw new Error(
          `Network error while loading ${url.pathname}: ${error.message}`
        );
      }

      if (!response.ok) {
        throw new Error(
          `Could not load ${url.pathname} (HTTP ${response.status}).`
        );
      }

      const source = await response.text();

      if (!source.trim()) {
        throw new Error(`${url.pathname} is empty.`);
      }

      try {
        await runtime.runPythonAsync(source);
      } catch (error) {
        throw new Error(
          `Python execution failed in ${url.pathname}: ${error.message}`,
          { cause: error }
        );
      }

      // Mark only after successful execution so failed scripts aren't
      // incorrectly reported as completed.
      script.dataset.html6Executed = "true";
      log("Python application executed:", url.pathname);
    }
  }

  async function boot() {
    if (state.bootPromise) return state.bootPromise;

    state.bootPromise = (async () => {
      const button = byId("transform-button");

      if (button) button.disabled = true;

      setOutput("Loading HTML6 Python Engine...");
      setStatus("loading", "Initializing HTML6 runtime…");

      try {
        createDebugConsole();

        const runtime = await getRuntime();

        setStatus("loading", "Python runtime ready. Loading application…");
        await runPscScripts(runtime);

        const pythonVersion = runtime.runPython(
          "import sys; sys.version.split()[0]"
        );

        setStatus(
          "ready",
          `HTML6 ${HTML6_VERSION} ready · Python ${pythonVersion}`
        );

        log(
          "Application ready.",
          `HTML6 ${HTML6_VERSION}`,
          `Python ${pythonVersion}`
        );

        state.readyResolve(api);
        return api;
      } catch (error) {
        state.bootPromise = null;
        reportError("Runtime initialization failed", error);
        state.readyReject(error);
        throw error;
      }
    })();

    // The public ready promise carries the error. This internal catch avoids
    // an additional unhandled rejection from the boot promise itself.
    state.bootPromise.catch(() => {});

    return state.bootPromise;
  }

  const api = Object.freeze({
    version: HTML6_VERSION,
    pyodideVersion: PYODIDE_VERSION,

    get status() {
      return state.status;
    },

    // Resolves with this API after all .psc files execute successfully.
    // Rejects if runtime initialization or application execution fails.
    ready: readyPromise,

    get readyState() {
      return state.status === "ready";
    },

    log,
    debug,

    showDebug,
    hideDebug,

    getPythonVersion() {
      if (!state.runtime) {
        throw new Error("Python runtime is not ready. Await HTML6.ready first.");
      }

      return state.runtime.runPython(
        "import sys; sys.version.split()[0]"
      );
    }
  });

  window.HTML6 = api;

  function start() {
    boot().catch(() => {
      // The detailed error has already been logged and shown to the user.
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, { once: true });
  } else {
    start();
  }
})();
