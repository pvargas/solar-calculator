from flask import Flask, render_template
#from flask import Flask, g, jsonify, Response, request, render_template
import config as config

app = Flask(__name__)

@app.route('/')
def render(map_key=config.MAPS_KEY):
    return render_template('index.html', map_key=map_key)


if __name__ == '__main__':
    app.run(debug=config.DEBUG, threaded=config.THREADED)