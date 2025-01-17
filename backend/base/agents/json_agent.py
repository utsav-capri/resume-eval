import json

from .local_agent import LocalAgent

class JsonAgent(LocalAgent):
    def __init__(self, name, system_message, max_consecutive_auto_reply: int | None = 1):
        super().__init__(name, system_message, max_consecutive_auto_reply)
        
    def get_last_message_as_json(self):
        last_message = self.last_message()['content']
        # Remove the extra text before and after the JSON data
        start_index = last_message.find('{')
        end_index = last_message.rfind('}')
        json_data = last_message[start_index:end_index+1]

        # Convert the JSON data to a dictionary
        ratings = json.loads(json_data)
        return ratings