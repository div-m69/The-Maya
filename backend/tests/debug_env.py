import os
from dotenv import load_dotenv

print("Checking environment...")
load_dotenv()

gemini_key = os.getenv("GEMINI_API_KEY")
google_key = os.getenv("GOOGLE_API_KEY")
db_url = os.getenv("DATABASE_URL")

print(f"GEMINI_API_KEY: {'Set (starts with ' + gemini_key[:5] + '...)' if gemini_key else 'NOT SET'}")
print(f"GOOGLE_API_KEY: {'Set (starts with ' + google_key[:5] + '...)' if google_key else 'NOT SET'}")
print(f"DATABASE_URL: {'Set' if db_url else 'NOT SET'}")

# List all files in current directory to be sure
print("\nFiles in current directory:")
for f in os.listdir('.'):
    print(f" - {f}")
