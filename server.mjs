import http from 'node:http';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
const root = process.cwd();
http.createServer(async (req, res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    const file = path.resolve(root, '.' + (pathname === '/' ? '/index.html' : pathname));
    if (!file.startsWith(root + path.sep) || !['.html', '.css', '.js', '.svg'].includes(path.extname(file))) { res.writeHead(404).end(); return; }
    const data = await readFile(file);
    res.setHeader('Content-Type', ({'.html':'text/html', '.css':'text/css', '.js':'text/javascript', '.svg':'image/svg+xml'})[path.extname(file)]);
    res.end(data);
  } catch { res.writeHead(404).end('Not found'); }
}).listen(Number(process.env.PORT || 3000), '0.0.0.0', () => console.log('StowFlow 3PL listening on port ' + (process.env.PORT || 3000)));
