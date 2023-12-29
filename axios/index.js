const input = document.querySelector("input");
const ul = document.querySelector("#ul");
let controller;
input.addEventListener("keyup", () => {
  controller && controller.abort();// 存在就终止
  controller = new AbortController();// new一个新的终止控制器
  const value = input.value;
  console.log(value);
  getSearchData(value);
  isFirst = false;
});
/**
 * fetch 请求取消
 * @param {string} key 
 */
async function getSearchData(key) {
  const res = await axios.get("http://localhost:3000/abort?key=" + key, {
    signal: controller.signal,
  });
  const data =  res.data;
  console.log(data);
  ul.innerHTML = data.reduce((pre, cur) => (pre += `<li>${cur}</li>`), "");
}