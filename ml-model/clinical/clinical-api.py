# import pickle
# from flask import Flask, request, jsonify
# import numpy as np
# from flask_cors import CORS

# app = Flask(__name__)
# CORS(app)  # This allows all origins (you can restrict it later)


# # app = Flask(__name__)

# # Load your model
# with open('model_catboost.pkl', 'rb') as f:
#     model = pickle.load(f)

# @app.route('/clinical/submit', methods=['POST'])
# def predict_pcos():
#     data = request.get_json()

#     feature_order = [
#         'age','weight','height','bmi','bloodGroup', 'hb', 'cycle', 'cycleLength', 'marriageYears', 'pregnant', 'abortions',
#         'betaHCG1', 'betaHCG2', 'fsh', 'lh', 'fshLhRatio', 'hip', 'waist', 'waistHipRatio',
#         'tsh', 'amh', 'prl', 'vitD3', 'prg', 'rbs', 'weightGain', 'hairGrowth',
#         'skinDarkening', 'hairLoss', 'pimples', 'fastFood', 'regularExercise',
#         'bpSys', 'bpDia', 'follicleL', 'follicleR', 'avgFL', 'avgFR', 'endometrium'
#     ]

#     flat_data = {
#         **data['bloodTest'],
#         **data['reproductiveHealth'],
#         **data['bodyMetrics'],
#         **data['lifestyleAndSymptoms']
#     }

#     # Convert all inputs to numeric
#     def convert(val):
#         if val in ['Y', 'y']:
#             return 1
#         if val in ['N', 'n']:
#             return 0
#         try:
#             return float(val)
#         except:
#             return 0

#     ordered_values = [convert(flat_data.get(feat, 0)) for feat in feature_order]
#     input_array = np.array([ordered_values])

#     prediction = model.predict(input_array)[0]

#     return jsonify({'pcos_prediction': int(prediction)})

# if __name__ == '__main__':
#     app.run(debug=True)


import pickle
from flask import Flask, request, jsonify
import numpy as np
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)  # This allows all origins (you can restrict it later)

# Load your model
with open('clinical_catboost.pkl', 'rb') as f:
    model = pickle.load(f)
@app.route('/ping')
def ping():
    app.logger.debug("Ping route hit!")
    return 'pong'

@app.route('/clinical/submit', methods=['POST'])
def predict_pcos():
    data = request.get_json()
    # print(f"Received Data: {data}")
    app.logger.debug(f"Received Data: {data}")

    feature_order = [
        'age', 'weight', 'height', 'bmi', 'bloodGroup', 'hb', 'cycle', 'cycleLength', 'marriageYears', 'pregnant', 'abortions',
        'betaHCG1', 'betaHCG2', 'fsh', 'lh', 'fshLhRatio', 'hip', 'waist', 'waistHipRatio',
        'tsh', 'amh', 'prl', 'vitD3', 'prg', 'rbs', 'weightGain', 'hairGrowth',
        'skinDarkening', 'hairLoss', 'pimples', 'fastFood', 'regularExercise',
        'bpSys', 'bpDia', 'follicleL', 'follicleR', 'avgFL', 'avgFR', 'endometrium'
    ]

    flat_data = {
        **data['medicalProfile'],
        **data['bloodTest'],
        **data['reproductiveHealth'],
        **data['bodyMetrics'],
        **data['lifestyleAndSymptoms']
    }
    

    # Convert all inputs to numeric
    def convert(val):
        if val in ['Y', 'y']:
            return 1
        if val in ['N', 'n']:
            return 0
        if val == "" or val is None:
            return 0
        try:
            return float(val)
        except:
            return 0

    ordered_values = [convert(flat_data.get(feat, 0)) for feat in feature_order]
    # app.logger.debug(f"Ordered Data: {ordered_values}")
    input_array = np.array([ordered_values])
#     user_input2=np.array([[
#      37, 65, 148, 0, 13, 72, 20, 12.0, 2, 5, 4, 0, 0,
#     1.99, 1.99, 8.06, 2.36, 0, 42, 36, 0, 16.41, 1.22, 36.9, 33.4,
#     0.36, 76, 0, 0, 0, 0, 0, 0, 0, 120, 70, 2, 2, 15, 14, 7.5
# ]]
# )
    # app.logger.debug(f"input Data: {user_input2}")
    # Predict PCOS
    # pp=model.predict(user_input2)[0]
    # app.logger.debug(f"Prediction:{pp}")
    prediction = model.predict(input_array)[0]

    # Return clinical data and prediction in the response
    print(f"Prediction: {prediction}")
    app.logger.debug(f"Prediction: {prediction}")

    return jsonify({
         'message': 'Clinical data submitted successfully',
        'pcos_prediction': int(prediction), 
         'check':1,
         # Include the prediction result
        'clinical': data  # Optionally, you can send the clinical data back as well

    })

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5002))  # Use dynamic port
    app.run(debug=True, port=port, host='0.0.0.0')
