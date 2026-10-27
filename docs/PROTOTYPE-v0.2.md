
# HTML6 Prototype v0.2.0

HTML6 is an experimental Python-first web application workflow maintained
by Deep Space Research Team. It is not an official HTML version or a
W3C standard.

## Goals

Prototype v0.2.0 improves the existing runtime with:

- Explicit runtime versioning.
- A runtime lifecycle status.
- A promise for application readiness.
- A development console.
- Clearer errors for network, runtime, and Python execution failures.
- A documented JavaScript API.
- A repeatable manual regression test plan.

## Architecture

```text
index.html
    |
    +-- style.css
    |
    +-- html6.js
          |
          +-- Pyodide 0.27.7
          |      |
          |      +-- Python runtime (WebAssembly)
          |
          +-- script[type="text/psc"][src]
                 |
                 +-- app.psc
```

HTML defines the page structure, CSS controls presentation, JavaScript
initializes the runtime, and Python provides application logic.

The `.psc` extension is a project-specific convention. The browser does
not natively execute `.psc` files.

## Versioning

- HTML6 runtime: `0.2.0`
- Pyodide dependency: `0.27.7`

These versions describe different components and must not be confused.

## Runtime lifecycle

`HTML6.status` reports one of these values:

| Status | Meaning |
|---|---|
| `loading` | The runtime or application is initializing. |
| `ready` | The Python runtime and discovered application scripts loaded. |
| `error` | Runtime initialization or application loading failed. |

The status is a string, not a promise.

## Public API

### `HTML6.version`

Returns the HTML6 runtime version string.

```javascript
console.log(HTML6.version); // "0.2.0"
```

### `HTML6.pyodideVersion`

Returns the configured Pyodide dependency version.

```javascript
console.log(HTML6.pyodideVersion); // "0.27.7"
```

### `HTML6.status`

Returns the current lifecycle status.

```javascript
console.log(HTML6.status);
```

### `HTML6.ready`

A promise that resolves with the HTML6 API after the runtime and
application scripts have initialized. It rejects if initialization fails.

```javascript
HTML6.ready
  .then(() => {
    console.log("HTML6 is ready");
  })
  .catch((error) => {
    console.error("HTML6 initialization failed", error);
  });
```

### `HTML6.readyState`

Returns `true` when the lifecycle status is `ready`, otherwise `false`.

### `HTML6.log(...values)`

Writes an informational message to the browser console and the
HTML6 developer console.

```javascript
HTML6.log("Application started");
```

### `HTML6.debug(...values)`

Writes diagnostic messages and enables debug output.

```javascript
HTML6.debug("Selected item:", "notes");
```

### `HTML6.showDebug()` and `HTML6.hideDebug()`

Open or close the built-in developer console.

```javascript
HTML6.showDebug();
HTML6.hideDebug();
```

### `HTML6.getPythonVersion()`

Returns the Python version after initialization.

```javascript
HTML6.ready.then(() => {
  console.log(HTML6.getPythonVersion());
});
```

Calling this method before initialization throws an error.

## Loading application code

Place an external Python application script in the HTML document:

```html
<script defer src="./html6.js"></script>
<script type="text/psc" src="./app.psc"></script>
```

The runtime discovers external scripts matching:

`script[type="text/psc"][src]`

It fetches and executes them sequentially. A script is marked as executed
only after its Python code completes successfully.

The first script should not depend on code defined by a later script.

## Local development

Use a local HTTP server instead of opening `index.html` through a
`file://` URL.

```bash
python -m http.server 8000
```

Open `http://localhost:8000` in a modern browser.

A connection to the configured Pyodide CDN is required unless the
runtime and all its dependencies have been configured for local hosting.

## Debugging

1. Open the floating HTML6 Debug button.
2. Read the runtime messages and any displayed error.
3. Open browser developer tools.
4. Inspect the Console and Network panels.
5. Check the HTTP status of `html6.js`, `.psc` files, and Pyodide assets.
6. Reload after fixing the cause.

## Security and limitations

- This prototype has not been certified for production use.
- Client-side Python is not a secure location for secrets.
- A loaded `.psc` file executes Python code with the capabilities provided
  by the runtime and browser environment.
- Cross-origin scripts require HTTPS and may still fail because of
  browser cross-origin restrictions.
- The debug console is diagnostic UI, not a security boundary.
- Large Python runtimes can increase startup time and memory usage.
- The manual test plan must be completed before claiming compatibility.

## Release acceptance criteria

A release candidate should not be considered verified until:

- The existing demo runs.
- Success and failure states are visible.
- The public API reports the expected version and status.
- Multiple `.psc` files execute sequentially.
- Failed scripts report a useful error.
- Network and missing-file failures can be diagnosed.
- The manual regression test plan is completed and recorded.
