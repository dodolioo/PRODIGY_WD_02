let timer;
    let running = false;
    let startTime;
    let lapNumber = 1;

    function startStop() {
      if (running) {
        clearInterval(timer);
        running = false;
        document.getElementById("startStop").innerText = "Start";
      } else {
        startTime = Date.now() - (lapNumber > 1 ? parseFloat(document.getElementById("display").innerText.replace(':', '')) * 1000 : 0);
        timer = setInterval(updateDisplay, 10);
        running = true;
        document.getElementById("startStop").innerText = "Pause";
      }
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
        let currentTime = Date.now();
        let elapsedTime = currentTime - startTime;
        let lapTime = elapsedTime / 1000;
        let lapTimeFormatted = formatTime(lapTime);
        let lapItem = document.createElement("li");
        lapItem.innerText = "Lap " + lapNumber + ": " + lapTimeFormatted;
        document.getElementById("lapList").appendChild(lapItem);
        lapNumber++;
      }
    }

    function updateDisplay() {
      let currentTime = Date.now();
      let elapsedTime = (currentTime - startTime) / 1000;
      let hours = Math.floor(elapsedTime / 3600);
      let minutes = Math.floor((elapsedTime % 3600) / 60);
      let seconds = Math.floor(elapsedTime % 60);
      let milliseconds = Math.floor(((elapsedTime % 1) * 1000) % 1000);
      document.getElementById("display").innerText = formatTime(elapsedTime);
    }

    function formatTime(time) {
      let hours = Math.floor(time / 3600).toString().padStart(2, "0");
      let minutes = Math.floor((time % 3600) / 60).toString().padStart(2, "0");
      let seconds = Math.floor(time % 60).toString().padStart(2, "0");
      let milliseconds = Math.floor(((time % 1) * 1000) % 1000).toString().padStart(3, "0");
      return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
    }

    document.getElementById("startStop").addEventListener("click", startStop);
    document.getElementById("lapReset").addEventListener("click", reset);
    document.getElementById("lapButton").addEventListener("click", lap);