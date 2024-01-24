const hour = document.querySelector(".hour");
const min = document.querySelector(".mins"); 
const sec = document.querySelector(".sec");
const msec = document.querySelector(".msec");
const start = document.getElementById("start-btn");
const pause = document.getElementById("pause-btn");
const lap = document.getElementById("lap-btn"); 
const reset = document.getElementById("reset-btn");
const timeRef = document.querySelector(".time"); 
const container2 = document.querySelector(".container2");

// const lapdiv = document.querySelector(".laps");
let int = null;
let lapTimes = [];
let startTime = null;

start.addEventListener("click", () => {
  if (int !== null) {
    clearInterval(int);
  }
  int = setInterval(showClock, 10);
  startTime = Date.now(); // Record the start time of the stopwatch
});

pause.addEventListener("click", () => {
  clearInterval(int);
  startTime = null; // Reset the start time when paused
});

reset.addEventListener("click", () => {
  clearInterval(int);
  msec.textContent = "00"; 
  hour.textContent = "00";
  min.textContent = "00";
  sec.textContent = "00";
  getPadding();
  lapTimes = [];
  startTime = null; // Reset the start time when reset
  updateLapTimes();
});

function getPadding() {
  let h = hour.textContent.toString().padStart(2, "0");
  let m = min.textContent.toString().padStart(2, "0");
  let s = sec.textContent.toString().padStart(2, "0");
  let ms = msec.textContent.toString().padStart(3, "0");
//   ms = ms.slice(1);
  timeRef.textContent = `${h} : ${m} : ${s} : ${ms}`;
}

lap.addEventListener("click", () => {
  showLapTime();
});

function showClock() {
  msec.textContent = (parseInt(msec.textContent) + 10) % 1000; 

  if (parseInt(msec.textContent) === 0) {
    sec.textContent = (parseInt(sec.textContent) + 1) % 60;
    if (parseInt(sec.textContent) === 0) {
      min.textContent = (parseInt(min.textContent) + 1) % 60;
      if (parseInt(min.textContent) === 0) {
        hour.textContent = (parseInt(hour.textContent) + 1) % 60;
      }
    }
  }

  getPadding();
//   min.textContent = min.textContent.padStart(2, "0");
//   hour.textContent = min.textContent.padStart(2, "0");
//   sec.textContent = min.textContent.padStart(2, "0");
//   msec.textContent = min.textContent.padStart(2, "0");
}

function showLapTime() {
  if (startTime !== null) {
    const lapTime = getFormattedTime();
    lapTimes.push(lapTime);
    updateLapTimes();
  }
}

function updateLapTimes() {
  const lapTimesList = document.querySelector(".laps"); 
  lapTimesList.innerHTML = "";

 

  lapTimes.forEach((lap, index) => {
    const li = document.createElement("li");
    li.innerHTML = `<span>#${index + 1} &nbsp;</span><span>${lap}</span>`;
    lapTimesList.appendChild(li);
  });
  container2.appendChild(lapTimesList);
  container2.scrollTop = container2.scrollHeight;
}

function getFormattedTime() {
  const formattedHours = hour.textContent.padStart(2, "0"); // Adjusted to use textContent
  const formattedMinutes = min.textContent.padStart(2, "0");
  const formattedSeconds = sec.textContent.padStart(2, "0");
  const formattedMilliseconds = msec.textContent.padStart(3, "0");
  return `${formattedHours} : ${formattedMinutes} : ${formattedSeconds} : ${formattedMilliseconds}`;
}


window.onload = () => {
    container2.style.height = '0rem';
    container2.style.transition = '1s';
}

lap.onclick = () => {
    container2.style.height = '20rem';
}

reset.onclick = () => {
    container2.style.height = "0rem";

}