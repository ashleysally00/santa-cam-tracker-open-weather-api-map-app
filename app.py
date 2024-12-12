from flask import Flask, render_template
from flask_socketio import SocketIO
from weather import get_weather

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app, cors_allowed_origins="*")  # Add cors_allowed_origins

@app.route('/')
def index():
    return render_template('index.html')

@socketio.on('update_santa_position')
def handle_santa_position(data):
    lat = data['lat']
    lon = data['lon']
    weather_data = get_weather(lat, lon)
    socketio.emit('weather_update', weather_data)

if __name__ == '__main__':
    socketio.run(app, debug=True, host='0.0.0.0', port=8000)