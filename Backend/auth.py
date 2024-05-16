from fastapi import FastAPI, Header, HTTPException

app = FastAPI()



@app.get("/get_token")
async def get_token(authorization: str = Header(None)):
    if authorization:
        # Assuming the token is in the format "Bearer <token>"
        token = authorization.split(" ")[1]
        print("Token:", token)
        return {"Token": token}
    else:
        raise HTTPException(status_code=401, detail="Authorization header not found")



@app.get("/list")
async def read_items():
    items = ["item1", "item2", "item3"]
    return {"items": items}