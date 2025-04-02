"use client";
import React from "react";
import {
  useGetAuthUserQuery,
  useUpdateTenantSettingsMutation,
} from "@/state/api";
import SettingForm from "@/components/SettingForm";

const TenantSettings = () => {
  const { data: authUser, isLoading } = useGetAuthUserQuery();
  const [updateTenant] = useUpdateTenantSettingsMutation();

  if (isLoading) return <>It is loading...</>;
  console.log('Updating', authUser);
  const initialData = {
    name: authUser?.userInfo.name,
    email: authUser?.userInfo.email,
    phoneNumber: authUser?.userInfo.phoneNumber,
  };

  const handleSubmit = async (data: typeof initialData) => {
    try {
      await updateTenant({ cognitoId: authUser?.cognitoInfo?.userId, ...data });
    } catch (error) {
      console.error("Error updating tenant settings:", error);
    }
  };
  return (
    <SettingForm
      initialData={initialData}
      onSubmit={handleSubmit}
      userType="tenant"
    />
  );
};

export default TenantSettings;
