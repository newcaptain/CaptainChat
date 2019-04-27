
document.getElementById('input-text').addEventListener('keydown', function(e) {
  if(e.ctrlKey && e.keyCode === 13) {
    let str = document.getElementById('input-text').innerHTML;
    document.getElementById('input-text').innerHTML = str + '<div><br/></div>';
    // 设置光标位置
    let range = window.getSelection();
    range.selectAllChildren(document.getElementById('input-text'));
    range.collapseToEnd();
    let it = document.getElementById('input-text');
    it.scrollTop = it.scrollHeight;
    return false;
  }
  if(e.keyCode === 13) {
    sendMsg();
    e.preventDefault();
  }
});

var socket = io({transports: ['websocket']});
let btn = document.getElementById('sendBtn');
function sendMsg() {
  let text = document.getElementById('input-text').innerText;
  socket.emit('send', text);
  document.getElementById('input-text').innerText = '';
}
btn.onclick = sendMsg;
socket.on('hasMsg', function (data) {
  let node = document.createElement("div");
  node.innerHTML = `<div class="msg-user">
    ${data.user}
  </div>
  <pre class="msg-text">${data.msg}</pre>`
  node.classList.add('msg-wrap');
  document.getElementById('msgView').appendChild(node);
  let ee = document.getElementById('msgView');
  ee.scrollTop = ee.scrollHeight;
});

socket.on('user', function(data) {
  document.getElementById('userNum').innerText = data;
});

/**
 * 获取用户名
 */
let getUserInfo = function() {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', '/user/name');
  xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      let res = JSON.parse(xhr.response);
      if (res.code === 0) {
        document.getElementById('uname').innerText = res.name;
        socket.emit('addUser',res.name);
      }
    }
  }
  xhr.send();
}
getUserInfo();