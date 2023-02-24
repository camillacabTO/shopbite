import React from 'react'

const Loader = () => {
  return (
    <img
      style={{
        width: '150px',
        height: '150px',
        margin: '60px auto',
        display: 'block',
      }}
      alt='Loading'
      src='/images/Spinner.gif'
    ></img>
  )
}

export default Loader
