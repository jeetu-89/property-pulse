"use client";

import bookmarkProperty from "@/app/actions/bookmarkProperty";
import type { PropertyType } from "@/models/Property";
import type { SerializableObjectType } from "@/utils/convertToObjext";
import { error } from "console";
import { useSession } from "next-auth/react";
import { FaBookmark } from "react-icons/fa";
import { toast } from "react-toastify";

const BookmarkButton = ({
  property,
}: {
  property: SerializableObjectType<PropertyType>;
}) => {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const handleClick = async () => {
    if (!userId) {
      toast.error("You need to be signed in to bookmark a property.");
      return;
    }
    bookmarkProperty(property._id)
      .then((res) => toast.success(res.message))
      .catch((err) => {
        const mssg =
          err instanceof Error
            ? err.message
            : "Unable to bookmark the property.";
        toast.error(mssg);
      });
  };
  return (
    <button
      onClick={handleClick}
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
    >
      <FaBookmark className="mr-2"></FaBookmark> Bookmark Property
    </button>
  );
};

export default BookmarkButton;
