// Admin wall: hide/show/delete/block. Writes send X-Requested-With so cross-site forms can't forge them.
(() => {
  const rows = document.getElementById("rows");
  const status = document.getElementById("status");

  const act = async (id, action) => {
    if (action === "delete" && !confirm(`Delete note #${id} for good?`)) return;
    const r = await fetch(`/admin/api/notes/${id}/${action}`, { method: "POST", headers: { "X-Requested-With": "billboard" } });
    status.textContent = r.ok ? `#${id}: ${action} done` : `#${id}: ${(await r.json()).error}`;
    load();
  };

  const cell = (text) => {
    const td = document.createElement("td");
    td.textContent = text;
    return td;
  };

  const load = async () => {
    const r = await fetch("/admin/api/notes", { cache: "no-store" });
    if (!r.ok) { status.textContent = (await r.json()).error; return; }
    rows.replaceChildren(...(await r.json()).notes.map((n) => {
      const tr = document.createElement("tr");
      if (n.hidden) tr.className = "hidden";
      const when = new Date(n.created * 1000).toLocaleString("en-GB");
      tr.append(cell(n.id), cell(n.text), cell(n.by), cell(when),
        cell(`${n.poster} (${n.poster_notes})${n.blocked ? " BLOCKED" : ""}`));
      const td = document.createElement("td");
      const actions = [n.hidden ? "show" : "hide", "delete", n.blocked ? "unblock" : "block"];
      for (const a of actions) {
        if (n.poster === "local" && a.endsWith("block")) continue;
        const b = document.createElement("button");
        b.textContent = a;
        b.addEventListener("click", () => act(n.id, a));
        td.append(b);
      }
      tr.append(td);
      return tr;
    }));
  };
  load();
})();
