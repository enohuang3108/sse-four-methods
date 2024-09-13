# sse-four-methods

An example project demonstrating four different ways to implement Server-Sent Events (SSE) in the frontend using EventSource, XMLHttpRequest (XHR), Fetch API, and @microsoft/fetch-event-source for real-time communication

#### [EventSource](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events)

- The browser provides a method to handle SSE (Server-Sent Events).
- Similar to WebSocket, it maintains a persistent connection and requires evtSource.close() to close the connection.
- It can only use GET (cannot send parameters in the body, parameters must be in the query string).

#### [XMLHttpRequest (XHR)](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest)

- The onprogress event provides the entire data from the start of the connection to the current point, rather than chunked data.
- It can use POST.

#### [Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

- Can retrieve the current chunk of data.
- Can use POST.
- Natively, it cannot parse SSE types like data:.

#### [Library - @microsoft/fetch-event-source](https://www.npmjs.com/package/@microsoft/fetch-event-source)

- Can retrieve the current chunk of data.
- Can use POST.
- Built on top of Fetch, extends its capabilities to parse SSE types like data:.
