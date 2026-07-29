import { getTrip, getWeatherData } from "../svc/api.js";

const tripDetails = document.getElementById("trip-details");
const params = new URLSearchParams(window.location.search);
const tripId = params.get("id");
const weatherContainer = document.getElementById("weather");

async function displayTrip() {
    const trip = await getTrip(tripId);
    
    tripDetails.innerHTML = 
    `<h3>${trip.country}</h3>
    <p>Destination City: ${trip.city}</p>
    <p>Dates: ${trip.startDate} - ${trip.endDate}</p>
    <p>Budget: $${trip.budget}</p>
    <p>Status: ${trip.status}</p>`;
    
    const weather = await getWeatherData(trip.city);

    weatherContainer.innerHTML = 
        `<p>${weather.weather[0].description}
        <p>${weather.main.temp} °F`;
}



displayTrip();