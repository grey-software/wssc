'use client';
import Cookies from 'universal-cookie'
import React from 'react'
import type { RootState } from '../Redux-toolkit/store'
import { useSelector } from 'react-redux'

function Testing() {
    const name = useSelector((state: RootState)=> state.wsscm.name)

  return (
    <div className='mt-36 text-2xl text-red-600'>
      <h1>
        {name}
      </h1>
    
    </div>
  )
}

export default Testing