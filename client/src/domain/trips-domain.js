export function filterTrips(trips, searchValue, statusValue) {
  return trips.filter(function (trip) {
    const matchesSearch =
      trip.country.toLowerCase().includes(searchValue) ||
      trip.city.toLowerCase().includes(searchValue);

    const matchesStatus =
      statusValue === "all" || trip.status.toLowerCase() === statusValue;

    return matchesSearch && matchesStatus;
  });
}
