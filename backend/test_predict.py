import sys
import os
sys.path.insert(0, os.path.dirname(__file__))

from app.ml.predictor import predictor
from app.schemas.schemas import PredictionInput

input_data = PredictionInput(
    age=45,
    gender="male",
    height=175,
    weight=78,
    blood_pressure=130,
    cholesterol=220,
    glucose=110,
    heart_rate=82,
    symptoms=[]
)

predictions, health_score, confidence = predictor.predict(input_data)

print(f"Predictions: {[p.model_dump() for p in predictions]}")
print(f"Health Score: {health_score}")
print(f"Confidence: {confidence}")
