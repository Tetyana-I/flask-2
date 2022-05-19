from flask import Flask, render_template, request, jsonify
from random import randint
import requests

app = Flask(__name__)

def get_facts(num, year): 
    try:
        num_fact = requests.get(f"http://numbersapi.com/{num}")
        year_fact = requests.get(f"http://numbersapi.com/{year}")
        return [num_fact.text, year_fact.text]
    except:
        return ["Couldn't get an interesting fact for your lucky number",
         "Couldn't get an interesting fact for your birthday year"]

@app.route("/")
def homepage():
    """Show homepage."""

    return render_template("index.html")


@app.route("//api/get-lucky-num", methods=["POST"])
def get_lucky_results():
    """Creates results from form data & returns it.

    Returns JSON, for example: {
        "num": {
            "fact": "67 is the number of throws in Judo.",
            "num": 67
        },
        "year": {
            "fact": "1950 is the year that nothing remarkable happened.",
            "year": "1950"
        }
        }
    """
    errors = {}
    name = request.json["name"]
    email = request.json["email"]
    color = request.json["color"]
    year = request.json["year"]

################################
# validation
################################

    if name == "":
        errors["name"] = "This field is required." 

    if email == "":
        errors["email"] = "This field is required." 

    colors = ("red", "green", "orange", "blue")
    current_errors = []
    if color == "":
        current_errors.append("This field is required.")
    if color not in colors: 
        current_errors.append("Invalid value, must be one of: red, green, orange, blue.")
    
    if current_errors:
        errors["color"] = current_errors

    current_errors = []
    if year == "":
        current_errors.append("This field is required.")
    if year < 1900 or year > 2000: 
        current_errors.append("Invalid value, must be between 1900 and 2000, inclusive")

    if current_errors:
        errors["year"] = current_errors

    if errors:
        return jsonify(errors)

####################################
# end of validation
####################################
    
    num = randint(1,100)
    print("Start get_facts")
    get_facts(num, year) 
    [num_fact, year_fact] = get_facts(num, year) 

    lucky_results = {
        "num": {
            "num": num,
            "fact": num_fact
        },
        "year": {
            "year": year,
            "fact": year_fact
        } 
    }

    return jsonify(lucky_results)

