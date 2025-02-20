import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import ListingItem from '../components/ListingItem';

function Home() {

  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);

  SwiperCore.use([Navigation]);
  console.log(offerListings);

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch('/api/listing/get?offer=true&limit=4');
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchRentListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=rent&limit=4');
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=sale&limit=4');
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOfferListings();
  }, []);

  return (
    <div>
          <div className='flex flex-col gap-6 px-3 py-5  max-w-6xl mx-auto sm:py-28' >
            <h1 className='text-3xl font-bold text-[#384959] lg:text-6xl'>
              Welcome to Estate<span className='text-[#6A89A7]'>Ease</span>
            </h1>
            <div className='text-[#6A89A7] text-xs sm:text-sm'>
              Estate Ease is a platform that connects buyers, sellers, and renters of real estate properties. We provide a simple and efficient way of finding your dream home.
              <br/>
              We offer a wide range of properties for sale and rent, including houses, apartments, and commercial properties.
            </div>
            <Link to={'/search'} className=' w-28 text-xs sm:text-sm text-blue-800 font-bold hover:underline'>
              Get Started...
            </Link>
          </div>

      <Swiper navigation>
        {
          offerListings && offerListings.length > 0 && offerListings.map((listing, index) => (
            <SwiperSlide>
              <div key={listing._id} className='h-[250px] sm:h-[650px]' style={{background:`url(${listing.imageUrls[0]}) center no-repeat`, backgroundSize:'cover'}}></div>
            </SwiperSlide>
          ))
        }
      </Swiper>

      <div className='flex flex-col gap-8 px-3 my-10 max-w-6xl mx-auto'>
        {offerListings && offerListings.length > 0 && (
          <div>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-[#384959]'>Recent Offers</h2>
              <Link to='/search?offer=true' className='text-sm text-blue-800 hover:underline'>View all</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {offerListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {rentListings && rentListings.length > 0 && (
          <div>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-[#384959]'>Recent Places for Rent</h2>
              <Link to='/search?type=rent' className='text-sm text-blue-800 hover:underline'>View all</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {rentListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {saleListings && saleListings.length > 0 && (
          <div>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-[#384959]'>Recent Places for Sale</h2>
              <Link to='/search?type=sale' className='text-sm text-blue-800 hover:underline'>View all</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {saleListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home