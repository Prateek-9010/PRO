from fastapi import Depends, FastAPI, HTTPException, Request
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel
from typing import Annotated, Union

app = FastAPI()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="http://localhost:4000/realms/Glamwood/protocol/openid-connect/token")


class User(BaseModel):
    username: str
    email: Union[str, None] = None
    full_name: Union[str, None] = None
    disabled: Union[bool, None] = None


def fake_decode_token(token):
    return User(
        username=token + "fakedecoded", email="john@example.com", full_name="John Doe"
    )


async def get_current_user(token: Annotated[str, Depends(oauth2_scheme)]):
    user = fake_decode_token(token)
    return user


# Middleware to validate JWT token
async def validate_token(req):
    token = None
    authorization_header = req.headers.get("Authorization")
    if authorization_header:
        scheme, bearer_token = authorization_header.split(" ")
        if scheme.lower() == "bearer":
            token = bearer_token
            # print(token)
    if token is None:
        raise HTTPException(status_code=401, detail="Unauthorized")
    user = await get_current_user(token)
    return user


@app.middleware("http")
async def validate_token_middleware(request: Request, call_next):
    try:
        user = await validate_token(request)
        request.state.user = user  
        response = await call_next(request)
        return response
    except HTTPException as e:
        return e


@app.get("/users/me")
async def read_users_me(current_user: Annotated[User, Depends(get_current_user)]):
    print("current"+current_user)
    return current_user

@app.get("/list")
async def read_items():
    items = ["item1", "item2", "item3"]
    return {"items": items}

# from fastapi import FastAPI, Header, HTTPException
# # from fastapi.responses import JSONResponse
# # import jwt
# from typing import Annotated, Union

# from fastapi import Depends, FastAPI
# from fastapi.security import OAuth2PasswordBearer
# from pydantic import BaseModel
# app = FastAPI()


# @app.get("/list")
# async def read_items():
#     items = ["item1", "item2", "item3"]
#     return {"items": items}


# # Middleware to validate JWT token
# async def validate_token(req):
#     authorization_header = req.headers.get("Authorization")
#     if authorization_header:
#         bearer_token = authorization_header.split(" ")[1]
#         if bearer_token:
#             return bearer_token
#     raise HTTPException(status_code=401, detail="Unauthorized")

# @app.middleware("http")
# async def validate_token_middleware(request, call_next):
#     token = await validate_token(request)
#     print("Token:", token)  # Print token for debugging/logging
#     request.state.token = token  # Store token in request state
#     response = await call_next(request)
#     return response




######################################################
PUBLIC_KEY = "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzRkvmbgZ1vTWnPTThyHfHIBcFn829mpZulohpz4Z/Mi3nEFb6Ts6rhhALGFtWoFZRSTdm7ONiKyvTRCogX7X39+JzOK2sTU6zrRzytPjCLd45pbyESDSVeVE5A4fCduORmG+KugPsnPRNN+tQLwAEmM9IKTaSSbMORF6V3jAARdcGzciLP3taA1uDm6oE6Mj1lGtt8wBcVzjqVNaiAQp9Vs9i4BuyEDIsak68Twhm6s09UihwlM9NNcxM/W45Nk04VrAPcGDpKrDzv+pcbcSupLvYI24nswzymYLCsapuFnN1mLXWLKy3w7VJpP26MOl82opvpdtHky/qoLsJkAvHwIDAQAB"
ALGORITHM = "RS256"



# @app.middleware("http")
# async def validate_token_middleware(request, call_next):
#     token = await validate_token(request)
#     if not token:
#         return JSONResponse({"detail": "Unauthorized"}, status_code=401)
    
#     try:
#         decoded_token = jwt.decode(token, PUBLIC_KEY, algorithms=[ALGORITHM])
#         print("Decoded Token:", decoded_token)  # Print decoded token for debugging/logging
#         request.state.token = decoded_token  # Store decoded token in request state
#     except jwt.ExpiredSignatureError:
#         return JSONResponse({"detail": "Token has expired"}, status_code=401)
#     except jwt.InvalidTokenError:
#         return JSONResponse({"detail": "Invalid token"}, status_code=401)

#     response = await call_next(request)
#     return response

##########################################################
