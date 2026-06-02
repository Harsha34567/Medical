import numpy as np
import pandas as pd
import joblib
import os
from typing import List, Tuple
from app.schemas.schemas import PredictionInput, PredictionResult

class DiseasePredictor:
    def __init__(self):
        # Map disease names to model files
        self.disease_model_map = {
            "Heart Disease": "heart_disease.joblib",
            "Diabetes": "diabetes.joblib",
            "Chronic Kidney Disease": "kidney_disease.joblib",
            "Liver Disease": "liver_disease.joblib",
            "Stroke": "stroke.joblib",
            "Breast Cancer": None,  # No synthetic model for this one yet
            "Parkinson's Disease": None  # No synthetic model yet
        }
        
        # Load models from trained_models directory
        self.models = {}
        models_dir = os.path.join(os.path.dirname(__file__), "../../trained_models")
        
        for disease, model_file in self.disease_model_map.items():
            if model_file:
                model_path = os.path.join(models_dir, model_file)
                if os.path.exists(model_path):
                    self.models[disease] = joblib.load(model_path)
                    print(f"Loaded model for {disease}")
                else:
                    print(f"Warning: Model file not found for {disease}")
    
    def predict(self, input_data: PredictionInput) -> Tuple[List[PredictionResult], int, int]:
        predictions = []
        
        # Prepare features for model input
        features = {
            'age': input_data.age,
            'gender': 1 if input_data.gender.lower() == 'female' else 0,
            'height': input_data.height or 170.0,
            'weight': input_data.weight or 75.0,
            'blood_pressure': input_data.blood_pressure or 120.0,
            'cholesterol': input_data.cholesterol or 200.0,
            'glucose': input_data.glucose or 100.0,
            'heart_rate': input_data.heart_rate or 75.0
        }
        # Calculate BMI
        features['bmi'] = features['weight'] / ((features['height'] / 100) ** 2)
        
        # Convert to DataFrame for model input
        X = pd.DataFrame([features])
        
        # Get predictions from each trained model
        for disease, model in self.models.items():
            if model:
                # Get probability of positive class
                prob = model.predict_proba(X)[0][1]
                predictions.append({
                    'disease': disease,
                    'probability': prob
                })
        
        # Add mock predictions for diseases without models
        if "Breast Cancer" not in [p['disease'] for p in predictions]:
            predictions.append({
                'disease': "Breast Cancer",
                'probability': 0.1
            })
        
        if "Parkinson's Disease" not in [p['disease'] for p in predictions]:
            predictions.append({
                'disease': "Parkinson's Disease",
                'probability': 0.05 + (input_data.age / 100) * 0.15
            })
        
        # Sort by probability descending
        predictions.sort(key=lambda x: x['probability'], reverse=True)
        
        # Convert to PredictionResult objects
        result_predictions = []
        for pred in predictions:
            if pred['probability'] >= 0.5:
                risk_level = "High"
            elif pred['probability'] >= 0.35:
                risk_level = "Medium"
            else:
                risk_level = "Low"
                
            result_predictions.append(PredictionResult(
                disease=pred['disease'],
                probability=round(pred['probability'], 2),
                risk_level=risk_level
            ))
        
        # Calculate health score
        avg_risk = np.mean([p.probability for p in result_predictions])
        health_score = max(0, min(100, int((1 - avg_risk) * 100)))
        
        # Mock confidence score based on input completeness
        completeness = sum([
            1 for f in [input_data.height, input_data.weight, 
                       input_data.blood_pressure, input_data.cholesterol,
                       input_data.glucose, input_data.heart_rate] if f is not None
        ]) / 6
        confidence = int(70 + completeness * 28)
        
        return result_predictions, health_score, confidence
    
    def get_recommendations(self, predictions: List[PredictionResult]) -> List[str]:
        recommendations = []
        high_risk = [p for p in predictions if p.risk_level == "High"]
        
        if any("Heart" in p.disease for p in high_risk):
            recommendations.append("Consult a cardiologist immediately")
            recommendations.append("Monitor blood pressure daily")
        
        if any("Diabetes" in p.disease for p in high_risk):
            recommendations.append("Reduce sugar and carbohydrate intake")
            recommendations.append("Check blood glucose regularly")
        
        if any("Kidney" in p.disease for p in high_risk):
            recommendations.append("Increase water intake")
            recommendations.append("Avoid excessive salt")
        
        if any("Liver" in p.disease for p in high_risk):
            recommendations.append("Avoid alcohol and fatty foods")
            recommendations.append("Consult a hepatologist")
        
        if any("Stroke" in p.disease for p in high_risk):
            recommendations.append("Seek emergency medical attention")
        
        recommendations.append("Increase physical activity (30 mins/day)")
        recommendations.append("Maintain a balanced diet rich in fruits and vegetables")
        recommendations.append("Get 7-8 hours of sleep nightly")
        
        return recommendations

predictor = DiseasePredictor()
