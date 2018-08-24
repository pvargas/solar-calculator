from flask import Flask, g, jsonify, Response, request
import config as config

app = Flask(__name__)

@app.route('/')
def render():
    return 'Solar Calculator'


if __name__ == '__main__':
    app.run(debug=config.DEBUG, threaded=config.THREADED)