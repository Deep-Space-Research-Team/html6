
# HTML6 — A Python-First Experiment for the Web

**Exploring a new way to build web applications with Python.**

HTML6 is an experimental, open-source project by **Deep Space Research Team** that explores a Python-first development workflow for web applications. The goal is to let developers write application logic in Python while continuing to use HTML for structure and CSS for styling.

Rather than replacing browser technologies, HTML6 experiments with connecting Python to the browser through **Pyodide and WebAssembly**, with a lightweight JavaScript runtime to initialize the environment.

<p align="center">
  <a href="https://deep-space-research-team.github.io/html6/">
    <strong>🌐 Visit the Website</strong>
  </a>
  ·
  <a href="https://github.com/Deep-Space-Research-Team/html6">
    <strong>💻 Explore the Source Code</strong>
  </a>
</p>

---

## 🚀 Project Vision

Web development traditionally relies on JavaScript for browser-side application logic. HTML6 explores an alternative workflow where Python takes a more central role.

The project follows three core principles:

- **HTML for structure** — Define the elements of your application.
- **CSS for presentation** — Control the visual design and layout.
- **Python for application logic** — Experiment with interactions and behavior using Python.

A JavaScript bootstrap runtime initializes Pyodide and connects Python code to browser APIs. This makes HTML6 a learning and experimentation platform for developers interested in Python-powered web applications.

> **Important:** HTML6 is an independent experimental project, not an official version of HTML or a W3C web standard. Browsers do not natively execute `.psc` files; the current approach relies on a Python runtime powered by Pyodide and WebAssembly.

## ✨ Features

- 🐍 **Python-first application logic** — Experiment with writing browser interactions in Python.
- 🌐 **Browser integration** — Explore Python access to browser APIs through Pyodide.
- 🧩 **Familiar web technologies** — Continue using HTML and CSS for structure and styling.
- ⚡ **WebAssembly-powered runtime** — Run Python in a compatible browser environment through Pyodide.
- 📚 **Beginner-friendly architecture** — Start with a small prototype and learn how the pieces connect.
- 🔓 **Open-source development** — Explore the source code, report issues, and contribute improvements.
- 🧪 **Experimental by design** — Test ideas, identify limitations, and help shape the project's future.
- 🛠️ **Runtime diagnostics** — Prototype v0.2.0 introduces a built-in debugging console and clearer runtime status reporting.
- 🧾 **Improved error reporting** — Runtime initialization and application-loading errors can be surfaced through the status display and diagnostic logs.

*Features describe the current approach and project direction; not every planned capability is implemented.*

## 🧠 How HTML6 Works

HTML6 uses a small runtime to connect the different parts of a web application.

```text
        ┌─────────────────────┐
        │      index.html     │
        │   Application UI    │
        └──────────┬──────────┘
                   │
        ┌──────────▼──────────┐
        │      style.css      │
        │   Visual styling    │
        └─────────────────────┘

        ┌─────────────────────┐
        │      html6.js       │
        │ Runtime and Debug   │
        └──────────┬──────────┘
                   │
        ┌──────────▼──────────┐
        │   Pyodide Runtime   │
        │ Python in WebAssembly│
        └──────────┬──────────┘
                   │
        ┌──────────▼──────────┐
        │       app.psc       │
        │  Python app logic   │
        └─────────────────────┘
```

The intended workflow is:

1. The browser loads the HTML page.
2. The JavaScript runtime initializes the Python environment.
3. The runtime discovers and loads the application's `.psc` code.
4. Python executes through Pyodide.
5. Python interacts with browser APIs through the JavaScript interoperability layer.
6. The runtime reports its status and exposes diagnostic information for debugging.

The exact capabilities depend on the current runtime implementation.

## 📁 Project Structure

The starter prototype uses a simple file structure:

```text
html6/
├── index.html                 # Application structure
├── style.css                  # Application styling
├── html6.js                   # Runtime, initialization, and diagnostics
├── app.psc                    # Python application logic
├── README.md                  # Project documentation
├── LICENSE                    # Open-source license
├── docs/
│   └── PROTOTYPE-v0.2.md      # Prototype v0.2.0 runtime documentation
├── tests/
│   └── MANUAL-TEST-PLAN.md    # Manual testing and regression plan
└── .github/
    └── workflows/
        └── pages.yml          # GitHub Pages deployment workflow
```

The `docs/` and `tests/` files above are part of the proposed v0.2.0 documentation layout. Add them to the repository when you create those files.

The `.psc` extension is a project-specific convention for HTML6 application files. It is not a standard Python file extension.

## 🛠️ Getting Started

### Prerequisites

- A modern, compatible web browser.
- Git, if you want to clone the repository.
- Python 3, if you want to run a local development server.
- An internet connection if the runtime loads Pyodide or other dependencies from a remote CDN.

### 1. Clone the repository

```bash
git clone https://github.com/Deep-Space-Research-Team/html6.git
```

### 2. Enter the project directory

```bash
cd html6
```

### 3. Start a local web server

Using Python:

