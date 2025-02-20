import React from 'react'
import { Link } from 'react-router-dom'
import { MdLocationOn } from 'react-icons/md'

function ListingItem({listing}) {
  return (
    <div className='bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 w-full sm:w-[330px]'>
        <Link to={`/listing/${listing._id}`}>
            <img src={listing.imageUrls[0]} alt={listing.name} className='h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300' />
            <div className='p-3 flex flex-col gap-2 w-full'> 
                <p className='text-[#384959] text-lg font-semibold truncate'>{listing.name}</p>
                <div className='flex items-center gap-1'>
                    <MdLocationOn className='h-4 w-4 text-green-900'/><span className='text-[#384959] text-sm truncate w-full'>{listing.address}</span>
                </div>
                <p className='text-sm text-[#6A89A7] line-clamp-2'>{listing.description}</p>
                <p className='text-[#384959] mt-2 font-semibold text-lg'>
                    ${listing.offer ? listing.discountPrice.toLocaleString('en-US') : listing.regularPrice.toLocaleString('en-US')}
                    {listing.type === 'rent' && ' /month'}
                </p>
                <div className='text-[#6A89A7] flex gap-4'>
                    <div className="font-bold text-xs">
                        {listing.bedrooms > 1 ? `${listing.bedrooms} Beds` : `${listing.bedrooms} Bed`}
                    </div>
                    <div className="font-bold text-xs">
                        {listing.bathrooms > 1 ? `${listing.bathrooms} Baths` : `${listing.bathrooms} Baths`}
                    </div>
                </div>
            </div>
        </Link>
    </div>
  )
}

export default ListingItem