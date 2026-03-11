import pandas as pd
import os

# Path to your dataset
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_PATH = os.path.join(BASE_DIR, "..", "data", "processed", "final_crime_dataset.csv")

# Load dataset
crime_df = pd.read_csv(DATA_PATH)

# ---- Use 'location' column for risk mapping ----
LOCATION_COLUMN = "location"

# Create risk mapping based on number of crimes per location
location_counts = crime_df[LOCATION_COLUMN].value_counts().to_dict()

# Normalize risk scores to 0-100
max_count = max(location_counts.values()) if location_counts else 1
location_risk_dict = {loc: int((count/max_count)*100) for loc, count in location_counts.items()}

# Default risk = 50 if location not found
DEFAULT_RISK = 50

def calculate_final_risk(predicted_confidence, location):
    """
    predicted_confidence : float (0-100)
    location : int/string
    Returns final risk score as weighted sum of predicted confidence + location risk
    """
    loc_risk = location_risk_dict.get(location, DEFAULT_RISK)
    final_risk = 0.6 * predicted_confidence + 0.4 * loc_risk
    return round(final_risk, 2)