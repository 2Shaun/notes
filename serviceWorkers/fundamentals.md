[Fundamentals](https://developers.google.com/web/fundamentals/primers/service-workers)

- service workers are scripts that run in the background independently of your webpage, allowing for things like push notifications and background sync (delaying requests until a reliable connection is acheived)
- offline experiences
- a lot of interesting applications are being prevented from being ported to client-side js because of static typing
- workers achieve real concurrency
- workers run in a single thread
- workers are started by calling the `worker.postMessage()` method
