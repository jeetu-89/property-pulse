import PropertyEditForm from "@/components/PropertyEditForm";
import connectDB from "@/config/db";
import Property, { PropertyType } from "@/models/Property";
import { convertToSerializableObject } from "@/utils/convertToObjext";
import { HiQrCode } from "react-icons/hi2";

type PropertyEditPageProps = {
  params: {
    id: string;
  };
};
const PropertyEditPage = async ({ params }: PropertyEditPageProps) => {
  await connectDB();
  const {id} =await  params;

  const propertyDoc = await Property.findById(id).lean<PropertyType>();
  const property = convertToSerializableObject(propertyDoc);
  // export type PropertySerializedType = typeof property;
  if (!property) {
    return (
      <h1 className="text-center font-bold mt-10 text-2xl">
        Property Not Found.
      </h1>
    );
  }

  return (
    <section className="bg-blue-50">
      <div className=" max-w-2xl mx-auto container py-24">
        <div className="bg-white border shadow-md rounded-md m-4 px-6 py-8 md:m-0">
          <PropertyEditForm property = {property}/>
        </div>
      </div>
    </section>
  );
};

export default PropertyEditPage;
