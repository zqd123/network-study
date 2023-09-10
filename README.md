# 网络

> 前端开发需要了解的网络知识

## URL

URL(uniform resource locator,统一资源定位符)用于定位网络服务.

URL是一个固定格式的字符串

![URL](http://mdrs.yuanjin.tech/img/202301121029498.png?ynotemdtimestamp=1694346347627)

它表达了:

从网络中哪台计算机(domain)中的哪个服务(port),获取服务器上资源的路径(path),以及要用什么样的协议通信(schema).

注意:

*   当协议是http端口号默认为80,端口可以省略
*   协议是https端口号默认443,端口号可以省略

## http协议

超文本传输协议(Hyper Text Transfer Protocol, HTTP).

99%的情况下,前端开发者接触的都是HTTP协议.

### 请求/响应

客户端向服务端发起请求,并接收服务端响应.

![http消息传递](http://mdrs.yuanjin.tech/img/202301132143345.png?ynotemdtimestamp=1694346347627)

HTTP请求消息是纯文本格式,包含四部分:

**请求行**

**请求头**

*空行(回车或换行)*

**请求体**

#### 1. 请求行

请求行包括请求方法,URL,协议版本三部分.

#### 2. 请求头

**键/值对**形式;

![请求头](https://img2022.cnblogs.com/blog/2809757/202205/2809757-20220504113141304-1769601535.png)

#### 3. 空行

最后一个请求头字段的后面是一个空行,通知服务器请求头部至此结束.

用来分隔请求头部和请求体.

#### 4. 请求体

请求体的格式,依赖请求头中Content-Type的值.

## 体验HTTP请求

### 1. 安装vscode插件 REST Client

![REST Client](http://mdrs.yuanjin.tech/img/202301121145973.png?ynotemdtimestamp=1694346347627)

### 2. 新建文件xxx.http

### 3. 编写请求文本-发送请求

    POST https://mock.apifox.cn/m1/3263409-0-default/api/user/login HTTP/1.1
    Content-Type: application/json

    {
        "user":"zqd",
        "password":"123456"
    }

### 4. 服务器响应

    HTTP/1.1 200 OK
    Content-Type: application/json; charset=utf-8
    Content-Length: 148

    {
      "code": "200",
      "data": {},
      "msg": "请求成功"
    }

## 响应

和请求对应

### 1. 响应行

协议版本 响应码 响应消息

### 2. 响应头

### &#x20;3. 响应体

### 响应码

常见的响应码有:

| 分类      | 分类描述                   |
| :------ | :--------------------- |
| 1\*\*\* | 信息响应,服务器收到请求,需要请求者继续执行 |
| 2\*\*   | 成功响应                   |
| 3\*\*   | 重定向                    |
| 4\*\*   | 客户端错误                  |
| 5\*\*   | 服务器错误                  |

1.  `200 OK`：一切正常。
2.  `301 Moved Permanently`：资源已被永久重定向。

    你的请求我收到了，但是呢，你要的东西不在这个地址了，我已经永远的把它移动到了一个新的地址，麻烦你取请求新的地址，地址我放到了响应头的Location中了

    > 试试请求：[www.douyutv.com](http://www.douyutv.com/)
3.  `302 Found`：资源已被临时重定向。

    你的请求我收到了，但是呢，你要的东西不在这个地址了，我临时的把它移动到了一个新的地址，麻烦你取请求新的地址，地址我放到了请求头的Location中了
4.  `304 Not Modified`：文档内容未被修改。

    你的请求我收到了，你要的东西跟之前是一样的，没有任何的变化，所以我就不给你结果了，你自己就用以前的吧。啥？你没有缓存以前的内容，关我啥事
5.  `400 Bad Reques`t：语义有误，当前请求无法被服务器理解。

    你给我发的是个啥啊，我听都听不懂
6.  `403 Forbidden`：服务器拒绝执行。

    你的请求我已收到，但是我就是不给你东西
7.  `404 Not Found`：资源不存在。

    你的请求我收到了，但我没有你要的东西
8.  `500 Internal Server Error`：服务器内部错误。

    你的请求我已收到，但这道题我不会，解不出来，先睡了

### 响应头 -Content-Type

`Content-Type`标注了附带的响应体是什么格式

常见的值有：

1.  `text/plain`: 普通的纯文本
2.  `text/html`：html文档
3.  `text/javascript`或`application/javascript`：js代码
4.  `text/css`：css代码
5.  `image/jpeg`：jpg图片
6.  `attachment`：附件
7.  其他`MIME`类型

