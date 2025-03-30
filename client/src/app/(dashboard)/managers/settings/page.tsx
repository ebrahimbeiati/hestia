"use client";
import React from "react";
import {
  useGetAuthUserQuery,
  useUpdateManagerSettingsMutation,
} from "@/state/api";
import SettingBanner from "@/components/SettingBanner";

const ManagerSettingsPage = () => {
  const { data: authUser, isLoading } = useGetAuthUserQuery();
  const [updateManager] = useUpdateManagerSettingsMutation();

  if (isLoading) return <>It is loading...</>;

  const initialData = {
    name: authUser?.userInfo.name || "",
    email: authUser?.userInfo.email || "",
    phoneNumber: authUser?.userInfo.phoneNumber || ""
  };

  const handleSubmit = async (data: typeof initialData) => {
    try {
      await updateManager({ cognitoId: authUser?.cognitoInfo?.userId, ...data });
    } catch (error) {
      console.error("Error updating manager settings:", error);
    }
  };

  return (
    <SettingBanner
      initialData={initialData}
      onSubmit={handleSubmit}
      userType="manager"
    />
  );
};

export default ManagerSettingsPage;
