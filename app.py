import json
import google.generativeai as genai
from flask import Flask, request, jsonify, render_template
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend access

# ✅ Gemini Pro API Setup
GEMINI_API_KEY = "AIzaSyBc2mJ6_r6H1VeIt8-PBfwtERcBMoIwKz8"  # Replace with your actual API Key
genai.configure(api_key=GEMINI_API_KEY)

# Load FAQ Data
try:
    with open("faq_data.json", "r", encoding="utf-8") as file:
        faq_data = json.load(file)
except FileNotFoundError:
    print("⚠️ Error: 'faq_data.json' not found. Make sure the file is in the project folder.")
    faq_data = []

# Function to check predefined FAQ answers
def find_faq_answer(query):
    for item in faq_data:
        if query.lower() in item["question"].lower():
            return item["answer"]
    return None  # No match found

# ✅ Function to call Gemini Pro API
def fetch_gemini_response(query):
    try:
        model = genai.GenerativeModel("gemini-pro")  # Gemini Pro model
        response = model.generate_content(query)

        # ✅ Debugging: Print API response in terminal
        print(f"🔹 Gemini API Response: {response.text}")

        return response.text

    except Exception as e:
        print(f"⚠️ Gemini API Error: {e}")
        return "⚠️ Gemini AI service is currently unavailable. Please try again later."

# Main function to process user queries (Hybrid: FAQ + Gemini AI)
def fetch_response(query):
    faq_answer = find_faq_answer(query)
    if faq_answer:
        return faq_answer  # Return predefined answer if found ✅
    
    return fetch_gemini_response(query)  # Return AI response ✅

# Flask API route for chatbot responses
@app.route("/chat", methods=["POST"])
def chat():
    try:
        user_input = request.json.get("query")
        if not user_input:
            return jsonify({"response": "⚠️ Invalid request. Please send a valid query."}), 400

        ai_response = fetch_response(user_input)
        return jsonify({"response": ai_response})
    except Exception as e:
        print(f"⚠️ Internal Server Error: {e}")
        return jsonify({"response": "⚠️ An error occurred on the server. Please try again."}), 500

# Route to serve frontend UI
@app.route("/")
def home():
    return render_template("index.html")

# Run Flask Server
if __name__ == "__main__":
    app.run(debug=True)
