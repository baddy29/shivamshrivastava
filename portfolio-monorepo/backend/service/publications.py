import json
import os
import logging

logger = logging.getLogger(__name__)

def get_publications(data_path):
    logger.info(f"Loading publications data from: {data_path}")
    try:
        with open(data_path) as f:
            achievements_content = json.load(f)
        publications_data = achievements_content.get('publications', [])
        logger.info(f"Successfully loaded {len(publications_data)} publications")
        return publications_data
    except FileNotFoundError:
        logger.error(f"Achievements data file not found: {data_path}")
        return []
    except json.JSONDecodeError as e:
        logger.error(f"Failed to parse JSON from {data_path}: {e}")
        return []
    except Exception as e:
        logger.error(f"Unexpected error loading publications data: {e}", exc_info=True)
        return []
