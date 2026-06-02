from fastapi import APIRouter
from typing import List
from app.schemas.schemas import (
    PredictionInput,
    PredictionResponse,
    RecommendationRequest,
    RecommendationResponse
)
from app.ml.predictor import predictor

router = APIRouter()

@router.post("/predict", response_model=PredictionResponse)
async def predict_disease(input_data: PredictionInput):
    # Get predictions from ML model
    predictions, health_score, confidence = predictor.predict(input_data)
    
    return PredictionResponse(
        predictions=predictions,
        health_score=health_score,
        prediction_confidence=confidence
    )

@router.post("/recommendations", response_model=RecommendationResponse)
async def get_recommendations(
    request: RecommendationRequest
):
    recommendations = predictor.get_recommendations(request.predictions)
    return RecommendationResponse(recommendations=recommendations)
