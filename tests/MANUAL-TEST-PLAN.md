
# HTML6 v0.2.0 — Manual Regression Test Plan

## Test environment

Record these details before testing:

- Operating system:
- Browser and version:
- Date:
- Commit or branch:
- Network connection:
- Test result: Not run / Pass / Fail

## Setup

1. Start a local HTTP server:

   ```bash
   python -m http.server 8000
   ```

2. Open `http://localhost:8000`.
3. Open browser developer tools.
4. Open the HTML6 Debug console.
5. Record any errors before starting.

## Tests

Use `Not run`, `Pass`, or `Fail` for each test.

### T01 — Runtime startup

Expected:
- HTML6 begins in `loading` state.
- Pyodide downloads and initializes.
- The status changes to `ready`.
- The browser console contains no unexpected errors.

Result:

Notes:

### T02 — Version reporting

In the browser console, run:

```javascript
HTML6.version
HTML6.pyodideVersion
HTML6.status
```

Expected:
- Runtime version is `0.2.0`.
- Pyodide version is `0.27.7`.
- Status is `ready` after successful startup.

Result:

Notes:

### T03 — Existing Python demo

1. Enter `Hello from HTML6`.
2. Click the Transform with Python button.

Expected:
- Output becomes `HELLO FROM HTML6`.
- The page remains responsive.
- The status reports successful processing.

Result:

Notes:

### T04 — Readiness promise

Run:

```javascript
HTML6.ready.then(() => console.log("READY"));
```

Expected:
- The promise resolves after successful initialization.
- `READY` appears in the browser console.

Result:

Notes:

### T05 — Public logging

Run:

```javascript
HTML6.log("Manual test message");
HTML6.debug("Diagnostic test message");
HTML6.showDebug();
```

Expected:
- Both messages are visible in the appropriate console output.
- The HTML6 Debug console opens.

Result:

Notes:

### T06 — Python version

Run:

```javascript
HTML6.getPythonVersion();
```

Expected:
- The method returns a Python version string after startup.

Result:

Notes:

### T07 — Missing Python script

1. Temporarily change the `app.psc` script URL in `index.html`
   to a filename that does not exist.
2. Reload the page.

Expected:
- The runtime reports the HTTP error.
- Status becomes `error`.
- The HTML6 Debug console opens.
- The page does not falsely report successful startup.

Restore the original URL after the test.

Result:

Notes:

### T08 — Python syntax error

1. Back up `app.psc`.
2. Temporarily replace its contents with invalid Python syntax.
3. Reload the page.

Expected:
- The Python execution failure is reported.
- Status becomes `error`.
- The failed script is not marked as executed.

Restore `app.psc` after the test.

Result:

Notes:

### T09 — Empty Python script

1. Back up `app.psc`.
2. Temporarily make the file empty.
3. Reload the page.

Expected:
- The runtime reports that the file is empty.
- The application does not report successful startup.

Restore `app.psc` after the test.

Result:

Notes:

### T10 — Offline or CDN failure

Only perform this test if it is safe to temporarily disconnect
the test environment.

Expected:
- Runtime initialization fails visibly.
- The error describes the Pyodide loading or network problem.
- The page does not claim to be ready.

Reconnect before continuing.

Result:

Notes:

### T11 — Multiple Python scripts

1. Create a temporary `second.psc` file.
2. Put a simple, harmless Python statement in it.
3. Add a second `script[type="text/psc"][src]` element after
   the first one.
4. Reload the page.

Expected:
- Both scripts execute in document order.
- The debug console shows both script paths.

Remove the temporary script and HTML element after testing.

Result:

Notes:

### T12 — Mobile layout

1. Use browser responsive design mode or a mobile device.
2. Open and close the HTML6 Debug console.
3. Check the demo controls and page content.

Expected:
- The debug console fits within the viewport.
- The main demo remains usable.

Result:

Notes:

## Final release decision

- [ ] T01–T12 completed
- [ ] All failures documented
- [ ] Existing demo restored after negative tests
- [ ] No unintended changes remain
- [ ] Documentation reviewed
- [ ] Release status recorded

Do not mark v0.2.0 as fully verified until the results are recorded.
