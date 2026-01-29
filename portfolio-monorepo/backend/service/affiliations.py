import json
import os
import logging

logger = logging.getLogger(__name__)

def get_affiliations(data_path):
    logger.info(f"Loading affiliations data from: {data_path}")
    try:
        with open(data_path) as f:
            affiliations_content = json.load(f)
        affiliations_data = affiliations_content.get('affiliations', [])
        logger.info(f"Successfully loaded {len(affiliations_data)} affiliations")
        return affiliations_data
    except FileNotFoundError:
        logger.error(f"Affiliations data file not found: {data_path}")
        return []
    except json.JSONDecodeError as e:
        logger.error(f"Failed to parse JSON from {data_path}: {e}")
        return []
    except Exception as e:
        logger.error(f"Unexpected error loading affiliations data: {e}", exc_info=True)
        return []
