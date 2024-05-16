import pandas as pd
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score
from sqlalchemy import create_engine
import statsmodels.api as sm

# Database credentials
dbname = 'lastberasmiNchalah'
user = ''  # Remplacez par le nom d'utilisateur correct
password = '********'  # Remplacez par le mot de passe correct
host = 'DESKTOP-FDCR8VU'
port = '1433'
driver = 'ODBC Driver 17 for SQL Server'  # Assurez-vous que ce pilote est installé
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

# Display the DataFrame to confirm successful data load
print(df)
# Convertir toutes les colonnes en float, gérer les erreurs de conversion
for column in df.columns:
    df[column] = pd.to_numeric(df[column], errors='coerce')

# Supprimer les lignes avec des valeurs manquantes
df = df.dropna()

# Préparer les données pour la régression
X = df.drop('Durabilite', axis=1)  # Toutes les colonnes sauf 'Durete'
y = df['Durabilite']  # Colonne 'Durete'

# Diviser les données en ensembles d'entraînement et de test
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Utiliser Statsmodels pour la régression
X_train_sm = sm.add_constant(X_train)  # Ajouter une constante pour l'intercept
model_sm = sm.OLS(y_train, X_train_sm)
results_sm = model_sm.fit()
print("Résultat avec Statsmodels:")
print(results_sm.summary())

# Utiliser Scikit-learn pour la régression
model_sk = LinearRegression()
model_sk.fit(X_train, y_train)
y_pred = model_sk.predict(X_test)

# Évaluer le modèle
mse = mean_squared_error(y_test, y_pred)
r2 = r2_score(y_test, y_pred)
print("\nRésultat avec Scikit-learn:")
print(f"Erreur quadratique moyenne (MSE): {mse}")
print(f"Coefficient de détermination (R²): {r2}")
# Enregistrer le modèle dans un fichier nommé 'model.pkl'

import joblib
from flask import Flask, request,render_template , jsonify
joblib.dump(model_sk, 'linear_model.pkl')

from flask import Flask, request, render_template, jsonify
import numpy as np
import joblib

# Créez l'application Flask
app = Flask(__name__)

# Chargez le modèle à partir du fichier joblib
model = joblib.load("linear_model.pkl")

# Route pour l'index (page d'accueil)
@app.route("/")
def home():
    return render_template("index.html")

# Route pour la prédiction
def classer_criteres(prediction):
    if prediction > 80:
        return "Conforme"
    elif 70 <= prediction <= 80:
        return "Acceptable"
    else:
        return "Non conforme"

@app.route('/predict', methods=['POST'])
def predict():
    # Extraire les données du formulaire
    data = request.form
    humidite = float(data['Humidite'])
    proteine = float(data['Proteine'])
    durete = float(data['Durete'])
    aw = float(data['Aw'])
    fine = float(data['Fine'])
    cendre = float(data['Cendre'])
    fibre = float(data['Fibre'])
    amidon = float(data['Amidon'])

    # Créer l'input pour la prédiction
    input_data = [[humidite, proteine, durete, aw, fine, cendre, fibre, amidon]]

    # Faire la prédiction
    prediction = model.predict(input_data)[0]  # obtenir la première prédiction

    # Classer la prédiction selon les critères d'acceptation
    prediction_class = classer_criteres(prediction)

    # Formatage de la prédiction et de la classe d'acceptation
    prediction_text = f"La prédiction est de {prediction:.2f}, ce qui est {prediction_class}"

    # Rendre la page index.html avec le texte de la prédiction
    return render_template('index.html', prediction_text=prediction_text)

# Lancer l'application Flask
if __name__ == "__main__":
    app.run(debug=True)