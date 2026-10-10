const timeEl = document.getElementById("time");
const dateEl = document.getElementById("date");

function tick() {
  const now = new Date();
  timeEl.textContent = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false });
  dateEl.textContent = now
    .toLocaleDateString("en-AU", { weekday: "long", day: "numeric", month: "long" })
    .toLowerCase();
}
tick();
setInterval(tick, 1000);

function favicon(url) {
  if (!globalThis.chrome?.runtime?.id) return "";
  const src = new URL(chrome.runtime.getURL("/_favicon/"));
  src.searchParams.set("pageUrl", url);
  src.searchParams.set("size", "32");
  return src.toString();
}

const byKey = new Map();
const nav = document.getElementById("links");

for (const group of GROUPS) {
  const section = document.createElement("section");
  const heading = document.createElement("h2");
  heading.textContent = group.name;
  section.append(heading);

  for (const link of group.links) {
    const a = document.createElement("a");
    a.href = link.url;
    a.innerHTML = `<img alt=""><span class="name"></span><kbd></kbd>`;
    const icon = favicon(link.url);
    if (icon) a.querySelector("img").src = icon;
    else a.querySelector("img").remove();
    a.querySelector(".name").textContent = link.name;
    a.querySelector("kbd").textContent = link.key;
    section.append(a);
    byKey.set(link.key, link.url);
  }
  nav.append(section);
}

document.addEventListener("keydown", (e) => {
  if (e.ctrlKey || e.metaKey || e.altKey) return;
  const url = byKey.get(e.key.toLowerCase());
  if (!url) return;
  if (e.shiftKey) window.open(url, "_blank");
  else location.href = url;
});
