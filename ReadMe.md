# Craft Beers and Breweries

Interactive dashboard for beer lovers to explore Michigan's wide range of breweries and beers.

![image](https://github.com/ALecznar/Craft_Beer_Project_3/assets/130694752/49c2ed4e-ff62-4c73-9824-6914e394675e)


# Technologies:

- HTML/CSS
- Javascript
- Jupyter Notebook
- GSAP
- d3
- Leaflet

## Data Collection

We initiated our project by sourcing our primary dataset from openbrewerydb.org. This dataset contained valuable information about breweries across the United States.
Our goal was to focus on breweries located in Michigan. We extracted the dataset in the form of an API containing address data points for all breweries in the database. We meticulously organized and cleaned this data before proceeding.
This data can be found in the michigan_sorted.json or michigan_sorted.csv.

# Data Extraction and Preparation

Using Jupyter Notebook, we performed data filtering to isolate breweries situated in Michigan. We exported this refined dataset both as a CSV and a JSON file for future reference and utilization. 
Simultaneously, we aimed to showcase some of the highest-rated craft beers available in Michigan. 
To achieve this, we selected a "Top 100 Craft Beers" list from beeradvocate.com and employed web scraping techniques to extract details such as beer names, respective breweries, ABV (Alcohol by Volume) percentages, Total User Ratings, and Average Ratings. 

# Data Transformation and Cleaning

The extracted beer data required meticulous cleaning and transformation. Since the web scraping process did not provide structured data with delimiters, we manually manipulated the data to create clean and well-categorized columns.
Subsequently, we reintegrated this cleaned dataset into our initial Jupyter Notebook and converted it into JSON format for future reference.

# Database Integration

To create a cohesive data ecosystem, we designed a PostgreSQL database schema and imported all three datasets (Michigan breweries, craft beer details, and the cleaned beer data) into it.
To establish connections between these datasets, we used unique UUIDs associated with each brewery name from our initial dataset and linked them to the subsequent tables. 
This approach ensured that our data was well-organized, and any user with access could leverage it for their own projects.

- ERD:
  
  ![image](https://github.com/ALecznar/Craft_Beer_Project_3/assets/130694752/3aa2549b-0072-4e5c-bf39-008a302b6d0b)

  This database can be found in the beerdb2.sql file.


# Data Visualizations

Our project featured multiple data visualizations created using Leaflet and d3.

- Top 10 Michigan Cities with the Most Breweries: We designed a bar graph to display the top 10 cities in Michigan with the largest number of breweries. This visualization aids enthusiasts in discovering cities with a wide variety of offerings.
  

  ![image](https://github.com/ALecznar/Craft_Beer_Project_3/assets/130694752/e27ddf15-24e0-4a36-829f-96252023ff9e)


- Top 10 Rated Beers: We listed the top 10 craft beers in Michigan based on their average ratings. This offers users insights into the local craft beer culture and the highest-rated options available.
  

  ![image](https://github.com/ALecznar/Craft_Beer_Project_3/assets/130694752/d8484e02-eb5f-4748-a71c-87ac96279043)


- Geospatial Visualization: We utilized Leaflet to create an interactive map that presents data points of breweries and beer-related information throughout the state of Michigan. This map includes address details and website links for users to explore and plan their brewery visits.
  

  ![image](https://github.com/ALecznar/Craft_Beer_Project_3/assets/130694752/a270a6b5-63fa-4515-b06e-58b3fa1ef8ea)


# Interactive Features

We implemented dynamic dropdown menus inspired by a template found on codepen.io. These dropdowns enhance user interaction and exploration of the data.

![image](https://github.com/ALecznar/Craft_Beer_Project_3/assets/130694752/1a55fb48-68ad-459c-9f43-4e29b8a0394c)


- Brewery Locator: The first dropdown menu enables users to filter brewery names by their respective cities, making it easy to find breweries in specific locations.

- Craft Beer Explorer: The second dropdown menu empowers users to explore data about the Top 100 craft beers in Michigan. Users can filter by beer type and, upon selecting a beer name, view additional details such as its brewery, ABV, and ratings information.

# Animation

We used the javascript library gsap to animate our beer logo which was created with adobe illustrator. gsap allowed us to animate our beer logo, aswell as the contents of our webpage to make it fluid upon opening the page.

![beer](https://github.com/ALecznar/Craft_Beer_Project_3/assets/130694752/db168f15-b676-440a-a21b-ad9dda869833)


# Contributors 

- Aron Lecznar

- Thom Banninga

- Natalia Phipps

# Resources

The following resources were used to help us create our project.

 - Brewery data: https://www.openbrewerydb.org/documentation#metadata *Breweries API*

- Beer data: https://www.beeradvocate.com/beer/top-rated/us/mi/ *Website Scraped for "Top 100 Beers" dropdown*

- image used for background: https://wallpapercave.com/wp/wp3087049.jpg *image URL for background*

- Dropdown menu: https://codepen.io/alvarotrigo/pen/mdxzvQR *Base template for Dropdown Menu*

- Beer logo: https://www.youtube.com/watch?v=TkBrhzKmsNQ 

