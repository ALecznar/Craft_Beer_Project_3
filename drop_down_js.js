// Dropdown Menu
document.addEventListener("DOMContentLoaded", function () {
    fetch("michigan_sorted.json")
        .then(response => response.json())
        .then(data => {
            const dropdownCities = document.getElementById("dropdownCities");
            const dropdownBreweries = document.getElementById("dropdownBreweries");

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

            // Handle City dropdown change event
            dropdownCities.addEventListener("change", function () {
                const selectedCity = this.value;

                // Clear existing options in Breweries dropdown
                dropdownBreweries.innerHTML = "";

                // Filter data for selected city
                const breweriesInCity = data.filter(item => item.city === selectedCity);

                // Create an array of brewery names in the selected city
                const breweryNames = breweriesInCity.map(item => item.name);

                // Sort the brewery names alphabetically
                breweryNames.sort();

                // Populate the Breweries dropdown based on the selected city
                for (const breweryName of breweryNames) {
                    const optionBrewery = document.createElement("option");
                    optionBrewery.value = breweryName;
                    optionBrewery.textContent = breweryName;
                    dropdownBreweries.appendChild(optionBrewery);
                }
            });
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

    Element.prototype.hasClass = function (className) {
        return this.className && new RegExp("(^|\\s)" + className + "(\\s|$)").test(this.className);
    };
});
	
	
	
	