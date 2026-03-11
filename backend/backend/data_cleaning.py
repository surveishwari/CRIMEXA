import pandas as pd

# Load raw dataset
df = pd.read_csv("../data/raw/chicago_crime.csv")

# Select useful columns
df = df[[
    "Date",
    "Primary Type",
    "Location Description",
    "Arrest",
    "Domestic"
]]

# Rename columns
df.columns = [
    "date",
    "crime_type",
    "location",
    "arrest",
    "domestic"
]

# Convert date
df["date"] = pd.to_datetime(df["date"])

df["hour"] = df["date"].dt.hour
df["month"] = df["date"].dt.month

# Save processed dataset
df.to_csv("../data/processed/final_crime_dataset.csv", index=False)

print("Dataset cleaned")