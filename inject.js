(function enableCodetantraUnblock() {
  let innerDoc = document;

  // Check if iframe exists
  const frame = document.querySelector('#course-iframe');
  if (frame && (frame.contentDocument || frame.contentWindow.document)) {
    innerDoc = frame.contentDocument || frame.contentWindow.document;
    console.log("📄 Using iframe document");
  } else {
    console.warn("⚠️ course-iframe not found. Using main document.");
  }

  const editableDivs = innerDoc.querySelectorAll('div[contenteditable="true"]');
  editableDivs.forEach(div => {
    div.contentEditable = "true";
    div.style.userSelect = "text";
    div.style.pointerEvents = "auto";

    ['copy', 'cut', 'paste', 'contextmenu', 'selectstart'].forEach(evt => {
      div.addEventListener(evt, e => {
        e.stopImmediatePropagation();
        e.stopPropagation();
      }, true);
    });

    console.log("[🟢] Copy/paste enabled on:", div);
  });

  innerDoc.addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'v') {
      e.preventDefault();
      e.stopImmediatePropagation();

      const text = prompt('Paste your text here and click OK:');
      if (!text) return;

      const sel = innerDoc.getSelection();
      if (!sel || !sel.rangeCount) return;

      sel.deleteFromDocument();
      sel.getRangeAt(0).insertNode(innerDoc.createTextNode(text));
      sel.collapseToEnd();
    }
  }, true);

  console.log("👉 Prompt‐paste enabled: press Ctrl+V to use.");
})();
