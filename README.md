# MAYA AI Project

## Project Overview and Purpose

The MAYA AI Project is a full-stack web application designed to leverage advanced AI capabilities, primarily through Google Gemini, to provide an interactive experience. The application features a robust backend built with Python's FastAPI, focusing on AI agent orchestration, data management with PostgreSQL (including vector embeddings), and secure authentication. The frontend, developed using React and Vite, offers a dynamic and responsive user interface for interacting with the AI functionalities.

The core purpose of MAYA is to:
*   Provide an intuitive chat interface for users to interact with AI agents.
*   Showcase various AI features and capabilities.
*   Manage user data and AI-related information efficiently using a PostgreSQL database with vector search extensions.
*   Ensure a secure and scalable platform for AI-driven applications.

## Current Technical Stack

### Backend
*   **Language:** Python
*   **Web Framework:** FastAPI
*   **ASGI Server:** Uvicorn
*   **AI/ML & LLM Orchestration:** Langchain (with `langchain-google-genai` for Google Gemini integration), Langgraph
*   **Database:** PostgreSQL (managed with SQLAlchemy, `asyncpg`, `psycopg2-binary`)
*   **Vector Database Extension:** `pgvector`
*   **Database Migrations:** Alembic
*   **Authentication:** `python-jose` (for JWT), `passlib` (with `bcrypt` for password hashing)
*   **Environment Variables:** `python-dotenv`
*   **HTTP Client:** `httpx`
*   **Web Search Integration:** `tavily-python`
*   **Data Validation/Settings:** Pydantic, Pydantic-settings

