

// Compute city counts
var cityCounts = d3.rollups(data, v => v.length, d => d.city);

// Sort the counts in descending order and slice the top 10
cityCounts.sort((a, b) => b[1] - a[1]);
cityCounts = cityCounts.slice(0, 10);

var margin = {top: 20, right: 20, bottom: 30, left: 40};
var width = 960 - margin.left - margin.right;
var height = 500 - margin.top - margin.bottom;

var svg = d3.select("#barChart")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Set scales
var x = d3.scaleBand()
          .rangeRound([0, width])
          .padding(0.1);
var y = d3.scaleLinear()
          .rangeRound([height, 0]);

x.domain(cityCounts.map(function(d) { return d[0]; }));
y.domain([0, d3.max(cityCounts, function(d) { return d[1]; })]);

// Add X axis
svg.append("g")
   .attr("transform", "translate(0," + height + ")")
   .call(d3.axisBottom(x));

// Add Y axis
svg.append("g")
   .call(d3.axisLeft(y));

// Add bars
svg.selectAll(".bar")
   .data(cityCounts)
   .enter().append("rect")
   .attr("class", "bar")
   .attr("x", function(d) { return x(d[0]); })
   .attr("y", function(d) { return y(d[1]); })
   .attr("width", x.bandwidth())
   .attr("height", function(d) { return height - y(d[1]); });