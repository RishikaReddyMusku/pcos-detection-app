from flask import Flask, request, jsonify
import tensorflow as tf
from PIL import Image
import numpy as np
from flask_cors import CORS
import os

app = Flask(__name__)

# Allow specific origin and all methods + headers
CORS(app, resources={r"/predict": {"origins": "https://pcos-detection-app.vercel.app"}}, supports_credentials=True)

model = tf.keras.models.load_model('model.keras')

def preprocess_image(image_path):
    img = Image.open(image_path).convert('RGB')
    img = img.resize((224, 224))
    img_array = np.array(img) / 255.0
    return np.expand_dims(img_array, axis=0)

@app.route('/predict', methods=['POST', 'OPTIONS'])  # <-- Add OPTIONS here
def predict():
    if request.method == 'OPTIONS':
        # CORS preflight handling
        return jsonify({'status': 'ok'}), 200

    image_file = request.files['file']
    image_path = f"./temp/{image_file.filename}"
    image_file.save(image_path)

    processed = preprocess_image(image_path)
    prediction = model.predict(processed)
    predicted_class = int(np.argmax(prediction))

    return jsonify({'prediction': predicted_class, 'confidence': float(np.max(prediction))})

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5001))
    app.run(host='0.0.0.0', port=port)
