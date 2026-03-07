import pandas as pd
import joblib
import os
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder

# -------------------------------
# 1️⃣ Load Dataset
# -------------------------------
df = pd.read_csv("../data/processed/final_crime_dataset.csv")
print("✅ Dataset Loaded")

# Fill missing values
df = df.fillna("UNKNOWN")  # for strings
df = df.fillna(0)          # for numbers

# -------------------------------
# 2️⃣ Handle datetime columns (optional)
# -------------------------------
for col in df.columns:
    if "date" in col.lower() or "time" in col.lower():
        df[col] = pd.to_datetime(df[col], errors="coerce")
        df[f"{col}_year"] = df[col].dt.year
        df[f"{col}_month"] = df[col].dt.month
        df[f"{col}_day"] = df[col].dt.day
        df[f"{col}_hour"] = df[col].dt.hour
        df = df.drop(columns=[col])

# -------------------------------
# 3️⃣ Select Features (matches API)
# -------------------------------
feature_cols = ["location", "hour", "month", "arrest", "domestic"]

# -------------------------------
# 4️⃣ Encode Features
# -------------------------------
encoders = {}
for col in feature_cols:
    if df[col].dtype == 'object' or df[col].dtype.name == 'string':
        # Categorical: label encode
        le = LabelEncoder()
        df[col] = le.fit_transform(df[col].astype(str))
        encoders[col] = le
        os.makedirs("../models", exist_ok=True)
        joblib.dump(le, f"../models/{col}_encoder.pkl")
    else:
        # Numeric: convert safely
        df[col] = pd.to_numeric(df[col], errors='coerce').fillna(0).astype(int)

# -------------------------------
# 5️⃣ Encode Target
# -------------------------------
crime_encoder = LabelEncoder()
df["crime_type"] = crime_encoder.fit_transform(df["crime_type"].astype(str))
joblib.dump(crime_encoder.classes_, "../models/crime_classes.pkl")

# -------------------------------
# 6️⃣ Features & Target
# -------------------------------
X = df[feature_cols]
y = df["crime_type"]

# -------------------------------
# 7️⃣ Train/Test Split
# -------------------------------
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

print("Feature dtypes after preprocessing:")
print(X_train.dtypes)
print("Sample data:")
print(X_train.head())

# -------------------------------
# 8️⃣ Train Model
# -------------------------------
model = RandomForestClassifier(n_estimators=200, random_state=42)
model.fit(X_train, y_train)

# -------------------------------
# 9️⃣ Save Model
# -------------------------------
os.makedirs("../models", exist_ok=True)
joblib.dump(model, "../models/crime_model.pkl")
print("✅ Model trained and saved successfully")