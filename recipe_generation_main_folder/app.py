from flask import Flask, request, jsonify
from transformers import AutoModelForSeq2SeqLM, AutoTokenizer
from flask_cors import CORS
# from flask_cors import CORS

app = Flask(__name__)
# CORS(app)
# CORS(app, origins=["http://localhost:5173"])
CORS(app, origins=["*"])  # Allow all origins

# CORS configuration for allowing specific headers and methods
# CORS(app, origins="http://localhost:5173", supports_credentials=True, methods=["GET", "POST", "OPTIONS"],
#      allow_headers=["Content-Type", "Authorization"])
# Load the model and tokenizer
MODEL_NAME_OR_PATH = "flax-community/t5-recipe-generation"
tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME_OR_PATH, use_fast=True)
model = AutoModelForSeq2SeqLM.from_pretrained(MODEL_NAME_OR_PATH)

# Define generation parameters
generation_kwargs = {
    "max_length": 512,
    "min_length": 64,
    "no_repeat_ngram_size": 3,
    "do_sample": True,
    "top_k": 60,
    "top_p": 0.95
}

prefix = "items: "
special_tokens = tokenizer.all_special_tokens
tokens_map = {
    "<sep>": "--",
    "<section>": "\n"
}


def skip_special_tokens(text, special_tokens):
    for token in special_tokens:
        text = text.replace(token, "")
    return text


def target_postprocessing(texts, special_tokens):
    if not isinstance(texts, list):
        texts = [texts]

    new_texts = []
    for text in texts:
        text = skip_special_tokens(text, special_tokens)
        for k, v in tokens_map.items():
            text = text.replace(k, v)
        new_texts.append(text)
    return new_texts


def generate_recipe(items):
    inputs = [prefix + inp for inp in items]
    inputs = tokenizer(
        inputs,
        max_length=256,
        padding="max_length",
        truncation=True,
        return_tensors="pt"
    )
    input_ids = inputs.input_ids
    attention_mask = inputs.attention_mask

    output_ids = model.generate(
        input_ids=input_ids,
        attention_mask=attention_mask,
        **generation_kwargs
    )

    generated = output_ids
    generated_recipe = target_postprocessing(
        tokenizer.batch_decode(generated, skip_special_tokens=False),
        special_tokens
    )
    return generated_recipe


@app.route('/generate-recipe', methods=['POST'])
# @app.route('/generate-recipe', methods=['OPTIONS'])
# def handle_options():
#     response = jsonify()
#     # Specify the allowed origin
#     response.headers['Access-Control-Allow-Origin'] = 'http://localhost:5173'
#     # Allow headers for the request
#     response.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'
#     # Allow methods
#     response.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS'
#     return response
def generate_recipe_endpoint():
    data = request.json
    ingredients_list = data.get("ingredients", [])
    if not ingredients_list:
        return jsonify({"error": "No ingredients provided"}), 400

    try:
        recipes = generate_recipe(ingredients_list)
        return jsonify({"recipes": recipes})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)
