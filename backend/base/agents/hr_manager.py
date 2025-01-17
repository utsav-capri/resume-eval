import re

from .local_agent import LocalAgent

HR_MANAGER_PROMPT = """
You are a HR manager and you will be provided with job description of the role. Given the job description you must come up with 5 things to look at the resume of the candidate to see their fit. You must output the 5 questions only and always remeber to ask only those questions that can be answered by looking at the past experience of the candidates in the Resume. The candidate isn't present physically so avoid asking questions like Share an instance where you had to debug a code instead you can ask questions like What's your experience with working on backend projects
"""

class HRManager(LocalAgent):
    def __init__(self):
        super().__init__(
            name = "hr_manager",
            system_message = HR_MANAGER_PROMPT
        )
        
    def get_questions(self):
        last_message = self.last_message()['content']
        questions = re.findall(r'\d+\.\s+(.*?)\n', last_message)
        return questions