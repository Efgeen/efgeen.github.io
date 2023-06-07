import asyncio
import websockets

async def echo(websocket, path):
    while True:
        data = await websocket.recv()
        processed_data = data.upper()
        await websocket.send(processed_data)

async def start_server():
    server = await websockets.serve(echo, 'localhost', 8080)
    await server.wait_closed()

if __name__ == "__main__":
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    try:
        loop.run_until_complete(start_server())
        loop.run_forever()
    except KeyboardInterrupt:
        pass
    finally:
        loop.close()