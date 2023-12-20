const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { sendMessage, clear } = require("./http.js");
const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/chat", (req, res) => {
  if (req.body.clear) {
    clear();
    res.send("success");
    return;
  }
  let { content } = req.body;
  content = content && content.trim();
  res.writeHead(200,{
    'Content-Type': 'text/event-stream', // 启用 Stream
  })
  sendMessage(content, {
    onData(chunk) {
      res.write(chunk);
    },
    onEnd() {
      res.end();
    },
    onError(err) {
      console.error(err);
      endError(res);
    },
  });
  // console.log(req);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
