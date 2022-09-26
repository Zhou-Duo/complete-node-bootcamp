const EventEmitter = require("events");
const http = require("http");

class Sales extends EventEmitter {
  constructor() {
    super();
  }
}

const myEmitter = new Sales();

myEmitter.on("newSale", () => {
  console.log("There is a New Sale!");
});

myEmitter.on("newSale", () => {
  console.log("Customer name: Xinrui");
});

myEmitter.on("newSale", (stock) => {
  console.log(`There are ${stock} items in stock`);
});

myEmitter.emit("newSale", 9);

///////////////////////////

const server = http.createServer();

server.on("request", (req, res) => {
  console.log(`Request received: ${req.method} ${req.url}`);
  res.end("Request received");
});

server.on("close", () => {
  console.log("Server closed");
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to request on port 8000");
});
