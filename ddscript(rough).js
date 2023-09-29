document.addEventListener("DOMContentLoaded", function () {
    // Load data from data1.json
    fetch("michigan_sorted.json")
        .then(response => response.json())
        .then(data => {
            const dropdown1 = document.getElementById("dropdown1");

            // Iterate through each item in the JSON data
            for (const item of data) {
                // Create an option element and set its text and value
                const option = document.createElement("option");
                option.value = item.city; // You can change this to the field you want as the value
                option.textContent = item.city; // You can change this to the field you want as the displayed text
                dropdown1.appendChild(option);
            }
        })
        .catch(error => console.error("Error loading data from data1.json:", error));

    // Load data from data2.json
    fetch("beer_ratings_clean.json")
        .then(response => response.json())
        .then(data => {
            const dropdown2 = document.getElementById("dropdown2");

            // Iterate through each item in the JSON data
            for (const item of data) {
                // Create an option element and set its text and value
                const option = document.createElement("option");
                option.value = item.Beer; // You can change this to the field you want as the value
                option.textContent = item.Beer; // You can change this to the field you want as the displayed text
                dropdown2.appendChild(option);
            }
        })
        .catch(error => console.error("Error loading data from data2.json:", error));
});