let data = "";//存储用户发送的信息
onconnect = (event) => {
    const port = event.ports[0];//获取客户端端口
    port.onmessage = (event) => {
        if (event.data==='get') {
            port.postMessage(data);//向客户端发送消息
        }else{
            data = event.data;//将用户发送的信息存储到data变量中
        }
    }
}