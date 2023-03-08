import React from 'react'

type Props = {}

function page({ params }: any) {
    console.log(params)
    return (<>
        <div>THIS IS ROUTING PAGE</div>
        <h1>{`This is the PARAM VALUE: ${params.id}`}</h1>
  </>
  )
}

export default page