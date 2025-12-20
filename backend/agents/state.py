from typing import List, Optional, TypedDict
from langchain_core.messages import BaseMessage

class AgentState(TypedDict):
    messages: List[BaseMessage]
    current_agent: Optional[str]
    user_profile: Optional[dict]
    next_step: Optional[str]
