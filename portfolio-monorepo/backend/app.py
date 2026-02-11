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
from service.projects import get_projects
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

@app.get("/")
def read_root():
    logger.info("GET / - Root endpoint accessed")
    return {"message": "Thanks for visiting my page!"}

@app.get("/api/{section}")
def get_section(section: str):
    logger.info(f"GET /api/{section} - Fetching section: {section}")
    try:
        if section == "projects":
            logger.info(f"Loading projects data from: {PROJECTS_PATH}")
            projects = get_projects(PROJECTS_PATH)
            logger.info(f"Returning {len(projects)} projects")
            return {"projects": projects}
        elif section == "education":
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
            logger.warning(f"Section '{section}' not found in configured API sections")
            return {}
    except Exception as e:
        logger.error(f"Error fetching section '{section}': {e}", exc_info=True)
        raise

if __name__ == '__main__':
    logger.info("Starting FastAPI server on http://0.0.0.0:8000")
    uvicorn.run('app:app', host='0.0.0.0', port=8000, reload=True)