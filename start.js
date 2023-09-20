const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// 设置监听的 IP 地址和端口
const IP_ADDRESS = '0.0.0.0'; // 设置为 '0.0.0.0' 以监听所有可用的 IP 地址
const PORT = 3000; // 设置监听的端口号

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(PORT, IP_ADDRESS, (err) => {
    if (err) {
      throw err;
    }
    console.log(`Server listening on http://${IP_ADDRESS}:${PORT}`);
  });
});