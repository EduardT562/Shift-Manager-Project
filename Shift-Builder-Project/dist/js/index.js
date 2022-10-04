// CSS //
let loginBtn = document.getElementById('login');
let registerBtn = document.querySelector('.register-slide');
let switchBtn = document.getElementById('btn');
let enlargeRegister = document.getElementById('login-register-container');

function resultReset() {
  result.innerHTML = 'Welcome';
  result.style.color = 'white';
}

function ValidateEmail(input) {
  const validRegex = '[a-z0-9]+@[a-z]+.[a-z]{2,3}';
  const validation = input.parentElement; //input-group
  const msg = validation.querySelector('.msg');
  if (input.value.match(validRegex)) {
    validation.className = 'input-group succes';
    validation.focus();
    msg.innerText = 'Valid email address!';
    return true;
  } else {
    validation.className = 'input-group error';
    validation.focus();
    msg.innerText = 'Invalid email address!';
    return false;
  }
}

function onLoginClick() {
  const greeting = document.querySelector('#greeting');
  greeting.innerHTML = 'Welcome' + `${userData}`;
}

function setErrorFor(input, message) {
  const validation = input.parentElement; //input-group
  const msg = validation.querySelector('.msg');

  msg.innerText = message;
  validation.className = 'input-group error';
}

function setSuccesFor(input) {
  const formControl = input.parentElement;
  formControl.className = 'input-group succes';
}

function register() {
  resultReset();
  loginBtn.style.left = '-30em';
  registerBtn.style.left = '5em';
  switchBtn.style.left = '4.5em';
  enlargeRegister.style.transition = '0.5s';
  enlargeRegister.style.height = '50rem';
}

function login() {
  resultReset();
  loginBtn.style.left = '5em';
  registerBtn.style.left = '30em';
  switchBtn.style.left = '0';
  enlargeRegister.style.transition = '0.5s';
  enlargeRegister.style.height = '480px';
}

/////////// Local-Storage //////////

const email = document.querySelector('#register-email');
const username = document.querySelector('#register-name');
const password = document.querySelector('#register-password');
const firstName = document.querySelector('#register-firstName');
const lastName = document.querySelector('#register-lastName');
const age = document.querySelector('#register-age');
const registerForm = document.querySelector('#register');

const usernameLogin = document.querySelector('#login-username');
const passwordLogin = document.querySelector('#login-password');
const loginForm = document.querySelector('#login');
const result = document.getElementById('result');

const userData = {};

registerForm.addEventListener('submit', (e) => {
  e.preventDefault();
  userData.email = email.value;
  userData.name = username.value;
  userData.password = password.value;
  userData.firstName = firstName.value;
  userData.lastName = lastName.value;
  userData.age = age.value;
  userData.shifts = {};
  console.log(userData);
  ValidateEmail(email);

  if (username.value.length >= 6) {
    setSuccesFor(username);
    saveToLocalStorage(userData);
  } else {
    setErrorFor(username, 'Username too short');
  }

  if (password.value.length >= 6) {
    setSuccesFor(password);
    saveToLocalStorage(userData);
  } else {
    setErrorFor(password, 'Password too short');
  }
  let letters = /^[A-Za-z]+$/;

  if (firstName.value.match(letters)) {
    setSuccesFor(firstName);
    saveToLocalStorage(userData);
  } else {
    setErrorFor(firstName, 'You must insert a first name');
  }

  if (lastName.value.match(letters)) {
    setSuccesFor(lastName);
    saveToLocalStorage(userData);
  } else {
    setErrorFor(lastName, 'You must insert a last name');
  }

  if (age.value >= 18) {
    setSuccesFor(age);
    saveToLocalStorage(userData);
  } else if (age.value < 18) {
    setErrorFor(age, 'Too young');
  }
});

const saveToLocalStorage = (object) => {
  localStorage.setItem(username.value, JSON.stringify(object));
};

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const user = {
    username: usernameLogin.value,
    password: passwordLogin.value,
  };
  console.log(user);
  loginUser(user);
});

const loginUser = (object) => {
  const userData = JSON.parse(localStorage.getItem(object.username));

  if (userData == null) {
    result.innerHTML = 'User not found!';
    result.style.color = 'red';
    return;
  } else if (userData.password === object.password) {
    localStorage.setItem('loggedInUser', JSON.stringify(userData));
    window.location.href = './homepage.html';
    onLoginClick(usernameLogin.value);
    result.innerHTML = 'Logged in';
    result.style.color = 'green';
    return;
  } else {
    result.innerHTML = 'Wrong password!';
    result.style.color = 'red';
    return;
  }
};
