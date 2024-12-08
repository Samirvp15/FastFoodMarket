


import React from 'react'

export default function Heading({ children }: React.ReactNode) {
    return (
        <h1 className=" text-2xl my-10">
            {children}
        </h1>
    )
}
