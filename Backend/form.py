from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.responses import StreamingResponse
from minio import Minio
from minio.error import S3Error
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel
from typing import List
import io

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Allow the React app's origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# minio_client = Minio(
#     "localhost:9000",
#     access_key="minioadmin",
#     secret_key="minioadmin",
#     secure=False
# )

bucket_name = "glamwood"

# MongoDB connection
client = AsyncIOMotorClient('mongodb://root:admin@localhost:27017/')
db = client.glamwood

class FileItem(BaseModel):
    name: str
    imageName: str

@app.post("/upload")
async def upload_file(name: str = Form(...), file: UploadFile = File(...)):
    try:
        file_name = file.filename
        file_content = await file.read()
        file_size = len(file_content)

        # minio_client.put_object(
        #     bucket_name,
        #     file_name,
        #     data=io.BytesIO(file_content),
        #     length=file_size,
        #     content_type=file.content_type
        # )

        # Save file details to MongoDB
        file_doc = {
            "name": name,
            "imageName": file_name,
        }
        await db.sample.insert_one(file_doc)

        return {"result": f"File '{file_name}' uploaded and data saved successfully."}
    except S3Error as e:
        return {"error": str(e)}

@app.get("/files/", response_model=List[FileItem])
async def get_files():
    files = []
    cursor = db.sample.find({})
    async for document in cursor:
        files.append(FileItem(**document))
    return files

# @app.get("/files/{image_name}")
# async def get_image(image_name: str):
#     try:
#         response = minio_client.get_object(bucket_name, image_name)
#         return StreamingResponse(response, media_type="image/jpeg")
#     except S3Error as e:
#         raise HTTPException(status_code=404, detail=f"Image '{image_name}' not found.")


# @app.get("/download/{filename}")
# async def download_file(filename: str):
#     try:
#         response = minio_client.get_object(bucket_name, filename)
#         return StreamingResponse(response, media_type='application/octet-stream', headers={"Content-Disposition": f"attachment; filename={filename}"})
#     except S3Error as e:
#         return {"error": str(e)}