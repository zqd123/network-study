const input = document.querySelector("input");
const ul = document.querySelector("#ul");
let controller;
input.addEventListener("keyup", () => {
  controller && controller.abort();// 存在就终止
  controller = new AbortController();// new一个新的终止控制器
  const value = input.value;
  console.log(value);
  // getSearchData(value);
  xhrGetSearchData(value)
  isFirst = false;
});
/**
 * fetch 请求取消
 * @param {string} key 
 */
async function getSearchData(key) {
  const res = await fetch("http://localhost:3000/abort?key=" + key, {
    signal: controller.signal,
  });
  const data = await res.json();
  console.log(data);
  ul.innerHTML = data.reduce((pre, cur) => (pre += `<li>${cur}</li>`), "");
}



let xhr
/**
 * xhr 请求取消
 * @param {string} key 
 */
function xhrGetSearchData(key) {
  xhr && xhr.abort();// 存在就终止
  xhr = new XMLHttpRequest();
  xhr.open("GET", "http://localhost:3000/abort?key=" + key);
  xhr.send();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const data = JSON.parse(xhr.responseText);
      console.log(data);
    }
  }
}