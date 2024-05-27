# .\env\Scripts\activate
# uvicorn main:app --reload
# deactivate

# from fastapi import FastAPI, Request, HTTPException
# from fastapi.responses import JSONResponse
# import jwt

# app = FastAPI()

# @app.get("/list")
# async def read_items():
#     items = ["item1", "item2", "item3"]
#     return {"items": items}

# # Public key for verifying JWT
# PUBLIC_KEY = """
# -----BEGIN PUBLIC KEY-----
# MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzRkvmbgZ1vTWnPTThyHfHIBcFn829mpZulohpz4Z/Mi3nEFb6Ts6rhhALGFtWoFZRSTdm7ONiKyvTRCogX7X39+JzOK2sTU6zrRzytPjCLd45pbyESDSVeVE5A4fCduORmG+KugPsnPRNN+tQLwAEmM9IKTaSSbMORF6V3jAARdcGzciLP3taA1uDm6oE6Mj1lGtt8wBcVzjqVNaiAQp9Vs9i4BuyEDIsak68Twhm6s09UihwlM9NNcxM/W45Nk04VrAPcGDpKrDzv+pcbcSupLvYI24nswzymYLCsapuFnN1mLXWLKy3w7VJpP26MOl82opvpdtHky/qoLsJkAvHwIDAQAB
# -----END PUBLIC KEY-----
# """
# ALGORITHM = "RS256"

# # Function to extract and validate the token from the request headers
# async def validate_token(request: Request):
#     authorization: str = request.headers.get("Authorization")
#     if authorization:
#         if authorization.startswith("Bearer "):
#             return authorization[len("Bearer "):]
#         else:
#             print("Authorization header does not start with 'Bearer '")
#     print("Authorization header missing or malformed")
#     raise HTTPException(status_code=401, detail="Unauthorized")

# # Middleware to validate JWT token
# @app.middleware("http")
# async def validate_token_middleware(request: Request, call_next):
#     try:
#         token = await validate_token(request)
#         print("Token:", token)  # Print token for debugging/logging
#         try:
#             decoded_token = jwt.decode(token, PUBLIC_KEY, algorithms=[ALGORITHM])
#             print("Decoded Token:", decoded_token)  # Print decoded token for debugging/logging
#             request.state.token = decoded_token  # Store decoded token in request state
#         except jwt.ExpiredSignatureError:
#             print("Token has expired")
#             return JSONResponse({"detail": "Token has expired"}, status_code=401)
#         except jwt.InvalidTokenError:
#             print("Invalid token")
#             return JSONResponse({"detail": "Invalid token"}, status_code=401)

#     except HTTPException as e:
#         return JSONResponse({"detail": e.detail}, status_code=e.status_code)

#     response = await call_next(request)
#     return response


# # Run the FastAPI application
# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run(app, host="0.0.0.0", port=8000)

import base64
from fastapi import FastAPI, Request, HTTPException
from fastapi.responses import JSONResponse
import jwt
import logging

app = FastAPI()

# # Configure logging
# logging.basicConfig(level=logging.DEBUG)
# logger = logging.getLogger(__name__)

# # Public key for verifying JWT
# PUBLIC_KEY = """
# -----BEGIN PUBLIC KEY-----
# MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzRkvmbgZ1vTWnPTThyHf
# HIBcFn829mpZulohpz4Z/Mi3nEFb6Ts6rhhALGFtWoFZRSTdm7ONiKyvTRCogX7X
# 39+JzOK2sTU6zrRzytPjCLd45pbyESDSVeVE5A4fCduORmG+KugPsnPRNN+tQLwA
# EmM9IKTaSSbMORF6V3jAARdcGzciLP3taA1uDm6oE6Mj1lGtt8wBcVzjqVNaiAQp
# 9Vs9i4BuyEDIsak68Twhm6s09UihwlM9NNcxM/W45Nk04VrAPcGDpKrDzv+pcbcS
# upLvYI24nswzymYLCsapuFnN1mLXWLKy3w7VJpP26MOl82opvpdtHky/qoLsJkAv
# HwIDAQAB
# -----END PUBLIC KEY-----
# """
# ALGORITHM = "RS256"
# EXPECTED_AUDIENCE = "myclient"  # Replace with your client ID from Keycloak

# # Function to extract and validate the token from the request headers
# async def extract_token(request: Request):
#     authorization: str = request.headers.get("Authorization")
#     if authorization:
#         if authorization.startswith("Bearer "):
#             return authorization[len("Bearer "):]
#         else:
#             logger.debug("Authorization header does not start with 'Bearer '")
#     logger.debug("Authorization header missing or malformed")
#     raise HTTPException(status_code=401, detail="Unauthorized")

# # Middleware to validate JWT token
# @app.middleware("http")
# async def validate_token_middleware(request: Request, call_next):
#     try:
#         token = await extract_token(request)
#         logger.debug(f"Token: {token}")  # Print token for debugging/logging
#         try:
#             decoded_token = jwt.decode(token, PUBLIC_KEY, algorithms=[ALGORITHM], audience=EXPECTED_AUDIENCE)
#             logger.debug(f"Decoded Token: {decoded_token}")  # Print decoded token for debugging/logging
#             request.state.token = decoded_token  # Store decoded token in request state
#         except jwt.ExpiredSignatureError:
#             logger.debug("Token has expired")
#             return JSONResponse({"detail": "Token has expired"}, status_code=401)
#         except jwt.InvalidTokenError as e:
#             logger.debug(f"Invalid token: {e}")
#             return JSONResponse({"detail": "Invalid token"}, status_code=401)
#     except HTTPException as e:
#         return JSONResponse({"detail": e.detail}, status_code=e.status_code)

#     response = await call_next(request)
#     return response

@app.get("/list")
async def read_items():
    items = ["item1", "item2", "item3"]
    return {"items": items}

# Run the FastAPI application
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)



    