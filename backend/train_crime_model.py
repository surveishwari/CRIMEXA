print("Script started")
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
import joblib
import os

# Load dataset
data = pd.read_csv("crime_dataset.csv")

# Split features and target
X = data.drop("crime_type", axis=1)
y = data["crime_type"]

# Create model
model = RandomForestClassifier()
model.fit(X, y)

# Create models folder if not exists
if not os.path.exists("models"):
    os.makedirs("models")

# Save model
joblib.dump(model, "models/crime_model.pkl")

print("Crime model trained and saved successfully.")