let user = null;
checkLoggedInUser();
// noShiftAdded();
const shiftForm = document.getElementById('form-table');
const nameShift = document.getElementById('name');
const startDate = document.getElementById('start-date');
const endDate = document.getElementById('end-date');
const wage = document.getElementById('hourly-wage');
const shiftPlace = document.getElementById('shift-place');
const addShitBtn = document.getElementById('table-addShift-btn');
const nameShiftToDelete = document.getElementById('remove-shift');
// const shift = {};

function displayUsername() {
  const userSpan = document.getElementById('user');
  const name = user.name;
  userSpan.innerText = name;
}

function checkLoggedInUser() {
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
}

function logOutUser() {
  const loggedInUser = localStorage.getItem('loggedInUser');
  if (loggedInUser) {
    localStorage.removeItem('loggedInUser');
    window.location = './index.html';
  }
}

shiftForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const shift = {};
  shift.nameShift = nameShift.value;
  shift.startDate = startDate.value;
  shift.endDate = endDate.value;
  shift.wage = wage.value;
  shift.shiftPlace = shiftPlace.value;
  user.shifts[nameShift.value] = shift;
  localStorage.setItem(user.name, JSON.stringify(user));
  document.querySelector('#loader').classList.remove('loader--hidden');
  document.querySelector('#loader').classList.add('loader');
  setTimeout(addShiftPressed, 2000, shift);
  // addShiftPressed(shift);
});

document
  .getElementById('table-removeShift-btn')
  .addEventListener('click', () => {
    console.log('deleteShift');
    deleteShift(nameShiftToDelete.value);
  });

function addShiftPressed() {
  document.querySelector('#loader').classList.remove('loader');
  document.querySelector('#loader').classList.add('loader--hidden');
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
    const nr = index + 1;
    shift.nr = nr;
    shiftRow.innerHTML = `
      <td>${nr} </td>
      <td>${shift.nameShift} </td>
      <td>${startDate.toLocaleString()}</td>
      <td>${endDate.toLocaleString()} </td>
      <td>${shift.wage} </td>
      <td>${shift.shiftPlace}</td>
      <td>${shiftProfit}</td>
  `;

    shiftRow.id = nr;

    if (shiftProfit > maxShiftProfit) {
      bestShift = shift;
      maxShiftProfit = shiftProfit;
    }
    document.querySelector('tbody').appendChild(shiftRow);
  });

  if (bestShift != null) {
    const startDate = new Date(bestShift.startDate);
    const endDate = new Date(bestShift.endDate);
    const bestShiftFooter = `Best shift:
    ${bestShift.nameShift}
    ${startDate.toLocaleString()}
    ${endDate.toLocaleString()}
    ${bestShift.wage}
    ${bestShift.shiftPlace}
    ${maxShiftProfit}`;
    document.getElementById('best-shift-result').innerHTML = bestShiftFooter;
  }
}

// function noShiftAdded() {
//   if ((bestShift = null)) {
//     document
//       .getElementById('best-shift-result')
//       .classList.remove('best-shift-result');
//     document
//       .getElementById('best-shift-result')
//       .classList.add('best-shift-result--hidden');
//   }
// }

function editProfile() {
  window.location = './edit-profile.html';
  document.querySelector('#edit-name').value = localStorage.getItem(
    currentUser.name
  );
}

function deleteShift(shiftName) {
  console.log('deleteShift()');
  const shifts = Object.values(user.shifts);
  let foundShiftIndex = null;
  shifts.forEach((shift, index) => {
    if (shiftName === shift.nameShift) {
      foundShiftIndex = index;
      document.getElementById(`${shift.nr}`).remove();
      // document.querySelector('tbody').remove(shiftRow);
    }
  });
  shifts.splice(foundShiftIndex, 1);
  user.shifts = shifts;
  localStorage.setItem(user.name, JSON.stringify(user));
  console.log('deleteShift()');
}
