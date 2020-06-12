import fs from "fs";
!function () {
  var duration = 20;
  let content = document.querySelector("#code");
  let style = document.querySelector("#style");
  let n = 0;
  var speed;
  function run() {
    n += 1;
    content.innerHTML = code.substring(0, n);
    style.innerHTML = code.substring(0, n);
    content.scrollTop = content.scrollHeight;
    if (n >= code.length) {
      n = 0;
    }
  }
  function doStart() {
    speed = setInterval(run, duration);
  }
  function doStop() {
    clearInterval(speed);
  }
  doStart();
  let code = fs.readFileSync("default.css", "utf-8");

  let buttons = Array.from(document.querySelectorAll("button"));
  buttons.map((button) => {
    button.addEventListener("click", function (e) {
      console.log(e.target.className);
      let speed = e.target.className;
      switch (speed) {
        case "fast":
          duration = 1;
          doStop();
          doStart();
          break;
        case "normal":
          duration = 20;
          doStop();
          doStart();
          break;
        case "slow":
          duration = 100;
          doStop();
          doStart();
          break;
        case "pause":
          doStop();
          break;
      }
    });
  });
}.call();
