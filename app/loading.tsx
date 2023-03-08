import React from 'react'

type Props = {}

function loading({}: Props) {
    return (
      <div className="h-screen w-full bg-gray-600 opacity-50 flex justify-center items-center z-50">
            
    <div>loading...</div>
      </div>
  )
}

export default loading