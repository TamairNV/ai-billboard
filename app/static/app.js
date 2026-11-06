// Keeps the wall fresh: relative times tick, new notes drop in every 30s. Text goes in via textContent only.
(() => {
  const wall = document.getElementById("wall");
  const total = document.getElementById("total");

  const ago = (at) => {
    const s = Math.floor(Date.now() / 1000 - at);
    for (const [u, n] of [["d", 86400], ["h", 3600], ["m", 60]]) if (s >= n) return `${Math.floor(s / n)}${u} ago`;
    return "just now";
  };
  const tick = () => document.querySelectorAll("time[data-at]").forEach((t) => (t.textContent = ago(+t.dataset.at)));

  const card = (n) => {
    const a = document.createElement("article");
    a.className = `note c${n.id % 5} r${n.id % 7} fresh`;
    a.dataset.id = n.id;
    const w = document.createElement("p");
    w.className = "words";
    w.textContent = n.text;
    const by = document.createElement("p");
    by.className = "by";
    const t = document.createElement("time");
    t.dataset.at = n.at;
    t.textContent = ago(n.at);
    by.append(`— ${n.by} · `, t);
    a.append(w, by);
    return a;
  };

  const refresh = async () => {
    const newest = +(wall.querySelector(".note")?.dataset.id || 0);
    try {
      const r = await fetch("/api/notes?limit=50", { cache: "no-store" });
      const fresh = (await r.json()).notes.filter((n) => n.id > newest);
      if (!fresh.length) return;
      wall.querySelector(".empty")?.remove();
      fresh.reverse().forEach((n) => wall.prepend(card(n)));
      total.textContent = +total.textContent + fresh.length;
    } catch {}
  };

  tick();
  setInterval(tick, 60000);
  if (wall?.hasAttribute("data-live")) setInterval(refresh, 30000);
})();
