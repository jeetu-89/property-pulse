"use server";
import cloudinary from "@/config/cloudinary";
import connectDB from "@/config/db";
import Property, { PropertyTypeHydrated } from "@/models/Property";
import getSessionUser from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";

async function deleteProperty(propertyId: string) {
  const sessionUser = await getSessionUser();
  if (!sessionUser || !sessionUser.userId) {
    throw new Error("Session Id is required.");
  }
  const { userId } = sessionUser;

  await connectDB();
  const property = await Property.findById<PropertyTypeHydrated>(propertyId);
  if (!property) {
    throw new Error("Property Not Found.");
  }

  if (property.owner.toString() !== userId) {
    throw new Error("User is unauthorized to delete the property.");
  }

  //Extract Public Ids form image URLS
  const publicIds = property.images.map((imageUrl) => {
    const parts = imageUrl.split("/");
    return parts.at(-1)?.split(".").at(0);
  });

  //Delete Images from cloudinary
  if (publicIds.length > 0) {
    for (let publicId of publicIds) {
      await cloudinary.uploader.destroy(`propertyPulse/${publicId}`);
    }
  }
  await property.deleteOne();

  revalidatePath("/", "layout");

}

export default deleteProperty;