// Create a map object
var myMap = L.map("map", {
    center: [44.3148, -85.6024],  // Center of Michigan
    zoom: 6
});

// Add a tile layer from OpenStreetMap to the map
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '© OpenStreetMap contributors'
}).addTo(myMap);

// Load the data
d3.json("michigan_sorted.json").then(function(data) {
    // Loop through the data to create markers and popups
    for (var i = 0; i < data.length; i++) {
        var brewery = data[i];
        if (brewery.latitude && brewery.longitude) {
            // Create a marker at the brewery's location
            L.marker([brewery.latitude, brewery.longitude])
                .bindPopup(
                    "<h5>" + brewery.name + "</h5>" +
                    "<p>City: " + brewery.city + "</p>" +
                    "<p>Address: " + brewery.address + "</p>" +
                    (brewery.website_url ? ("<p><a href='" + brewery.website_url + "' target='_blank'>Website</a></p>") : "")
                )
                .addTo(myMap);
        }
    }

    // Group the data by city and count the number of breweries
    var grouped = d3.group(data, d => d.city);
    var groupedArray = Array.from(grouped).map(d => ({ key: d[0], value: d[1].length }));

    // Sort the data based on the count of breweries
    var sorted = groupedArray.sort((a, b) => b.value - a.value).slice(0, 10);

    // Create a bar chart using the top 10 cities by brewery count
    var svgWidth = 900; 
    var svgHeight = 500;



    var svg = d3.select("#chartContainer").append("svg")
                .attr("width", svgWidth)
                .attr("height", svgHeight)
                .attr("id", "barChart");

    var xScale = d3.scaleBand()
                   .domain(sorted.map(d => d.key))
                   .range([0, svgWidth])
                   .padding(0.4);

    var yScale = d3.scaleLinear()
                   .domain([0, d3.max(sorted, d => d.value)])
                   .range([svgHeight, 0]);

    var xAxis = d3.axisBottom(xScale);
    var yAxis = d3.axisLeft(yScale);


    svg.append("g")
       .attr("transform", "translate(0," + (svgHeight - 20) + ")")
       .call(xAxis)
    
    svg.append("g")
       .attr("transform", "translate(50, 0)")
       .call(yAxis);

    svg.selectAll(".bar")
       .data(sorted)
       .enter()
       .append("rect")
       .attr("class", "bar")
       .attr("x", d => xScale(d.key))
       .attr("y", d => yScale(d.value))
       .attr("width", xScale.bandwidth())
       .attr("height", d => svgHeight - yScale(d.value) - 20)
       .attr("fill", "steelblue");
       
});