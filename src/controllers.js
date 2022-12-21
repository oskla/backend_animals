import fastify from "fastify";
import Animal from "./model/Animal.js";
import validateEmail from "./utils/validateEmail.js";

export async function GetAnimalsController(request, response) {
  try {
    const { Animal } = request.db.models;
    const animals = await Animal.find({});
    console.log(animals);
    return animals;
  } catch (error) {
    request.log.error(error);
    await response.status(500).send("an error occured");
  }
}
export async function AddAnimalController(request, response) {
  try {
    const { Animal } = request.db.models;
    const newAnimal = await Animal.create(request.body);

    response.status(201);

    return { success: true, message: `Added animal with ID:` };
  } catch (error) {
    request.log.error(error);
    await response.status(500).send("an error occured", error);
  }
}
export async function DeleteAnimalController(request, response) {
  try {
    const { Animal } = request.db.models;
    const deletedCount = await Animal.findByIdAndDelete(request.body._id);

    if (!deletedCount) {
      response.code(404).send("Item not found");
      return { success: false, message: "Animal could not be found!" };
    }

    if (deletedCount == 0) {
      response.code(404);
      return { success: false, message: "Animal could not be found!" };
    }
    return {
      success: true,
      message: `Animal has been deleted! With name: ${deletedCount.name}`,
    };
  } catch (error) {
    request.log.error(error);
    await response.status(500).send("an error occured");
  }
}

export async function UpdateAnimalController(request, response) {
  try {
    const { Animal } = request.db.models;
    const animalExists = await Animal.findById(request.body._id);

    if (animalExists === null) {
      return await response
        .status(404)
        .send(`Animal not found with ID: ${animalExists._id}`);
    }

    const updatedAnimal = await Animal.findByIdAndUpdate(
      request.body._id, // What animal to update
      request.body, // What content to update to
      { new: true }
    );

    return await response.status(200).send(updatedAnimal);
  } catch (error) {
    request.log.error(error);
    await response.status(500).send("an error occured");
  }
}

// export async function UpdateAnimalController(request, response) {
//   try {
//     const { Animal } = request.db.models;
//     const filter = { id: request.body.id };

//     const update = { name: request.body.name };
//     const animal = await Animal.findOneAndUpdate(filter, update, {
//       returnOriginal: false,
//     });

//     if (!animal) {
//       return response
//         .status(404)
//         .send("Can't find animal, make sure you spelled its name correctly");
//     }
//     return {
//       success: true,
//       message: `Animal has been updated with the new name: ${update.name}`,
//     };
//   } catch (error) {
//     request.log.error(error);
//     await response.status(500).send("an error occured");
//   }
// }

export async function RegisterUser(req, rep) {
  try {
    const validEmail = validateEmail(req.body.email);

    if (!validEmail) {
      rep.status(400);
      return "Email format not valid";
    }
    const { User } = req.db.models;
    const userExists = await User.findOne({ email: req.body.email }).exec();

    if (userExists) {
      rep.status(409).send("User with this adress already exists");
    }

    const newUser = await User.create(req.body);
    rep.status(201);

    return { success: true, message: `New user created with id ${newUser.id}` };
  } catch (error) {
    request.log.error(error);
    await response.status(500).send("an error occured");
  }
}

export async function LoginUser(req, reply) {
  try {
    const { User } = req.db.models;

    const user = await User.findOne({
      email: req.body.email,
      password: req.body.password,
    }).exec();

    if (!user) {
      reply.status(404);
      return "No user exists with this email";
    }
    console.log(user);
    if (user != null) {
      const jwtToken = await reply.jwtSign(
        {
          email: user.name,
          userId: user.id,
        },
        { expiresIn: "3m" }
      );
      const responseData = {
        token: jwtToken,
      };
      reply.status(200).send(responseData);
    }
    //return {success: true, message: `Successfully logged in ${user.name}` };
  } catch (error) {
    req.log.error(error);
    await reply.status(500).send("an error occured");
  }
}
