"use client"
import React from 'react'
import { useGetAuthUserQuery } from '@/state/api'

const Favorites = () => {
  const {data: authUser} = useGetAuthUserQuery();
  return (
    <div>Favoritess</div>
  )
}

export default Favorites