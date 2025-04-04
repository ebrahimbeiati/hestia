// import {
//     useAddFavoritePropertyMutation,
//     useGetAuthUserQuery,
//     useGetPropertiesQuery,
//     useGetTenantQuery,
//     useRemoveFavoritePropertyMutation,
//   } from "@/state/api";
//   import { useAppSelector } from "@/state/redux";
//   import { Property } from "@/types/prismaTypes";
//   import Card from "@/components/Cards";
//   import React from "react";
//   import CardCompact from "@/components/CardCompacts";
  
//   const Listings = () => {
//     const { data: authUser } = useGetAuthUserQuery();
//     const { data: tenant } = useGetTenantQuery(
//       authUser?.cognitoInfo?.userId || "",
//       {
//         skip: !authUser?.cognitoInfo?.userId,
//       }
//     );
//     const [addFavorite] = useAddFavoritePropertyMutation();
//     const [removeFavorite] = useRemoveFavoritePropertyMutation();
//     const viewMode = useAppSelector((state) => state.global.viewMode);
//     const filters = useAppSelector((state) => state.global.filters);
  
//     // const {
//     //   data: properties,
//     //   isLoading,
//     //   isError,
//     // } = useGetPropertiesQuery(filters);

// const { 
//     data: rawResponse, 
//     isLoading, 
//     isError 
//   } = useGetPropertiesQuery({});
  
//   // Define properties variable using rawResponse
//   const properties = rawResponse;   
//    const handleFavoriteToggle = async (propertyId: number) => {
//       if (!authUser) return;
  
//       const isFavorite = tenant?.favorites?.some(
//         (fav: Property) => fav.id === propertyId
//       );
  
//       if (isFavorite) {
//         await removeFavorite({
//           cognitoId: authUser.cognitoInfo.userId,
//           propertyId,
//         });
//       } else {
//         await addFavorite({
//           cognitoId: authUser.cognitoInfo.userId,
//           propertyId,
//         });
//       }
//     };
  
//     if (isLoading) return <>Loading...</>;
//     if (isError) return <div>Failed to fetch properties</div>;
//     if (!properties || properties.length === 0) return <div>No properties found matching your criteria</div>;
  
//     return (
//       <div className="w-full">
//         <h3 className="text-sm px-4 font-bold">
//           {properties.length}{" "}
//           <span className="text-gray-600 font-normal">
//             Places in {filters.location}
//           </span>
//         </h3>
//         <div className="flex">
//           <div className="p-4 w-full">
//             {properties?.map((property) =>
//               viewMode === "grid" ? (
//                 <Card
//                   key={property.id}
//                   property={property}
//                   isFavorite={
//                     tenant?.favorites?.some(
//                       (fav: Property) => fav.id === property.id
//                     ) || false
//                   }
//                   onFavoriteToggle={() => handleFavoriteToggle(property.id)}
//                   showFavoriteButton={!!authUser}
//                   propertyLink={`/search/${property.id}`}
//                 />
//               ) : (
//                 <CardCompact
//                   key={property.id}
//                   property={property}
//                   isFavorite={
//                     tenant?.favorites?.some(
//                       (fav: Property) => fav.id === property.id
//                     ) || false
//                   }
//                   onFavoriteToggle={() => handleFavoriteToggle(property.id)}
//                   showFavoriteButton={!!authUser}
//                   propertyLink={`/search/${property.id}`}
//                 />
//               )
//             )}
//           </div>
//         </div>
//       </div>
//     );
//   };
  
//   export default Listings;
// Listings.tsx
import {
    useAddFavoritePropertyMutation,
    useGetAuthUserQuery,
    useGetPropertiesQuery,
    useGetTenantQuery,
    useRemoveFavoritePropertyMutation,
  } from "@/state/api";
  import { useAppSelector } from "@/state/redux";
  import { Property } from "@/types/prismaTypes";
  import Card from "@/components/Cards";
  import CardCompact from "@/components/CardCompacts";
  import React from "react";
  
  const Listings = () => {
    const { data: authUser } = useGetAuthUserQuery();
    const { data: tenant } = useGetTenantQuery(
      authUser?.cognitoInfo?.userId || "",
      {
        skip: !authUser?.cognitoInfo?.userId,
      }
    );
    const [addFavorite] = useAddFavoritePropertyMutation();
    const [removeFavorite] = useRemoveFavoritePropertyMutation();
    const viewMode = useAppSelector((state) => state.global.viewMode);
    const filters = useAppSelector((state) => state.global.filters);
  
    const {
      data: properties,
      isLoading,
      isError,
    } = useGetPropertiesQuery({});
  
    const handleFavoriteToggle = async (propertyId: number) => {
      if (!authUser) return;
  
      const isFavorite = tenant?.favorites?.some(
        (fav: Property) => fav.id === propertyId
      );
  
      if (isFavorite) {
        await removeFavorite({
          cognitoId: authUser.cognitoInfo.userId,
          propertyId,
        });
      } else {
        await addFavorite({
          cognitoId: authUser.cognitoInfo.userId,
          propertyId,
        });
      }
    };
  
    if (isLoading) return <>Loading...</>;
    if (isError) return <div>Failed to fetch properties</div>;
    if (!properties || properties.length === 0)
      return <div>No properties found matching your criteria</div>;
  
    return (
      <div className="w-full">
        <h3 className="text-sm px-4 font-bold">
          {properties.length} {" "}
          <span className="text-gray-600 font-normal">
            Places in {filters.location}
          </span>
        </h3>
        <div className="flex">
          <div className="p-4 w-full">
            {properties?.map((property) =>
              viewMode === "grid" ? (
                <Card
                  key={property.id}
                  property={property}
                  isFavorite={
                    tenant?.favorites?.some(
                      (fav: Property) => fav.id === property.id
                    ) || false
                  }
                  onFavoriteToggle={() => handleFavoriteToggle(property.id)}
                  showFavoriteButton={!!authUser}
                  propertyLink={`/search/${property.id}`}
                />
              ) : (
                <CardCompact
                  key={property.id}
                  property={property}
                  isFavorite={
                    tenant?.favorites?.some(
                      (fav: Property) => fav.id === property.id
                    ) || false
                  }
                  onFavoriteToggle={() => handleFavoriteToggle(property.id)}
                  showFavoriteButton={!!authUser}
                  propertyLink={`/search/${property.id}`}
                />
              )
            )}
          </div>
        </div>
      </div>
    );
  };
  
  export default Listings;
  