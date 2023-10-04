// Dropdown Menu
document.addEventListener("DOMContentLoaded", function () {

	fetch("michigan_sorted.json")
        .then(response => response.json())
        .then(data => {
            	const dropdown1 = document.getElementById("dropdown1");

            // Iterate through each item in the JSON data
            for (const item of data) {
                // Create an option element and set its text and value
                const option = document.createElement("option");
				option.textContent = item.city; // You can change this to the field you want as the displayed text
                option.value = item.name; // You can change this to the field you want as the value
                dropdown1.appendChild(option);
				const option2 = document.createElement("option");
				option2.value = item.name;
				option2.textContent = item.name;
				dropdown1.appendChild(option2);
            } 
        })
        .catch(error => console.error("Error loading data from data1.json:", error));

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

var dropdown = document.querySelectorAll('.dropdown');
var dropdownArray = Array.prototype.slice.call(dropdown,0);
dropdownArray.forEach(function(el){
	var button = el.querySelector('a[data-toggle="dropdown"]'),
			menu = el.querySelector('.dropdown-menu'),
			arrow = button.querySelector('i.icon-arrow');

	button.onclick = function(event) {
		if(!menu.hasClass('show')) {
			menu.classList.add('show');
			menu.classList.remove('hide');
			arrow.classList.add('open');
			arrow.classList.remove('close');
			event.preventDefault();
		}
		else {
			menu.classList.remove('show');
			menu.classList.add('hide');
			arrow.classList.remove('open');
			arrow.classList.add('close');
			event.preventDefault();
		}
	};
})

Element.prototype.hasClass = function(className) {
    return this.className && new RegExp("(^|\\s)" + className + "(\\s|$)").test(this.className);
};

});