import React from 'react'

export default function Head({title} : {title?: string}) {
  return (
    <>
        <title>{title ? title + ' | TS-Ecommerce' : 'TS-Ecommerce'}</title>
    </>
  )
}
