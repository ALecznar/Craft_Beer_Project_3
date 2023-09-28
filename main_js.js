// Margin around the graph
var margin = {top: 20, right: 20, bottom: 70, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

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

    // Create an SVG element and set its dimensions
    var svg = d3.select("#chartContainer").append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


        svg.append("text")
                .attr("x", width / 2)
                .attr("y", 0 - (margin.top / 2))
                .attr("text-anchor", "middle")
                .style("font-size", "24px")
                .style("text-decoration", "underline")
                .text("Michigan Top Ten");



    // Set the scales
    var xScale = d3.scaleBand()
                   .domain(sorted.map(d => d.key))
                   .range([0, width])
                   .padding(0.4);

    var yScale = d3.scaleLinear()
                   .domain([0, d3.max(sorted, d => d.value)])
                   .range([height, 0]);

    // Append the axes
    svg.append("g")
       .attr("transform", "translate(0," + height + ")")
       .call(d3.axisBottom(xScale));

    svg.append("g")
       .call(d3.axisLeft(yScale));

    svg.append("text")
       .attr("transform", "rotate(-90)")
       .attr("y", 0 - margin.left)
       .attr("x",0 - (height / 2))
       .attr("dy", "1em")
       .style("text-anchor", "middle")
       .text("# Of Breweries");




    // Append the bars
    svg.selectAll(".bar")
       .data(sorted)
       .enter().append("rect")
       .attr("class", "bar")
       .attr("x", d => xScale(d.key))
       .attr("width", xScale.bandwidth())
       .attr("y", d => yScale(d.value))
       .attr("height", d => height - yScale(d.value));

    // Add x-axis label
    svg.append("text")
       .attr("transform", "translate(" + (width / 2) + " ," + (height + margin.top + 30) + ")")
       .style("text-anchor", "middle")
       .text("City");

});