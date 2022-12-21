import fastify from "fastify";
import * as dotenv from "dotenv";
dotenv.config();
import { AnimalRoutes } from "./routes.js";
import environment from "./utils/environment.js";
import database from "./utils/db.js";
import auth from "./utils/auth.js";

const server = fastify({ logger: true });

const start = async () => {
  try {
    await server.register(database);

    await server.register(auth);

    await server.register(AnimalRoutes);
    console.log("Routes registred");
    await server.listen({ port: environment.PORT, host: "0.0.0.0" });
    console.log("The server is running!!");
  } catch (err) {
    server.log.err;
    process.exit(1);
  }
};

start();
