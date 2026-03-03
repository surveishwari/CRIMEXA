from flask import Flask, request, jsonify
import joblib
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load trained model
model = joblib.load("models/crime_model.pkl")

@app.route("/")
def home():
    return "CRIMEXA Backend Running"

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json

    try:
        features = [
            data["location_type"],
            data["time_of_incident"],
            data["entry_method"],
            data["weapon_present"]
        ]

        prediction = model.predict([features])

        return jsonify({
            "status": "success",
            "predicted_crime": prediction[0]
        })

    except Exception as e:
        return jsonify({
            "status": "error",
            "message": str(e)
        })

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)