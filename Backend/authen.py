
from fastapi import FastAPI, Header, HTTPException
# from fastapi.responses import JSONResponse
# import jwt
from typing import Annotated, Union

from fastapi import Depends, FastAPI
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel
app = FastAPI()



@app.get("/list")
async def read_items():
    items = ["item1", "item2", "item3"]
    return {"items": items}


# Middleware to validate JWT token
async def validate_token(req):
    authorization_header = req.headers.get("Authorization")
    if authorization_header:
        bearer_token = authorization_header.split(" ")[1]
        if bearer_token:
            return bearer_token
    raise HTTPException(status_code=401, detail="Unauthorized")

@app.middleware("http")
async def validate_token_middleware(request, call_next):
    token = await validate_token(request)
    print("Token:", token)  # Print token for debugging
    request.state.token = token  # Store token in request state
    response = await call_next(request)
    return response