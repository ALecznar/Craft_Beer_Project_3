import pandas as pd

# Read the JSON data using a raw string for the path
df = pd.read_json(r"C:\Users\arond\Desktop\MSU Bootcamp\Class_Work\Module16\Group Project\breweries.json")

# Convert the dataframe to a CSV file
df.to_csv(r"C:\Users\arond\Desktop\MSU Bootcamp\Class_Work\Module16\Group Project\breweries.csv", index=False)