from flask import Flask

app = Flask(__name__)

# Members API Route
@app.route("/members")
def members():
    return {"members": ["Members1", "Members2", "Members3"]}

if __name__ == "__main__":
    app.run(debug=True)
    