let display = document.querySelector(".displayTime");
let selectMenu = document.querySelectorAll("select");
let setAlarmBtn = document.querySelector(".set-alarm");
let clearAlarmBtn = document.querySelector(".clear-alarm");
let alarmTimeHour, alarmTimeMinute, alarmTimeAMPM;
let ringtone = new Audio("./ringtone.mp3");

for (let i = 1; i <= 12; i++) {
  i = i < 10 ? "0" + i : i;
  let option = document.createElement("option");
  option.value = i;
  option.text = i;
  selectMenu[0].appendChild(option);
}

for (let i = 0; i <= 59; i++) {
  i = i < 10 ? "0" + i : i;
  let option = document.createElement("option");
  option.value = i;
  option.text = i;
  selectMenu[1].appendChild(option);
}

for (let i = 2; i > 0; i--) {
  let ampm = i == 1 ? "AM" : "PM";
  let option = document.createElement("option");
  option.value = ampm;
  option.text = ampm;
  selectMenu[2].appendChild(option);
}

setInterval(() => {
  let date = new Date();
  let h = date.getHours();
  let m = date.getMinutes();
  let s = date.getSeconds();
  let ampm = "AM";

  if (h >= 12) {
    h = h % 12;
    ampm = "PM";
  }
  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;
  s = s < 10 ? "0" + s : s;

  display.innerHTML = `${h}:${m}:${s} ${ampm}`;
  if (
    alarmTimeHour == h &&
    alarmTimeMinute == m &&
    alarmTimeAMPM == ampm &&
    s == "00"
  ) {
    ringtone.play();
    ringtone.loop = true;
  }
}, 1000);

setAlarmBtn.addEventListener("click", setAlarm);

function setAlarm() {
  alarmTimeHour = selectMenu[0].value;
  alarmTimeMinute = selectMenu[1].value;
  alarmTimeAMPM = selectMenu[2].value;
  let alarmTime = `${alarmTimeHour}:${alarmTimeMinute} ${alarmTimeAMPM}`;
  selectMenu[0].disabled = true;
  selectMenu[1].disabled = true;
  selectMenu[2].disabled = true;
  setAlarmBtn.classList.add("disable");
  clearAlarmBtn.classList.remove("disable");
  console.log(alarmTime);
}

clearAlarmBtn.addEventListener("click", clearAlarm);

function clearAlarm() {
  ringtone.pause();
  selectMenu[0].disabled = false;
  selectMenu[1].disabled = false;
  selectMenu[2].disabled = false;
  clearAlarmBtn.classList.add("disable");
  setAlarmBtn.classList.remove("disable");
}
