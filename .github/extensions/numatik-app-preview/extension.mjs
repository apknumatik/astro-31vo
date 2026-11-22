import http from "node:http";
import declaration from "./extension.json" with { type: "json" };
import { createCanvas, joinSession } from "@github/copilot-sdk/extension";

const appUrl = "http://127.0.0.1:18860/";
const instances = new Map();

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function pageHtml() {
  const safeUrl = escapeHtml(appUrl);
  return `<!doctype html>
<html lang="id">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Numatik App Preview</title>
  <style>
    * { box-sizing: border-box; }
    html, body { width: 100%; height: 100%; margin: 0; overflow: hidden; background: #08111f; }
    body { display: grid; grid-template-rows: 44px minmax(0, 1fr); }
    .toolbar {
      display: flex; align-items: center; gap: 10px; height: 44px;
      padding: 7px 10px; color: #dbeafe;
      background: linear-gradient(180deg, #172554, #0f172a);
      border-bottom: 1px solid rgba(103,232,249,.22);
      font: 700 12px/1 system-ui, sans-serif;
    }
    .status-dot {
      width: 8px; height: 8px; border-radius: 50%;
      background: #22d3ee; box-shadow: 0 0 12px #22d3ee;
    }
    .address {
      flex: 1; min-width: 0; padding: 7px 10px;
      overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
      border: 1px solid rgba(148,163,184,.18); border-radius: 8px;
      color: #94a3b8; background: rgba(2,6,23,.38);
    }
    button {
      height: 30px; border: 1px solid rgba(103,232,249,.35); border-radius: 8px;
      padding: 0 11px; color: #cffafe; background: rgba(8,145,178,.18);
      cursor: pointer; font: 800 11px system-ui, sans-serif;
    }
    button:focus-visible { outline: 3px solid #67e8f9; outline-offset: 2px; }
    iframe { width: 100%; height: 100%; border: 0; background: white; }
  </style>
</head>
<body>
  <div class="toolbar" role="toolbar" aria-label="Preview controls">
    <span class="status-dot" aria-hidden="true"></span>
    <strong>NUMATIK</strong>
    <span class="address" title="${safeUrl}">${safeUrl}</span>
    <button id="reload" type="button">Muat Ulang</button>
  </div>
  <iframe id="preview" title="Preview aplikasi Numatik" src="${safeUrl}"></iframe>
  <script>
    const preview = document.getElementById("preview");
    document.getElementById("reload").addEventListener("click", () => {
      preview.src = "${safeUrl}";
    });
  </script>
</body>
</html>`;
}

async function startServer(instanceId) {
  const existing = instances.get(instanceId);
  if (existing) return existing.url;

  const server = http.createServer((request, response) => {
    const url = new URL(request.url ?? "/", "http://127.0.0.1");
    if (url.pathname !== "/") {
      response.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
      response.end("Not found");
      return;
    }
    response.writeHead(200, {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "no-store",
    });
    response.end(pageHtml());
  });

  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolve);
  });

  const address = server.address();
  if (!address || typeof address === "string") {
    server.close();
    throw new Error("Canvas preview server did not bind to a TCP port.");
  }

  const state = { server, url: `http://127.0.0.1:${address.port}/` };
  instances.set(instanceId, state);
  return state.url;
}

const actionHandlers = {
  reload_preview: async ({ instanceId }) => {
    const state = instances.get(instanceId);
    if (!state) return { reloaded: false, reason: "preview_not_open" };
    return { reloaded: true, url: state.url };
  },
};

await joinSession({
  canvases: declaration.canvases.map((canvas) =>
    createCanvas({
      ...canvas,
      actions: canvas.actions?.map((action) => ({
        ...action,
        handler: actionHandlers[action.name],
      })),
      open: async ({ instanceId }) => startServer(instanceId),
      onClose: async ({ instanceId }) => {
        const state = instances.get(instanceId);
        if (!state) return;
        instances.delete(instanceId);
        await new Promise((resolve) => state.server.close(resolve));
      },
    }),
  ),
});
