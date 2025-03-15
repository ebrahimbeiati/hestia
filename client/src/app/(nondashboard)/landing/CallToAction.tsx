'use client'
import Image from 'next/image'
import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

export const CallToAction = () => {
  return (
    <div className='relative py-24'>
        <Image src='/landing-call-to-action.jpg' alt='Rentiful search section background' fill  className='object-cover object-center' />
        <div className='absolute inset-0 bg-black bg-opacity-50 z-10'>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{once: true}}
                className='relative max-w-4xl xl:max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 text-center text-white'>
                    <div className='flex flex-col items-center md:flex-row justify-between mt-4 '>
                        <div className='mb-6 md:mb-0 md:mr-10'> 
                            <h2 className='text-3xl font-bold mb-4'>Ready to find your dream home?</h2>
                        </div>
                        <div>
                            <p className='text-white mb-3'>
                                Get started today and find the perfect rental property for you.
                            </p>
                            <div className='flex justify-center md:justify-start gap-4'>
                                <button onClick={() =>window.scrollTo ({top: 0, behavior: 'smooth'})} className='inline-block text-primary-700 bg-white rounded-lg px-4 py-2 font-semibold hover:bg-primary-600 hover:text-white'
                                 >
                                    
                                    Search</button><Link href='/signup'
                                    className='inline-block text-white bg-secondary-500 rounded-lg px-4 py-2 hover:bg-secondary-600' scroll={false}>sign Up
                                    </Link>
                            </div>
                        </div>
                    </div>

            </motion.div>
        </div>
    </div>
  )
}
