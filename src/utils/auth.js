import fastifyJwt from "@fastify/jwt";
import fp from "fastify-plugin";

async function Auth(server, options) {
  await server.register(fastifyJwt, {
    secret: "verynicesecret",
    sign: {
      expiresIn: "15m",
    },
  });

  await server.decorate("authenticate", async (request, response) => {
    try {
      await request.jwtVerify();
    } catch (error) {
      response.send(error);
    }
  });
}

export default fp(Auth);
