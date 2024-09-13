import asyncio
import json
from quart import Quart, Response
from quart_cors import cors

app = Quart(__name__)
app = cors(app)

@app.route('/sse', methods=['GET', 'POST'])
async def sse():
    async def generate():
        data = "this is streaming"
        for item in data:
            item = json.dumps({"message": item})
            yield f"data: {item}\n\n"
            await asyncio.sleep(0.5)

    return Response(generate(), mimetype="text/event-stream")

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
