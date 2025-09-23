const navBtn = document.getElementById("nav-btn");
const navMenu = document.getElementById("nav-menu");
const navBtnImg = document.getElementById("nav-btn-img");

navBtn.addEventListener("click", () => {
  const isOpen = navBtn.getAttribute("aria-expanded") === "true";
  const willOpen = !isOpen;

  navBtn.setAttribute("aria-expanded", String(willOpen));
  navMenu.setAttribute("aria-hidden", String(!willOpen));

  navMenu.classList.toggle("hidden", !willOpen);

  navBtnImg.src = willOpen
    ? "./images/icon-close.svg"
    : "./images/icon-hamburger.svg";
  navBtnImg.alt = willOpen ? "Close menu" : "Open menu";
});

const asks = [...document.querySelectorAll("#list-ask [aria-controls]")];
const panelsAsk = asks.map((ask) =>
  document.getElementById(ask.getAttribute("aria-controls"))
);

function openOnly(target) {
  asks.forEach((ask, i) => {
    const on = ask === target;
    ask.setAttribute("aria-expanded", String(on));
    panelsAsk[i].classList.toggle("hidden", !on);
  });
}

asks.forEach((ask, i) => {
  const panel = panelsAsk[i];
  ask.addEventListener("click", () => {
    const isOpen = ask.getAttribute("aria-expanded") === "true";
    if (isOpen) {
      ask.setAttribute("aria-expanded", "false");
      panel.classList.add("hidden");
    } else {
      openOnly(ask);
    }
  });
});

const tabs = Array.from(document.querySelectorAll('#tabs-list [role="tab"]'));
const panels = tabs.map((t) =>
  document.getElementById(t.getAttribute("aria-controls"))
);

tabs.forEach((t) => {
  t.classList.add(
    "flex",
    "flex-col",
    "items-center",
    "py-3",
    "text-blue-950",
    "focus:outline-none"
  );

  const bar = document.createElement("span");
  bar.setAttribute("aria-hidden", "true");
  bar.className =
    "pointer-events-none block h-[3px] w-36  absolute bottom-0 bg-red-400 " +
    "mx-auto  opacity-0 transition-opacity duration-200 ";
  t.appendChild(bar);
});

function activateTab(tab) {
  tabs.forEach((t, i) => {
    const sel = t === tab;
    t.setAttribute("aria-selected", String(sel));
    t.tabIndex = sel ? 0 : -1;
    panels[i].hidden = !sel;

    const bar = t.lastElementChild;
    if (bar) {
      bar.classList.toggle("opacity-100", sel);
      bar.classList.toggle("opacity-0", !sel);
    }
  });
  tab.focus();
}

const initiallySelected =
  tabs.find((t) => t.getAttribute("aria-selected") === "true") || tabs[0];
if (initiallySelected) activateTab(initiallySelected);

// Handlers
tabs.forEach((t) => {
  t.addEventListener("click", () => activateTab(t));
  t.addEventListener("keydown", (e) => {
    const i = tabs.indexOf(document.activeElement);
    if (i === -1) return;
    if (e.key === "ArrowRight") {
      activateTab(tabs[(i + 1) % tabs.length]);
      e.preventDefault();
    }
    if (e.key === "ArrowLeft") {
      activateTab(tabs[(i - 1 + tabs.length) % tabs.length]);
      e.preventDefault();
    }
    if (e.key === "Home") {
      activateTab(tabs[0]);
      e.preventDefault();
    }
    if (e.key === "End") {
      activateTab(tabs[tabs.length - 1]);
      e.preventDefault();
    }
  });
});
