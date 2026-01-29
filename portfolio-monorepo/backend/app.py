import uvicorn
import json
import os
import logging
from service.education import get_education
from service.experience import get_experience
from service.skills import get_skills
from service.publications import get_publications
from service.affiliations import get_affiliations
from service.home import get_homepage
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    datefmt='%Y-%m-%d %H:%M:%S'
)
logger = logging.getLogger(__name__)

origins = [
    "http://localhost:3000",             
    "https://shivam-shrivastava-portfolio.netlify.app/"
]
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup_event():
    logger.info("FastAPI application starting up")
    logger.info(f"CORS enabled for origins: {origins}")

# Define all data paths
PROJECTS_PATH = os.path.join(os.path.dirname(__file__), 'data', 'projects_content.json')
EDUCATION_DATA_PATH = os.path.join(os.path.dirname(__file__), 'data', 'education_content.json')
EXPERIENCE_DATA_PATH = os.path.join(os.path.dirname(__file__), 'data', 'experience_content.json')
SKILLS_DATA_PATH = os.path.join(os.path.dirname(__file__), 'data', 'skills_content.json')
PUBLICATIONS_DATA_PATH = os.path.join(os.path.dirname(__file__), 'data', 'publications_content.json')
AFFILIATIONS_DATA_PATH = os.path.join(os.path.dirname(__file__), 'data', 'affiliations_content.json')
ABOUT_DATA_PATH = os.path.join(os.path.dirname(__file__), 'data', 'homepage_content.json')

logger.info(f"Loading content from: {PROJECTS_PATH}")
try:
    with open(PROJECTS_PATH) as f:
        content = json.load(f)
    logger.info(f"Successfully loaded content.json with {len(content)} sections")
except FileNotFoundError:
    logger.error(f"Content file not found: {PROJECTS_PATH}")
    content = {}
except json.JSONDecodeError as e:
    logger.error(f"Failed to parse JSON from {PROJECTS_PATH}: {e}")
    content = {}

@app.get("/")
def read_root():
    logger.info("GET / - Root endpoint accessed")
    return {"message": "Thanks for visiting my portfolio!"}

@app.get("/api/projects")
def get_projects():
    logger.info("GET /api/projects - Fetching projects")
    projects = content.get('projects', [])
    logger.info(f"Returning {len(projects)} projects")
    return projects

@app.get("/api/{section}")
def get_section(section: str):
    logger.info(f"GET /api/{section} - Fetching section: {section}")
    try:
        if section == "education":
            return get_education(EDUCATION_DATA_PATH)
        elif section == "experience" or section == "career":
            return get_experience(EXPERIENCE_DATA_PATH)
        elif section == "skills":
            return get_skills(SKILLS_DATA_PATH)
        elif section == "publications":
            return get_publications(PUBLICATIONS_DATA_PATH)
        elif section == "affiliations":
            return get_affiliations(AFFILIATIONS_DATA_PATH)
        # [New Condition]
        elif section == "about":
            logger.info(f"Loading about data from: {ABOUT_DATA_PATH}")
            about_data = get_homepage(ABOUT_DATA_PATH)
            logger.info(f"Successfully retrieved about data")
            return about_data
        else:
            section_data = content.get(section, {})
            if section_data:
                logger.info(f"Found section '{section}' in content")
            else:
                logger.warning(f"Section '{section}' not found in content")
            return section_data
    except Exception as e:
        logger.error(f"Error fetching section '{section}': {e}", exc_info=True)
        raise

if __name__ == '__main__':
    logger.info("Starting FastAPI server on http://0.0.0.0:8000")
    uvicorn.run('app:app', host='0.0.0.0', port=8000, reload=True)