import PropertyCard from "@/components/PropertyCard";
import connectDB from "@/config/db";
import Property from "@/models/Property";
import type { PropertyType } from "@/models/Property"

const PropertyPage = async () => {
  await connectDB();
  const properties = await Property.find({}).lean<PropertyType[]>();
  return (
    <section className=" px-4 py-6">
      <div className=" container mx-auto px-4 py-6">
        {properties.length === 0 ? (
          <p>No Properties Found</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties.map((property) => (
              <PropertyCard key={property._id.toString()} property={property} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PropertyPage;
