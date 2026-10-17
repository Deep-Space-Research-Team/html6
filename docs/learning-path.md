# HTML6 Learning Path

This guide assumes you are new to HTML6. You do not need to learn every part of the engine before trying the demo.

## Learning goals

By the end, you should be able to:

- Explain what HTML, CSS, Python, Pyodide, and WebAssembly each do.
- Run the example through a local web server.
- Read input from the DOM in Python.
- respond to a click with a Python callback.
- Change a transformation and build a tiny feature of your own.

## Stage 1 — Run before changing anything

1. Follow the local setup in the repository README.
2. Wait until the status says the HTML6 app is ready.
3. Enter `hello html6` and click the button.
4. Observe the uppercase output.

**Checkpoint:** You can run the demo and explain what the input and output are doing.

## Stage 2 — Learn the three web layers

- `index.html` describes the page structure and names the elements.
- `style.css` controls appearance and layout.
- `app.psc` contains Python application logic.
- `html6.js` is the bootstrap layer that loads Pyodide and executes PSC files.

**Exercise:** Change the heading in `index.html`, then change a color in `style.css`.

## Stage 3 — Read the Python

Open `app.psc`:

```python
message = user_input.value
output.textContent = message.upper()
```

`user_input.value` reads the input field. `upper()` is ordinary Python string functionality. `output.textContent` sets the text displayed by the browser.

**Exercise A:** Replace `message.upper()` with `message.lower()`.

**Exercise B:** Replace it with `message[::-1]` to reverse the text.

**Exercise C:** Replace it with `message.title()` to title-case the text.

## Stage 4 — Understand the click event

```python
def on_transform_click(event=None):
    output.textContent = user_input.value.upper()

_transform_callback = create_proxy(on_transform_click)
transform_button.addEventListener("click", _transform_callback)
```

The function defines the behavior. `create_proxy()` makes the Python function callable from the browser's JavaScript environment. `addEventListener()` registers it for button clicks. Keep the proxy referenced for as long as the listener needs it.

**Exercise:** Change the output when the input is empty.

## Stage 5 — Build a mini-feature

Try one small feature at a time:

1. Add a second button in HTML.
2. Give it a unique `id`.
3. Find it in Python with `document.getElementById(...)`.
4. Write a Python function for its behavior.
5. Wrap the callback with `create_proxy()` and register the event listener.

Possible mini-projects: word counter, character counter, greeting generator, text reverser, or a simple quiz.

## Stage 6 — Understand the runtime

Read `html6.js` and trace the sequence:

1. The browser loads the engine.
2. The engine loads Pyodide from a CDN.
3. Pyodide initializes Python inside WebAssembly.
4. The engine fetches `app.psc`.
5. `runPythonAsync()` executes the Python source.
6. Python uses the `js` package to access browser objects.

You do not need to modify the engine for your first few experiments.

## Stage 7 — Share and contribute

- Write down what you changed.
- Test with empty input, ordinary text, Unicode, and long text.
- Check the browser developer console if something fails.
- Open an issue with reproduction steps or submit a pull request.

## Suggested four-session study plan

| Session | Focus | Outcome |
|---|---|---|
| 1 | Run demo; HTML/CSS/Python roles | Explain project structure |
| 2 | Python strings and DOM reads/writes | Customize transformations |
| 3 | Event callbacks and `create_proxy` | Add a new button |
| 4 | Runtime flow and troubleshooting | Explain how PSC executes |

## Important limitations

HTML6 is experimental. The browser does not natively execute `.psc` files. Pyodide and the engine provide the runtime. Large Python packages can increase startup time, and browser APIs accessed through Pyodide are not a security boundary. Do not use this prototype to execute untrusted scripts.
