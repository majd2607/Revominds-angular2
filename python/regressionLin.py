from flask import Flask, jsonify, request
from sqlalchemy import create_engine
import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestRegressor
import joblib
from flask_cors import CORS  # Import CORS class    

app = Flask(__name__)
CORS(app)  # Add this line to enable CORS for all routes

# Database setup
dbname = 'lastberasmiNchalah'
user = ''  # Replace with the correct username
password = '********'  # Replace with the correct password
host = 'DESKTOP-FDCR8VU'
port = '1433'
driver = 'ODBC Driver 17 for SQL Server'
connection_string = f'mssql+pyodbc://{user}:{password}@{host}:{port}/{dbname}?driver={driver}'
engine = create_engine(connection_string)

# Load the trained model
random_forest_model = joblib.load('C:/Users/majd/Documents/linear_regression_model_sboula_akhira.pkl')

@app.route('/data', methods=['GET'])
def get_data():
    query = "SELECT Qt_BL_qx, distance FROM Fact_Stpa_Sboula"
    df = pd.read_sql_query(query, engine)
    return jsonify(df.to_dict(orient='records'))

@app.route('/predict/random_forest', methods=['POST'])
def predict_rf():
    data = request.get_json()
    if not data or 'Qt_BL_qx' not in data:
        return jsonify({'error': 'Missing required parameters'}), 400
    X_test = np.array([[data['Qt_BL_qx']]])
    prediction = random_forest_model.predict(X_test)
    return jsonify({'prediction': prediction.tolist()})

if __name__ == '__main__':
    app.run(debug=True, port=5550)