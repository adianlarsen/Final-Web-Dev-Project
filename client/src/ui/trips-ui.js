import { getTrips } from "../svc/api.js";
import { filterTrips } from "../domain/trips-domain.js";

const tripList = document.getElementById("trip-list");
const noTrips = document.getElementById("no-trips");
const filterForm = document.getElementById("filter-form");
const tripSearch = document.getElementById("trip-search");
const statusFilter = document.getElementById("status-filter");

let trips = [];
let draggedCard = null;

async function displayTrips(filteredTrips) {
  if (trips.length === 0) {
    trips = await getTrips();
  }

  const tripDisplay = filteredTrips || trips;

  tripList.innerHTML = "";

  if (tripDisplay.length === 0) {
    noTrips.hidden = false;
    return;
  } else {
    noTrips.hidden = true;
  }

  const tripCards = tripDisplay.map(function (trip) {
    const tripCard = document.createElement("div");
    tripCard.classList.add("trip-card");
    tripCard.draggable = true;

    tripCard.addEventListener("dragstart", function () {
      draggedCard = tripCard;
    });

    tripCard.addEventListener("dragend", function () {
      draggedCard = null;
    });

    tripCard.innerHTML = `<h3>${trip.country}</h3>
            <p>Destination: ${trip.city}</p>
            <p>Dates: ${trip.startDate} - ${trip.endDate}</p>
            <p>Budget: $${trip.budget}</p>
            <p>Status: ${trip.status}</p>
            <a href="trip.html?id=${trip.id}">View Trip</a>`;

    return tripCard;
  });

  tripCards.forEach(function (tripCard) {
    tripList.appendChild(tripCard);
  });
}

tripList.addEventListener("dragover", function (event) {
  event.preventDefault();
});

tripList.addEventListener("drop", function (event) {
  event.preventDefault();

  const dropCard = event.target.closest(".trip-card");

  if (dropCard && draggedCard !== dropCard) {
    tripList.insertBefore(draggedCard, dropCard);
  }
});

filterForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const searchValue = tripSearch.value.toLowerCase();
  const statusValue = statusFilter.value;

  const filteredTrips = filterTrips(trips, searchValue, statusValue);

  displayTrips(filteredTrips);
});

filterForm.addEventListener("reset", function () {
  displayTrips(trips);
});

displayTrips();
