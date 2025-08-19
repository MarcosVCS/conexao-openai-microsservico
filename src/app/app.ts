import express from "express";
import { HttpStatus } from "./common/enums/HttpStatus";
import { Errors } from "./common/enums/Errors";

import router from "./rest/router";
import CustomError from "./common/classes/CustomError";

const apiBasePath = process.env.API_BASE_PATH;
const port = process.env.PORT ?? 5000;
const host = process.env.HOST;

const app = express();

app.use(`${apiBasePath}/consult`, router);

try {
  if (process.env.OPEN_AI_KEY == undefined) {
    {
      throw new CustomError(Errors.NO_OPENAI_KEY, HttpStatus.ServerError);
    }
  }
  app.listen(port, () => console.log(`Listening on ${host}:${port}`));
} catch (error) {
  console.log(error);
  console.log("Shutting down...");
}
