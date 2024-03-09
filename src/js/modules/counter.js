function counter() {
  let counters = document.querySelectorAll(".count");
  let interval = 6000;
  counters.forEach((counter) => {
    let startValue = 0;
    let endValue = parseInt(counter.getAttribute("data-val"));
    let duration = Math.floor(interval / endValue);
    let countUp = setInterval(function () {
      startValue += 1;
      counter.textContent = startValue;
      if (startValue == endValue) {
        clearInterval(countUp);
      }
    }, duration);
  });
}
export default counter;
