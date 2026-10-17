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
        │      style.css     │
        │   Visual styling   │
        └─────────────────────┘

        ┌─────────────────────┐
        │      html6.js      │
        │   Runtime setup    │
        └──────────┬──────────┘
                   │
        ┌──────────▼──────────┐
        │   Pyodide Runtime   │
        │ Python in WebAssembly│
        └──────────┬──────────┘
                   │
        ┌──────────▼──────────┐
        │       app.psc      │
        │  Python app logic  │
        └─────────────────────┘
```

The intended workflow is:

1. The browser loads the HTML page.
2. The JavaScript runtime initializes the Python environment.
3. The runtime discovers and loads the application's `.psc` code.
4. Python executes through Pyodide.
5. Python interacts with browser APIs through the JavaScript interoperability layer.

The exact capabilities depend on the current runtime implementation.

## 📁 Project Structure

The starter prototype uses a simple file structure:

```text
html6/
├── index.html       # Application structure
├── style.css        # Application styling
├── html6.js         # Runtime initialization and integration
├── app.psc          # Python application logic
├── README.md        # Project documentation
├── LICENSE          # Open-source license
└── .github/
    └── workflows/
        └── pages.yml  # GitHub Pages deployment workflow
```

The `.psc` extension is a project-specific convention for HTML6 application files. It is not a standard Python file extension.

## 🛠️ Getting Started

### Prerequisites

- A modern, compatible web browser.
- Git, if you want to clone the repository.
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

**Troubleshooting:** If the application does not start, open your browser's developer console and check for failed network requests, JavaScript errors, or Pyodide initialization problems.

## 🧪 Try the Prototype

The initial prototype demonstrates a simple text transformation interaction.

It provides a starting point for exploring how:

- A user interacts with a web interface.
- Application logic is written in Python.
- Python code accesses browser elements.
- The runtime connects the Python environment to the page.

The prototype is intentionally small. Its purpose is to test the core idea before expanding the framework.

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

Contributions and feedback can help determine which improvements should come first.

## 🗺️ Learning Path

If you're new to HTML6, follow this learning path:

**Explore → Understand → Modify → Build → Contribute**

1. **Explore:** Run the starter prototype and inspect the interface.
2. **Understand:** Read `index.html`, `style.css`, `html6.js`, and `app.psc`.
3. **Modify:** Change the interface or experiment with the Python logic.
4. **Build:** Try creating a small interactive application.
5. **Contribute:** Share your findings, report bugs, or propose improvements.

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

### Contribution workflow

1. Fork the repository.
2. Create a branch for your change.
3. Make a focused improvement.
4. Test your changes locally.
5. Submit a pull request describing the change and its testing.

Please explain what your change does, why it is useful, and whether it introduces any new dependencies.

## 🐛 Issues and Feedback

Found a bug or have an idea?

Visit the repository's [Issues page](https://github.com/Deep-Space-Research-Team/html6/issues) to report a problem or suggest an improvement.

When reporting a bug, include:

- Your browser and operating system.
- Steps to reproduce the problem.
- Expected behavior.
- Actual behavior.
- Relevant console errors, if available.

Clear, reproducible reports make debugging easier.

## 🔐 Security and Limitations

HTML6 is an experimental project and should not be assumed to be production-ready.

- Python execution in the browser depends on the Pyodide runtime and its supported capabilities.
- JavaScript remains part of the runtime and browser integration.
- Loading a Python runtime can increase startup time and resource usage compared with a minimal JavaScript application.
- Browser compatibility, package support, performance, and error handling require continued testing.
- Applications should not treat client-side code as a secure place for secrets or privileged operations.
- Third-party runtime dependencies should be reviewed and kept appropriately maintained.

Please report security concerns responsibly through the repository's documented contact or reporting process.

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