### Frontend
*   **Language:** TypeScript
*   **JavaScript Library:** React
*   **Build Tool:** Vite
*   **State Management:** Zustand
*   **Routing:** React Router DOM
*   **Styling:** Tailwind CSS, PostCSS, Autoprefixer, `clsx`, `tailwind-merge`
*   **Icon Library:** `lucide-react`
*   **Markdown Rendering:** `react-markdown`
*   **Date Manipulation:** `date-fns`
*   **HTTP Client:** Axios
*   **Code Quality:** ESLint (with `@typescript-eslint/eslint-plugin`, `@typescript-eslint/parser`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`)

## System Architecture and Major Components

The MAYA AI Project follows a client-server architecture with a clear separation of concerns between the frontend and backend.

### Backend
The backend is a FastAPI application that serves as the primary API for the frontend.
*   **Entry Point:** `backend/main.py` initializes the FastAPI application, handles application lifecycle events (startup/shutdown), and configures CORS.
*   **API Endpoints:** Provides RESTful APIs for various functionalities, including AI interactions, data storage, and authentication.
*   **AI Integration:** Integrates with Google Gemini for AI capabilities, using Langchain and Langgraph for orchestrating complex AI agents and workflows.
*   **Database Layer:** Interacts with a PostgreSQL database using SQLAlchemy. `pgvector` is utilized for efficient vector similarity searches, crucial for AI-driven features. Alembic manages database migrations.
*   **Authentication:** Handles user authentication and authorization using JWTs, with password hashing via bcrypt.
*   **External Services:** Integrates with Tavily for web search capabilities, allowing AI agents to access real-time information.

### Frontend
The frontend is a React application built with Vite, providing the user interface.
*   **Entry Point:** `frontend/src/main.tsx` renders the root `App` component.
*   **Routing:** `frontend/src/App.tsx` defines the client-side routes using `react-router-dom`, directing users to different pages.
*   **Pages:** Dedicated pages for various features, including a `LandingPage`, `ChatInterface` (for AI interaction), `FeaturesPage`, `AgentsPage`, `PricingPage`, and `AboutPage`.
*   **Components:** Reusable UI components are organized in `frontend/src/components`, ensuring consistency and maintainability.
*   **State Management:** Zustand is used for efficient and scalable state management across the application.
*   **Styling:** Utilizes Tailwind CSS for a utility-first approach to styling, ensuring a consistent and responsive design.
*   **API Communication:** Uses Axios to make asynchronous HTTP requests to the backend API.

### Overall Flow
The frontend communicates with the backend via HTTP requests. The backend processes these requests, interacts with the PostgreSQL database, leverages Google Gemini and other AI tools, and returns responses to the frontend.

## Installation and Setup Requirements

To set up and run the MAYA AI Project locally, follow these steps:

### Prerequisites

*   **Python 3.8+**
*   **Node.js (LTS version recommended)**
*   **npm** or **Yarn**
*   **PostgreSQL** database server

### Backend Setup

1.  **Clone the repository:**
    ```bash
    git clone <repository_url>
    cd MAYA/backend
    ```

2.  **Create and activate a Python virtual environment:**
    ```bash
    python -m venv venv
    # On Windows
    .\venv\Scripts\activate
    # On macOS/Linux
    source venv/bin/activate
    ```

3.  **Install Python dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

4.  **Configure Environment Variables:**
    Create a `.env` file in the `backend/` directory by copying `backend/.env.example` and filling in the values:
    ```bash
    cp .env.example .env
    ```
    Edit the `.env` file with your specific configurations:
    ```ini
    GEMINI_API_KEY=your_gemini_key_here
    DATABASE_URL=postgresql+asyncpg://user:pass@host:port/dbname
    TAVILY_API_KEY=your_tavily_key_here
    SECRET_KEY=your_jwt_secret_key
    ALGORITHM=HS256
    ACCESS_TOKEN_EXPIRE_MINUTES=30
    ```
    *   Replace `your_gemini_key_here` with your actual Google Gemini API key.
    *   Replace `postgresql+asyncpg://user:pass@host:port/dbname` with your PostgreSQL database connection string.
    *   Replace `your_tavily_key_here` with your actual Tavily API key.
    *   Generate a strong `SECRET_KEY` for JWTs.

5.  **Run Database Migrations:**
    (Assuming Alembic is configured, which is indicated by `alembic` in `requirements.txt`)
    ```bash
    # You might need to initialize alembic first if not already done
    # alembic init -t async migrations
    alembic upgrade head
    ```

6.  **Start the Backend Server:**
    ```bash
    uvicorn main:app --host 0.0.0.0 --port 8000 --reload
    ```
    The backend will be accessible at `http://localhost:8000`.

### Frontend Setup

1.  **Navigate to the frontend directory:**
    ```bash
    cd ../frontend
    ```

2.  **Install Node.js dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Start the Frontend Development Server:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```
    The frontend will typically be accessible at `http://localhost:5173` (or another port if configured).

## Configuration Options and Environment Variables

### Backend (`backend/.env`)

The backend uses `python-dotenv` to load environment variables from a `.env` file.

*   **`GEMINI_API_KEY`**: (Required) Your API key for Google Gemini. Obtain it from the [Google AI Studio](https://aistudio.google.com/).
*   **`DATABASE_URL`**: (Required) PostgreSQL connection string. Format: `postgresql+asyncpg://<user>:<password>@<host>:<port>/<dbname>`. 
*   **`TAVILY_API_KEY`**: (Required) Your API key for Tavily API. Obtain it from [Tavily AI](https://tavily.com/).
*   **`SECRET_KEY`**: (Required) A strong, random string used for signing JWT tokens.
*   **`ALGORITHM`**: (Optional, default: `HS256`) The hashing algorithm for JWT tokens.
*   **`ACCESS_TOKEN_EXPIRE_MINUTES`**: (Optional, default: `30`) Lifetime of access tokens in minutes.

### Frontend (Vite Environment Variables)

Frontend environment variables are typically prefixed with `VITE_` and are exposed to your client-side code. While no `.env.example` was found for the frontend, you would typically configure them in a `.env` file in the `frontend/` directory.

Example (`frontend/.env`):
```ini
VITE_API_BASE_URL=http://localhost:8000
```
*   **`VITE_API_BASE_URL`**: (Required) The base URL of your backend API.

## Usage Instructions with Examples

### Running the Application

1.  Follow the [Installation and Setup Requirements](#installation-and-setup-requirements) for both backend and frontend.
2.  Ensure both the backend and frontend development servers are running.
3.  Open your web browser and navigate to the frontend URL (e.g., `http://localhost:5173`).

### Interacting with the AI (Chat Interface)

*   Navigate to the `/chat` route in the frontend.
*   Type your queries or prompts into the chat input field.
*   The AI agents, powered by Google Gemini and orchestrated by Langchain/Langgraph, will process your input and provide responses.

### Example Backend API Interaction (using `curl`)

You can test the backend API directly.

**Health Check:**
```bash
curl http://localhost:8000/health
```
Expected output:
```json
{"status": "healthy"}
```

**Root Endpoint:**
```bash
curl http://localhost:8000/
```
Expected output:
```json
{"message": "MAYA AI Backend is Running"}
```

(Further API examples would require knowledge of specific API routes, authentication, and request bodies, which are not yet fully documented.)

## API Documentation

The FastAPI backend automatically generates interactive API documentation using Swagger UI and ReDoc.

*   **Swagger UI:** Access at `http://localhost:8000/docs`
*   **ReDoc:** Access at `http://localhost:8000/redoc`

These interfaces provide detailed information about available endpoints, request/response schemas, and allow you to test API calls directly from your browser.

## Testing Methodology and How to Run Tests

(Information on testing methodology and how to run tests is not explicitly available in the provided files. This section will be updated once testing frameworks and scripts are identified.)

### Backend Testing

Typically, Python projects use `pytest` for testing. You would run tests from the `backend/` directory:

```bash
# Install pytest if not already installed
# pip install pytest
pytest
```

### Frontend Testing

React projects often use `Jest` with `React Testing Library` or `Vitest`. You would run tests from the `frontend/` directory:

```bash
# If using Vitest (common with Vite)
npm test
# or
yarn test
```

## Known Issues and Limitations

(This section will be populated as issues and limitations are identified during development and testing.)

## Contribution Guidelines

(This section will be populated with guidelines for contributing to the project.)

## License Information

(This section will be populated with the project's license information.)

## Troubleshooting

(This section will be populated with common issues and their solutions.)