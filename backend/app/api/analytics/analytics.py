from fastapi import APIRouter
from typing import Dict, List

router = APIRouter()

@router.get("/disease-distribution")
def get_disease_distribution():
    # Mock data for charts
    return {
        "labels": ["Heart Disease", "Diabetes", "Kidney Disease", "Liver Disease", "Stroke"],
        "data": [45, 38, 25, 18, 15]
    }

@router.get("/model-performance")
def get_model_performance():
    return {
        "accuracy": 0.94,
        "precision": 0.92,
        "recall": 0.89,
        "f1_score": 0.905
    }

@router.get("/monthly-predictions")
def get_monthly_predictions():
    return {
        "labels": ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        "data": [120, 145, 180, 210, 195, 230]
    }

@router.get("/feature-importance")
def get_feature_importance():
    return {
        "features": ["Age", "Blood Pressure", "Cholesterol", "Glucose", "Heart Rate"],
        "importance": [0.35, 0.28, 0.22, 0.10, 0.05]
    }
