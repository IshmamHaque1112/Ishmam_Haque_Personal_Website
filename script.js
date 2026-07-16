document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".accordion-header").forEach(header => {
    header.addEventListener("click", () => {
      const item = header.parentElement;
      const content = header.nextElementSibling;
      const opening = !item.classList.contains("open");

      item.classList.toggle("open", opening);
      header.setAttribute("aria-expanded", opening);

      if (opening) {
        content.style.maxHeight = content.scrollHeight + "px";
      } else {
        content.style.maxHeight = null;
      }

      // Resize every parent accordion
      let parentContent = content.parentElement.closest(".accordion-content");

      while (parentContent) {
        parentContent.style.maxHeight = parentContent.scrollHeight + "px";
        parentContent = parentContent.parentElement.closest(".accordion-content");
      }
    });
  });

  // Curtain tabs functionality
  document.querySelectorAll(".curtain-tab").forEach(tab => {
    tab.addEventListener("click", () => {
      const tabItem = tab.parentElement;
      const isActive = tabItem.classList.contains("active");

      // Close all curtain tabs
      document.querySelectorAll(".curtain-tab-item").forEach(item => {
        item.classList.remove("active");
      });

      // Open clicked tab if it wasn't already active
      if (!isActive) {
        tabItem.classList.add("active");
      }
    });
  });
});