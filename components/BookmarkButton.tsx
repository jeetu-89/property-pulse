"use client";

import bookmarkProperty from "@/app/actions/bookmarkProperty";
import checkBookmarkStatus from "@/app/actions/checkBookmarkStatus";
import type { PropertyType } from "@/models/Property";
import type { SerializableObjectType } from "@/utils/convertToObjext";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { FaBookmark } from "react-icons/fa";
import { toast } from "react-toastify";

const BookmarkButton = ({
  property,
}: {
  property: SerializableObjectType<PropertyType>;
}) => {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const [isBookmarked, setIsBookmarked] = useState(false);
  const [loading, setLoading] = useState(true);
  const handleClick = async () => {
    if (!userId) {
      toast.error("You need to be signed in to bookmark a property.");
      return;
    }
    bookmarkProperty(property._id)
      .then((res) => {
        toast.success(res.message);
        setIsBookmarked(res.isBookmarked);
      })
      .catch((err) => {
        const mssg =
          err instanceof Error
            ? err.message
            : "Unable to bookmark the property.";
        toast.error(mssg);
      });
  };

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }
    checkBookmarkStatus(property._id.toString())
      .then((res) => {
        setIsBookmarked(res.isBookmarked);
        setLoading(false);
      })
      .catch((err) => {
        const message =
          err instanceof Error
            ? err.message
            : "Unable to check bookmark status";
        toast.error(message);
        setLoading(false);
      });
  }, [userId, property._id, checkBookmarkStatus]);
  if (loading) {
    return <p className="text-center">Loading...</p>;
  }
  return isBookmarked ? (
    <button
      onClick={handleClick}
      className="bg-red-500 hover:bg-red-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
    >
      <FaBookmark className="mr-2"></FaBookmark> Remove Bookmark
    </button>
  ) : (
    <button
      onClick={handleClick}
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
    >
      <FaBookmark className="mr-2"></FaBookmark> Bookmark Property
    </button>
  );
};

export default BookmarkButton;
