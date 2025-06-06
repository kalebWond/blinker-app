const minRange = document.getElementById("min-range");
const maxRange = document.getElementById("max-range");
const sliderRange = document.getElementById("slider-range");
const sliderTrack = document.getElementById("slider-track");
const minValueLabel = document.getElementById("min-value");
const maxValueLabel = document.getElementById("max-value");

const updateSlider = () => {
  const min = parseInt(minRange.value);
  const max = parseInt(maxRange.value);

  if (min > max - 2000) {
    minRange.value = max - 2000;
  }
  if (max < min + 2000) {
    maxRange.value = min + 2000;
  }

  const minPercent = (minRange.value / 100000) * 100;
  const maxPercent = (maxRange.value / 100000) * 100;

  sliderRange.style.left = minPercent + "%";
  sliderRange.style.width = maxPercent - minPercent + "%";

  minValueLabel.textContent = "$" + parseInt(minRange.value).toLocaleString();
  maxValueLabel.textContent = "$" + parseInt(maxRange.value).toLocaleString();

  filterResults(minRange.value, maxRange.value);
};

minRange.addEventListener("input", updateSlider);
maxRange.addEventListener("input", updateSlider);
sliderRange.addEventListener("click", onRangeClicked);
sliderTrack.addEventListener("click", onTrackClicked);

updateSlider();

function onRangeClicked(e) {
    const positionPercent = Math.round((e.offsetX / e.target.clientWidth) * 100);
    const value = Math.round((positionPercent / 100) * (maxRange.value - minRange.value)) + parseInt(minRange.value);
    if (positionPercent < 50) {
        minRange.value = value;
    } else {
        maxRange.value = value;
    }
    updateSlider();
}

function onTrackClicked(e) {
  const positionPercent = Math.round((e.offsetX / e.target.clientWidth) * 100);
  const value = (100000 * positionPercent) / 100;
  if (positionPercent < 50) {
    minRange.value = value;
  } else {
    maxRange.value = value;
  }
  updateSlider();
}
