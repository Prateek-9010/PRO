from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

# Create an instance of the FastAPI class
app = FastAPI()

# Add CORS middleware
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

# Define a route
@app.get("/list")
async def read_items():
    items = ["item1", "item2", "item3"]
    return {"items": items}


# .\env\Scripts\activate
# uvicorn main:app --reload
# deactivate