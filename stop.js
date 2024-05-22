let timer;
    let running = false;
    let startTime;
    let lapNumber = 1;

    function startStop() {
      if (running) {
        clearInterval(timer);
        document.getElementById("startStop").innerText = "Start";
      } else {
        startTime = Date.now() - (lapNumber > 1 ? parseFloat(document.getElementById("display").innerText.replace(':', '')) * 1000 : 0);
        timer = setInterval(updateDisplay, 10);
        document.getElementById("startStop").innerText = "Pause";
      }
      running = !running;
    }

    function reset() {
      clearInterval(timer);
      running = false;
      document.getElementById("display").innerText = "00:00:00.000";
      document.getElementById("startStop").innerText = "Start";
      document.getElementById("lapList").innerHTML = "";
      lapNumber = 1;
    }

    function lap() {
      if (running) {
        let lapTime = parseFloat(document.getElementById("display").innerText.replace(':', ''));
        let lapTimeFormatted = formatTime(lapTime);
        let lapItem = document.createElement("li");
        lapItem.innerText = "Lap " + lapNumber + ": " + lapTimeFormatted;
        document.getElementById("lapList").appendChild(lapItem);
        lapNumber++;
      }
    }

    function updateDisplay() {
      let currentTime = Date.now();
      let elapsedTime = new Date(currentTime - startTime);
      let hours = elapsedTime.getUTCHours().toString().padStart(2, "0");
      let minutes = elapsedTime.getUTCMinutes().toString().padStart(2, "0");
      let seconds = elapsedTime.getUTCSeconds().toString().padStart(2, "0");
      let milliseconds = elapsedTime.getUTCMilliseconds().toString().padStart(3, "0");
      document.getElementById("display").innerText = hours + ":" + minutes + ":" + seconds + "." + milliseconds;
    }

    function formatTime(time) {
      let hours = Math.floor(time / 3600);
      let minutes = Math.floor((time % 3600) / 60);
      let seconds = Math.floor(time % 60);
      let milliseconds = Math.floor((time % 1) * 1000);
      return hours.toString().padStart(2, "0") + ":" + minutes.toString().padStart(2, "0") + ":" + seconds.toString().padStart(2, "0") + "." + milliseconds.toString().padStart(3, "0");
    }

    document.getElementById("startStop").addEventListener("click", startStop);
    document.getElementById("lapReset").addEventListener("click", reset);
    document.getElementById("lapButton").addEventListener("click", lap);