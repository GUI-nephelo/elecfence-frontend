const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const Proxy = require('http-proxy');
const proxy = Proxy.createProxyServer()

const argv = process.argv;

// 由命令行控制
const app = next({ dev: "--dev" in argv });
const handle = app.getRequestHandler();

// 设置监听的 IP 地址和端口
const IP_ADDRESS = '0.0.0.0'; // 设置为 '0.0.0.0' 以监听所有可用的 IP 地址
const PORT = 3000; // 设置监听的端口号

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    // console.log(req.url)

    if (req.url === "/api/notification") {
      console.log("Notification")
      req.url = ""
      proxy.web(req, res, { target: "http://127.0.0.1:8000/realTimeData/sse" }, e => {
        console.log(`event:${e}`)
      })

    } else {
      handle(req, res, parsedUrl);
    }
  }).listen(PORT, IP_ADDRESS, (err) => {
    if (err) {
      throw err;
    }
    console.log(`Server listening on http://${IP_ADDRESS}:${PORT}`);
  });
});