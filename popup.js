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
const back = document.querySelector(".back__button");
const reset = document.querySelector(".reset");

let curDate = new Date();
let curYear = curDate.getFullYear();
let curMon = monthNames[curDate.getMonth()];
let lastDayInMonth = new Date(curYear, curDate.getMonth(), 0);
const numDaysInMonth = lastDayInMonth.getDate();
let curDat = curDate.getDate();
let curMin = curDate.getMinutes();
let curSec = curDate.getSeconds();
const message = document.createElement("h3");
const message2 = document.createElement("h1");
let moodObj = {};

for (let i = 1; i <= numDaysInMonth; i++) {
  moodObj[i] = 0;
  console.log("hi");
}

message.innerHTML = `${curMon} ${curDat}, ${curYear}`;
document.querySelector(".body__popup")?.prepend(message);

message2.innerHTML = `${curMon}`;
document.querySelector(".save")?.append(message2);

const arrDate = Array.from({ length: numDaysInMonth }, () => 0);
const buttonContainer = document.querySelector(".buttons");

const daysHTML = document?.querySelector(".days");
let messageDays = "";
for (let i = 1; i <= numDaysInMonth; i++) {
  messageDays += `<div class="calendar btn btn--border" id="btn__${i}">${i}</div>`;
  if (daysHTML) daysHTML.innerHTML = messageDays;
}

const updateButton = function (moods, day) {
  const divLocation = document.querySelector(`#btn__${day}`);
  if (divLocation) divLocation.classList.add(`color_${moods[day]}`);
};

// updateButton();

happy?.addEventListener("click", function () {
  moodObj[curDat] = 3;
  chrome.storage.sync.set({ moods: moodObj }, function (value) {});
});
neutral?.addEventListener("click", function () {
  moodObj[curDat] = 2;
  chrome.storage.sync.set({ moods: moodObj }, function (value) {
    // checkUpdateColor();
  });
});
sad?.addEventListener("click", function () {
  moodObj[curDat] = 1;
  chrome.storage.sync.set({ moods: moodObj }, function (value) {
    // checkUpdateColor();
  });
});

back?.addEventListener("click", function () {
  chrome.storage.sync.get(["moods"], function (result) {
    moodObj = result.moods;
    chrome.storage.sync.set({ moods: moodObj });
  });
});

reset?.addEventListener("click", function () {
  chrome.storage.sync.remove("moods");
  window.close();
});

const updateColors = function (moods) {
  const values = Object.values(moods);
  const keys = Object.keys(moods);
  values.forEach((val, index) => {
    document.getElementById(`btn__${index + 1}`)?.classList.add(`color_${val}`);
  });
};

window.addEventListener("DOMContentLoaded", function () {
  chrome.storage.sync.get(["moods"], function (result) {
    try {
      console.log(result.moods);
      if (result.moods) {
        moodObj = result.moods;
        console.log("my value was ", result.moods[curDat]);
        updateButton(result.moods, curDat);
        updateColors(result.moods);
        console.log(document.querySelectorAll("btn--border"));
      }
    } catch {}
  });
});

/*
const btn_1 = document.getElementById("btn__1");
const btn_2 = document.getElementById("btn__2");
const btn_3 = document.getElementById("btn__3");
const btn_4 = document.getElementById("btn__4");
const btn_5 = document.getElementById("btn__5");
const btn_6 = document.getElementById("btn__6");
const btn_7 = document.getElementById("btn__7");
const btn_8 = document.getElementById("btn__8");
const btn_9 = document.getElementById("btn__9");
const btn_10 = document.getElementById("btn__10");
const btn_11 = document.getElementById("btn__11");
const btn_12 = document.getElementById("btn__12");
const btn_13 = document.getElementById("btn__13");
const btn_14 = document.getElementById("btn__14");
const btn_15 = document.getElementById("btn__15");
const btn_16 = document.getElementById("btn__16");
const btn_17 = document.getElementById("btn__17");
const btn_18 = document.getElementById("btn__18");
const btn_19 = document.getElementById("btn__19");
const btn_20 = document.getElementById("btn__20");
const btn_21 = document.getElementById("btn__21");
const btn_22 = document.getElementById("btn__22");
const btn_23 = document.getElementById("btn__23");
const btn_24 = document.getElementById("btn__24");
const btn_25 = document.getElementById("btn__25");
const btn_26 = document.getElementById("btn__26");
const btn_27 = document.getElementById("btn__27");
const btn_28 = document.getElementById("btn__28");
const btn_29 = document.getElementById("btn__29");
const btn_30 = document.getElementById("btn__30");
const btn_31 = document.getElementById("btn__31");
*/
for (let i = 1; i <= numDaysInMonth; i++) {
  document.getElementById(`btn__${i}`)?.addEventListener("click", function () {
    chrome.storage.sync.get(["moods"], function (result) {
      let val = result.moods[i] + 1;
      if (val >= 4) {
        val = 1;
        result.moods[i] = 0;
      }
      result.moods[i]++;
      document
        .getElementById(`btn__${i}`)
        .classList?.remove(`color_${val - 1}`);
      document.getElementById(`btn__${i}`).classList.add(`color_${val}`);
      moodObj = result.moods;
      chrome.storage.sync.set({ moods: moodObj });
    });
  });
}
