import React from 'react'

const Heading = ({ heading }:{ heading: string}) => {
    return (
        <h1 className='text-lg md:text-2xl lg:text-4xl font-medium'>
            {heading}
        </h1>
    )
}

export default Heading