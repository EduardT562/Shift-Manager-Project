const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
const editProfileForm = document.querySelector('form');
document.querySelector('#edit-name').value = loggedInUser.name;
document.querySelector('#edit-email').value = loggedInUser.email;
document.querySelector('#edit-password').value = loggedInUser.password;
const email = document.querySelector('#edit-email');
const username = document.querySelector('#edit-name');
const password = document.querySelector('#edit-password');
let user;

editProfileForm.addEventListener('submit', (e) => {
  e.preventDefault();
  localStorage.removeItem(loggedInUser.name);
  loggedInUser.email = email.value;
  loggedInUser.name = username.value;
  loggedInUser.password = password.value;
  localStorage.setItem(loggedInUser.name, JSON.stringify(loggedInUser));
  localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
});

function displayUsername() {
  const userSpan = document.getElementById('user');
  const name = user.name;
  userSpan.innerText = name;
}

const checkLoggedInUser = () => {
  const loggedInUser = localStorage.getItem('loggedInUser');
  if (loggedInUser) {
    user = JSON.parse(loggedInUser);
    displayUsername();
  } else {
    window.location = './index.html';
  }
  return user;
};

function logOutUser() {
  const loggedInUser = localStorage.getItem('loggedInUser');
  if (loggedInUser) {
    localStorage.removeItem('loggedInUser');
    window.location = './index.html';
  }
}

checkLoggedInUser();

function myShifts() {
  window.location = './homepage.html';
}
