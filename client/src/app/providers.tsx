"use client";

import StoreProvider from "@/state/redux";
import { Authenticator } from "@aws-amplify/ui-react";
import Auth from "@/app/(auth)/authProvider"; // ✅ Correct import

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <StoreProvider>
      {/* ✅ Wrap Auth in Authenticator.Provider */}
      <Authenticator.Provider>
        <Auth>{children}</Auth> 
      </Authenticator.Provider>
    </StoreProvider>
  );
};

export default Providers;
