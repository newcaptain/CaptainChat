(function () {
  let login = document.getElementById('login');
  let register = document.getElementById('register');
  let box = document.getElementById('box');

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

  document.getElementById('loginBtn')
    .addEventListener('click', function (e) {
      // console.log(document.getElementById('login').elements);
      let user = {};
      for (let i = 0; i < 2; i++) {
        // console.log(login.elements[i].name + ': ' + login.elements[i].value);
        user[login.elements[i].name] = login.elements[i].value;
        // user += login.elements[i].name + ': ' + login.elements[i].value
      }
      let xhr = new XMLHttpRequest();
      xhr.open('POST', '/user/login', true);
      xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          console.log(xhr);
        }
      }
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.send(JSON.stringify(user));
    });
})();
