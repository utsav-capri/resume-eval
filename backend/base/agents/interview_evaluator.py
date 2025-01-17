from .json_agent import JsonAgent

INTERVIEW_EVALUATOR_PROMPT = """
    You are HR of a company and given the conversation between the interviewer and the candidate. You must evaluate the candidate on the basis of technical skill, relevance, leadership, collaberation.  For each of the skill you should rate them from 0 to 10 and if a the conversation doesn't provide to rate one of the skill then leave it as null. You should output a json like {"technical_skill": 7, "relevance": 10, "leadership": null, "collaberation": null, reason: ""}. where reason is the reason for all the ratings.
    One example will be. Be strict on the relevance part, if the candidate doen't have skill asked by interviewer score him 0
    Input:
    Interviewer: Share your past experience with C#
    Candidate: I have no experience with C# but I have previously worked with other languages and I think I can quickly learn it too. I had a group named GeekHaven where we used to learn about new things together and there I learn a lot on how to quickly learn new tenchnologies.
    Output:
    {"technical_skill": 2, "relevance": 0, "leadership": null, "collaberation": 10, "reason": "The candidate doesn't know about C# but has other similar knowledge"}
    Give as small reason as possible
    """
    
class InterviewEvaluator(JsonAgent):
    def __init__(self):
        super().__init__(
            name = "interview_evalutor",
            system_message = INTERVIEW_EVALUATOR_PROMPT
        )
        
    def get_rating(self):
        return self.get_last_message_as_json()