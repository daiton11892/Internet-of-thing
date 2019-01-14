from flask import Flask, jsonify, request, json
from flask_pymongo import PyMongo
from flask_cors import CORS

app = Flask(__name__)
CORS(app, supports_credentials=True)

#Khai báo đường dẫn MongoDB
app.config['MONGO_DBNAME'] = 'mydb'
app.config['MONGO_URI'] = 'mongodb://10.10.0.1:27017/mydb'

mongo = PyMongo(app)

# Lấy toàn bộ toàn nội dung trong database
@app.route('/sensor', methods=['GET'])
def get_all_sensor():
	sensor = mongo.db.mycol
	output = []
	for s in sensor.find():
		output.append({'time' : s['time'], 'topic' : s['topic'], 'value' : s['value']})
	return jsonify({'result' : output})

# Lấy nội dung theo topic
@app.route('/sensor/<topic>', methods=['GET'])
def get_all_sensor_topic(topic):
	sensor = mongo.db.mycol
	output = []
	for s in sensor.find({'topic' : topic}):
		output.append({'time' : s['time'], 'topic' : s['topic'], 'value' : s['value']})
	return jsonify({'result' : output})

# Lây data mới nhất từ dữ liệu
@app.route('/sensor/<topic>_one', methods=['GET'])
def get_one_sensor_topic(topic):
	sensor = mongo.db.mycol
	output = []
	s = sensor.find_one({"$query":{'topic' : topic},"$orderby":{'_id':-1}})
	if s:
		output = {'time' : s['time'], 'topic' : s['topic'], 'value' : s['value']}
	else:
		output = 'No result found'
	return jsonify({'result' : output})
	
if __name__=='__main__':
	app.run(debug=True,host='0.0.0.0')