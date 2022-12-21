import * as dotenv from "dotenv";
import path from "path";

const dirname = path.resolve();

dotenv.config();

if (!process.env.NODE_ENV) {
  throw "no valid environment set!";
}

const NODE_ENV = process.env.NODE_ENV;

const envPath = path.resolve(dirname, `.env.${NODE_ENV}`);

dotenv.config({ path: envPath });

const environment = {
  NODE_ENV,
  MESSAGE: process.env.MESSAGE || "No message",
  PORT: process.env.PORT,
};

export default environment;
