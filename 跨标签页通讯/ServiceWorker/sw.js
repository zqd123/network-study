// 消息会先到达这里，然后发送到其他客户端
self.addEventListener('message', async (event)=> {
    // 首先获取所有注册了serviceWorker的客户端
    self.clients.matchAll().then((clients)=>{
        // 遍历所有客户端       
        clients.forEach((client)=>{
            // 向每个客户端发送消息
            client.postMessage(event.data);
        })
    })
});