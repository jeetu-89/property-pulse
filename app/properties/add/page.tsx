import PropertyAddForm from "@/components/PropertyADDForm";

const AddPropertyPage = () => {
  return (
    <section className="bg-blue-50">
      <div className=" py-24 container max-w-2xl mx-auto">
        <div className="bg-white m-4 border shadow-md px-6 py-8 md:m-0">
          <PropertyAddForm />
        </div>
      </div>
    </section>
  );
};

export default AddPropertyPage;
