fetch(
  "http://172.16.1.193:8080/openai/deployments/GPT35-turbo/chat/completions?api-version=2023-05-15",
  {
    method: "POST",
    headers: {
      "Content-type": "appliction/json",
    },
    body: JSON.stringify({
      messages: [
        {
          role: "system",
          content:
            "你是ChatGPT，一个由OpenAI训练的大型语言模型。可以理解和生成自然语言或代码。",
        },
        { role: "user", content: "讲个故事" },
      ],
      model: "gpt-3.5-turbo",
      max_tokens: 2048,
      temperature: 1,
      stream: true,
    }),
  }
).then(res=>{
    console.log('res:',res);
    
});
