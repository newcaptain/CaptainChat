(function () {
  let login = document.getElementById('login');
  let register = document.getElementById('register');
  let box = document.getElementById('box');

  /**
   * 切换到登录界面
   */
  document.getElementById('checkToLogin')
    .addEventListener('click', function (e) {
      e.preventDefault();
      box.style.opacity = '0';
      setTimeout(function () {
        register.style.display = 'none';
        login.style.display = 'block';
        box.style.opacity = '1';
      }, 1000);
    });

  /**
   * 切换到注册界面
   */
  document.getElementById('checkToRegister')
    .addEventListener('click', function (e) {
      e.preventDefault();
      box.style.opacity = '0';
      setTimeout(function () {
        login.style.display = 'none';
        register.style.display = 'block';
        box.style.opacity = '1';
      }, 1000);
    });

  /**
   * 绑定点击登录按钮事件
   */
  document.getElementById('loginBtn')
    .addEventListener('click', function (e) {
      let user = {};
      user.user = login.elements.user.value;
      user.password = login.elements.password.value;
      // 校验
      let loginTip = document.getElementById('loginTip');
      if (user.user.length === 0 || user.password.length === 0) {
        loginTip.innerText = '用户名或密码不能为空';
        loginTip.style.display = 'block';
        return false;
      }
      let xhr = new XMLHttpRequest();
      xhr.open('POST', '/user/login', true);
      xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          let res = JSON.parse(xhr.response);
          if (res.code === 0) {
            loginTip.innerText = '登录成功';
            setTimeout(function() {
              location.href= '/';
            }, 1800);
          } else {
            loginTip.innerText = res.msg;
          }
          loginTip.style.display = 'block';
        }
      }
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.send(JSON.stringify(user));
    });

  /**
   * 绑定点击注册事件
   */
  document.getElementById('registerBtn')
    .addEventListener('click', function(e) {
      let registerTip = document.getElementById('registerTip')
      let user = {};
      user.user = register.elements.user.value;
      user.password = register.elements.password.value;
      let repassword = register.elements.repassword.value;
      if (user.user.length === 0 || user.password.length === 0 || repassword.length === 0) {
        registerTip.innerText = '表单内容不能为空';
        registerTip.style.display = 'block';
        return false;
      }
      if (user.password !== repassword) {
        registerTip.innerText = '两次输入密码不一致';
        registerTip.style.display = 'block';
        return false;
      }
      // 提交
      let xhr = new XMLHttpRequest();
      xhr.open('POST', '/user/register');
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          let res = JSON.parse(xhr.response);
          console.log(res);
          if (res.code === 0) {
            registerTip.innerText = '注册成功！快去登录吧';
            registerTip.style.display = 'block';
          } else {
            registerTip.innerText = res.msg;
            registerTip.style.display = 'block';
          }
        }
      }
      xhr.send(JSON.stringify(user));
    });

  /**
   * 输入框输入时隐藏tip
   */
  function hideLoginTip() {
    document.getElementById('loginTip').style.display = 'none';
  }
  function hideRegisterTip() {
    document.getElementById('registerTip').style.display = 'none';
  }
  login.elements['user'].addEventListener('input', hideLoginTip);
  login.elements['password'].addEventListener('input', hideLoginTip);
  register.elements['user'].addEventListener('input', hideRegisterTip);
  register.elements['password'].addEventListener('input', hideRegisterTip);
  register.elements['repassword'].addEventListener('input', hideRegisterTip);
})();
