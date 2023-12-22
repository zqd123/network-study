const body = JSON.stringify({name: '张三', age: 18})
/**
 * get 传递body
 */
function getSendBody() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:3000/getSendBody');
    xhr.onreadystatechange = function(e){
        if (e.target.readyState === 4) {
            document.body.innerHTML += '<br> get传递到服务端的body: '+ body;
            document.body.innerHTML += '<br> get服务端接收到的body: '+ e.target.responseText;
        }
    }
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.send(body);//如果请求方法是GET或HEAD ，那么body会被忽略的
}

/**
 * post 传递body
 */
function postSendBody(){
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:3000/postSendBody');
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.onreadystatechange = function(e){
        if (e.target.readyState === 4) {
            document.body.innerHTML += '<br> post请求传递到服务端的body: '+ body;
            document.body.innerHTML += '<br> post服务端接收到的body: '+ xhr.responseText;
        }
    }
    xhr.send(body);
}

getSendBody();
// postSendBody();