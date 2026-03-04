import pandas as pd
import random
import os

# Number of rows
N = 1000

# Possible values for features
location_type = [0, 1, 2]           # Home, Bank, Street
time_of_incident = [0, 1, 2]        # Morning, Evening, Night
entry_method = [0, 1, 2]            # Forced, Digital, Open
weapon_present = [0, 1]             # Yes/No
num_people_present = [0, 1, 2, 3, 4, 5]
sound_level = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
motion_detected = [0, 1]            # Yes/No
crime_type = ["Robbery", "Theft", "Fraud", "Assault"]

# Generate synthetic data
data = []
for _ in range(N):
    row = {
        "location_type": random.choice(location_type),
        "time_of_incident": random.choice(time_of_incident),
        "entry_method": random.choice(entry_method),
        "weapon_present": random.choice(weapon_present),
        "num_people_present": random.choice(num_people_present),
        "sound_level": random.choice(sound_level),
        "motion_detected": random.choice(motion_detected),
        "crime_type": random.choices(crime_type, weights=[0.3, 0.3, 0.2, 0.2])[0]  # More realistic distribution
    }
    data.append(row)

# Create DataFrame
df = pd.DataFrame(data)

# Save to CSV
df.to_csv("crime_dataset_synthetic.csv", index=False)
print("Synthetic dataset generated: crime_dataset_synthetic.csv")