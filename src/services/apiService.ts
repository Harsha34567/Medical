export const BASE_URL = "http://127.0.0.1:8000";

export interface PredictionInput {
  age: number;
  gender: string;
  height?: number | null;
  weight?: number | null;
  blood_pressure?: number | null;
  cholesterol?: number | null;
  glucose?: number | null;
  heart_rate?: number | null;
  symptoms?: string[];
}

export interface PredictionResult {
  disease: string;
  probability: number;
  risk_level: 'High' | 'Medium' | 'Low';
}

export interface PredictionResponse {
  predictions: PredictionResult[];
  health_score: number;
  prediction_confidence: number;
}

export interface RecommendationRequest {
  predictions: PredictionResult[];
}

export interface RecommendationResponse {
  recommendations: string[];
}

export interface AnalyticsResponse {
  labels: string[];
  data: number[];
}

export interface PerformanceResponse {
  accuracy: number;
  precision: number;
  recall: number;
  f1_score: number;
}

export interface HealthSummaryResponse {
  overall_health: number;
  risk_factors: number;
  recommendations: string[];
}

export interface UserResponse {
  id: number;
  email: string;
  full_name: string;
  role: string;
}

const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`${response.status}: ${errorText}`);
  }
  return response.json();
};

export const apiService = {
  async predict(data: PredictionInput): Promise<PredictionResponse> {
    const response = await fetch(`${BASE_URL}/api/predict`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return handleResponse<PredictionResponse>(response);
  },

  async getRecommendations(data: RecommendationRequest): Promise<RecommendationResponse> {
    const response = await fetch(`${BASE_URL}/api/recommendations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return handleResponse<RecommendationResponse>(response);
  },

  async getDiseaseDistribution(): Promise<AnalyticsResponse> {
    const response = await fetch(`${BASE_URL}/api/analytics/disease-distribution`);
    return handleResponse<AnalyticsResponse>(response);
  },

  async getModelPerformance(): Promise<PerformanceResponse> {
    const response = await fetch(`${BASE_URL}/api/analytics/model-performance`);
    return handleResponse<PerformanceResponse>(response);
  },

  async getMonthlyPredictions(): Promise<AnalyticsResponse> {
    const response = await fetch(`${BASE_URL}/api/analytics/monthly-predictions`);
    return handleResponse<AnalyticsResponse>(response);
  },

  async getFeatureImportance(): Promise<AnalyticsResponse> {
    const response = await fetch(`${BASE_URL}/api/analytics/feature-importance`);
    return handleResponse<AnalyticsResponse>(response);
  },

  async getHealthSummary(): Promise<HealthSummaryResponse> {
    const response = await fetch(`${BASE_URL}/api/reports/health-summary`);
    return handleResponse<HealthSummaryResponse>(response);
  },

  async getUsers(): Promise<UserResponse[]> {
    const response = await fetch(`${BASE_URL}/api/users/`);
    return handleResponse<UserResponse[]>(response);
  },
};

export const predictionService = apiService;
