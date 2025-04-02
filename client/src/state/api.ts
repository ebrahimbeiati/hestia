import { createNewUserInDatabase } from "@/lib/utils";
import { Manager, Tenant } from "@/types/prismaTypes";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { fetchAuthSession, getCurrentUser } from "aws-amplify/auth";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    prepareHeaders: async (headers)=>{
      const session = await fetchAuthSession();
      const { idToken } = session.tokens ?? {};
      if (idToken) {
        headers.set("Authorization", `Bearer ${idToken}`);
      }
      return headers;
    }
  }),
  reducerPath: "api",
  tagTypes: ["Managers", "Tenants"],
  endpoints: (build) => ({
    getAuthUser: build.query<User, void>({
      queryFn: async (_, _queryApi, _extraOptions, fetchWithBQ) => {
        try {
          const session = await fetchAuthSession();
          const {idToken} = session.tokens ?? {};
          const user = await getCurrentUser();
          console.log("Current user:", user);
          const userRole = idToken?.payload["custom:role"] as string;

          //console.log userdetails
          const endpoint = 
          userRole === "manager"
          ? `/managers/${user.userId}`
          : `/tenants/${user.userId}`;

          let userDetailsResponse = await fetchWithBQ(endpoint);
          console.log("User details response:", userDetailsResponse.error);
          if(userDetailsResponse.error && userDetailsResponse.error.status === 404){
            userDetailsResponse = await createNewUserInDatabase(user,idToken,userRole, fetchWithBQ );
          }
          console.log("User details response:", userDetailsResponse);

          return {
            data:{
              cognitoInfo: {...user},
               userInfo: userDetailsResponse.data as Tenant | Manager,
               userRole
            }
          };
        } catch (error: any) {
          return {error: error.message || "Could not fetch user details"};
        }
      },
    }),
    updateTenantSettings: build.mutation<Tenant, {cognitoId: string} & Partial<Tenant>>({
      query: ({cognitoId, ...updateTenant}) => ({
        url: `/tenants/${cognitoId}`,
        method: "PUT",
        body: updateTenant,
      }),
      invalidatesTags:(result)=>[{type:"Tenants", id:result?.id}],
    }),
    updateManagerSettings: build.mutation<Manager, {cognitoId: string} & Partial<Manager>>({
      query: ({cognitoId, ...updateManager}) => ({
        url: `/managers/${cognitoId}`,
        method: "PUT",
        body: updateManager,
      }),
      invalidatesTags:(result)=>[{type:"Managers", id:result?.id}],
    }),

  }),
});

export const {
  useGetAuthUserQuery,
  useUpdateTenantSettingsMutation,
  useUpdateManagerSettingsMutation,
} = api;
