"""HTML6 example application: transform text with Python."""

from js import document
from pyodide.ffi import create_proxy

user_input = document.getElementById("user-input")
transform_button = document.getElementById("transform-button")
output = document.getElementById("output")
engine_status = document.getElementById("engine-status")


def on_transform_click(event=None):
    """Read input text, uppercase it, and update the page."""
    message = user_input.value

    if not message.strip():
        output.textContent = "Please enter a message first."
        user_input.focus()
        return

    output.textContent = message.upper()
    engine_status.textContent = "HTML6 ready · Python processed your message successfully."


# Keep a reference to the proxy so JavaScript can call the Python function.
_transform_callback = create_proxy(on_transform_click)
transform_button.addEventListener("click", _transform_callback)

transform_button.disabled = False
output.textContent = "Your transformed message will appear here."
engine_status.textContent = "HTML6 ready · Python application loaded."
