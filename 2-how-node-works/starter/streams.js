const fs = require("fs");
const server = require("http").createServer();

server.on("request", (req, res) => {
  // Solution 1
  // fs.readFile("test-file.txt", (err, data) => {
  //   if (err) console.log(err);
  //   res.end(data);
  // });
  //
  // Solution 2
  // const readable = fs.createReadStream("test-filde.txt");
  // readable.on("data", (chunk) => {
  //   res.write(chunk);
  // });
  // readable.on("end", () => {
  //   res.end();
  // });
  // readable.on("error", (err) => {
  //   console.log(err);
  //   res.statusCode = 500;
  //   res.end("File not found.");
  // });
  //
  /*
   * still a problem -- Backpressure: our readable stream is much faster than sending the
   * result with the response writable stream, this will overwhelm the response stream
   */
  // Solution 3
  const readable = fs.createReadStream("test-filde.txt");
  readable.pipe(res);
  // readableSource.pipe(writableDest);
});

server.listen(8000, "127.0.0.1", () => {
  console.log(`Server running at http://127.0.0.1:${8000}`);
});
