import { createReadStream, existsSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, normalize } from 'node:path';

const port = Number(process.env.PORT ?? 4173);
const mime = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json' };

createServer((request, response) => {
  const pathname = decodeURIComponent(new URL(request.url, `http://${request.headers.host}`).pathname);
  const relative = pathname === '/' ? 'index.html' : pathname.replace(/^\/+/, '');
  const candidate = normalize(join(process.cwd(), relative));

  if (!candidate.startsWith(process.cwd()) || !existsSync(candidate) || statSync(candidate).isDirectory()) {
    response.writeHead(404).end('Not found');
    return;
  }

  response.writeHead(200, { 'Content-Type': mime[extname(candidate)] ?? 'application/octet-stream' });
  createReadStream(candidate).pipe(response);
}).listen(port, () => {
  console.log(`TodoLab disponível em http://localhost:${port}`);
});
