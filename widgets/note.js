let noteInput = document.getElementById("note-input");

new ResizeObserver(() => {
    let computedWidth = getComputedStyle(noteInput).width;
    if (computedWidth >= noteInput.style.width) {
        localStorage.setItem("note/width", noteInput.style.width);
    } else {
        localStorage.removeItem("note/width");
    }

    localStorage.setItem("note/height", noteInput.style.height);
}).observe(noteInput)