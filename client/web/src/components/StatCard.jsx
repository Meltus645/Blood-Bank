import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const StatCard = ({icon, value, label}) => {
  return (
    <div className='bg-white shadow rounded p-4 flex items-center gap-4'>
        <FontAwesomeIcon icon={icon} className='block font-bold'/>
        <div className="">
            <h2 className='font-bold text-3xl'>{value}</h2>
            <p className='text-sm uppercase text-[#444444] font-[600]'>{label}</p>
        </div>
    </div>
  )
}

export default StatCard;