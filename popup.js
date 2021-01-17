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
const lastDay = [
  31,
  new Date(curYear, 2, 0).getDate(),
  31,
  30,
  31,
  30,
  31,
  31,
  30,
  31,
  30,
  31,
];
const message = document.createElement("h3");
const message2 = document.createElement("h1");
let currentSlide = 0;
let moodObj = {};

for (let i = 1; i <= numDaysInMonth; i++) {
  moodObj[i] = 0;
}

message.innerHTML = `${curMon} ${curDat}, ${curYear}`;
document.querySelector(".body__popup")?.prepend(message);

message2.innerHTML = `${curMon}`;
document.querySelector(".save")?.append(message2);

const arrDate = Array.from({ length: numDaysInMonth }, () => 0);
const buttonContainer = document.querySelector(".buttons");

const daysHTML = document?.querySelectorAll(".days");
let messageDays = "";
daysHTML.forEach(function (el, i) {
  for (let j = 1; j <= lastDay[i]; j++) {
    daysHTML[i].insertAdjacentHTML(
      "beforeend",
      `<div class="calendar btn btn--border ${
        i == curDate.getMonth() ? "" : "nohover"
      }" id="btn__${j}">${j}</div>`
    );
  }
});

const scrollRight = function (curSlide) {
  daysHTML.forEach((s, i) => {
    if (i == curSlide) {
      daysHTML[i].classList.add("hidden");
    } else if (i == curSlide + 1) {
      daysHTML[i].classList.remove("hidden");
      message2.innerHTML = `${monthNames[i]}`;
    }
  });
  currentSlide++;
};
const scrollLeft = function (curSlide) {
  daysHTML.forEach((s, i) => {
    if (i == curSlide) {
      daysHTML[i].classList.add("hidden");
    } else if (i == curSlide - 1) {
      daysHTML[i].classList.remove("hidden");
      message2.innerHTML = `${monthNames[i]}`;
    }
  });
  currentSlide--;
};

document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowRight" && currentSlide != 11) {
    scrollRight(currentSlide);
  }
});
document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowLeft" && currentSlide != 0) {
    scrollLeft(currentSlide);
  }
});
// for (let i = 1; i <= lastDay[i - 1]; i++) {
//   messageDays += `<div class="calendar btn btn--border" id="btn__${i}">${i}</div>`;
//   if (daysHTML) daysHTML.innerHTML = messageDays;
// }

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
      // console.log(result.moods);
      if (result.moods) {
        moodObj = result.moods;
        // console.log("my value was ", result.moods[curDat]);
        updateButton(result.moods, curDat);
        updateColors(result.moods);
        // console.log(document.querySelectorAll("btn--border"));
      }
    } catch {}
  });
});

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
