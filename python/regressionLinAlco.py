from flask import Flask, request, jsonify
from sqlalchemy import create_engine
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score
import statsmodels.api as sm
import joblib

# Create a Flask app
app = Flask(__name__)
from flask_cors import CORS  # Import CORS class

CORS(app)  # Add this line to enable CORS for all routes

# Database credentials
dbname = 'lastberasmiNchalah'
user = ''  # Replace with the correct username
password = '********'  # Replace with the correct password
host = 'DESKTOP-FDCR8VU'
port = '1433'
driver = 'ODBC Driver 17 for SQL Server'  # Make sure this driver is installed
# Connection string format for SQLAlchemy with pyodbc
connection_string = f'mssql+pyodbc://{user}:{password}@{host}:{port}/{dbname}?driver={driver}'

# Create an SQLAlchemy engine
engine = create_engine(connection_string)

# SQL query to fetch specific data from FactAlco and DimProduitAlco
query = """
SELECT [Humidite], [Proteine], [Durabilite], [Aw], [Durete], [Fine], [Cendre], [Fibre], [Amidon]
FROM [FactAlco]
"""

# Execute the query and load data into a DataFrame
# Load data into a DataFrame
df = pd.read_sql(query, engine)

# Convert all columns to float, handle conversion errors
for column in df.columns:
    df[column] = pd.to_numeric(df[column], errors='coerce')

# Remove rows with missing values
df = df.dropna()

# Prepare data for regression
X = df.drop('Durabilite', axis=1)  # All columns except 'Durete'
y = df['Durabilite']  # Column 'Durete'

# Split data into training and test sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Use Statsmodels for regression
X_train_sm = sm.add_constant(X_train)  # Add a constant for the intercept
model_sm = sm.OLS(y_train, X_train_sm)
results_sm = model_sm.fit()

# Use Scikit-learn for regression
model_sk = LinearRegression()
model_sk.fit(X_train, y_train)

# Evaluate the model
y_pred = model_sk.predict(X_test)
mse = mean_squared_error(y_test, y_pred)
r2 = r2_score(y_test, y_pred)

# Save the model to a file named 'linear_model.pkl'
joblib.dump(model_sk, 'linear_model.pkl')

# Load the model from the file
model = joblib.load("linear_model.pkl")

# Route for the prediction
def classer_criteres(prediction):
    if prediction > 80:
        return "Conforme"
    elif 70 <= prediction <= 80:
        return "Acceptable"
    else:
        return "Non conforme"

@app.route('/predict', methods=['POST'])
def predict():
    # Extract JSON data from the request body
    data = request.get_json()
    humidite = float(data['Humidite'])
    proteine = float(data['Proteine'])
    durete = float(data['Durete'])
    aw = float(data['Aw'])
    fine = float(data['Fine'])
    cendre = float(data['Cendre'])
    fibre = float(data['Fibre'])
    amidon = float(data['Amidon'])

    # Create input for prediction
    input_data = [[humidite, proteine, durete, aw, fine, cendre, fibre, amidon]]

    # Make the prediction
    prediction = model.predict(input_data)[0]  # Get the first prediction

    # Classify the prediction according to acceptance criteria
    prediction_class = classer_criteres(prediction)

    # Format the prediction and acceptance class
    prediction_text = f"The prediction is {prediction:.2f}, which is {prediction_class}"

    # Return JSON response
    return jsonify(prediction=prediction, prediction_class=prediction_class)

# Launch the Flask application
if __name__ == "__main__":
    app.run(debug=True, port=6001)


