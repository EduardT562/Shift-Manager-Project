const shiftForm = document.getElementById('form-table');
const nameShift = document.getElementById('name');
const startDate = document.getElementById('start-date');
const endDate = document.getElementById('end-date');
const wage = document.getElementById('hourly-wage');
const shiftPlace = document.getElementById('shift-place');
const addShitBtn = document.getElementById('table-addShift-btn');
let user;
// const shift = {};

function displayUsername() {
  const userSpan = document.getElementById('user');
  const name = user.name;
  userSpan.innerText = name;
}

const checkLoggedInUser = () => {
  const loggedInUser = localStorage.getItem('loggedInUser');
  if (loggedInUser) {
    // Am verificat daca user-ul este logat
    user = JSON.parse(loggedInUser); // Daca user-ul este logat, am luat obiectul si l-am stocat intr-un array global (linia 8)
    displayUsername();
    addShiftPressed(...Object.values(user.shifts));
  } else {
    // Daca user-ul nu era logat, dupa homepage dute pe index la login
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

shiftForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const shift = {};
  shift.nameShift = nameShift.value;
  shift.startDate = startDate.value;
  // new Date(startDate.value).getTime();
  shift.endDate = endDate.value;
  // new Date(endDate.value).getTime();
  shift.wage = wage.value;
  shift.shiftPlace = shiftPlace.value;
  user.shifts[nameShift.value] = shift;
  localStorage.setItem('loggedInUser', JSON.stringify(user));

  addShiftPressed(shift);
});

function addShiftPressed() {
  document.querySelector('tbody').innerHTML = '';
  const shifts = Object.values(user.shifts);
  shifts.sort((shift1, shift2) =>
    shift1.nameShift.localeCompare(shift2.nameShift)
  );
  let bestShift = null;
  let maxShiftProfit = 0;
  shifts.forEach((shift, index) => {
    const shiftRow = document.createElement('tr');
    const startDate = new Date(shift.startDate);
    const endDate = new Date(shift.endDate);
    const shiftProfit =
      ((new Date(shift.endDate) - new Date(shift.startDate)) / 1000 / 60 / 60) *
      shift.wage;
    shiftRow.innerHTML = `
      <td>${index + 1} </td>
      <td>${shift.nameShift} </td>
      <td>${startDate.toLocaleString()}</td>
      <td>${endDate.toLocaleString()} </td>
      <td>${shift.wage} </td>
      <td>${shift.shiftPlace}</td>
      <td>${shiftProfit}</td>
  `;
    if (shiftProfit > maxShiftProfit) {
      bestShift = shift;
      maxShiftProfit = shiftProfit;
    }
    document.querySelector('tbody').appendChild(shiftRow);
  });
  const startDate = new Date(bestShift.startDate);
  const endDate = new Date(bestShift.endDate);
  const bestShiftFooter = document.createElement('tr');
  bestShiftFooter.innerHTML = `
  <td>${bestShift.nameShift}<td>
  <td>${startDate.toLocaleString()}<td>
  <td>${endDate.toLocaleString()}<td>
  <td>${bestShift.wage}<td>
  <td>${bestShift.shiftPlace}<td>
  <td>${maxShiftProfit}<td>
  `;
  document.querySelector('tfoot').appendChild(bestShiftFooter);
}

function editProfile() {
  window.location = './edit-profile.html';
  document.querySelector('#edit-name').value = localStorage.getItem(
    currentUser.name
  );
}
