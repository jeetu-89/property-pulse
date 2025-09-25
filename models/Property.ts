import {
  HydratedDocument,
  HydratedDocumentFromSchema,
  InferSchemaType,
  Schema,
  Types,
  model,
  models,
} from "mongoose";

const propertySchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    location: {
      street: String,
      city: String,
      state: String,
      zipcode: String,
    },
    beds: {
      type: Number,
      required: true,
    },
    baths: {
      type: Number,
      required: true,
    },
    square_feet: {
      type: Number,
      required: true,
    },
    amenities: [
      {
        type: String,
      },
    ],
    rates: {
      nightly: Number,
      weekly: Number,
      monthly: Number,
    },
    seller_info: {
      name: String,
      email: String,
      phone: String,
    },
    images: [
      {
        type: String,
      },
    ],
    is_featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export type PropertyType = InferSchemaType<typeof propertySchema> & {
  _id: Types.ObjectId;
};
export type PropertyTypeHydrated = HydratedDocumentFromSchema<
  typeof propertySchema
> & {
  _id: Types.ObjectId;
};

const Property = models.Property || model("Property", propertySchema);
export default Property;
