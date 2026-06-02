from pydantic import BaseModel
from typing import List, Optional

class PredictionInput(BaseModel):
    age: int
    gender: str
    height: Optional[float] = None
    weight: Optional[float] = None
    blood_pressure: Optional[int] = None
    cholesterol: Optional[int] = None
    glucose: Optional[int] = None
    heart_rate: Optional[int] = None
    symptoms: Optional[List[str]] = []

class PredictionResult(BaseModel):
    disease: str
    probability: float
    risk_level: str

class PredictionResponse(BaseModel):
    predictions: List[PredictionResult]
    health_score: int
    prediction_confidence: int

class RecommendationRequest(BaseModel):
    predictions: List[PredictionResult]

class RecommendationResponse(BaseModel):
    recommendations: List[str]
