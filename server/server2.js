/**另起一个服务*/
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { sendMessage, clear } = require("./http.js");
const app = express();
app.use(cors());
app.use(bodyParser.json());
//设置Set-Cookie
app.get('/haha2',(req,res)=>{
    res.status(200)
    res.statusMessage = 'ha'
    res.send('我是3001的haha1')
    res.end()
})
// 所有路由定义完之后，最后做404处理 /
app.get('*', function (req, res){
  res.status(404)
  res.statusMessage = 'Not Found'
  res.send('找不到我吧')
  res.end()
});
app.listen(3001, () => {
  console.log("Server is running on port 3001");
});


