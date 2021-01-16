document.querySelector(".happy").addEventListener("click", function () {
   // alert("congrats u r happy");
  });

  document.querySelector(".neutral").addEventListener("click", function () {
    //alert("congrats u r neutral");
  });

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
document.querySelector(".date");
let curDate = new Date();
let curMon = monthNames[curDate.getMonth()];
let curDat = curDate.getDate();
let curMin = curDate.getMinutes();
let curSec = curDate.getSeconds();
const message = document.createElement("div");

message.innerHTML = `Date: ${curMon} ${curDat}`;
document.querySelector(".body__popup").append(message);
