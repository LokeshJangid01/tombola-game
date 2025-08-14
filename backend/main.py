from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = ["*"]  # change this in production

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

connected_clients = {}

@app.websocket("/ws/{username}")
async def websocket_endpoint(websocket: WebSocket, username: str):
    await websocket.accept()
    print(f"✅ WebSocket connected: {username}")
    try:
        while True:
            data = await websocket.receive_text()
            print(f"📩 Message from {username}: {data}")
            await websocket.send_text(f"Hello {username}, you said: {data}")
    except Exception as e:
        print(f"❌ Connection closed for {username}: {e}")
