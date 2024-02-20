const WebSocket = require("ws");
const express = require("express");
const expressWs = require("express-ws");
const cors = require("cors");
const app = express();
const wsClients = new Set();
app.use(cors());
expressWs(app);
app.ws("/socket", (ws, req) => {
  console.log("connected", req.query);
  //   wsClients[req.query.userId] = ws;
  wsClients.add({ userId: req.query.userId, ws: ws });
  console.log("🚀 ~ app.ws ~ wsClients:", wsClients);
  ws.send("已连接");
});
app.get("/message", (req, res) => {
  res.send("服务端收到消息：" + req.query.message);
  wsClients.forEach((item) => {
    if (item.userId === req.query.userId) {
      item.ws.send(req.query.message);
    }
  });
});

app.listen(8080, () => {
  console.log("listening on *:8080");
});
