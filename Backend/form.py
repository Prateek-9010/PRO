from fastapi import FastAPI, UploadFile, File
from minio import Minio
from minio.error import S3Error
from fastapi.middleware.cors import CORSMiddleware
import io

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173/"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

minio_client = Minio(
    "localhost:9000",
    access_key="minioadmin",
    secret_key="minioadmin",
    secure=False
)


bucket_name = "glamwood"

@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    try:
        file_name = file.filename
        file_content = await file.read()
        file_size = len(file_content)
        
        minio_client.put_object(
            bucket_name,
            file_name,
            data=io.BytesIO(file_content),
            length=file_size,
            content_type=file.content_type
        )
        return {"result": f"File '{file_name}' uploaded successfully."}
    except S3Error as e:
        return {"error": str(e)}

# @app.get("/download/{filename}")
# async def download_file(filename: str):
#     try:
#         response = minio_client.get_object(bucket_name, filename)
#         return StreamingResponse(response, media_type='application/octet-stream', headers={"Content-Disposition": f"attachment; filename={filename}"})
#     except S3Error as e:
#         return {"error": str(e)}