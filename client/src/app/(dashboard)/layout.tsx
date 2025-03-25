"use client"
import Navbar from '@/components/Navbar'
import { SidebarProvider } from '@/components/ui/sidebar'
import { NAVBAR_HEIGHT } from '@/lib/constants'
import Sidebar  from '@/components/AppSidebar'
import { useGetAuthUserQuery } from '@/state/api'
import React, { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'

const DashboardLayout = ({children}:{children:React.ReactNode}) => {
    const {data: authUser, isLoading: authLoading} = useGetAuthUserQuery();
    const router = useRouter();
    const pathname = usePathname();
    const [isLoading, setIsLoading] = useState(true);


    useEffect(()=>{
        if(authUser){
            const userRole = authUser.userRole?.toLowerCase();
            if((userRole === 'manager' && pathname.startsWith('/tenants')) || (userRole === 'tenant' && pathname.startsWith('/managers'))){

                router.push(userRole ==="manager"?'/managers/properties':'/tenants/favorites', {scroll:false});
            }else{
                setIsLoading(false);
            }
        }
    },[authUser, pathname, router]);
    if(isLoading|| authLoading) return <div>Loading...</div>;
    if(!authUser?.userRole) return null;
  return (
    <SidebarProvider>
    <div className='bg-primary-100 min-h-screen w-full'>
        <Navbar />
        <div style={{paddingTop:`${NAVBAR_HEIGHT}px`}}>
            <main className='container flex mx-auto px-4'>
                <Sidebar userType={authUser?.userRole.toLowerCase()} />
                <div className='flex grow transition-all duration-300'>
                    {children}

                </div>
            </main>

        </div>
    </div>
    </SidebarProvider>
  )
}

export default DashboardLayout