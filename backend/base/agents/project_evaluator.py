import json

from .json_agent import JsonAgent

PROJECT_EVALUATOR_PROMPT = """
Given description of the project you must rate the project on basis of technical complexity and uniqueoness. An example of the output is {"complexity": 1, "uniqueness": 0, "reason": "The software is basic implementation of hello world so not very complex and its common so not unique at all"}. Where complexuty defines the technical complexity of the project and can range from 0 to 10 and uniqueness is how unique the project is this can also range from 0 to 10. The reason tells the reason for giving that score. Always output in the specified form. The description of the project is shared next.
"""

class ProjectEvaluator(JsonAgent):
    def __init__(self):
        super().__init__(
            name = "project_evalutor",
            system_message = PROJECT_EVALUATOR_PROMPT
        )
        
    def get_rating(self):
        return self.get_last_message_as_json()