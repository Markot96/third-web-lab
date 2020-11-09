from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

vacanciesList = []


@app.route('/post', methods=['GET', 'POST'])
@cross_origin()
def post():
    data = request.get_json()
    vacanciesList.append(data)
    return jsonify(vacanciesList)


@app.route('/get', methods=['GET'])
@cross_origin()
def get():
    return jsonify(vacanciesList)


@app.route('/put/<id>', methods=['GET', 'PUT'])
def put(id):
    data = request.get_json()
    vacanciesList[int(id)] = data
    return jsonify(vacanciesList)


@app.route('/delete/<id>', methods=['GET', 'DELETE'])
def delete(id):
    vacanciesList.pop(int(id))
    return jsonify(vacanciesList)


if __name__ == '__main__':
    app.run(debug='True')
