from flask_cors import CORS
from flask import Flask, request, jsonify
from dotenv import load_dotenv
import os
import google.generativeai as genai

# Load environment variables
load_dotenv()

# Configure the API key
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

# Initialize Flask app
# app = Flask(__name__)
# from flask_cors import CORS

app = Flask(__name__)
# CORS(app)
# CORS(app, origins=["http://localhost:5173"])
CORS(app, origins=["*"])  # Allow all origins


# Function to get the response from the Gemini API


def get_gemini_response(ingredients, prompt):
    model = genai.GenerativeModel('gemini-1.5-flash')
    response = model.generate_content([ingredients, prompt])
    return response.text

# Define the route for calculating calories


@app.route('/calculate-calories', methods=['POST'])
def calculate_calories():
    data = request.json
    ingredients = data.get("ingredients", "")

    if not ingredients:
        return jsonify({"error": "No ingredients provided"}), 400

    input_prompt = """
    You are a nutritionist expert. Given a list of ingredients, calculate the total calories and provide a detailed breakdown 
    of each ingredient's calorie intake in the following format:
    
    1. Item 1 - number of calories
    2. Item 2 - number of calories
    ----
    Please include a summary of the total calorie count as well.
    """

    try:
        response = get_gemini_response(ingredients, input_prompt)
        return jsonify({"calorie_breakdown": response}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True, port=4000)
