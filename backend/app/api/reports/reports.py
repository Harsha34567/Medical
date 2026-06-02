from fastapi import APIRouter

router = APIRouter()

@router.get("/health-summary")
def get_health_summary():
    # Mock health summary data
    return {
        "overall_health": 85,
        "risk_factors": 2,
        "recommendations": [
            "Maintain regular exercise",
            "Reduce sodium intake",
            "Schedule regular checkups"
        ]
    }

