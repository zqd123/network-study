const http = require("http");
const axios = require("axios");
const chatCompletionURL = `http://172.16.1.193:8080/openai/deployments/GPT35-turbo/chat/completions?api-version=2023-08-01-preview`;
const modelName = "gpt-3.5-turbo";
const history = [];
const options = {
  path: chatCompletionURL,
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

async function sendMessage(msg, { onData, onEnd, onError }) {
  const userMsg = {
    role: "user",
    content: msg,
  };
  history.push(userMsg);
  const res = await axios.post(
    chatCompletionURL,
    {
      model: modelName,
      messages: history,
      stream: true,
    },
    { responseType: "stream" }
  );
  const stream = res.data;
  stream.on("data", (chunk) => {
    const lines = chunk
      .toString()
      .split("\n")
      .filter((line) => line.trim() !== "");
    for (const line of lines) {
      const message = line.replace(/^data: /, "");
      if (message === "[DONE]") {
        return;
      }
      try {
        const parsed = JSON.parse(message);
        const content = parsed?.choices[0]?.delta.content;
        if (content === undefined) {
          continue;
        }
        msg += content;
        onData && onData(content);
      } catch (error) {
        console.error("Could not JSON parse stream message", message, error);
        continue;
      }
    }
  });
  stream.on("end", () => {
    onEnd();
  });
}

function clear() {
  history.length = 0;
}
module.exports = { sendMessage, clear };
