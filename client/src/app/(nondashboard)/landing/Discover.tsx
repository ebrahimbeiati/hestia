"use client"
import React from 'react'
import {motion} from 'framer-motion'
import Image from 'next/image'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1, 
    transition:{
      staggerChildren: 0.1
     
    }
  }
}

const featureVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}


export  const Discover = () => {
  return (
  <motion.div 
    variants={containerVariants} initial='hidden' whileInView='visible' viewport={{once: true, amount: 0.8}} className='py-12 mb-16  bg-white'>
      <div className='max-w-6xl mx-auto xl:max-w-7xl px-6 sm:px-8 lg:px-12 xl:px-16'>
        <motion.div variants={featureVariants} className='my-12 text-center'>
            <h2 className='text-3xl font-bold mb-8 text-center w-full sm:w-2/3 mx-auto'>Discover your dream home</h2>
            <p className='text-gray-600 mt-3 text-lg'>Find the perfect rental property with our advanced search features. 
            </p>
            <p className='mt-2 text-gray-500 mx-w3xl mx-auto'>
            We only list properties from verified landlords and property managers, so you can trust that the listings you see are real and accurate.
            Our advanced search filters allow you to find the perfect rental by filtering by price, location, number of bedrooms, and more.

            </p>
        </motion.div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 xl:gap-16 text-center'>
         {[
          {
            imageSrc: '/landing-icon-wand.png',
            title: 'Advanced search',
            description: 'Quickly find the home of your dreams with our advanced search features.',
          },
          {
            imageSrc: '/landing-icon-calendar.png',
            title: 'Book Your Rental',
            description: 'Schedule a viewing or book your rental directly from our website.',
          },
          {
            imageSrc: '/landing-icon-heart.png',
            title: 'Save Your Favorites',
            description: 'Save your favorite listings to easily find them later.',
          }
         ].map((card, index)=>(
            <motion.div variants={featureVariants} key={index}>
                <DiscoverCard {...card} />
            </motion.div>
         ))}
        </div>

      </div>

    </motion.div>
  )
}
interface DiscoverCardProps {
  title: string;
  description: string;
  imageSrc: string;
 
}

const DiscoverCard: React.FC<DiscoverCardProps> = ({ title, description, imageSrc }) => (
  <div className='px-4 py-12 shadow-lg rounded-lg bg-white md:h-72'>
    <div className='bg-primary-700 p-[0.6rem] rounded-full w-16 h-16 mx-auto mb-4'>
      <Image src={imageSrc} alt={title} width={40} height={40} className='h-full w-full ' />
    </div>
    <h3 className='text-xl font-medium mt-4 text-gray-600'>{title}</h3>
    <p className='text-gray-600 mt-2 text-base'>{description}</p>
   
  </div>
);
