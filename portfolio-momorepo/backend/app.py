import uvicorn
import json, os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

DATA_PATH = os.path.join(os.path.dirname(__file__), 'data', 'content.json')

with open(DATA_PATH) as f:
    content = json.load(f)

@app.get("/api/projects")
def get_projects():
    return content.get('projects', [])

@app.get("/api/{section}")
def get_section(section: str):
    return content.get(section, {})

if __name__ == '__main__':
    uvicorn.run('app:app', host='0.0.0.0', port=8000, reload=True)