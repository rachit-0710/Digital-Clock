document.querySelector(".stopwatch-btn").addEventListener("click", function() {
  // hide all other wrapper
  document.querySelectorAll(".outer-wrapper > div").forEach(function(div) {
    div.style.display = "none";
  });
  
  // show stopwatch wrapper
  document.querySelector(".stopwatch").style.display = "block";
  
  // update type text
  document.querySelector(".type").innerHTML = "Stopwatch";
});

document.querySelector(".back-btn").addEventListener("click", function() {
  // hide all other wrapper
  document.querySelectorAll(".outer-wrapper > div").forEach(function(div) {
    div.style.display = "none";
  });
  
  // show clock wrapper
  document.querySelector(".clock").style.display = "block";
  
  // update type text
  document.querySelector(".type").innerHTML = "Clock";
});

document.querySelector(".timer-btn").addEventListener("click", function() {
  // hide all other wrapper
  document.querySelectorAll(".outer-wrapper > div").forEach(function(div) {
    div.style.display = "none";
  });
  
  // show timer wrapper
  document.querySelector(".timer").style.display = "block";
  
  // update type text
  document.querySelector(".type").innerHTML = "Timer";
});


const addTrailingZero = (num) => {
  return num < 10 ? "0" + num : num;
};

const updateTime = () => {
  const time = new Date();
  let hours = time.getHours();
  let minutes = time.getMinutes();
  let seconds = time.getSeconds();
  let ampm = hours >= 12 ? "PM" : "AM";

  //converting 24 hours to 12
  hours = hours % 12 || 12;

  ///add trailing zeroes if less than 10
  hours = addTrailingZero(hours);
  minutes = addTrailingZero(minutes);
  seconds = addTrailingZero(seconds);

  document.getElementById("hour").innerHTML = hours;
  document.getElementById("min").innerHTML = minutes;
  document.getElementById("sec").innerHTML = seconds;
  document.getElementById("ampm").innerHTML = ampm;
};

// call the function on page load
updateTime();

// update time every second
setInterval(updateTime, 1000);

//stopwatch

let stopwatchHours = 0,
  stopwatchMinutes = 0,
  stopwatchSeconds = 0,
  stopwatchMiliSeconds = 0,
  stopwatchRunning = false,
  laps = 0,
  stopwatchInterval;

const stopwatch = () => {
  //increase milisecond by one
  stopwatchMiliSeconds++;

  if (stopwatchMiliSeconds == 100) {
    stopwatchSeconds++;
    stopwatchMiliSeconds = 0;
  }
  if (stopwatchSeconds == 60) {
    stopwatchMinutes++;
    stopwatchSeconds = 0;
  }
  if (stopwatchMinutes == 60) {
    stopwatchHours++;
    stopwatchMinutes = 0;
  }

  //show values on doc
  document.getElementById("stopwatch-hour").innerHTML = addTrailingZero(stopwatchHours);
  document.getElementById("stopwatch-min").innerHTML = addTrailingZero(stopwatchMinutes);
  document.getElementById("stopwatch-sec").innerHTML = addTrailingZero(stopwatchSeconds);
  document.getElementById("stopwatch-ms").innerHTML = addTrailingZero(stopwatchMiliSeconds);
};

//function to start stopwatch
const startStopwatch = () => {
  if (!stopwatchRunning) {
    //if stopwatch not already running
    stopwatchInterval = setInterval(stopwatch, 10);
    stopwatchRunning = true;
  }
};

//function to stop stopwatch
const stopStopwatch = () => {
  clearInterval(stopwatchInterval);
  stopwatchRunning = false;
};

//reset stopwatch function
const resetStopwatch = () => {
  //clear interval and set all values to default
  clearInterval(stopwatchInterval);
  stopwatchHours = 0;
  stopwatchMinutes = 0;
  stopwatchSeconds = 0;
  stopwatchMiliSeconds = 0;
  stopwatchRunning = false;
  laps = 0;

  //update values on document to 00
  document.getElementById("stopwatch-hour").innerHTML = "00";
  document.getElementById("stopwatch-min").innerHTML = "00";
  document.getElementById("stopwatch-sec").innerHTML = "00";
  document.getElementById("stopwatch-ms").innerHTML = "00";
  document.getElementById("laps").innerHTML = "";

  // remove lap elements from DOM
  const lapElements = document.querySelectorAll(".laps");
  lapElements.forEach(lapElement => lapElement.remove());
};

