const http = require("http");
const { parse } = require("url");
const { spawn } = require("child_process");
const fs = require("fs");
const path = require("path");
const net = require("net");

const PORT = 3030;
const HOST = "0.0.0.0";
const PUBLIC_DIR = path.join(__dirname, "public");

// 1. Démarrer Next.js en arrière-plan sur un port interne
function getRandomPort() {
  return new Promise((resolve) => {
    const srv = net.createServer();
    srv.listen(0, () => {
      const port = srv.address().port;
      srv.close(() => resolve(port));
    });
  });
}

async function main() {
  const nextPort = await getRandomPort();

  console.log(`[proxy] Next.js interne sur port ${nextPort}`);

  const next = spawn("npx", ["next", "start", "-p", String(nextPort), "-H", "127.0.0.1"], {
    cwd: __dirname,
    stdio: ["ignore", "pipe", "pipe"],
    env: { ...process.env, NODE_ENV: "production" },
  });

  next.stdout.on("data", (d) => process.stdout.write(`[next] ${d}`));
  next.stderr.on("data", (d) => process.stderr.write(`[next] ${d}`));

  // Attendre que Next.js soit prêt
  await new Promise((resolve) => setTimeout(resolve, 5000));

  // 2. Créer le proxy
  const server = http.createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    const pathname = parsedUrl.pathname;

    // Servir les fichiers statiques depuis /public/
    const filePath = path.join(PUBLIC_DIR, pathname);
    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      const ext = path.extname(filePath).toLowerCase();
      const mimeTypes = {
        ".png": "image/png",
        ".svg": "image/svg+xml",
        ".ico": "image/x-icon",
        ".jpg": "image/jpeg",
        ".jpeg": "image/jpeg",
        ".webp": "image/webp",
        ".css": "text/css",
        ".js": "application/javascript",
        ".json": "application/json",
      };
      const contentType = mimeTypes[ext] || "application/octet-stream";
      // Cache headers importants
      res.writeHead(200, {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=86400",
        "Access-Control-Allow-Origin": "*",
      });
      fs.createReadStream(filePath).pipe(res);
      return;
    }

    // Tout le reste → proxy vers Next.js
    const options = {
      hostname: "127.0.0.1",
      port: nextPort,
      path: req.url,
      method: req.method,
      headers: { ...req.headers, host: `${HOST}:${PORT}` },
    };

    const proxyReq = http.request(options, (proxyRes) => {
      res.writeHead(proxyRes.statusCode, proxyRes.headers);
      proxyRes.pipe(res);
    });

    proxyReq.on("error", (err) => {
      console.error("[proxy] Error:", err.message);
      res.writeHead(502);
      res.end("Bad Gateway");
    });

    req.pipe(proxyReq);
  });

  server.listen(PORT, HOST, () => {
    console.log(`[proxy] Serveur prêt sur http://${HOST}:${PORT}`);
    console.log(`[proxy] Assets statiques servis depuis ${PUBLIC_DIR}`);
  });
}

main().catch(console.error);
