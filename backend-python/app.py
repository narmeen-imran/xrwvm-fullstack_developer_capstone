from flask import Flask, jsonify, request
from flask_cors import CORS
import nltk
from nltk.sentiment import SentimentIntensityAnalyzer

# Download VADER lexicon for sentiment analysis
nltk.download('vader_lexicon', quiet=True)
sia = SentimentIntensityAnalyzer()

app = Flask(__name__)
CORS(app)

@app.route('/', methods=['GET'])
def home():
    return jsonify({"status": "Python Sentiment Microservice Running"})

@app.route('/analyze/<path:text>', methods=['GET'])
def analyze_sentiment(text):
    scores = sia.polarity_scores(text)
    compound = scores['compound']
    
    if compound >= 0.05:
        sentiment = "positive"
    elif compound <= -0.05:
        sentiment = "negative"
    else:
        sentiment = "neutral"
        
    return jsonify({
        "sentiment": sentiment,
        "label": sentiment.upper(),
        "score": compound
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)