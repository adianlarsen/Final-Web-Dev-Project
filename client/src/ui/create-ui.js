import { createTrip } from "../svc/api.js";

const tripForm = document.getElementById("trip-form");

tripForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const trip = {
        country: document.getElementById("trip-name").value,
        city: document.getElementById("destination").value,
        startDate: document.getElementById("start-date").value,
        endDate: document.getElementById("end-date").value,
        budget: Number(document.getElementById("budget").value),
        status: document.getElementById("status").value
    };

    await createTrip(trip);

    tripForm.reset();
});