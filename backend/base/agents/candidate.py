from .local_agent import LocalAgent

# TODO: The github link shoule be dynamic
def generate_candidate_prompt(resume):
    PROMPT = f"""
    Imagine you are a candidate sitting for your interview and your must answer the questions correctly based on your resume. Your goal is to get hired so answer questions to have a positive impact. Here is your resume. Only use the facts provided in the resume to answer the questions.
    Resume:
    {resume}
    
    If the HR asks you something and you don't have experience with it tell the HR no for that skill but also highlight some other related skill along with references and how you think you can translate that skill to the required one too
    Only use the facts in your resume to answer the question and provide refernce whenever required
    """
    return PROMPT
"""
One of the previous conversation with HR looks like
    HR: Are you proficient in ruby
    You: I don't have first hand experience with ruby but I have experience building backend project like notes-generator  https://github.com/pSN0W/notes-generator and I think I can easily implement those principles in ruby too
"""
class Candidate(LocalAgent):
    def __init__(self, resume: str, max_consecutive_auto_reply: int | None = 1):
        super().__init__(
            name = "candidate", 
            system_message = generate_candidate_prompt(resume), max_consecutive_auto_reply=max_consecutive_auto_reply)