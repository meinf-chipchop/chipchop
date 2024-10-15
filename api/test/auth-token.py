import requests

endpoint = "http://localhost:8000/api/tokens/"

data = {
    "username": "admin",
    "password": "admin",
}

r = requests.post(
    endpoint,
    json=data
)

print(r.text)