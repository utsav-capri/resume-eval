from .local_agent import LocalAgent

CONVERSATION_INITIALIZER_PROMPT = """
You provide information to the chatbot for it to do its job
"""

class ConversationInitializer(LocalAgent):
    def __init__(self):
        super().__init__(
            name = "initializer",
            system_message = CONVERSATION_INITIALIZER_PROMPT,
            max_consecutive_auto_reply=0
        )