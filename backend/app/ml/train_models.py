import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from xgboost import XGBClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report
import joblib
import os

# Create directory for trained models if it doesn't exist
os.makedirs(os.path.join(os.path.dirname(__file__), "../../trained_models"), exist_ok=True)

def generate_synthetic_data(n_samples=10000):
    """Generate synthetic medical data for demonstration"""
    np.random.seed(42)
    
    # Features
    age = np.random.randint(18, 90, n_samples)
    gender = np.random.choice([0, 1], n_samples)  # 0: Male, 1: Female
    height = np.random.normal(170, 10, n_samples)
    weight = np.random.normal(75, 15, n_samples)
    blood_pressure = np.random.normal(120, 15, n_samples)
    cholesterol = np.random.normal(200, 30, n_samples)
    glucose = np.random.normal(100, 20, n_samples)
    heart_rate = np.random.normal(75, 10, n_samples)
    bmi = weight / ((height / 100) ** 2)
    
    X = pd.DataFrame({
        'age': age,
        'gender': gender,
        'height': height,
        'weight': weight,
        'blood_pressure': blood_pressure,
        'cholesterol': cholesterol,
        'glucose': glucose,
        'heart_rate': heart_rate,
        'bmi': bmi
    })
    
    # Generate targets for different diseases
    y_heart = (
        (age > 50) & 
        (blood_pressure > 140) & 
        (cholesterol > 240) & 
        (np.random.rand(n_samples) > 0.3)
    ).astype(int)
    
    y_diabetes = (
        (age > 45) & 
        (glucose > 126) & 
        (bmi > 30) & 
        (np.random.rand(n_samples) > 0.4)
    ).astype(int)
    
    y_kidney = (
        (age > 60) & 
        (blood_pressure > 150) & 
        (glucose > 140) & 
        (np.random.rand(n_samples) > 0.5)
    ).astype(int)
    
    y_liver = (
        (bmi > 35) & 
        (cholesterol > 250) & 
        (np.random.rand(n_samples) > 0.6)
    ).astype(int)
    
    y_stroke = (
        (age > 65) & 
        (blood_pressure > 160) & 
        (np.random.rand(n_samples) > 0.7)
    ).astype(int)
    
    return X, {
        'heart_disease': y_heart,
        'diabetes': y_diabetes,
        'kidney_disease': y_kidney,
        'liver_disease': y_liver,
        'stroke': y_stroke
    }

def train_and_save_model(X, y, model_name, model_type='random_forest'):
    """Train a model and save to disk"""
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    if model_type == 'random_forest':
        model = RandomForestClassifier(
            n_estimators=100,
            max_depth=10,
            random_state=42
        )
    else:
        model = XGBClassifier(
            n_estimators=100,
            max_depth=6,
            learning_rate=0.1,
            random_state=42,
            eval_metric='logloss'
        )
    
    model.fit(X_train, y_train)
    
    # Evaluate
    y_pred = model.predict(X_test)
    accuracy = accuracy_score(y_test, y_pred)
    print(f"\n{model_name} - Accuracy: {accuracy:.4f}")
    print(classification_report(y_test, y_pred))
    
    # Save model
    model_path = os.path.join(os.path.dirname(__file__), f"../../trained_models/{model_name}.joblib")
    joblib.dump(model, model_path)
    print(f"Model saved to {model_path}")
    
    return model

def main():
    print("Generating synthetic medical data...")
    X, targets = generate_synthetic_data()
    
    print("\n=== Training Disease Prediction Models ===")
    
    # Train models for each disease
    disease_configs = [
        ('heart_disease', 'Heart Disease', 'xgboost'),
        ('diabetes', 'Diabetes', 'random_forest'),
        ('kidney_disease', 'Chronic Kidney Disease', 'xgboost'),
        ('liver_disease', 'Liver Disease', 'random_forest'),
        ('stroke', 'Stroke', 'xgboost')
    ]
    
    trained_models = {}
    for key, name, model_type in disease_configs:
        trained_models[name] = train_and_save_model(X, targets[key], key, model_type)
    
    print("\n=== All models trained and saved successfully! ===")

if __name__ == "__main__":
    main()
