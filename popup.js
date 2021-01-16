
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const head = document.querySelector(".head");
const click_me = document.querySelector(".click__me");

let curDate = new Date();
let curYear = curDate.getFullYear();
let curMon = monthNames[curDate.getMonth()];
let curDat = curDate.getDate();
let curMin = curDate.getMinutes();
let curSec = curDate.getSeconds();
const message = document.createElement("div");

message.innerHTML = `Date: ${curMon} ${curDat}`;
document.querySelector(".body__popup")?.append(message);

let lastDayInMonth = new Date(curYear, curDate.getMonth(), 0);
const numDaysInMonth = lastDayInMonth.getDate();
const arrDate = Array.from({ length: numDaysInMonth }, () => 0);
const buttonContainer = document.querySelector(".buttons");

const createButtons = function () {
  arrDate.forEach(function (_, i) {
    buttonContainer.insertAdjacentHTML(
      "beforeend",
      `<button class="buttons__button">${i + 1}</button>`
    );
  });
};

createButtons();
const buttonAdding = ``;

