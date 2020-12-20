[JsRE](http://dolszewski.com/javascript/javascript-runtime-environment/#:~:text=The%20JavaScript%20runtime%20environment%20provides,independent%20of%20the%20runtime%20environment.)

# Javascript engine
- since javascript is an interpreted langauge, the js engine (V8, SpiderMonkey, Nitro, Chakra etc.), converts js directly to machine code for your CPU
- java gives you compile time errors, whereas javascript gives you runtime errors
- your javascript code runs in a single thread, managed by the event loop
- the JsRE has a thread pool however, so you do not have to manage multiple threads manually
- js code can be categorized in two main groups
    - event callbacks
        - there is no context switching in the event loop, it must execute one callback at a time, blocking all other callbacks 
    - immediately executed code
- the browser will expose events to the browser jsre, mouse clicks, scrolls, etc. some events can be created by code, such as API packets and timers. browsers expose timer events to the event loop
  - one big difference between the browser and node environments is that the browser environment provides access to the DOM API
- node js provides another server side environment separated from the browser
- the environment handles which js code to send to its js engine
    - note that engines are independent of environment, for example, V8 is used in both the Chrome browser environment and the NodeJS environment