//start stopwatch on start button
document.querySelector(".start-stopwatch").addEventListener("click", function() {
  startStopwatch();
  //document.querySelector(".start-stopwatch").style.display = "none";
  document.querySelector(".lap-stopwatch").style.display = "block";
});

document.querySelector(".reset-stopwatch").addEventListener("click", function() {
  resetStopwatch();
  document.querySelector(".lap-stopwatch").style.display = "none";
  document.querySelector(".start-stopwatch").style.display = "block";
});

document.querySelector(".lap-stopwatch").addEventListener("click", function() {
  //on lap button click
  laps++;
  //remove active class
  document.querySelectorAll(".lap").forEach(lap => lap.classList.remove("active"));
  //create lap element and add to list
  const lapElement = document.createElement("div");
  lapElement.classList.add("lap", "active");
  lapElement.innerHTML = `
    <p>lap ${laps}</p>
    <p>${addTrailingZero(stopwatchHours)} : ${addTrailingZero(stopwatchMinutes)} : ${addTrailingZero(stopwatchSeconds)} : ${addTrailingZero(stopwatchMiliSeconds)}</p>
  `;
  document.querySelector(".laps").prepend(lapElement);
});


//timer

let time = 0,
  timerHours = 0,
  timerMinutes = 0,
  timerSeconds = 0,
  timerMiliseconds = 0,
  timerInterval;

const getTime = () => {
  time = prompt("Enter time in minutes");
  //convert time to seconds
  time = time*60;
  //update timer defaults
  setTime();
};

const setTime = () => {
  timerHours = Math.floor(time/3600);
  timerMinutes = Math.floor((time%3600)/60);
  timerSeconds = Math.floor((time%3600)%60);
  timerMiliseconds = 0;

  //show values on doc
  document.getElementById("timer-hour").innerHTML = addTrailingZero(timerHours);
  document.getElementById("timer-min").innerHTML = addTrailingZero(timerMinutes);
  document.getElementById("timer-sec").innerHTML = addTrailingZero(timerSeconds);
  document.getElementById("timer-ms").innerHTML = addTrailingZero(timerMiliseconds);
};

const timer = () => {
  timerMiliseconds--;
  if (timerMiliseconds == -1) {
    timerMiliseconds = 99;
    timerSeconds--;
  }
  if (timerSeconds == -1) {
    timerSeconds = 59;
    timerMinutes--;
  }
  if (timerMinutes == -1) {
    timerMinutes = 59;
    timerHours--;
  }

  //update time
  document.getElementById("timer-hour").innerHTML = addTrailingZero(timerHours);
    document.getElementById("timer-min").innerHTML = addTrailingZero(timerMinutes);
    document.getElementById("timer-sec").innerHTML = addTrailingZero(timerSeconds);
    document.getElementById("timer-ms").innerHTML = addTrailingZero(timerMiliseconds);

    //check time up on every interval
    timeUp();
};



const startTimer = () => {
  //before starting check if valid time given
  if (timerHours === 0 && timerMinutes === 0 && timerSeconds === 0 && timerMiliseconds === 0) {
    //if all values are zero get time
    getTime();
  }
  else {
    //start timer
    timerInterval = setInterval(timer, 10);
    document.querySelector(".start-timer").style.display = "none";
    document.querySelector(".stop-timer").style.display = "block";
  }
};



const stopTimer = () => {
  clearInterval(timerInterval);
  document.querySelector(".start-timer").style.display = "block";
    document.querySelector(".stop-timer").style.display = "none";
};

const resetTimer = () => {
  stopTimer();
  time=0;
  setTime();
};

//check if time remaining 0
const timeUp = () => {
  if (timerHours === 0 && timerMinutes === 0 && timerSeconds === 0 && timerMiliseconds === 0) {
    resetTimer();
    alert("Time's up");   
  }
};

document.querySelector(".start-timer").addEventListener("click", function() {
  startTimer();
});

document.querySelector(".stop-timer").addEventListener("click", function() {
  stopTimer();  
});

document.querySelector(".reset-timer").addEventListener("click", function() {
  resetTimer();  
});
