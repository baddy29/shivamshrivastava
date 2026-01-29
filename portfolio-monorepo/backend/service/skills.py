import json
import os
import logging

logger = logging.getLogger(__name__)

def get_skills(data_path):
    logger.info(f"Loading skills data from: {data_path}")
    try:
        with open(data_path) as f:
            skills_content = json.load(f)
        skills_data = skills_content.get('skills', [])
        logger.info(f"Successfully loaded {len(skills_data)} skill categories")
        return skills_data
    except FileNotFoundError:
        logger.error(f"Skills data file not found: {data_path}")
        return []
    except json.JSONDecodeError as e:
        logger.error(f"Failed to parse JSON from {data_path}: {e}")
        return []
    except Exception as e:
        logger.error(f"Unexpected error loading skills data: {e}", exc_info=True)
        return []
