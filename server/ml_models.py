import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import LabelEncoder
import joblib
import os

class MLModels:
    def __init__(self):
        self.rf_model = None
        self.text_model = None
        self.label_encoders = {}
        
        # We will train these on initialization if they don't exist
        self._initialize_models()

    def _initialize_models(self):
        # Model 1: Crime Prediction (Random Forest)
        # Synthetic Data: Location, Time(Hour), Entry Method, Weapon Present -> Threat Level (Low, Medium, High)
        data = {
            'Location': ['Downtown', 'Suburbs', 'Industrial', 'Downtown', 'Suburbs', 'Industrial', 'Downtown', 'Suburbs', 'Industrial', 'Downtown'],
            'Time': [2, 14, 23, 10, 8, 3, 1, 19, 15, 22], # Hours
            'EntryMethod': ['Forced', 'Door', 'Window', 'Door', 'Window', 'Forced', 'Forced', 'Door', 'Window', 'Forced'],
            'Weapon': ['Yes', 'No', 'Yes', 'No', 'No', 'Yes', 'Yes', 'No', 'No', 'Yes'],
            'RiskScore': [85, 20, 75, 30, 40, 90, 88, 25, 55, 80]
        }
        df = pd.DataFrame(data)
        
        self.label_encoders['Location'] = LabelEncoder().fit(df['Location'])
        self.label_encoders['EntryMethod'] = LabelEncoder().fit(df['EntryMethod'])
        self.label_encoders['Weapon'] = LabelEncoder().fit(df['Weapon'])
        
        X = df.copy()
        X['Location'] = self.label_encoders['Location'].transform(X['Location'])
        X['EntryMethod'] = self.label_encoders['EntryMethod'].transform(X['EntryMethod'])
        X['Weapon'] = self.label_encoders['Weapon'].transform(X['Weapon'])
        y = X.pop('RiskScore')
        
        # We use a simple RF to predict risk score based on parameters
        self.rf_model = RandomForestClassifier(n_estimators=10, random_state=42)
        # Bining risk score to classes for RF
        y_class = pd.cut(y, bins=[0, 33, 66, 100], labels=['Low', 'Medium', 'High'])
        self.rf_model.fit(X, y_class)

        # Model 2: Text Evidence (TF-IDF + Naive Bayes)
        text_data = [
            "We will attack at dawn.",
            "Please send the money to this account.",
            "Meeting at 5pm tomorrow.",
            "I have a gun and I will use it.",
            "Your account has been compromised, click here.",
            "Can you pick up the groceries?",
            "Bomb threat at the downtown area.",
            "Transfer $5000 immediately or else."
        ]
        text_labels = ["Threat", "Fraud", "Normal", "Threat", "Fraud", "Normal", "Threat", "Fraud"]
        
        self.text_model = make_pipeline(TfidfVectorizer(), MultinomialNB())
        self.text_model.fit(text_data, text_labels)

    def predict_crime_risk(self, location, time_hour, entry_method, weapon):
        try:
            # Handle unseen labels gracefully by defaulting or using a known one
            loc_val = self.label_encoders['Location'].transform([location])[0] if location in self.label_encoders['Location'].classes_ else 0
            entry_val = self.label_encoders['EntryMethod'].transform([entry_method])[0] if entry_method in self.label_encoders['EntryMethod'].classes_ else 0
            weapon_val = self.label_encoders['Weapon'].transform([weapon])[0] if weapon in self.label_encoders['Weapon'].classes_ else 0
            
            X_test = pd.DataFrame({
                'Location': [loc_val],
                'Time': [time_hour],
                'EntryMethod': [entry_val],
                'Weapon': [weapon_val]
            })
            pred_class = self.rf_model.predict(X_test)[0]
            
            # Map class to a base score
            score_map = {'Low': 20, 'Medium': 50, 'High': 85}
            base_score = score_map.get(pred_class, 50)
            
            return pred_class, base_score
        except Exception as e:
            return "Unknown", 50

    def analyze_text(self, text):
        if not text or len(text.strip()) == 0:
            return "Normal"
        pred = self.text_model.predict([text])[0]
        return pred

    def calculate_overall_threat(self, location, time_hour, entry_method, weapon, text_evidence):
        scene_risk_class, scene_score = self.predict_crime_risk(location, time_hour, entry_method, weapon)
        text_class = self.analyze_text(text_evidence)
        
        final_score = scene_score
        
        if text_class == "Threat":
            final_score = min(100, final_score + 30)
        elif text_class == "Fraud":
            final_score = min(100, final_score + 15)
            
        overall_level = "Low"
        if final_score > 75:
            overall_level = "High"
        elif final_score > 40:
            overall_level = "Medium"
            
        priority = "Critical" if overall_level == "High" else ("Elevated" if overall_level == "Medium" else "Routine")
        
        # Determine the Crime Type for AR Reconstruction
        predicted_crime = "None"
        if overall_level == "High" and weapon == "Yes":
            predicted_crime = "Homicide"
        elif overall_level == "High" and entry_method == "Forced":
            predicted_crime = "Burglary"
        elif overall_level == "Medium":
            predicted_crime = "Vandalism/Theft"
        
        return {
            "scene_risk_level": scene_risk_class,
            "text_analysis_result": text_class,
            "overall_threat_level": overall_level,
            "risk_score": final_score,
            "priority": priority,
            "predicted_crime": predicted_crime
        }

# Singleton instance
ml_pipeline = MLModels()
