const hoursContainer = document.querySelector(".hours");
const minutesContainer = document.querySelector(".minutes");
const secondsContainer = document.querySelector(".seconds");

const insertTimeIntoDOM = (hours, minutes, seconds) => {
  hoursContainer.textContent = hours;
  minutesContainer.textContent = minutes;
  secondsContainer.textContent = seconds;
};

const formatNumber = (number) => {
  return number < 10 ? `0${number}` : `${number}`;
};

const getDate = () => {
  setInterval(() => {
    const date = new Date();

    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    insertTimeIntoDOM(formatNumber(hours), formatNumber(minutes), formatNumber(seconds));
  }, 1000);
};

getDate();
