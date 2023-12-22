const body = JSON.stringify({ name: "张三", age: 18 });
/**
 * get 传递body
 */
async function getSendBody() {
  const res = await fetch("http://localhost:3000/getSendBody", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });
  const body = await res.json();
  console.log(body);
  
}

/**
 * post 传递body
 */
async function postSendBody() {
    const res = await fetch("http://localhost:3000/postSendBody", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });
  const data = await res.json();
  document.body.innerHTML += "<br> post请求传递到服务端的body: " + body;
  document.body.innerHTML +=
    "<br> post服务端接收到的body: " + JSON.stringify(data);
  console.log(data);
  
}

getSendBody();
// postSendBody();
