"use server";

import connectDB from "@/config/db";
import User, { type UserTypeHydrated } from "@/models/User";
import getSessionUser from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";
import { Types } from "mongoose";

const bookmarkProperty = async (propertyId: string) => {
  await connectDB();

  const userSession = await getSessionUser();
  if (!userSession || !userSession.userId) {
    throw new Error("User Id is required.");
  }
  const { userId } = userSession;

  const user = await User.findById<UserTypeHydrated>(userId);
  if (!user) {
    throw new Error("User not present.");
  }

  let message;
  const propertyObjectId = new Types.ObjectId(propertyId);
  let isBookmarked = user.booksmarks.some((bookmark: Types.ObjectId) =>
    bookmark.equals(propertyObjectId)
  );
  if (isBookmarked) {
    user.booksmarks = user.booksmarks.filter(
      (bookmark) => !bookmark.equals(propertyObjectId)
    );
    isBookmarked = false;
    message = "Bookmark Removed";
  } else {
    user.booksmarks.push(propertyObjectId);
    isBookmarked = true;
    message = "Bookmark Added";
  }

  await user.save();
  revalidatePath("/properties/saved", "page");

  return {
    message,
    isBookmarked,
  };
};
export default bookmarkProperty;
