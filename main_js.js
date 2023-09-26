//map object
var myMap = L.map("map", {
    center: [44.3148, -85.6024],  // Center of Michigan
    zoom: 6
});

// Add a tile layer
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '© OpenStreetMap contributors'
}).addTo(myMap);

// Load
d3.json("michigan_sorted.json").then(function(data) {
    
    for (var i = 0; i < data.length; i++) {
        var brewery = data[i];
        if (brewery.latitude && brewery.longitude) {
            // Create a marker
            var marker = L.marker([brewery.latitude, brewery.longitude])
                .bindPopup(
                    "<h5>" + brewery.name + "</h5>" +
                    "<p>City: " + brewery.city + "</p>" +
                    "<p>Address: " + brewery.address + "</p>" +
                    (brewery.website_url ? ("<p><a href='" + brewery.website_url + "' target='_blank'>Website</a></p>") : "")
                )
                .addTo(myMap);
        }
    }
});