import pandas as pd
import os

# Load cleaned dataset
df = pd.read_csv("datasets/indian_crime_data.csv")

print("Original shape:", df.shape)

# Use existing Total_IPC_Crime column
df["total_crime"] = df["Total_IPC_Crime"]

# Group by District
district_risk = df.groupby("District")["total_crime"].mean().reset_index()

# Normalize to 0-100 scale
district_risk["risk_score"] = (
    (district_risk["total_crime"] - district_risk["total_crime"].min()) /
    (district_risk["total_crime"].max() - district_risk["total_crime"].min())
) * 100

# Create processed folder
if not os.path.exists("processed"):
    os.makedirs("processed")

# Save file
district_risk.to_csv("processed/indian_district_risk.csv", index=False)

print("✅ Indian district risk file created successfully!")