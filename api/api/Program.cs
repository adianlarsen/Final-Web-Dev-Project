using System.Text.Json;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors();

var app = builder.Build();

app.UseCors(options =>
{
    options.AllowAnyOrigin();
    options.AllowAnyHeader();
    options.AllowAnyMethod();
});

string fileName = "trips.json";
List<Trip> trips = new();

if (File.Exists(fileName))
{
    var json = File.ReadAllText(fileName);

    trips.AddRange(JsonSerializer.Deserialize<List<Trip>>(json) ?? new List<Trip>());
}

app.MapGet("/", () => "Travel Tracker API");
app.MapGet("/trips", () => trips);
app.MapGet("/trips/{id}", (long id) =>
{
    return trips.FirstOrDefault(t => t.Id == id);
});

app.MapPost("/trips", (Trip trip) =>
{
    long nextId = 1;

    if (trips.Count > 0)
    {
        nextId = trips.Max(t => t.Id) + 1;
    }

    Trip newTrip = trip with { Id = nextId };

    trips.Add(newTrip);

    var json = JsonSerializer.Serialize(trips);
    File.WriteAllText(fileName, json);
});

app.Run();

public record Trip
(
    long Id,
    string Country,
    string City,
    string StartDate,
    string EndDate,
    decimal Budget,
    string Status
);


