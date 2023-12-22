const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { sendMessage, clear } = require("./http.js");
const app = express();
app.use(cors());
app.use(bodyParser.json());

/**chat-gpt */
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

/**测试接口 */
app.get("/haha",(req,res)=>{
  res.status(200)
  res.statusMessage = 'ha'
  res.send('haha')
  res.end()
})
/**get请求发送body */
app.get("/getSendBody", (req, res) => {
  console.log("🚀 ~ file: index.js:58 ~ app.get ~ req:", req.body)
  res.send(req.body);
  res.end();
})
/**get请求发送body */
app.post("/postSendBody", (req, res) => {
  console.log("🚀 ~ file: index.js:58 ~ app.get ~ req:", req.body)
  res.send(req.body);
  res.end();
})
// 所有路由定义完之后，最后做404处理 /
app.get('*', function (req, res){
  res.status(404)
  res.statusMessage = 'Not Found'
  res.send('找不到我吧')
  res.end()
});
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});


