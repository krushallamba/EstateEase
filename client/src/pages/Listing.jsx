import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {Swiper, SwiperSlide} from 'swiper/react'
import SwiperCore from 'swiper'
import {Navigation} from 'swiper/modules'
import 'swiper/css/bundle'
import {
    FaBath,
    FaBed,
    FaChair,
    FaMapMarkedAlt,
    FaMapMarkerAlt,
    FaParking,
    FaShare,
} from 'react-icons/fa';
import { useSelector } from 'react-redux'
import Contact from '../components/Contact'

function Listing() {
    const [listing, setListing] = useState(null)
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [copied, setCopied] = useState(false);
    const [contact, setContact] = useState(false);

    const params = useParams()
    const { currentUser } = useSelector((state) => state.user);
    SwiperCore.use([Navigation])

    useEffect(()=>{
        const fetchListing = async ()=>{
          try {
            setLoading(true)
            const res = await fetch(`/api/listing/get/${params.listingId}`)
            const data = await res.json()
            if(data.success === false){
                setError(true)
                setLoading(false)
                return
            }
            setListing(data)
            setLoading(false)
            setError(false)
          } catch (error) {
            setError(true)
            setLoading(false)
          }
        }
        fetchListing()
    },[params.listingId])
  return (
    <main>
        {loading && <p className='text-center my-7 text-2xl'>Loading...</p>}
        {error && <p className='text-center my-7 text-2xl'>Something went wrong</p>}
        {listing && !loading && !error && (
            <div>
                <Swiper navigation>
                    {listing.imageUrls.map((url, index)=>(
                        <SwiperSlide key={index}>
                            <div className='h-[250px] sm:h-[650px]' style={{background:`url(${url}) center no-repeat`, backgroundSize:'cover'}}></div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                <div className='fixed top-[10%] right-[3%] z-10 rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer hover:text-white  hover:bg-slate-300 transition-all'>
                    <FaShare
                    className='text-slate-600'
                    onClick={() => {
                        navigator.clipboard.writeText(window.location.href);
                        setCopied(true);
                        setTimeout(() => {
                        setCopied(false);
                        }, 2000);
                    }}
                    />
                </div>
                {copied && (
                    <p className='fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2'>
                    Link copied!
                    </p>
                )}
                <div className='flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4'>
                    <p className='text-2xl font-semibold'>
                        {listing.name}
                    </p>
                    <p className='text-2xl font-semibold'>
                        ${''}
                        {listing.offer
                            ? listing.discountPrice.toLocaleString('en-US')
                            : listing.regularPrice.toLocaleString('en-US')}
                        {listing.type === 'rent' && ' /month'}
                    </p>
                    <p className='flex items-center mt-6 gap-2 text-slate-600  text-sm'>
                        <FaMapMarkerAlt className='text-green-900' />
                        {listing.address}
                    </p>
                    <div className='flex gap-4'>
                        <p className='bg-[#BDDDFC]  max-w-[200px] text-[#384959] font-medium text-center px-4 py-2  rounded-full'>
                            {listing.type === 'rent' ? 'For Rent' : 'For Sale'}
                        </p>
                        {listing.offer && (
                            <p className='bg-green-300 max-w-[200px] text-[#384959] font-medium text-center px-4 py-2 rounded-full'>
                            ${+listing.regularPrice - +listing.discountPrice} OFF
                            </p>
                        )}
                    </div>
                    <p className='text-slate-800'>
                        <span className='font-semibold text-black'>Description - </span>
                        {listing.description}
                    </p>
                    <ul className='text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6'>
                        <li className='flex items-center gap-1 whitespace-nowrap '>
                            <FaBed className='text-lg' />
                            {listing.bedrooms > 1
                            ? `${listing.bedrooms} Beds `
                            : `${listing.bedrooms} Bed `}
                        </li>
                        <li className='flex items-center gap-1 whitespace-nowrap '>
                            <FaBath className='text-lg' />
                            {listing.bathrooms > 1
                            ? `${listing.bathrooms} Baths `
                            : `${listing.bathrooms} Bath `}
                        </li>
                        <li className='flex items-center gap-1 whitespace-nowrap '>
                            <FaParking className='text-lg' />
                            {listing.parking ? 'Parking spot' : 'No Parking'}
                        </li>
                        <li className='flex items-center gap-1 whitespace-nowrap '>
                            <FaChair className='text-lg' />
                            {listing.furnished ? 'Furnished' : 'Not Furnished'}
                        </li>
                    </ul>
                    {currentUser && listing.userRef !== currentUser._id && !contact && (
                        <button
                            onClick={() => setContact(true)}
                            className='bg-[#213555] text-white rounded-lg uppercase hover:opacity-95 p-3'
                        >
                            Contact landlord
                        </button>
                    )}
                    {contact && <Contact listing={listing} />}
                </div>
            </div>
        )}
    </main>
  )
}

export default Listing