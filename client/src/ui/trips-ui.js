import { getTrips } from "../svc/api.js";

const tripList = document.getElementById("trip-list");
const noTrips = document.getElementById("no-trips");

async function displayTrips() {
    const trips = await getTrips();

    if (trips.length === 0) {
        noTrips.hidden = false;
        return;
    }
    else {
        noTrips.hidden = true;
    }

    trips.forEach(function (trip) {
        const tripCard = document.createElement("div");
        tripCard.classList.add("trip-card");

        tripCard.innerHTML = 
            `<h3>${trip.country}</h3>
            <p>Destination: ${trip.city}</p>
            <p>Dates: ${trip.startDate} - ${trip.endDate}</p>
            <p>Budget: $${trip.budget}</p>
            <p>Status: ${trip.status}</p>
            <a href="trip.html?id=${trip.id}">View Trip</a>`;

        tripList.appendChild(tripCard);
    });

}

displayTrips();