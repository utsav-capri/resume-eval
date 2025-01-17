from autogen import AssistantAgent

from .constants import LLM_CONFIG

class LocalAgent(AssistantAgent):
    def __init__(self, name: str, system_message: str | None = ...,max_consecutive_auto_reply: int | None = 1):
        super().__init__(
            name=name, 
            system_message=system_message,
            llm_config=LLM_CONFIG, 
            max_consecutive_auto_reply=max_consecutive_auto_reply
        )
