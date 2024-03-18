from flask import Flask, render_template, request, jsonify, redirect, url_for
from dotenv import load_dotenv
import os
import requests

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)

# Home route
@app.route("/")
def home():
    message = request.args.get("message")
    return render_template("index.html", message=message)

# Contact form route
@app.route("/contact/", methods=["POST"])
def contact():
    name = request.form.get("name")
    email = request.form.get("email")
    message = request.form.get("message")

    # Construct payload for Discord webhook
    payload = {
        "content": f"New message\nName: {name}\nE-mail: {email}\nMessage: {message}"
    }

    # Make HTTP POST request to Discord webhook
    webhook_url = os.getenv("DISCORD_WEBHOOK_URL")
    if webhook_url:
        response = requests.post(webhook_url, json=payload)
        if response.ok:
            return redirect(url_for("home", message="Message sent successfully."))
        else:
            return redirect(url_for("home", message="Failed to send message. Please try again later."))
    else:
        return redirect(url_for("home", message="Discord webhook URL not found."))

if __name__ == "__main__":
    app.run(debug=True)
