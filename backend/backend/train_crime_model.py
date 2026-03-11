import pandas as pd
from sklearn.ensemble import RandomForestClassifier
import joblib
import os

# Load new synthetic dataset
data = pd.read_csv(r"D:\machine learning\CRIMEXA\backend\crime_dataset_synthetic.csv")

# Split features and target
X = data.drop("crime_type", axis=1)
y = data["crime_type"]

# Train model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X, y)

# Save trained model
if not os.path.exists("models"):
    os.makedirs("models")
joblib.dump(model, "models/crime_model.pkl")

print("Crime model trained and saved successfully.")