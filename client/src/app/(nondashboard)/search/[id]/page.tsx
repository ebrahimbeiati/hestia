"use client"
import ImagePreviews from './ImagePreviews';
import { useGetAuthUserQuery } from '@/state/api';
import { useParams } from 'next/navigation'
import React from 'react'
import PropertyOverview from './PropertyOverview';
import PropertyDetails from './PropertyDetails';
import PropertyLocation from './PropertyLocation';
import ContactWidget from './ContactWidget';

const SingleListing = () => {
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const {id}= useParams();
    const propertyId = Number(id);
    const {data: authUser}= useGetAuthUserQuery();
  return (
    <div>
        <ImagePreviews
        images = {["/singleListing-2.jpg", "/singleListing-3.jpg"]}
        />
        <div className='flex flex-col md:flex-row justify-center gap-4 p-5 md:w-2/3 md:mx-auto mt-16 mb-7'>
        <div className='order-2 md:order-1 w-full md:w-1/2'>
        <PropertyOverview propertyId={propertyId}/>
        <PropertyDetails propertyId={propertyId}/>
        <PropertyLocation propertyId={propertyId}/>
        </div>
        <div className='order-1 md:order-2 w-full md:w-1/2'>
        <ContactWidget onOpenModal={() => setIsModalOpen(true)}/>
        </div>

        </div>
    </div>
  )
}

export default SingleListing