// grpc-web requires XMLHttpRequest
((global as unknown) as any)["XMLHttpRequest"] = require("xhr2");

import { Code } from "../../lib/code_pb";
import {
  BadRequest,
  DebugInfo,
  ErrorInfo,
  Help,
  LocalizedMessage,
  PreconditionFailure,
  QuotaFailure,
  RequestInfo,
  ResourceInfo,
} from "../../lib/error_details_pb";
import * as richErrorParser from "../../src";
import { SampleServicePromiseClient } from "./lib/sample_grpc_web_pb";
import { ErrorRequest, HelloReply, HelloRequest } from "./lib/sample_pb";

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
      const [st, details] = richErrorParser.statusFromError(e);
      if (st) {
        console.log("Status: code = ", st.getCode());
      } else {
        console.warn("Unknown error: ", e);
      }
    }
  }
  // Error Response
  {
    const req = new ErrorRequest();
    req.setCode(Code.FAILED_PRECONDITION);
    try {
      const res: HelloReply = await client.sayError(req);
      // the promise will reject and it will not be called
      console.log("Received response from sayError", res.toObject());
    } catch (e) {
      console.log(
        "Received error from sayError, calling `statusFromError`...\n"
      );
      const [st, details] = richErrorParser.statusFromError(e);
      if (st && details) {
        console.log(
          `Created Status: code = ${st.getCode()}, message = "${st.getMessage()}"`
        );
        for (const [i, d] of details.entries()) {
          console.log();
          console.log(`Details #${i + 1} is...`);
          if (d instanceof DebugInfo) {
            console.log(
              `DebugInfo: StackEntries = [${d
                .getStackEntriesList()
                .join(", ")}], Detail = "${d.getDetail()}"`
            );
          } else if (d instanceof QuotaFailure) {
            console.log("PreconditionFailure");
            console.group();
            for (const [j, v] of d.getViolationsList().entries()) {
              console.log(`PreconditionFailureViolation #${j}`);
              console.group();
              console.log(`Subject: ${v.getSubject()}`);
              console.log(`Description: ${v.getDescription()}`);
              console.groupEnd();
            }
            console.groupEnd();
          } else if (d instanceof ErrorInfo) {
            console.log(
              `ErrorInfo: Domain = ${d.getDomain()}, Reason = ${d.getReason()}, Metadata = ${JSON.stringify(
                d.getMetadataMap().toObject()
              )}`
            );
          } else if (d instanceof PreconditionFailure) {
            console.log(`PreconditionFailure`);
            console.group();
            for (const [j, v] of d.getViolationsList().entries()) {
              console.log(`PreconditionFailureViolation #${j + 1}`);
              console.group();
              console.log(`Type: ${v.getType()}`);
              console.log(`Subject: ${v.getSubject()}`);
              console.log(`Description: ${v.getDescription()}`);
              console.groupEnd();
            }
            console.groupEnd();
          } else if (d instanceof BadRequest) {
            console.log(`BadRequest`);
            console.group();
            for (const [j, v] of d.getFieldViolationsList().entries()) {
              console.log(`PreconditionFailureViolation #${j + 1}`);
              console.group();
              console.log(`Field: ${v.getField()}`);
              console.log(`Description: ${v.getDescription()}`);
              console.groupEnd();
            }
            console.groupEnd();
          } else if (d instanceof RequestInfo) {
            console.log(
              `RequestInfo: RequestId = ${d.getRequestId()}, ServingData = ${d.getServingData()}`
            );
          } else if (d instanceof ResourceInfo) {
            console.log(
              `RequestInfo: ResourceType = ${d.getResourceType()}, ResourceName = ${d.getResourceName()}, Owner = ${d.getOwner()}, Description = ${d.getDescription()}`
            );
          } else if (d instanceof Help) {
            console.log(`Help`);
            console.group();
            for (const [j, v] of d.getLinksList().entries()) {
              console.log(`HelpLink #${j + 1}`);
              console.group();
              console.log(`Description: ${v.getDescription()}`);
              console.log(`Url: ${v.getUrl()}`);
              console.groupEnd();
            }
            console.groupEnd();
          } else if (d instanceof LocalizedMessage) {
            console.log(
              `LocalizedMessage: Locale = ${d.getLocale()}, Message = ${d.getMessage()}`
            );
          } else {
            console.log("Unknown. Moving on to the next detail...");
          }
        }
        console.groupEnd();
      } else {
        console.warn("Unknown error: ", e);
      }
    }
  }
})();
