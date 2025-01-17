from .json_agent import JsonAgent

CODE_EVALUATOR_PROMPT = """
You are a helpful bot tasked with evaluating code quality. Given a piece of code you must rate the code in term of readability, modularity and efficiency. You must rate each of them on scale of 0-10 and outut the result in json form. 
Example output
{"readability": 6, "modularity": 5, "efficiency": 9}
"""

class CodeEvaluator(JsonAgent):
    def __init__(self):
        super().__init__(
            name = "code_evaluator", 
            system_message = CODE_EVALUATOR_PROMPT)
        
    def get_rating(self):
        return self.get_last_message_as_json()