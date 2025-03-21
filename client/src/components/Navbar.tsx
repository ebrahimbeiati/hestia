import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import {Button} from './ui/button'
import { useGetAuthUserQuery } from '@/state/api'
import { usePathname, useRouter } from 'next/navigation'
import { signOut } from 'aws-amplify/auth'
import { Bell, MessageCircle, Plus, Search } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { NAVBAR_HEIGHT } from '@/lib/constants'
import { SidebarTrigger } from './ui/sidebar'

const Navbar = () => {
  const {data: authUser} = useGetAuthUserQuery();
  const router = useRouter();
  const pathname = usePathname();

  const isDashboard = pathname.includes('/managers') || pathname.includes('/tenants');


  const handleLogout = async () => {
   await signOut();
   window.location.href = '/';
  }

  return (
    <div className='fixed top-0 left-0 w-full z-40 shadow-xl' style={{height: `${NAVBAR_HEIGHT}px`}}>
      <div className='flex justify-between items-center w-full py-3 px-6 bg-primary-700 text-white'>
        <div className='flex items-center gap-4 md:gap-6'>
        {isDashboard && (
            <div className="md:hidden">
              <SidebarTrigger />
            </div>
          )}
         <Link href='/' className='cursor-pointer hover:!text-primary-500' scroll={false}>
          <div className='flex items-center gap-3'>
            <Image src='/logo.svg' alt='logo' width={24} height={24} className='w-6 h-6'/>
            <div className='text-xl font-bold'>
            HES
            <span className='text-secondary-500 font-light hover:!text-primary-500'>TIA</span>
            </div>
          </div>
        </Link>
        {isDashboard && authUser && (
          <Button 
        variant='secondary'
        className='md:ml-4 bg-primary-500 text-primary-600 hover:bg-primary-600 hover:text-white'
        onClick={()=>
          router.push(
            authUser.userRole?.toLowerCase() === 'manager' ? '/managers/newProperty':"/search" 
          )
        }>
          {authUser.userRole?.toLowerCase() === 'manager' ? (
            <>
            <Plus className='h-4 w-4'/>
            <span className='hidden md:block ml-2'>Add New Property</span>
            </>
          ):(
            <>
            <Search className='h-4 w-4'/>
            <span className='hidden md:block ml-2'>Search Properties</span>
            </>
          )}
        </Button>
        )}
        </div>

         {isDashboard && (<p className='text-primary-200 hidden md:block'>
          Discover your perfect rental place with our advanced search 
        </p>)}
        <div className='flex items-center gap-4'>

          {authUser ? (
            <>
            <div className='relative hidden md:block'>
              <MessageCircle className='h-6 w-6 text-primary-500 cursor-pointer hover:text-primary-600'/>
              <span className='absolute -top-1 -right-1 bg-secondary-500 text-white rounded-full w-4 h-4 flex items-center justify-center'>3</span>
            </div>
            <div className='relative hidden md:block'>
              <Bell className='h-6 w-6 text-primary-500 cursor-pointer hover:text-primary-600'/>
              <span className='absolute -top-1 -right-1 bg-secondary-500 text-white rounded-full w-4 h-4 flex items-center justify-center'>4</span>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger className='flex items-center gap-2 cursor-pointer'>
                <Avatar>
                  <AvatarImage src={authUser.userInfo?.image} />
                  <AvatarFallback className='bg-primary-500 text-primary-600'>
                    {authUser.userRole?.[0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <p className='hidden md:block text-primary-200'>{authUser.userInfo?.name}</p>
                <DropdownMenuContent className='bg-white text-primary-700 rounded-lg shadow-lg'>
                <DropdownMenuItem className='cursor-pointer hover:!bg-primary-600 hover:!text-primary-100 font-bold'
                onClick={()=>router.push(authUser.userRole?.toLowerCase()=== "manager" ? "/managers/properties":"/tenants/favorites", {scroll:false}
                )}>
                  Go to Dashboard

                </DropdownMenuItem>
                <DropdownMenuSeparator className='border-primary-300'/>
                <DropdownMenuItem className='cursor-pointer hover:!bg-primary-600 hover:!text-primary-100'
                onClick={()=>router.push(`/${authUser.userRole?.toLowerCase()}s/settings`, {scroll:false}
                )}>
                  Settings

                </DropdownMenuItem>
                <DropdownMenuSeparator className='border-primary-300'/>
                <DropdownMenuItem className='cursor-pointer hover:!bg-primary-600 hover:!text-primary-100 '
                onClick={handleLogout}>
                    sign Out
                      </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenuTrigger>
            </DropdownMenu>
            </>
            
          ):(
            <>
        <Link href="/signin">
                <Button
                  variant="outline"
                  className="text-white border-white bg-transparent hover:bg-white hover:text-primary-700 rounded-lg"
                >
                  Sign In
                </Button>
              </Link>
              <Link href="/signup">
                <Button
                  variant="secondary"
                  className="text-white bg-secondary-600 hover:bg-white hover:text-primary-700 rounded-lg"
                >
                  Sign Up
                </Button>
              </Link>
           </>
          )}
        </div>
      </div>

    </div>
  )
}

export default Navbar