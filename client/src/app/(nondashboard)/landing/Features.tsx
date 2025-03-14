"use client"
import React from 'react'
import {motion} from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

const containerVariants = {
  hidden: { opacity: 0, y:50 },
  visible: {
    opacity: 1, y:0,
    transition:{
       duration: 0.5,
      staggerChildren: 0.1
     
    }
  }
}

const featureVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}


export  const Features = () => {
  return (
  <motion.div 
    variants={containerVariants} initial='hidden' whileInView='visible' viewport={{once: true}} className='py-24 px-6 sm:px-12 lg:px-24 text-center bg-white'>
      <div className='max-w-3xl mx-auto xl:max-w-5xl'>
        <motion.h2 variants={featureVariants} className='text-3xl font-bold mb-8 text-center w-full sm:w-2/3 mx-auto'>
        Quickly find the home of your dreams with our advanced search features!
        </motion.h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 xl:gap-16'>
          {[0,1,2].map((index) => (
            <motion.div key={index} variants={featureVariants} className='flex flex-col items-center'>
              <FeatureCard
                title={[
                  'Trustworthy and verified listings',
                  'Advanced search filters',
                  'Simplify your rental search with our advanced search features'
                ][index]}
                description={[
                  'We only list properties from verified landlords and property managers, so you can trust that the listings you see are real and accurate.',
                  'Our advanced search filters allow you to find the perfect rental by filtering by price, location, number of bedrooms, and more.',
                  'Quickly find the home of your dreams with our advanced search features!'
                ][index]}
                imageSrc={`/landing-search${3 - index}.png`}
                linkText={[
                  'Explore',
                  'Search now',
                  'Find your dream home'
                ][index
                ]}
                linkHref={[
                  '/explore',
                  '/search',
                  '/find'
                ][index]}
              />
            </motion.div>
          ))}
        </div>

      </div>

    </motion.div>
  )
}
interface FeatureCardProps {
  title: string;
  description: string;
  imageSrc: string;
  linkText: string;
  linkHref: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, imageSrc, linkText, linkHref }) => (
  <div className='text-center'>
    <div className='p-4 mb-4 flex items-center justify-center h-48 rounded-lg shadow-md'>
      <Image src={imageSrc} alt={title} width={400} height={400} className='h-full w-full object-contain' />
    </div>
    <h3 className='text-xl font-semibold'>{title}</h3>
    <p className='text-gray-600'>{description}</p>
    <Link href={linkHref || "#"} className='inline-block border border-gray-300 rounded px-4 py-2 hover:bg-gray-100 mt-4'>
      {linkText || "Learn more"}
    </Link>
  </div>
);
