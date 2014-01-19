// a little fallback utility to make the HTML5 autofocus attribute work
if (!("autofocus" in document.createElement("input"))) {
  document.getElementById("q").focus();
}
