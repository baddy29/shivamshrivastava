import json
import logging

logger = logging.getLogger(__name__)


def get_projects(data_path: str):
    """
    Load projects data from the given JSON file and return the `projects` list.
    """
    logger.info(f"Loading projects data from: {data_path}")
    try:
        with open(data_path) as f:
            projects_content = json.load(f)
        projects = projects_content.get("projects", [])
        logger.info(f"Successfully loaded {len(projects)} projects")
        return projects
    except FileNotFoundError:
        logger.error(f"Projects data file not found: {data_path}")
        return []
    except json.JSONDecodeError as e:
        logger.error(f"Failed to parse JSON from {data_path}: {e}")
        return []
    except Exception as e:
        logger.error(f"Unexpected error loading projects data: {e}", exc_info=True)
        return []

