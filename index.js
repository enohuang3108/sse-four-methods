import { fetchEventSource } from "@microsoft/fetch-event-source";

const output = document.getElementById("output");
const startEventSourceButton = document.getElementById("startEventSource");
const closeEventSourceButton = document.getElementById("closeEventSource");
const startFetchButton = document.getElementById("startFetch");
const startFetchEventSourceButton = document.getElementById(
  "startFetchEventSource"
);
const startXHRButton = document.getElementById("startXHR");

// -------------------- EventSource --------------------
let evtSource;

startEventSourceButton.addEventListener("click", () => {
  evtSource = new EventSource("http://localhost:5000/sse");
  evtSource.onmessage = (event) => {
    const data = JSON.parse(event.data);
    output.textContent += data.message;
  };
});

closeEventSourceButton.addEventListener("click", () => {
  if (evtSource) {
    evtSource.close();
  }
});

// -------------------- Fetch --------------------

startFetchButton.addEventListener("click", () => {
  fetch("http://localhost:5000/sse", { method: "POST" }).then((response) => {
    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    function readStream() {
      return reader.read().then(({ done, value }) => {
        const chunk = decoder.decode(value, {
          stream: true,
        });
        const dataJson = chunk.slice(5);
        const data = JSON.parse(dataJson);
        output.textContent += data.message;

        return readStream();
      });
    }

    return readStream();
  });
});

// -------------------- XHR --------------------

startXHRButton.addEventListener("click", () => {
  const xhr = new XMLHttpRequest();
  xhr.onprogress = function () {
    const responseText = xhr.responseText;
    const lines = responseText.split("\n");
    const lastLine = lines[lines.length - 3];
    const dataJson = lastLine.slice(5);
    const data = JSON.parse(dataJson);

    output.textContent += data.message;
  };

  xhr.open("POST", "http://localhost:5000/sse");
  xhr.send();
});

// -------------------- @microsoft/fetch-event-source --------------------

startFetchEventSourceButton.addEventListener("click", () => {
  fetchEventSource("http://localhost:5000/sse", {
    method: "POST",
    onmessage(msg) {
      const data = JSON.parse(msg.data);
      output.textContent += data.message;
    },
  });
});
