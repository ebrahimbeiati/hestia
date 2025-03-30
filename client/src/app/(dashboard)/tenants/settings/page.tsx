"use client";
import React from "react";
import {
  useGetAuthUserQuery,
  useUpdateTenantSettingsMutation,
} from "@/state/api";
import SettingBanner from "@/components/SettingBanner";

const TenantSettingsPage = () => {
  const { data: authUser, isLoading } = useGetAuthUserQuery();
  const [updateTenant] = useUpdateTenantSettingsMutation();

  if (isLoading) return <>It is loading...</>;

  const initialData = {
    name: authUser?.userInfo.name,
    email: authUser?.userInfo.email,
    phoneNumber: authUser?.userInfo.phoneNumber
  };

  const handleSubmit = async (data: typeof initialData) => {
    try {
      await updateTenant({ cognitoId: authUser?.cognitoInfo?.userId, ...data });
    } catch (error) {
      console.error("Error updating tenant settings:", error);
    }
  };
  return (
    <SettingBanner
      initialData={initialData}
      onSubmit={handleSubmit}
      userType="tenant"
      />
  );
};

export default TenantSettingsPage;
