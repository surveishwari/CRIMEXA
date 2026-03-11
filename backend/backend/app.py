from flask import Flask, request, jsonify
import joblib
import numpy as np
import pandas as pd
import os

app = Flask(__name__)

# Load trained model
model_path = os.path.join("..", "models", "crime_model.pkl")
model = joblib.load(model_path)

print("CRIMEXA Model Loaded Successfully")


@app.route("/")
def home():
    return "CRIMEXA API Running"


@app.route("/predict", methods=["POST"])
def predict():
    try:

        data = request.get_json()

        # Read input dynamically
        location = int(data.get("location"))
        hour = int(data.get("hour"))
        month = int(data.get("month"))
        arrest = int(data.get("arrest"))
        domestic = int(data.get("domestic"))
        state = data.get("state")

        # Create dataframe (same structure as training)
        features = pd.DataFrame({
            "location": [location],
            "hour": [hour],
            "month": [month],
            "arrest": [arrest],
            "domestic": [domestic]
        })

        # Predict
        prediction = model.predict(features)[0]

        # Confidence score
        if hasattr(model, "predict_proba"):
            probs = model.predict_proba(features)[0]
            confidence = float(np.max(probs) * 100)
        else:
            confidence = None

        return jsonify({
            "status": "success",
            "prediction": str(prediction),
            "confidence": confidence,
            "input": {
                "location": location,
                "hour": hour,
                "month": month,
                "arrest": arrest,
                "domestic": domestic,
                "state": state
            }
        })

    except Exception as e:

        return jsonify({
            "status": "error",
            "message": str(e)
        })


if __name__ == "__main__":
    app.run(debug=True)