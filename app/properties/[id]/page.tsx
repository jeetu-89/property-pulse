type PropertyPageProps = {
  params: {
    id: string;
  };
  searchParams: {
    [key: string]: string | undefined | string[];
  };
};

const PropertyPage = async({ params, searchParams }: PropertyPageProps) => {
    const resolvedSearchParams = await searchParams;
  return <div>Property Page {params.id}</div>;
};

export default PropertyPage;
