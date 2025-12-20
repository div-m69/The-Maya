from langgraph.graph import StateGraph, END
from agents.state import AgentState
from agents.router import route_request
from services.scheme_service import scheme_service
from services.gemini_service import gemini_service
from database import AsyncSessionLocal
from langchain_core.messages import AIMessage

# --- Node Implementations ---

async def router_node(state: AgentState):
    return await route_request(state)

async def scheme_agent_node(state: AgentState):
    messages = state["messages"]
    last_message = messages[-1].content
    
    # 1. Search schemes
    async with AsyncSessionLocal() as db:
        schemes = await scheme_service.search_schemes(db, last_message)
    
    # 2. Format response using LLM
    if schemes:
        schemes_text = "\n".join([f"Name: {s.name}\nDescription: {s.description}\nBenefits: {s.benefits}" for s in schemes])
        prompt = f"""
        User Query: {last_message}
        
        Found Schemes:
        {schemes_text}
        
        Task:
        Synthesize a helpful response for the user based on these schemes. 
        Explain why they are relevant to the user's query. 
        Keep it concise but encouraging.
        """
        response_text = await gemini_service.generate_text(prompt)
    else:
        response_text = "I couldn't find any specific schemes matching your criteria. Could you provide more details about your business or requirements?"
        
    return {"messages": [AIMessage(content=response_text)]}

async def general_agent_node(state: AgentState):
    messages = state["messages"]
    last_message = messages[-1].content
    
    response = await gemini_service.generate_text(last_message)
    return {"messages": [AIMessage(content=response)]}

# Placeholder nodes for other agents (to be implemented)
async def market_agent_node(state: AgentState):
    return {"messages": [AIMessage(content="Market Research Agent: Coming soon!")]}

async def brand_agent_node(state: AgentState):
    return {"messages": [AIMessage(content="Brand Consultant Agent: Coming soon!")]}

async def finance_agent_node(state: AgentState):
    return {"messages": [AIMessage(content="Financial Advisor Agent: Coming soon!")]}

async def marketing_agent_node(state: AgentState):
    return {"messages": [AIMessage(content="Marketing Agent: Coming soon!")]}

# --- Graph Construction ---

def create_graph():
    workflow = StateGraph(AgentState)

    # Add nodes
    workflow.add_node("router", router_node)
    workflow.add_node("scheme", scheme_agent_node)
    workflow.add_node("market", market_agent_node)
    workflow.add_node("brand", brand_agent_node)
    workflow.add_node("finance", finance_agent_node)
    workflow.add_node("marketing", marketing_agent_node)
    workflow.add_node("general", general_agent_node)

    # Set entry point
    workflow.set_entry_point("router")

    # Add conditional edges based on router output
    workflow.add_conditional_edges(
        "router",
        lambda x: x["current_agent"],
        {
            "scheme": "scheme",
            "market": "market",
            "brand": "brand",
            "finance": "finance",
            "marketing": "marketing",
            "general": "general"
        }
    )

    # All agents go to END for now (single turn)
    workflow.add_edge("scheme", END)
    workflow.add_edge("market", END)
    workflow.add_edge("brand", END)
    workflow.add_edge("finance", END)
    workflow.add_edge("marketing", END)
    workflow.add_edge("general", END)

    return workflow.compile()

app_graph = create_graph()
