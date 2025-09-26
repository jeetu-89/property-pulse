"use server";

import User, { UserTypeHydrated } from "@/models/User";
import getSessionUser from "@/utils/getSessionUser";
import { Types } from "mongoose";

const checkBookmarkStatus = async (propertyId: string) => {
  const propertyObjectId = new Types.ObjectId(propertyId);

  const userSession = await getSessionUser();
  if (!userSession || !userSession.userId) {
    throw new Error("User Id is not present.");
  }
  const { userId } = userSession;

  const user = await User.findById<UserTypeHydrated>(userId);
  if (!user) {
    throw new Error("Property not found.");
  }
  const isBookmarked = user.bookmarks.some((bookmark) =>
    bookmark.equals(propertyObjectId)
  );
  return { isBookmarked };
};

export default checkBookmarkStatus;