```bash
python -m http.server 8000
```

If your system uses `python3` instead:

```bash
python3 -m http.server 8000
```

### 4. Open HTML6

Visit:

```text
http://localhost:8000
```

Using a local HTTP server is preferable to opening `index.html` directly because browser security restrictions can affect scripts and runtime loading.

### Troubleshooting

If the application does not start:

1. Open your browser's developer tools.
2. Select the **Console** tab and look for JavaScript or Python initialization errors.
3. Select the **Network** tab and check whether `html6.js`, `app.psc`, and the Pyodide runtime load successfully.
4. Check the HTML6 engine status displayed on the page.
5. In Prototype v0.2.0, use the built-in debugging console when it is available.
6. Confirm that you are running the page through a local HTTP server rather than opening the HTML file directly.
7. Reload the page after correcting the problem.

Do not share passwords, API keys, private tokens, or other secrets when submitting diagnostic logs.

## 🧪 Try the Prototype

The initial prototype demonstrates a simple text transformation interaction.

It provides a starting point for exploring how:

- A user interacts with a web interface.
- Application logic is written in Python.
- Python code accesses browser elements.
- The runtime connects the Python environment to the page.

The prototype is intentionally small. Its purpose is to test the core idea before expanding the framework.

## ⚙️ HTML6 Prototype v0.2.0

**Target runtime version: `0.2.0`**

Prototype v0.2.0 focuses on improving the developer experience while preserving the existing HTML, CSS, JavaScript, and Python architecture.

The planned scope includes:

- A clearer runtime initialization process.
- More informative engine status messages.
- Improved error reporting for runtime and application startup.
- A built-in debugging console for runtime diagnostics.
- A small public JavaScript API for checking runtime status and accessing diagnostic tools.
- Documentation of the runtime and its supported workflow.
- A manual test plan for checking the prototype.

> **Versioning note:** The HTML6 runtime version and the Pyodide version are different. HTML6 `0.2.0` identifies the prototype release; Pyodide `0.27.7` identifies the Python runtime dependency used by the current implementation described in this prototype plan.

### Runtime API

The v0.2.0 runtime plan exposes the following JavaScript API through `window.HTML6`:

| Property or method | Purpose |
|---|---|
| `HTML6.version` | Returns the HTML6 runtime version. |
| `HTML6.pyodideVersion` | Identifies the configured Pyodide version. |
| `HTML6.ready` | Indicates whether the Python runtime has initialized. |
| `HTML6.status` | Provides the current runtime status. |
| `HTML6.readyState` | Provides a more descriptive initialization state. |
| `HTML6.log(...)` | Writes an informational diagnostic message. |
| `HTML6.debug(...)` | Writes a debugging message. |
| `HTML6.showDebug()` | Opens or displays the built-in debugging console. |
| `HTML6.hideDebug()` | Hides the built-in debugging console. |
| `HTML6.getPythonVersion()` | Retrieves the Python version after runtime initialization. |

The exact behavior of these methods depends on the installed `html6.js` implementation. The table describes the planned v0.2.0 API; it should not be treated as proof that every method is implemented in the current repository.

### Checking the Runtime

After the v0.2.0 runtime implementation has been installed, open the browser's developer console and try:

```javascript
window.HTML6
```

Check the runtime version:

```javascript
window.HTML6.version
```

Check whether the runtime has initialized:

```javascript
window.HTML6.ready
```

Display the debugging console:

```javascript
window.HTML6.showDebug()
```

These examples assume that the installed runtime implements the listed API. If a method is missing, check that the correct `html6.js` file is loaded.

### Debugging Console

The built-in debugging console is intended to make the prototype easier to troubleshoot without relying exclusively on the browser's developer tools.

It should help developers inspect:

- Runtime initialization progress.
- Python runtime readiness.
- Application script loading.
- Informational diagnostic messages.
- Runtime and application-loading errors.

The debugging console is a development aid, not a security boundary. It must not display confidential information or expose sensitive application data.

For implementation details and the planned API, see [`docs/PROTOTYPE-v0.2.md`](docs/PROTOTYPE-v0.2.md).

### Testing v0.2.0

Use the manual test plan to check runtime initialization, application loading, diagnostics, error handling, and regression behavior.

Test plan: [`tests/MANUAL-TEST-PLAN.md`](tests/MANUAL-TEST-PLAN.md).

Do not mark v0.2.0 as verified until the tests have actually been executed in a supported browser.

## 🎯 Project Roadmap

HTML6 is an evolving experiment. The following roadmap describes potential development priorities, not a guarantee that every feature is already available.

- [x] Publish the initial public repository.
- [x] Create a basic HTML, CSS, JavaScript runtime, and Python-code prototype.
- [x] Set up GitHub Pages deployment.
- [ ] Improve runtime initialization and error handling.
- [ ] Document the `.psc` file convention and loading process.
- [ ] Add more Python-to-browser interaction examples.
- [ ] Expand beginner tutorials and learning materials.
- [ ] Improve browser compatibility and testing.
- [ ] Develop a clearer API and application structure.
- [ ] Evaluate performance, security, and production-readiness.
- [ ] Explore reusable components and developer tooling.
- [ ] Implement and verify the HTML6 Prototype v0.2.0 runtime improvements.
- [ ] Complete the v0.2.0 manual test plan.
- [ ] Expand examples demonstrating debugging and error handling.

