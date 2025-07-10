from flask import Flask, render_template, jsonify
import random
import requests

app = Flask(__name__)

def roll_dice():
    return random.randint(1, 6)

def generate_positive_sentence():
    # prompt = "Generate one short positive sentence about good fortune (4-10 words):"
    # try:
    #     response = requests.post('https://mlvoca.com/api/generate', 
    #                            json={"model": "deepseek-r1:1.5b", "prompt": prompt})
    #     return response.json()['response']
    # except:
    return "Good luck is coming your way!"

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/roll')
def roll():
    dice_value = roll_dice()
    sentence = generate_positive_sentence()
    return jsonify({'dice': dice_value, 'sentence': sentence})

if __name__ == '__main__':
    app.run(debug=True)
