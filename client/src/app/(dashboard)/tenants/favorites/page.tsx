"use client";

import Card from "@/components/Card";
import Header from "@/components/Header";
import Loading from "@/components/Loading";
import {
  useGetAuthUserQuery,
  useGetPropertiesQuery,
  useGetTenantQuery,
} from "@/state/api";
import React from "react";

const Favorites = () => {
  const { data: authUser } = useGetAuthUserQuery();
  const { data: tenant } = useGetTenantQuery(
    authUser?.cognitoInfo?.userId || "",
    {
      skip: !authUser?.cognitoInfo?.userId,
    }
  );

  const {
    data: favoriteProperties,
    isLoading,
    error,
  } = useGetPropertiesQuery(
    { favoriteIds: tenant?.favorites?.map((fav: { id: number }) => fav.id) },
    { skip: !tenant?.favorites || tenant?.favorites.length === 0 }
  );

  if (isLoading) return <Loading />;
  if (error) return <div>Error loading favorites</div>;

  return (
    <div className="dashboard-container">
      <Header
        title="Favorited Properties"
        subtitle="Browse and manage your saved property"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {favoriteProperties?.map((property) => (
          <Card
            key={property.id}
            property={property}
            isFavorite={true}
            onFavoriteToggle={() => {}}
            showFavoriteButton={false}
            propertyLink={`/tenants/residences/${property.id}`}
          />
        ))}
      </div>
      {(!favoriteProperties || favoriteProperties.length === 0) && (
        <p>You don&lsquo;t have any favorited properties</p>
      )}
    </div>
  );
};

export default Favorites;

// "use client";

// import Card from "@/components/Card";
// import Header from "@/components/Header";
// import Loading from "@/components/Loading";
// import {
//   useGetAuthUserQuery,
//   useGetPropertiesQuery,
//   useGetTenantQuery,
//   useRemoveFavoritePropertyMutation, // Import the mutation
// } from "@/state/api";
// import React, { useState, useEffect } from "react";

// // Import icons for the delete button
// import { FaTrashAlt } from "react-icons/fa"; // Trash icon for delete button

// const Favorites = () => {
//   const { data: authUser } = useGetAuthUserQuery();
//   const { data: tenant } = useGetTenantQuery(
//     authUser?.cognitoInfo?.userId || "",
//     {
//       skip: !authUser?.cognitoInfo?.userId,
//     }
//   );

//   const {
//     data: favoriteProperties,
//     isLoading,
//     error,
//     refetch, // Refetch method
//   } = useGetPropertiesQuery(
//     { favoriteIds: tenant?.favorites?.map((fav: { id: number }) => fav.id) },
//     { skip: !tenant?.favorites || tenant?.favorites.length === 0 }
//   );

//   // Use the mutation to remove the property from favorites
//   const [removeFavorite] = useRemoveFavoritePropertyMutation();

//   // Handle delete function to remove a property from favorites
//   const handleDeleteFavorite = async (propertyId: number) => {
//     try {
//       // Remove from the backend
//       await removeFavorite({
//         cognitoId: authUser?.cognitoInfo?.userId || "",
//         propertyId,
//       });

//       // Trigger a refetch of the favorite properties after deletion
//       refetch();
//     } catch (error) {
//       console.error("Error removing favorite:", error);
//     }
//   };

//   if (isLoading) return <Loading />;
//   if (error) return <div>Error loading favorites</div>;

//   return (
//     <div className="dashboard-container">
//       <Header
//         title="Favorited Properties"
//         subtitle="Browse and manage your saved property"
//       />
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//         {favoriteProperties?.map((property) => (
//           <div key={property.id} className="relative">
//             <Card
//               property={property}
//               isFavorite={true}
//               onFavoriteToggle={() => {}}
//               showFavoriteButton={false}
//               propertyLink={`/tenants/residences/${property.id}`}
//             />
//             {/* Beautiful delete button */}
//             <button
//               onClick={() => handleDeleteFavorite(property.id)}
//               className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full shadow-lg hover:bg-red-700 transition-all"
//             >
//               <FaTrashAlt size={18} />
//             </button>
//           </div>
//         ))}
//       </div>
//       {(!favoriteProperties || favoriteProperties.length === 0) && (
//         <p>You don&lsquo;t have any favorited properties</p>
//       )}
//     </div>
//   );
// };

// export default Favorites;
