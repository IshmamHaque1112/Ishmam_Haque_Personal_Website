function updateParents(content) {
    let parent = content.parentElement;

    while (parent) {
        if (parent.classList.contains("accordion-item")) {
            const panel = parent.querySelector(":scope > .accordion-content");
            if (panel) {
                panel.style.maxHeight = panel.scrollHeight + "px";
            }
        }

        parent = parent.parentElement;
    }
}
// Accordion behavior for all .accordion groups (including nested ones)
document.addEventListener("DOMContentLoaded", () => {
  const headers = document.querySelectorAll(".accordion-header");

  headers.forEach((header) => {
    header.addEventListener("click", () => {
      const item = header.parentElement;
      const content = header.nextElementSibling;
      updateParents(content);
      const isOpen = item.classList.contains("open");

      if (isOpen) {
        item.classList.remove("open");
        header.setAttribute("aria-expanded", "false");
        content.style.maxHeight = null;
      } else {
        item.classList.add("open");
        header.setAttribute("aria-expanded", "true");
        content.style.maxHeight = content.scrollHeight + "px";
        updateParents(content);
      }
    });
  });

  // Recalculate open nested accordion heights when a parent panel opens,
  // since child content height isn't known until it's visible.
  const observer = new MutationObserver(() => {
    document.querySelectorAll(".accordion-item.open").forEach((item) => {
      const content = item.querySelector(":scope > .accordion-content");
      if (content) {
        content.style.maxHeight = content.scrollHeight + "px";
        updateParents(content);
      }
    });
  });

  observer.observe(document.body, {
    attributes: true,
    subtree: true,
    attributeFilter: ["class"],
  });
});
updateParents(content);