import {
  InferSchemaType,
  Schema,
  model,
  models,
  Types,
  HydratedDocumentFromSchema,
} from "mongoose";

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: [true, "Email already exists."],
    },
    username: {
      type: String,
      required: [true, "Username is required."],
    },
    image: {
      type: String,
    },
    bookmarks: [
      {
        type: Schema.Types.ObjectId,
        ref: "Property",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export type UserType = InferSchemaType<typeof userSchema> & {
  _id: Types.ObjectId;
};

export type UserTypeHydrated = HydratedDocumentFromSchema<typeof userSchema> & {
  _id: Types.ObjectId;
};
const User = models.User || model("User", userSchema);
export default User;
