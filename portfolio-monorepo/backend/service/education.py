import json
import os
import logging

logger = logging.getLogger(__name__)

def get_education(data_path):
    logger.info(f"Loading education data from: {data_path}")
    try:
        with open(data_path) as f:
            education_content = json.load(f)
        education_data = education_content.get('education', [])
        logger.info(f"Successfully loaded {len(education_data)} education entries")
        return education_data
    except FileNotFoundError:
        logger.error(f"Education data file not found: {data_path}")
        return []
    except json.JSONDecodeError as e:
        logger.error(f"Failed to parse JSON from {data_path}: {e}")
        return []
    except Exception as e:
        logger.error(f"Unexpected error loading education data: {e}", exc_info=True)
        return []