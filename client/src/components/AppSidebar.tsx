"use client";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "./ui/sidebar";
import React from "react";
import { Building, FileText, Heart, Home, Menu, Settings, X } from "lucide-react";
import { NAVBAR_HEIGHT } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";

const AppSidebar = ({ userType }: AppSidebarProps) => {
  const pathname = usePathname();
  const { toggleSidebar, open } = useSidebar();

  const navLinks =
    userType === "manager"
      ? [
          { icon: Building, label: "Properties", href: "/managers/properties" },
          { icon: FileText, label: "Applications", href: "/managers/applications" },
          { icon: Settings, label: "Settings", href: "/managers/settings" },
        ]
      : [
        { icon: Heart, label: "Favorites", href: "/tenants/favorites" },
          { icon: FileText, label: "Applications", href: "/tenants/applications" },
         { icon: Home, label: "Residences", href: "/tenants/residences" },
          { icon: Settings, label: "Settings", href: "/tenants/settings" },
        ];

  return (
    <Sidebar
      collapsible="icon"
      className="fixed left-0 bg-white shadow-lg"
      style={{
        top: `${NAVBAR_HEIGHT}px`,
        height: `calc(100vh - ${NAVBAR_HEIGHT}px)`,
      }}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <div
              className={cn(
                "flex items-center justify-between px-4 py-2 cursor-pointer min-h-[56px]",
                open ? "justify-between" : "justify-center"
              )}
            >
              {open ? (
                <>
                  <h1 className="text-lg font-semibold">
                    {userType === "manager" ? "Admin Panel" : "User Panel"}
                  </h1>
                  <button
                    onClick={toggleSidebar}
                    className="rounded-md p-2 hover:bg-gray-100"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </>
              ) : (
                <button
                  onClick={toggleSidebar}
                  className="rounded-md p-2 hover:bg-gray-100"
                >
                  <Menu className="w-6 h-6" />
                </button>
              )}
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>
          {navLinks.map((link) => {
            const isActive = pathname === link.href;

            return (
              <SidebarMenuItem key={link.href}>
                <SidebarMenuButton
                  asChild
                  className={cn(
                    "flex items-center gap-2 px-4 py-4 w-full ml-2 rounded-md transition-all mb-1",
                    isActive
                      ? "bg-gray-100 text-blue-600 hover:text-blue-600 "
                      : "text-gray-600 hover:bg-gray-100 ",
                  )}
                >
                  <Link href={link.href} scroll={false} className="flex items-center gap-4 w-full">
                    <link.icon className={`h-6 w-6 ${isActive ? "text-blue-600" : "text-gray-600"}`} />
                    <span className={`font-medium ${isActive ? "text-blue-600" : "text-gray-600"}`}>
                      {link.label}
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
