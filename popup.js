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
const happy = document.getElementById("happybutton");
const neutral = document.getElementById("neutralbutton");
const sad = document.getElementById("sadbutton");

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

const daysHTML = document?.querySelector(".days");
let messageDays = "";
for (let i = 1; i <= numDaysInMonth; i++) {
  messageDays += `<div class="btn__${i}">${i}</div>`;
  if (daysHTML) daysHTML.innerHTML = messageDays;
}
const buttonAdding = ``;

const updateButton = function () {
  const divLocation = document.querySelector(`.btn__${curDat}`);
  if (divLocation) divLocation.classList.add("blue");
  console.log("test");
};

happy?.addEventListener("click", function () {
  console.log("helo");
});
neutral?.addEventListener("click", function () {
  console.log("helo");
});
sad?.addEventListener("click", function () {
  console.log("helo");
});
