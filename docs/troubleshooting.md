# Troubleshooting

## The page stays on “Loading HTML6 Python Engine…”

- Check that you have an internet connection.
- Confirm that the Pyodide CDN is reachable.
- Open the browser developer console and inspect errors.
- Reload after the CDN request or network connection is restored.

## The browser says `Failed to fetch` for `app.psc`

- Do not open the page with `file://`.
- Start a server in the project directory: `python -m http.server 8000`.
- Open `http://localhost:8000`.
- Confirm `app.psc` is beside `index.html` and that the filename capitalization matches.

## The button stays disabled

The button is disabled until the Python application finishes loading. Check the status text and developer console. A syntax error in `app.psc` can prevent the event handler from being registered.

## Python errors are difficult to find

The browser console reports engine errors. Pyodide also reports Python tracebacks there. Read the last lines first; they usually identify the exception and source line.

## The GitHub Pages version cannot find `app.psc`

Use relative paths such as `./app.psc` and `./style.css`. This is important when the site is hosted beneath a repository path such as `/html6/`.

## Is it safe to run an unknown PSC file?

No. Treat PSC files like executable code. The prototype does not isolate them from the page DOM or all browser capabilities. Only run code you trust.
