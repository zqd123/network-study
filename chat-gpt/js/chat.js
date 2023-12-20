fetch('http://localhost:3000/chat', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    clear: true,
  }),
});

// 获取form
const form = document.querySelector('form');
const textArea = document.querySelector('textarea');

textArea.onkeydown = (e) => {
  if (e.key === 'Enter' && !e.shiftKey && !e.ctrlKey && !e.altKey) {
    e.preventDefault();
    form.dispatchEvent(new Event('submit'));
  }
};

form.onsubmit = async (e) => {
  e.preventDefault();
  const content = textArea.value;
  createUserContent('我');
  const robot = createRobotContent();
  const resp = await fetch('http://localhost:3000/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      content,
    }),
  });
  // 流式读取
  const reader = resp.body.getReader();
  //文本解码器
  const decoder = new TextDecoder();
  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      break;
    }
    const txt = decoder.decode(value);
    robot.append(txt);
    document.documentElement.scrollTo(0, 1000000);
  }
  robot.over();
};
