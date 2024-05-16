from flask import Flask, request, jsonify
import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.cluster import KMeans
from sqlalchemy import create_engine

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

# Load the data from the database
engine = create_engine(connection_string)

# SQL query to fetch specific data from FactAlco and DimProduitAlco
query = """
SELECT 
    f.Humidite,
    f.Fine,
    f.Amidon,
    d.produit_Alco_id,
    d.Groupe,
    d.Type_de_produit,
    d.Probleme
FROM FactAlco AS f
JOIN DimProduitAlco AS d ON f.produit_Alco_FK = d.produit_Alco_id
"""

# Execute the query and load data into a DataFrame
df = pd.read_sql(query, engine)

# Preprocessing
df['Type_de_produit'] = df['Type_de_produit'].astype(str)
df['Groupe'] = df['Groupe'].astype(str)

# Select relevant columns for clustering
data = df[['Humidite', 'Fine']]

# Replace empty strings with NaN
data.replace('', pd.NA, inplace=True)

# Drop rows with missing values
data.dropna(inplace=True)

# Initialize the scaler
scaler = StandardScaler()

# Fit and transform the data
scaled_data = scaler.fit_transform(data)

# Apply K-means clustering
kmeans = KMeans(n_clusters=3, random_state=42)
clusters = kmeans.fit_predict(scaled_data)

# Add clustering information to the DataFrame
data['Cluster'] = clusters

@app.route('/cluster', methods=['POST'])
def cluster():
    if request.method == 'POST':
        # Extract data from the JSON request body
        request_data = request.json
        humidite = float(request_data['humidite'])
        fine = float(request_data['fine'])
        # Scale the input data
        input_data = scaler.transform([[humidite, fine]])
        # Predict the cluster
        cluster = kmeans.predict(input_data)
        # Return JSON response
        return jsonify(cluster=int(cluster[0]))
    else:
        return 'Method not allowed', 405

if __name__ == '__main__':
    app.run(debug=True, port=6002)