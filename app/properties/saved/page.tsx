import PropertyCard from "@/components/PropertyCard";
import { type PropertyType } from "@/models/Property";
import User, { UserType, UserTypeHydrated } from "@/models/User";
import getSessionUser from "@/utils/getSessionUser";

const SavedPropertiesPage = async () => {
  const userSession = await getSessionUser();
  if (!userSession || !userSession.userId) {
    throw new Error("UserId is not present.");
  }
  const { userId } = userSession;

  const user = await User.findById(userId)
    .populate<{ bookmarks: PropertyType[] }>("bookmarks")
    .lean<UserType & { bookmarks: PropertyType[] }>();

  if (!user) {
    throw new Error("User is not Found.");
  }

  const populatedBookmarks = user.bookmarks as PropertyType[];
  //   console.log(populatedBookmarks);
  return (
    <section className=" px-4 py-6">
      <div className=" px-4 py-6 container">
        <h1 className="text-2xl mb-4">Saved Propeties</h1>
        {populatedBookmarks.length === 0 ? (
          <p>No saved properties</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {populatedBookmarks.map((property) => {
              return (
                <PropertyCard
                  key={property._id.toString()}
                  property={property}
                />
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default SavedPropertiesPage;
