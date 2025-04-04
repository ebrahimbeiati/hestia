"use client"
import { NAVBAR_HEIGHT } from '@/lib/constants';
import { useAppDispatch, useAppSelector } from '@/state/redux';
import { useSearchParams } from 'next/navigation'
import FiltersBar from './FiltersBar'
import FiltersFull from './FiltersFull';
import React, { useEffect } from 'react'
import { cleanParams } from '@/lib/utils';
import { setFilters } from '@/state';
import Map from './Map';
import Listings from './Listings';

const SearchPage = () => {
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const isFiltersFullOpen = useAppSelector(state => state.global.isFiltersFullOpen);


  useEffect(() => {
    const initialFilters = Array.from(searchParams.entries()).reduce((acc: any, [key, value]) => {
      if (key === 'priceRange' || key === 'squareFeet') {
        acc[key] = value.split(',').map((item) => (item === '' ? null : Number(item)));
      } else if (key === 'coordinates') {
        acc[key] = value.split(',').map(Number);
      } else {
        acc[key] = value === 'any' ? null : value;
      }
      return acc;
    }, {}
  );
  const cleanedFilters = cleanParams(initialFilters);
  console.log("Cleaned Filters Being Set:", cleanedFilters); // ✅ Now inside scope

  dispatch(setFilters(cleanedFilters))
  },[]); //eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className='w-full mx-auto flex flex-col gap-4'
    style={{
      height:`calc(100vh - ${NAVBAR_HEIGHT}px)`,
    }}>
      <FiltersBar/>
      <div className='flex justify-between flex-1 overflow-hidden gap-3 mb-5'>
        <div 
        className={` h-full overflow-auto transition-all duration-500 ease-in-out ${isFiltersFullOpen ? 'w-1/4 visible'  : 'w-0 invisible'}`}>
          <FiltersFull/>
        </div>
        <Map/>
        <div className='basis-3/4 overflow-y-auto'>
          <Listings/>
        </div>

      </div>

    </div>
  )
}

export default SearchPage