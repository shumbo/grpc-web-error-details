global["XMLHttpRequest"] = require("xhr2");
import { SampleServicePromiseClient } from "./lib/sample_grpc_web_pb";
import { HelloReply, HelloRequest } from "./lib/sample_pb";

const client = new SampleServicePromiseClient("http://localhost:9000");

(async () => {
  // Normal Response
  {
    const req = new HelloRequest();
    req.setName("world");
    try {
      const res: HelloReply = await client.sayHello(req);
      console.log(res.toObject());
    } catch (e) {
      console.log("Error: ", e);
    }
  }
})();
