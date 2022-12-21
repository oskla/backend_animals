import mongoose from "mongoose";
import fp from "fastify-plugin";
import Animal from "../model/Animal.js";
import User from "../model/User.js";

async function database(server, options) {
  try {
    mongoose.connection.on("connected", () => {
      server.log.info({ actor: "MongoDB" }, "Connected to DB");
    });

    mongoose.connection.on("disconnected", () => {
      server.log.info({ actor: "MongoDB" }, "Disconnected from DB");
    });

    await mongoose.connect(
      "mongodb+srv://oskarlarssson:2BBlUHOfYrdBhPWb@cluster0.0jojlle.mongodb.net/?retryWrites=true&w=majority"
    );

    const models = { Animal, User };

    server.addHook("onRequest", async (request, response) => {
      request.db = { models };
    });
  } catch (error) {}
}

export default fp(database);
