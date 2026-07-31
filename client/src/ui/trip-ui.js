import { getTrip, getWeatherData } from "../svc/api.js";

const tripDetails = document.getElementById("trip-details");
const params = new URLSearchParams(window.location.search);
const tripId = params.get("id");
const weatherContainer = document.getElementById("weather");

const scheduleForm = document.getElementById("schedule-form");
const activityInput = document.getElementById("activity");
const dayInput = document.getElementById("day");
const scheduleBody = document.getElementById("schedule-body");

let schedule = JSON.parse(localStorage.getItem(`schedule-${tripId}`)) || [];

async function displayTrip() {
  const trip = await getTrip(tripId);

  tripDetails.innerHTML = `
        <h3>${trip.country}</h3>
        <p>Destination City: ${trip.city}</p>
        <p>Dates: ${trip.startDate} - ${trip.endDate}</p>
        <p>Budget: $${trip.budget}</p>
        <p>Status: ${trip.status}</p>
    `;

  const weather = await getWeatherData(trip.city);

  weatherContainer.innerHTML = `
        <p>${weather.weather[0].description}</p>
        <p>${weather.main.temp} °F</p>
    `;
}

function displaySchedule() {
  scheduleBody.innerHTML = "";

  schedule.forEach((scheduleItem, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
            <td>${scheduleItem.day}</td>
            <td>${scheduleItem.activity}</td>
            <td>
                <button class="delete-activity" data-index="${index}">
                    Delete
                </button>
            </td>
        `;

    scheduleBody.appendChild(row);
  });

  addDeleteListeners();
}

function saveSchedule() {
  localStorage.setItem(`schedule-${tripId}`, JSON.stringify(schedule));
}

function addDeleteListeners() {
  const deleteButtons = document.querySelectorAll(".delete-activity");

  deleteButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const index = Number(button.dataset.index);

      schedule.splice(index, 1);

      saveSchedule();
      displaySchedule();
    });
  });
}

scheduleForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const scheduleItem = {
    day: dayInput.value,
    activity: activityInput.value,
  };

  schedule.push(scheduleItem);

  saveSchedule();
  displaySchedule();

  scheduleForm.reset();
});

displayTrip();
displaySchedule();
