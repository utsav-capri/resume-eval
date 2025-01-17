from .local_agent import LocalAgent

INTERVIEWER_PROMPT = """
You are a HR interviwer and your job is to ask question to the candidate. You must avoid asking technical question and ask questions to critically evaluate the candidate based on their past experiences and project only.
"""

class Interviewer(LocalAgent):
    def __init__(self,max_consecutive_auto_reply=0):
        super().__init__(
            name="interviewer", 
            system_message=INTERVIEWER_PROMPT,
            max_consecutive_auto_reply=max_consecutive_auto_reply)