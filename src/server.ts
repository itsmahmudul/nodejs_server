import http, { IncomingMessage, Server, ServerResponse } from "http";
import config from "./config";

const server: Server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    console.log("Server is running");

    //root route
    if (req.url == "/" && req.method == "GET") {
      res.writeHead(200, { "content-type": "application/json" });
      res.end(
        JSON.stringify({
          message: "hello from node js from typescript...",
          path: req.url,
        })
      );
    }

    //health route
    if (req.url == "/api" && req.method == "GET") {
      res.writeHead(200, { "content-type": "application/json" });
      res.end(
        JSON.stringify({
          message: "Health status ok",
          path: req.url,
        })
      );
    }

    if (req.url === "/api/users" && req.method === "POST") {
      // res.writeHead(200, { "Content-Type": "application/json" });
      // return res.end(
      //   JSON.stringify({
      //     id: 1,
      //     name: "alice",
      //   })
      // );

      let body = "";

      //listen for data chunk
      req.on("data", (chunk) => {
        body += chunk.toString();
      });

      req.on("end", () => {
        try {
          const parseBody = JSON.parse(body);
          console.log(parseBody);
          res.end(JSON.stringify(parseBody));
        } catch (err: any) {
          console.log(err?.message);
        }
      });
    }
  }
);

server.listen(config.port, () => {
  console.log(`Server is running at port ${config.port}`);
});
