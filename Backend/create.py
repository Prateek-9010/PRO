from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Allow the React app's origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB connection
client = AsyncIOMotorClient('mongodb://root:admin@localhost:27017/')
db = client.glamwood

class FormData(BaseModel):
    firstName: str
    lastName: str
    email: str
    mobileNumber: str
    addressLine1: str
    addressLine2: str
    landmark: str
    country: str
    state: str
    city: str
    pincode: str
    pancard: str
    employeeStatus: str

@app.post("/submit-form")
async def submit_form(data: FormData):
    try:
        # Convert the Pydantic model to a dictionary
        form_data_dict = data.dict()
        
        # Save form data to MongoDB
        await db.form_data.insert_one(form_data_dict)
        return {"message": "Form data saved successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
    
@app.get("/get-forms")
async def get_forms():
    try:
        forms = await db.form_data.find().to_list(1000)
        for form in forms:
            form["_id"] = str(form["_id"])  # Convert ObjectId to string
        return forms
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)


