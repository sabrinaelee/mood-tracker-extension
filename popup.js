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
const message = document.createElement("h3");
const message2 = document.createElement("h1");

message.innerHTML = `${curMon} ${curDat}, ${curYear}`;
document.querySelector(".body__popup")?.prepend(message);

message2.innerHTML = `${curMon}`;
document.querySelector(".save")?.append(message2);

let lastDayInMonth = new Date(curYear, curDate.getMonth(), 0);
const numDaysInMonth = lastDayInMonth.getDate();
const arrDate = Array.from({ length: numDaysInMonth }, () => 0);
const buttonContainer = document.querySelector(".buttons");

const daysHTML = document?.querySelector(".days");
let messageDays = "";
for (let i = 1; i <= numDaysInMonth; i++) {
  messageDays += `<div class="calendar" id="btn__${i}">${i}</div>`;
  if (daysHTML) daysHTML.innerHTML = messageDays;
}
const buttonAdding = ``;

const updateButton = function (color) {
  const divLocation = document.querySelector(`#btn__${curDat}`);
  console.log(`${curDat}`)
  if (divLocation) divLocation.classList.add(`${color}`);
  console.log("test");
};

// updateButton();

happy?.addEventListener("click", function () {
  console.log("helo");
  let color = "orange";
  updateButton(color)
});
neutral?.addEventListener("click", function () {
  console.log("helo");
});
sad?.addEventListener("click", function () {
  console.log("helo");
});
