document.addEventListener("DOMContentLoaded", function () {
    fetch("michigan_sorted.json")
        .then(response => response.json())
        .then(data => {
            const dropdownCities = document.getElementById("dropdownCities");
            const dropdownBreweries = document.getElementById("dropdownBreweries");
            const dropdownBeers = document.getElementById("dropdownBeers");
            const dropdownBeerTypes = document.getElementById("dropdownBeerTypes");

            // Create a Set to store unique cities
            const uniqueCities = new Set(data.map(item => item.city));

            // Sort the cities alphabetically
            const sortedCities = Array.from(uniqueCities).sort();

            // Populate the Cities dropdown
            for (const city of sortedCities) {
                const optionCity = document.createElement("option");
                optionCity.value = city;
                optionCity.textContent = city;
                dropdownCities.appendChild(optionCity);
            }

            // Fetch data for the Top 100 Beers dropdown from beer_ratings_clean.json
            fetch("beer_ratings_clean.json")
                .then(response => response.json())
                .then(beerData => {
                    // Assuming beerData is an array of beer objects

                    // Create a Set to store unique beer types
                    const uniqueBeerTypes = new Set(beerData.map(beer => beer["Beer Type"]));

                    // Sort the unique beer types alphabetically
                    const sortedBeerTypes = Array.from(uniqueBeerTypes).sort();

                    // Populate the Beer Types dropdown
                    for (const beerType of sortedBeerTypes) {
                        const optionBeerType = document.createElement("option");
                        optionBeerType.value = beerType;
                        optionBeerType.textContent = beerType;
                        dropdownBeerTypes.appendChild(optionBeerType);
                    }

                    // Handle Beer Type dropdown change event
                    dropdownBeerTypes.addEventListener("change", function () {
                        const selectedBeerType = this.value;
                        populateBeersDropdown(selectedBeerType);
                    });

                    // Rest of the code remains the same...

                    function populateBeersDropdown(selectedBeerType) {
                        // Clear existing options in the Beers dropdown
                        dropdownBeers.innerHTML = "";

                        // Filter beer names based on the selected beer type
                        const beerNamesByType = beerData
                            .filter(beer => beer["Beer Type"] === selectedBeerType)
                            .map(beer => beer.Beer); // Extract beer names

                        // Sort the beer names alphabetically
                        beerNamesByType.sort();

                        // Populate the Beers dropdown with filtered options
                        for (const beerName of beerNamesByType) {
                            const optionBeer = document.createElement("option");
                            optionBeer.value = beerName;
                            optionBeer.textContent = beerName;
                            dropdownBeers.appendChild(optionBeer);
                        }
                    }

                    // Handle Beer dropdown change event
                    dropdownBeers.addEventListener("change", function () {
                        const selectedBeer = this.value;

                        // Find the selected beer object in beerData
                        const selectedBeerData = beerData.find(beer => beer.Beer === selectedBeer);

                        // Get the beerInfoDisplay element
                        const beerInfoDisplay = document.getElementById("beerInfoDisplay");

                        // Display the selected beer's data
                        if (selectedBeerData) {
                            // Create HTML markup to display the beer information
                            const beerInfoHTML = `
                                <p><strong>Beer:</strong> ${selectedBeerData.Beer}</p>
                                <p><strong>Brewery:</strong> ${selectedBeerData.Brewery}</p>
                                <p><strong>Beer Type:</strong> ${selectedBeerData["Beer Type"]}</p>
                                <p><strong>ABV %:</strong> ${selectedBeerData["ABV %"]}</p>
                                <p><strong>Total Ratings:</strong> ${selectedBeerData["Total Ratings"]}</p>
                                <p><strong>Average Rating:</strong> ${selectedBeerData["Average Rating"]}</p>
                            `;

                            // Update the beerInfoDisplay element with the beer information
                            beerInfoDisplay.innerHTML = beerInfoHTML;
                        } else {
                            // If the selected beer is not found, clear the display
                            beerInfoDisplay.innerHTML = "";
                        }
                    });
                })
                .catch(error => console.error("Error loading data from beer_ratings_clean.json:", error));
        })
        .catch(error => console.error("Error loading data from michigan_sorted.json:", error));

    var dropdown = document.querySelectorAll('.dropdown');
    var dropdownArray = Array.prototype.slice.call(dropdown, 0);
    dropdownArray.forEach(function (el) {
        var button = el.querySelector('a[data-toggle="dropdown"]'),
            menu = el.querySelector('.dropdown-menu'),
            arrow = button.querySelector('i.icon-arrow');

        button.onclick = function (event) {
            if (!menu.classList.contains('show')) {
                menu.classList.add('show');
                menu.classList.remove('hide');
                arrow.classList.add('open');
                arrow.classList.remove('close');
                event.preventDefault();
            } else {
                menu.classList.remove('show');
                menu.classList.add('hide');
                arrow.classList.remove('open');
                arrow.classList.add('close');
                event.preventDefault();
            }
        };
    });
});
