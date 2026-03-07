import pandas as pd
from sklearn.preprocessing import LabelEncoder

df = pd.read_csv("../data/processed/final_crime_dataset.csv")

encoder = LabelEncoder()

df["crime_type"] = encoder.fit_transform(df["crime_type"])
df["location"] = encoder.fit_transform(df["location"])

df["arrest"] = df["arrest"].astype(int)
df["domestic"] = df["domestic"].astype(int)

df.to_csv("../data/processed/ml_dataset.csv", index=False)

print("Feature engineering complete")