(function () {
  const icons = {
    "chevron-left": '<path d="m15 18-6-6 6-6"/>',
    "chevron-right": '<path d="m9 18 6-6-6-6"/>',
    "credit-card":
      '<rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/>',
    eye: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>',
    "layout-grid":
      '<rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/>',
    "map-pin": '<path d="M20 10c0 4.9-8 12-8 12S4 14.9 4 10a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
    crosshair:
      '<circle cx="12" cy="12" r="8"/><path d="M22 12h-4"/><path d="M6 12H2"/><path d="M12 6V2"/><path d="M12 22v-4"/>',
    "message-circle":
      '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>',
    minus: '<path d="M5 12h14"/>',
    plus: '<path d="M5 12h14"/><path d="M12 5v14"/>',
    search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
    send: '<path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>',
    "shopping-bag":
      '<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>',
    x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
  };

  window.lucide = {
    createIcons() {
      document.querySelectorAll("[data-lucide]").forEach((node) => {
        const name = node.getAttribute("data-lucide");
        const markup = icons[name];

        if (!markup || node.dataset.iconReady === "true") {
          return;
        }

        node.dataset.iconReady = "true";
        node.innerHTML = `
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
            focusable="false"
          >${markup}</svg>
        `;
      });
    },
  };
})();
