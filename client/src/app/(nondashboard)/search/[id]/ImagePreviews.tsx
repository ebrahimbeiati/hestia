"use client"
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react'


const ImagePreviews = ({images}:ImagePreviewsProps) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const handlePrev = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };
    const handleNext = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    }
  return (
    <div className='relative w-full h-[450px]'>
        {images.map((image, index) => (
            <div
            key={image}
            className={`absolute inset-0 top-0 left-0 w-full h-full transition-opacity duration-500 ${
                index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
            >
            <Image src={image} alt={`Property ${index + 1}`} className='w-full cursor-pointer transition-transform hover:scale-105 h-full object-cover' fill priority={index ==0} />
            </div>
        ))}
        <button
            className='absolute top-1/2 left-4 transform -translate-y-1/2 bg-white rounded-full p-2 shadow'
            onClick={handlePrev}
        >
            <ChevronLeft className='w-6 h-6 text-gray-700' />
        </button>
        <button
            className='absolute top-1/2 right-4 transform -translate-y-1/2 bg-white rounded-full p-2 shadow'
            onClick={handleNext}
        >
            <ChevronLeft className='w-6 h-6 text-gray-700 rotate-180' />
        </button>
    </div>
  )
}

export default ImagePreviews