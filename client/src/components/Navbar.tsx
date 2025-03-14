import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import {Button} from './ui/button'

const Navbar = () => {
  return (
    <div className='fixed top-0 left-0 w-full z-40 shadow-xl'>
      <div className='flex justify-between items-center w-full py-3 px-6 bg-primary-700 text-white'>
        <div className='flex items-center gap-4 md:gap-6'>
         <Link href='/' className='cursor-pointer hover:!text-primary-500' scroll={false}>
          <div className='flex items-center gap-3'>
            <Image src='/logo.svg' alt='logo' width={24} height={24} className='w-6 h-6'/>
            <div className='text-xl font-bold'>
            HES
            <span className='text-secondary-500 font-light hover:!text-primary-500'>TIA</span>
            </div>
          </div>
        </Link>
     
        </div>
         <p className='text-primary-200 hidden md:block'>
          Discover your perfect rental place with our advanced search 
        </p>
        <div className='flex items-center gap-4'>
          <Link href='/sign-in' scroll={false}>
            <Button variant='outline' className='px-4 py-2 bg-transparent text-white rounded-lg hover:text-primary-600 '>
              Sign In
            </Button>
          </Link>
          <Link href='/sign-up' scroll={false}>
            <Button variant='default' className='px-4 py-2 bg-secondary-600 hover:bg-white rounded-lg hover:text-primary-700'>
              Sign Up
            </Button>
          </Link>
        </div>
      </div>

    </div>
  )
}

export default Navbar