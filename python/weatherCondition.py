from flask import Flask, jsonify, request
from sqlalchemy import create_engine
import pandas as pd
import requests

app = Flask(__name__)

# Database credentials and connection string
dbname = 'lastberasmiNchalah'
user = ''  # Replace with correct username
password = '********'  # Replace with correct password
host = 'DESKTOP-FDCR8VU'
port = '1433'
driver = 'ODBC Driver 17 for SQL Server'

connection_string = f'mssql+pyodbc://{user}:{password}@{host}:{port}/{dbname}?driver={driver}'
engine = create_engine(connection_string)

@app.route('/load_data', methods=['GET'])
def load_data():
    query = "SELECT * FROM DimGeo"
    df = pd.read_sql_query(query, engine)
    return df.to_json()

@app.route('/adjust_travel_time', methods=['POST'])
def adjust_travel_time():
    data = request.json
    df = pd.DataFrame(data)
    current_condition = get_weather_condition()
    print(current_condition)
    df['duree_trajet'] = pd.to_timedelta(df['duree_trajet'])
    df = apply_weather_delay(df, current_condition)
    # Add a column to the DataFrame with the current weather condition for each row
    df['current_weather'] = current_condition
    return df.to_json(orient='records')

def get_weather_condition():
    api_key = 'd311fcadb0d1d39297cfbacc6d7d83ac'
    location = 'Tunis'
    base_url = "http://api.openweathermap.org/data/2.5/weather"
    params = {'appid': api_key, 'q': location, 'units': 'metric'}
    response = requests.get(base_url, params=params)
    if response.ok:
        weather_data = response.json()
        return weather_data['weather'][0]['main'].lower()
    else:
        return "Weather data not found"

def apply_weather_delay(df, condition):
    if 'rain' in condition:
        df['adjusted_duree_trajet'] = df['duree_trajet'] + pd.Timedelta(minutes=20)
    elif 'storm' in condition:
        df['adjusted_duree_trajet'] = df['duree_trajet'] + pd.Timedelta(minutes=40)
    else:
        df['adjusted_duree_trajet'] = df['duree_trajet']
    return df

if __name__ == '__main__':
    app.run(debug=True, port=8780)

