
# below working perfectly
# import os
# import torch
# import numpy as np
# import cv2
# from flask import Flask, request, jsonify
# from flask_cors import CORS  # Importing CORS
# from detectron2.engine import DefaultPredictor
# from detectron2.config import get_cfg
# from detectron2 import model_zoo
# from detectron2.utils.visualizer import Visualizer
# from detectron2.data import MetadataCatalog

# # Initialize the Flask app
# app = Flask(__name__)

# # Enable CORS for all routes
# CORS(app)

# # Set up the Detectron2 configuration
# cfg = get_cfg()
# cfg.merge_from_file(model_zoo.get_config_file("COCO-Detection/faster_rcnn_R_50_FPN_3x.yaml"))

# # Load the trained model's weights 
# cfg.MODEL.WEIGHTS = "model_final.pth"  # Path to your trained model
# cfg.MODEL.ROI_HEADS.SCORE_THRESH_TEST = 0.5  # Set a threshold for this model
# cfg.MODEL.ROI_HEADS.NUM_CLASSES = 25  # Update this to the number of classes in your dataset
# cfg.MODEL.DEVICE = "cuda" if torch.cuda.is_available() else "cpu"

# # Initialize the predictor
# predictor = DefaultPredictor(cfg)

# # Define a route for testing if the server is running
# @app.route('/')
# def home():
#     return "Detectron2 Model Inference API is Running!"

# # Define the prediction route
# @app.route('/predict', methods=['POST'])
# def predict():
#     if 'image' not in request.files:
#         return jsonify({"error": "No image file provided"}), 400

#     file = request.files['image']
#     image = cv2.imdecode(np.frombuffer(file.read(), np.uint8), cv2.IMREAD_COLOR)

#     # Make predictions
#     outputs = predictor(image)
    
#     # Process the outputs
#     instances = outputs['instances'].to("cpu")
#     pred_classes = instances.pred_classes.numpy()
#     pred_boxes = instances.pred_boxes.tensor.numpy()
#     scores = instances.scores.numpy()

#     # Optionally: Visualize the results (can be removed if you don't need visualization)
#     v = Visualizer(image[:, :, ::-1], MetadataCatalog.get(cfg.DATASETS.TRAIN[0]), scale=0.8)
#     out = v.draw_instance_predictions(instances)
#     result_image = out.get_image()[:, :, ::-1]

#     # Prepare response
#     response = {
#         "predictions": [
#             {
#                 "class": int(cls),
#                 "bbox": box.tolist(),
#                 "score": float(score)
#             }
#             for cls, box, score in zip(pred_classes, pred_boxes, scores)
#         ]
#     }

#     # Optionally: Save or return the visualization image
#     # cv2.imwrite("result.jpg", result_image)
    
#     return jsonify(response)

# if __name__ == '__main__':
#     # Run the Flask app
#     app.run(host='0.0.0.0', port=5001)


import os
import torch
import numpy as np
import cv2
import requests
from io import BytesIO
from flask import Flask, request, jsonify
from flask_cors import CORS  # Importing CORS
from detectron2.engine import DefaultPredictor
from detectron2.config import get_cfg
from detectron2 import model_zoo
from detectron2.utils.visualizer import Visualizer
from detectron2.data import MetadataCatalog
from PIL import Image

# Initialize the Flask app
app = Flask(__name__)

# Enable CORS for all routes
CORS(app)

# Set up the Detectron2 configuration
cfg = get_cfg()
cfg.merge_from_file(model_zoo.get_config_file("COCO-Detection/faster_rcnn_R_50_FPN_3x.yaml"))

# Load the trained model's weights 
cfg.MODEL.WEIGHTS = "model_final.pth"  # Path to your trained model
cfg.MODEL.ROI_HEADS.SCORE_THRESH_TEST = 0.5  # Set a threshold for this model
cfg.MODEL.ROI_HEADS.NUM_CLASSES = 25  # Update this to the number of classes in your dataset
cfg.MODEL.DEVICE = "cuda" if torch.cuda.is_available() else "cpu"

# Initialize the predictor
predictor = DefaultPredictor(cfg)

# Define a route for testing if the server is running
@app.route('/')
def home():
    return "Detectron2 Model Inference API is Running!"

# Define the prediction route
@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.json:
        return jsonify({"error": "No image URL provided"}), 400

    image_url = request.json['image']
    
    try:
        # Download the image from the URL
        response = requests.get(image_url)
        response.raise_for_status()  # Raise an error for bad status codes
        
        # Convert the image to a format suitable for model processing
        img = Image.open(BytesIO(response.content))
        img = np.array(img)

        # Make predictions
        outputs = predictor(img)

        # Process the outputs
        instances = outputs['instances'].to("cpu")
        pred_classes = instances.pred_classes.numpy()
        pred_boxes = instances.pred_boxes.tensor.numpy()
        scores = instances.scores.numpy()

        # Optionally: Visualize the results (can be removed if you don't need visualization)
        v = Visualizer(img[:, :, ::-1], MetadataCatalog.get(cfg.DATASETS.TRAIN[0]), scale=0.8)
        out = v.draw_instance_predictions(instances)
        result_image = out.get_image()[:, :, ::-1]

        # Prepare response
        response = {
            "predictions": [
                {
                    "class": int(cls),
                    "bbox": box.tolist(),
                    "score": float(score)
                }
                for cls, box, score in zip(pred_classes, pred_boxes, scores)
            ]
        }

        # Optionally: Save or return the visualization image
        # cv2.imwrite("result.jpg", result_image)

        return jsonify(response)

    except requests.exceptions.RequestException as e:
        return jsonify({"error": f"Failed to download image: {str(e)}"}), 400
    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500


if __name__ == '__main__':
    # Run the Flask app
    app.run(host='0.0.0.0', port=5001)
