"use client";
import Image from 'next/image'
import React from 'react'
import { motion } from 'framer-motion'
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  return (
    <div className='relative h-screen'>
        <Image src='/landing-splash.jpg' alt='hero' fill priority className='object-cover object-center'/>
        <div className='absolute inset-0  bg-black bg-opacity-40 p-8 rounded-lg'>
            <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className='absolute top-1/3  transform -translate-y-1/2 -translate-x-1/2 w-full' > 
            <div className='max--w-4xl max-auto px-16 sm:px-12'>
            <h1 className='text-5xl font-bold text-white mb-4 text-center shadow-teal-800 dark:text-teal-800'>Welcome to the best place to find your next Home</h1>
            <p className='text-white text-xl mb-8 text-center'>We help you find the best place for you</p>
            <div className='flex justify-center'>
                <Input
                type='text'
                value='search query'
                onChange ={() => {}}
                placeholder='Search by city, state, or zip code'
                className='w-full max-w-lg rounded-none rounded-l-lg border-none bg-white h-12'/>
                <Button onClick={() => {}} className=' bg-secondary-500 text-white rounded-none rounded-r-lg h-12'>Search</Button>

            </div>
            </div>

            </motion.div>
        </div>
    </div>
  )
}

export default HeroSection