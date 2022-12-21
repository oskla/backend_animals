export const GetAnimalsSchema = {
  response: {
    200: {
      description: "List of Animals",
      type: "array",
      items: {
        type: "object",
        properties: {
          name: { description: "Name of animal", type: "string" },
          numberOfLegs: { description: "Number of legs", type: "number" },
          _id: { description: "Unique id", type: "string" },
          imageUrl: { description: "image URL", type: "string" },
          rating: { description: "Rating of animal (1-5)", type: "number" },
          filterIds: { description: "array of filters", type: "array" },
        },
      },
    },
  },
};

export const AddAnimalSchema = {
  body: {
    type: "object",
    required: ["name", "numberOfLegs", "rating"],
    properties: {
      name: { description: "Name of animal", type: "string" },
      numberOfLegs: { description: "Number of legs", type: "number" },
      imageUrl: { description: "image URL", type: "string" },
      rating: { description: "Rating of animal (1-5)", type: "number" },
      filterIds: { description: "array of filters", type: "array" },
    },
  },

  response: {
    201: {
      description: "Success response",
      type: "object",
      properties: {
        success: { type: "boolean" },
        message: { type: "string" },
      },
    },
  },
};

export const UpdateAnimalSchema = {
  body: {
    type: "object",
    required: ["_id"],
    properties: {
      _id: { description: "Unique id", type: "string" },
      name: { description: "Name of animal", type: "string" },
      numberOfLegs: { description: "Number of legs", type: "number" },
      imageUrl: { description: "image URL", type: "string" },
      rating: { description: "Rating of animal (1-5)", type: "number" },
      filterIds: { description: "array of filters", type: "array" },
    },
  },
  response: {
    200: {
      description: "Update status",
      type: "object",
      properties: {
        success: { type: "boolean" },
        message: { type: "string" },
      },
    },
  },
};

export const DeleteAnimalSchema = {
  body: {
    type: "object",
    required: ["_id"],
    properties: {
      _id: {
        description: "Type the ID of the Animal to delete",
        type: "string",
      },
    },
  },
  response: {
    200: {
      description: "Delete status",
      type: "object",
      properties: {
        success: { type: "boolean" },
        message: { type: "string" },
      },
    },
  },
};

export const RegisterSchema = {
  body: {
    type: "object",
    required: ["email", "password"],
    properties: {
      email: { description: "Email of the user", type: "string" },
      password: { description: "Password of the user", type: "string" },
    },
  },
  response: {
    201: {
      description: "Success response",
      type: "object",
      properties: {
        success: { type: "boolean" },
        message: { type: "string" },
      },
    },
  },
};

export const LoginSchema = {
  body: {
    type: "object",
    required: ["email", "password"],
    properties: {
      email: { description: "Email of the user", type: "string" },
      password: { description: "Password of the user", type: "string" },
    },
  },
  response: {
    200: {
      description: "Success response",
      type: "object",
      properties: {
        token: { type: "string" },
        success: { type: "boolean" },
        message: { type: "string" },
      },
    },
  },
};