Contributions and feedback can help determine which improvements should come first.

## 🗺️ Learning Path

If you're new to HTML6, follow this learning path:

**Explore → Understand → Modify → Build → Contribute**

1. **Explore:** Run the starter prototype and inspect the interface.
2. **Understand:** Read `index.html`, `style.css`, `html6.js`, and `app.psc`.
3. **Modify:** Change the interface or experiment with the Python logic.
4. **Build:** Try creating a small interactive application.
5. **Debug:** Inspect runtime status and use available diagnostic tools.
6. **Contribute:** Share your findings, report bugs, or propose improvements.

Basic familiarity with HTML, CSS, Python, and JavaScript concepts will help you understand the implementation.

## 🤝 Contributing

Contributions, constructive feedback, bug reports, and educational examples are welcome.

### Ways to contribute

- Report reproducible bugs.
- Improve documentation and tutorials.
- Suggest improvements to the runtime architecture.
- Test the project in different browsers.
- Submit small examples demonstrating Python-powered interactions.
- Help identify limitations in the current approach.
- Improve the runtime diagnostics and manual test coverage.

### Contribution workflow

1. Fork the repository.
2. Create a branch for your change.
3. Make a focused improvement.
4. Test your changes locally.
5. Submit a pull request describing the change and its testing.

Please explain what your change does, why it is useful, and whether it introduces any new dependencies.

For runtime changes, include the browser and operating system used for testing, steps to reproduce any failures, and relevant console output.

## 🐛 Issues and Feedback

Found a bug or have an idea?

Visit the repository's [Issues page](https://github.com/Deep-Space-Research-Team/html6/issues) to report a problem or suggest an improvement.

When reporting a bug, include:

- Your browser and operating system.
- Steps to reproduce the problem.
- Expected behavior.
- Actual behavior.
- Relevant console errors, if available.
- Whether the problem occurs during runtime initialization, Python execution, or browser interaction.

Clear, reproducible reports make debugging easier.

## 🔐 Security and Limitations

HTML6 is an experimental project and should not be assumed to be production-ready.

- Python execution in the browser depends on the Pyodide runtime and its supported capabilities.
- JavaScript remains part of the runtime and browser integration.
- Loading a Python runtime can increase startup time and resource usage compared with a minimal JavaScript application.
- Browser compatibility, package support, performance, and error handling require continued testing.
- Applications should not treat client-side code as a secure place for secrets or privileged operations.
- Third-party runtime dependencies should be reviewed and kept appropriately maintained.
- Application code loaded into the browser should be treated as executable code. Only load code from sources you trust.
- Diagnostic logs may contain application details. Avoid recording secrets, credentials, tokens, or personal data.
- The debugging console is intended for development and troubleshooting; it does not isolate untrusted Python code or make it safe to execute.
- Cross-origin resource loading and browser security policies can affect whether external application files load successfully.

Please report security concerns responsibly through the repository's documented contact or reporting process.

## 🧪 Testing

HTML6 is experimental, so runtime changes should be tested before being described as stable.

The manual test plan for Prototype v0.2.0 covers:

- Initial page loading.
- Pyodide initialization.
- Python application execution.
- Runtime version and readiness reporting.
- Debugging console visibility.
- Diagnostic message output.
- Missing or empty application scripts.
- Application-loading and initialization failures.
- Recovery after a failed startup.
- Regression testing of the existing text transformation demo.

See [`tests/MANUAL-TEST-PLAN.md`](tests/MANUAL-TEST-PLAN.md) for the test cases.

The test plan is documentation, not a test report. Record actual results only after running the tests.

## 🌐 Links

| Resource | Link |
|---|---|
| Official project website | [HTML6 Website](https://deep-space-research-team.github.io/html6/) |
| Source code | [GitHub Repository](https://github.com/Deep-Space-Research-Team/html6) |
| Bug reports and ideas | [GitHub Issues](https://github.com/Deep-Space-Research-Team/html6/issues) |
| Python in the browser | [Pyodide Documentation](https://pyodide.org/en/stable/) |
| WebAssembly | [WebAssembly.org](https://webassembly.org/) |

## 🏢 About the Project

HTML6 is developed under **Deep Space Research Team**, an independent team exploring software, web technologies, and experimental development ideas.

The project investigates one central question:

**What could web development look like if Python played a more central role in browser-side application logic?**

HTML6 is an attempt to explore that question through a public, evolving prototype.

## 📄 License

HTML6 is released under the **MIT License**. See the [`LICENSE`](LICENSE) file for the applicable terms.

---

<p align="center">
  <strong>HTML6 — Exploring a Python-First Web.</strong>
  <br>
  Built for learning, experimentation, and open-source collaboration.
</p>
