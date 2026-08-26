import { createReadStream, existsSync } from 'node:fs'
import { createServer } from 'node:http'
import { extname, join, normalize } from 'node:path'

const root = join(process.cwd(), 'public')
const mime = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.ttf': 'font/ttf',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml'
}

createServer((req, res) => {
  const pathname = new URL(req.url, 'http://localhost').pathname
  if (pathname === '/health') {
    res.writeHead(200, { 'content-type': 'application/json; charset=utf-8' })
    return res.end(JSON.stringify({ ok: true, service: 'propuesta-golden-summer' }))
  }

  const requested = pathname === '/' ? 'index.html' : pathname.replace(/^\/+/, '')
  const file = normalize(join(root, requested))
  if (!file.startsWith(root) || !existsSync(file)) {
    res.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' })
    return res.end('Not found')
  }

  res.writeHead(200, { 'content-type': mime[extname(file)] || 'application/octet-stream' })
  createReadStream(file).pipe(res)
}).listen(Number(process.env.PORT || 3000), '0.0.0.0')
