const travelApiUrl = "http://localhost:5016";

export async function getTrips() {
  const response = await fetch(`${travelApiUrl}/trips`);
  return await response.json();
}

export async function createTrip(trip) {
  await fetch(`${travelApiUrl}/trips`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(trip),
  });
}

export async function getTrip(id) {
  const response = await fetch(`${travelApiUrl}/trips/${id}`);
  return await response.json();
}

export async function getWeatherData(city) {
  const apiKey = "18594c43ee935a5f8717e0fbcf4a7fd7";

  const weatherInfo = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`,
  );

  return await weatherInfo.json();
}
