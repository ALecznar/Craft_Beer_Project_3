// Margin around the graph
var margin = {top: 80, right: 50, bottom: 70, left: 100},
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
                .text("Michigan Top Ten")
                .style("fill", "white");



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
       .call(d3.axisBottom(xScale))
       .style("font-size", "13px")
       .selectAll("path")
       .style("stroke-width", "1.75px");

    svg.append("g")
       .call(d3.axisLeft(yScale))
       .style("font-size", "13px")
       .selectAll("path")
       .style("stroke-width", "1.75px");

    svg.append("text")
       .attr("transform", "rotate(-90)")
       .attr("y", 35 - margin.left)
       .attr("x",0 - (height / 2))
       .attr("dy", "1em")
       .style("text-anchor", "middle")
       .style("font-weight", "bold")
       .style("text-anchor", "middle")
       .text("Number Of Breweries")
       .style("fill", "white");




    // Append the bars
    svg.selectAll(".bar")
       .data(sorted)
       .enter().append("rect")
       .attr("class", "bar")
       .attr("x", d => xScale(d.key))
       .attr("width", xScale.bandwidth())
       .attr("y", d => yScale(d.value))
       .style("fill", "#69b3a2")
       .attr("height", d => height - yScale(d.value));

    // Add x-axis label
    svg.append("text")
       .attr("transform", "translate(" + (width / 2) + " ," + (height + margin.bottom - 30) + ")")
       .style("text-anchor", "middle")
       .style("font-weight", "bold")
       .text("City")
       .style("fill", "white");

});

d3.json('beer_ratings_clean.json').then(function(data) {
    
let items = data.sort((a, b) => parseFloat(b["Average Rating"]) - parseFloat(a["Average Rating"]));
const slicedarray = items.slice(0,10); 
console.log(slicedarray);

//chart 2 margins
const margin2 = {top:40, right: 50, bottom: 50, left: 300}
const width2 = 900 - margin2.left - margin2.right
const height2 = 500- margin2.top - margin2.bottom


//container for the chart
const svg = d3.select('#top-ten-beers').append('svg')
    .attr("width", width2 + margin2.left + margin2.right)
    .attr("height", height2 + margin2.top + margin2.bottom)
    .append("g")
    .attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");

//text title
    svg.append("text")
    .attr("x", width2 / 2)
    .attr("y", 0 - (margin2.top / 2))
    .attr("text-anchor", "middle")
    .style("font-size", "24px")
    .style("text-decoration", "underline")
    .text("Top Ten Beers in Michigan")
    .style("fill", "white");



// Set the scales
var yScale = d3.scaleBand()
       .domain(slicedarray.map(d => d.Beer))
       .range([0, height2])
       .padding(0.4);

var xScale = d3.scaleLinear()
    .range([0, width2])
    .domain([0, d3.max(slicedarray, function(d) { return d["Average Rating"]; })]);
       
//create x and y axis
var x = d3.axisBottom(xScale);
var y = d3.axisLeft(yScale)
    .tickPadding(10);

//create the bars for the chart
svg.selectAll(".bar")
    .data(slicedarray)
    .enter().append("rect")
    .attr("class", "bar")
    .attr("width", d => xScale(d["Average Rating"]))
    .attr("y", d => yScale(d.Beer))
    .attr("height", yScale.bandwidth())
    .style("fill", "skyblue")

// Append the axes
svg.append("g")
    .attr("class", "x")
    .attr("transform", "translate(0," + height2 + ")")
    .call(x)
    .style("font-size", "13px")
    .selectAll("path")
    .style("stroke-width", "1.75px");

svg.append("g")
    .style("font-size", "13px")
    .style("stroke-width", "1.75px")
    .call(y);

//add bar labels
svg.selectAll(".label")
    .data(slicedarray)
    .enter().append("text")
    .attr("x", d => xScale(d["Average Rating"]))
    .attr("y", d => yScale(d.Beer))
    .attr("dy", "1.45em")
    .style("font-family", "sans-serif")
    .style("font-size", "12px")
    .style("font-weight", "bold")
    .text(function(d) { return d["Average Rating"]})
    .style("fill", "white");
    
//Add x axis label
svg.append("text")
.attr("transform", "translate(" + (width2 / 2) + " ," + (height2 + margin2.bottom - 10) + ")")
.style("text-anchor", "middle")
.style("font-weight", "bold")
.text("Average Rating")
.style("fill", "white");

//add y axis label
svg.append("text")
       .attr("transform", "rotate(-90)")
       .attr("y", 10 - margin2.left)
       .attr("x",0 - (height2 / 2))
       .attr("dy", "1em")
       .style("text-anchor", "middle")
       .style("font-weight", "bold")
       .text("Beer Name")
       .style("fill", "white");

});