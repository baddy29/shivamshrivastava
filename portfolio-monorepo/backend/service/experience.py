import json
import os
import logging

logger = logging.getLogger(__name__)

def get_experience(data_path):
    logger.info(f"Loading experience data from: {data_path}")
    try:
        with open(data_path) as f:
            experience_content = json.load(f)
        experience_data = experience_content.get('experience', [])
        logger.info(f"Successfully loaded {len(experience_data)} experience entries")
        return experience_data
    except FileNotFoundError:
        logger.error(f"Experience data file not found: {data_path}")
        return []
    except json.JSONDecodeError as e:
        logger.error(f"Failed to parse JSON from {data_path}: {e}")
        return []
    except Exception as e:
        logger.error(f"Unexpected error loading experience data: {e}", exc_info=True)
        return []
