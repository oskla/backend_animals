import * as schemas from "./schemas.js";
import * as controllers from "./controllers.js";

export async function AnimalRoutes(server, options) {
  server.route({
    method: "POST",
    url: "/register",
    schema: schemas.RegisterSchema,
    handler: controllers.RegisterUser,
  });

  server.route({
    method: "POST",
    url: "/login",
    schema: schemas.LoginSchema,
    handler: controllers.LoginUser,
  });

  server.route({
    method: "GET",
    url: "/animals",
    //preHandler: server.authenticate,
    schema: schemas.GetAnimalsSchema,
    handler: controllers.GetAnimalsController,
  });

  server.route({
    method: "POST",
    url: "/animals",
    //preHandler: server.authenticate,
    schema: schemas.AddAnimalSchema,
    handler: controllers.AddAnimalController,
  });

  server.route({
    method: "DELETE",
    url: "/animals",
    //preHandler: server.authenticate,
    schema: schemas.DeleteAnimalSchema,
    handler: controllers.DeleteAnimalController,
  });

  server.route({
    method: "PUT",
    url: "/animals",
    //preHandler: server.authenticate,
    schema: schemas.UpdateAnimalSchema,
    handler: controllers.UpdateAnimalController,
  });
}
