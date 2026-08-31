from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS so frontend can communicate with backend

PRODUCTS = [
    {"id": 1, "name": "Sedan Car Engine Model A", "category": "Engine Parts"},
    {"id": 2, "name": "Brake Rotor Set Front", "category": "Braking System"},
    {"id": 3, "name": "Synthetic Motor Oil 5W-30", "category": "Fluids"},
    {"id": 4, "name": "All-Season Radial Tires", "category": "Tires"}
]

# Root endpoint to prevent "Not Found" error
@app.route('/', methods=['GET'])
def home():
    return jsonify({"message": "Product Details Microservice is active and running!"})

@app.route('/products', methods=['GET'])
def get_products():
    return jsonify({"status": "success", "products": PRODUCTS})

@app.route('/products/<int:product_id>', methods=['GET'])
def get_product(product_id):
    product = next((p for p in PRODUCTS if p["id"] == product_id), None)
    if product:
        return jsonify({"status": "success", "product": product})
    return jsonify({"status": "error", "message": "Product not found"}), 404

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)