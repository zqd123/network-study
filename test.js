// fetch(
//   "http://172.16.1.193:8080/openai/deployments/GPT35-turbo/chat/completions?api-version=2023-05-15",
//   {
//     method: "POST",
//     headers: {
//       "Content-type": "appliction/json",
//     },
//     body: JSON.stringify({
//       messages: [
//         {
//           role: "system",
//           content:
//             "你是ChatGPT，一个由OpenAI训练的大型语言模型。可以理解和生成自然语言或代码。",
//         },
//         { role: "user", content: "讲个故事" },
//       ],
//       model: "gpt-3.5-turbo",
//       max_tokens: 2048,
//       temperature: 1,
//       stream: true,
//     }),
//   }
// ).then(res=>{
//     console.log('res:',res);

// });

fetch(
  "http://172.16.1.193:8080/openai/deployments/GPT35-turbo/chat/completions?api-version=2023-05-15",
  {
    headers: {
      accept: "*/*",
      "accept-language":
        "zh-CN,zh-TW;q=0.9,zh;q=0.8,en;q=0.7,en-GB;q=0.6,en-US;q=0.5",
      "api-key": "",
      "cache-control": "no-cache",
      "content-type": "application/json",
      pragma: "no-cache",
      Origin: "http://172.16.1.193:8080",
    },
    referrer: "http://172.16.1.193:8080/conversation",
    referrerPolicy: "strict-origin-when-cross-origin",
    body: '{"messages":[{"role":"system","content":"你是ChatGPT，一个由OpenAI训练的大型语言模型。可以理解和生成自然语言或代码。"},{"role":"user","content":"你好"}],"model":"gpt-3.5-turbo","max_tokens":2048,"temperature":1,"stream":true}',
    method: "POST",
  }
).then(async (res) => {
  const reader = res.body.getReader();
  const textDecode = new TextDecoder()
  while (1) {
    const { done, value } = await reader.read();
    if (done) {
      return;
    }
    const str = textDecode.decode(value)
    console.log("res:", str);
  }
});
