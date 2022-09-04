const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
const editProfileForm = document.querySelector('form');
document.querySelector('#edit-name').value = loggedInUser.name;
document.querySelector('#edit-email').value = loggedInUser.email;
document.querySelector('#edit-password').value = loggedInUser.password;
const email = document.querySelector('#edit-email');
const username = document.querySelector('#edit-name');
const password = document.querySelector('#edit-password');

editProfileForm.addEventListener('submit', (e) => {
  e.preventDefault();
  localStorage.removeItem(loggedInUser.name);
  loggedInUser.email = email.value;
  loggedInUser.name = username.value;
  loggedInUser.password = password.value;
  localStorage.setItem(loggedInUser.name, JSON.stringify(loggedInUser));
  localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
});
