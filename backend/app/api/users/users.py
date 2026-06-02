from fastapi import APIRouter
from typing import List

router = APIRouter()

@router.get("/")
def get_users():
    # Demo returns mock user data (no auth required)
    return [
        {
            "id": 1,
            "email": "demo@example.com",
            "full_name": "Demo User",
            "role": "user"
        }
    ]

