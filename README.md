# HTML6 — Python-Native Web (Experimental)

HTML6 is an experimental framework concept for building interactive web pages with **Python application code** in `.psc` files. It keeps HTML for structure and CSS for presentation, and uses [Pyodide](https://pyodide.org/) to execute Python in WebAssembly in the browser.

> **Status:** Early prototype / educational project. HTML6 is not an official HTML standard and is not yet a production-ready replacement for JavaScript.

## What is included?

- A working text-transformer demo.
- `html6.js`, a small bootstrap engine that loads Pyodide and executes external PSC scripts.
- `app.psc`, Python code that listens for a click and updates the DOM.
- A beginner learning path and troubleshooting guide.
- A GitHub Pages workflow for publishing the static demo.

## Try it locally

Requirements: Python 3.9+ (used only for the local static server), a modern browser, and an internet connection to download Pyodide from its CDN.

1. Download or clone this repository.
2. Open a terminal in the project folder.
3. Start a local web server:

   ```bash
   python -m http.server 8000
   ```

4. Visit <http://localhost:8000>.
5. Enter text and select **Transform with Python**.

Do not open `index.html` directly using a `file://` URL. The browser needs HTTP to fetch `app.psc`.

## How it works

1. `index.html` includes a `<script type="text/psc" src="./app.psc"></script>` element.
2. `html6.js` finds PSC script elements and loads Pyodide asynchronously.
3. The engine fetches each PSC source file and executes it with `runPythonAsync`.
4. Python imports browser objects with `from js import document`.
5. Pyodide proxies a Python callback to a browser event listener; Python then updates the DOM.

The engine uses JavaScript internally because browsers do not natively execute Python or recognize `text/psc` as a standard scripting language. The goal is to keep **application logic** Python-first, not to claim that JavaScript has been removed from the browser platform.

## Project layout

```text
html6/
├── index.html
├── style.css
├── html6.js
├── app.psc
├── docs/
│   ├── learning-path.md
│   └── troubleshooting.md
├── .github/workflows/pages.yml
├── LICENSE
├── CONTRIBUTING.md
├── CODE_OF_CONDUCT.md
└── SECURITY.md
```

## Learn HTML6

Start with [`docs/learning-path.md`](docs/learning-path.md), then try changing `message.upper()` to `message[::-1]` in `app.psc`.

## Publish with GitHub Pages

1. Create a **public** GitHub repository named `html6` (or your chosen name).
2. Upload or push the contents of this project to the repository's default branch.
3. Open **Settings → Pages** and select **GitHub Actions** as the build/deployment source.
4. Open the **Actions** tab and wait for the Pages workflow to complete.
5. Your site will be available at `https://YOUR-USERNAME.github.io/html6/`.

The included workflow publishes the static files from the repository root. Replace `YOUR-USERNAME` with your GitHub username.

## Contributing

Bug reports, documentation improvements, tutorials, examples, and code contributions are welcome. Read [`CONTRIBUTING.md`](CONTRIBUTING.md) before opening a pull request.

## Security note

Only run PSC code you trust. Python executed in Pyodide can access browser APIs exposed to it, including the page DOM. This prototype is not a sandbox for untrusted scripts. See [`SECURITY.md`](SECURITY.md).

## License

This project is licensed under the MIT License. See [`LICENSE`](LICENSE).
