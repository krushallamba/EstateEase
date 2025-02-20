import React, {useEffect, useRef, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {Link} from 'react-router-dom'
import { updateUserStart, updateUserSuccess, updateUserFailure, deleteUserFailure, deleteUserStart, deleteUserSuccess, signOutFailure, signOutStart, signOutSuccess } from '../redux/user/userSlice';

function Profile() {
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [file, setFile] = useState(null);
  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);
  const {currentUser, loading, error} = useSelector((state) => state.user)
  const fileRef = useRef(null)
  const dispatch = useDispatch();

  // console.log(error)

  const handleChange = (e)=>{
    setFormData({...formData, [e.target.id]:e.target.value})
  }
  console.log(file)

  useEffect(()=>{
    if(file){
      handleFileUpload();
    }
  },[file])

  const handleFileUpload = async ()=>{
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'ldohi3lm');
    data.append('cloud_name', 'dhfpsw4y5');
    const response = await fetch('https://api.cloudinary.com/v1_1/dhfpsw4y5/image/upload', {
      method: 'POST',
      body: data
    })
    const res = await response.json();
    console.log(res);
    setFormData({...formData, avatar: res.secure_url})
  }

  const handleSubmit = async (e)=>{
    e.preventDefault();
    try {
      dispatch(updateUserStart())

      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if(data.success === false){
        dispatch(updateUserFailure(data.message))
        return
      }
      dispatch(updateUserSuccess(data))
      setUpdateSuccess(true)
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  }

  const handleDeleteUser = async ()=>{
    try {
      dispatch(deleteUserStart())
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      })
      const data = await res.json();
      if(data.success === false){
        dispatch(deleteUserFailure(data.message))
        return
      }
      dispatch(deleteUserSuccess(data))

    } catch (error) {
      dispatch(deleteUserFailure(error.message))
    }
  }

  const handleSignOut = async ()=>{
    try {
      dispatch(signOutStart())
      const res = await fetch('/api/auth/signout')
      const data = await res.json();
      if(data.success === false){
        dispatch(signOutFailure(data.message))
        return
      }
      dispatch(signOutSuccess(data))
    } catch (error) {
      dispatch(signOutFailure(error.message))
    }
  }

  const handleShowListings = async ()=>{
    try {
      setShowListingsError(false)
      const res = await fetch(`/api/user/listings/${currentUser._id}`)
      const data = await res.json();
      if(data.success === false){
        setShowListingsError(true)
        return
      }
      setUserListings(data)
    }
    catch (error) {
      setShowListingsError(true)
    }
  }

  const handleListingDelete = async (listingId)=>{
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }

      setUserListings((prev) =>
        prev.filter((listing) => listing._id !== listingId)
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-center text-3xl font-semibold my-7 text-[#384959]'>Profile</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input onChange={(e)=>setFile(e.target.files[0])} type='file' ref={fileRef} hidden accept='image/*'></input>
        <img onClick={()=>fileRef.current.click()} src={currentUser.avatar} alt='profile photo' className='rounded-full h-24 w-24 object-cover cursor-pointer self-center'/>
        <input type='text' placeholder='username' id='username' defaultValue={currentUser.username} onChange={handleChange} className='border p-3 rounded-lg'></input>
        <input type='email' placeholder='email' id='email' defaultValue={currentUser.email} onChange={handleChange} className='border p-3 rounded-lg'></input>
        <input type='password' placeholder='password' id='password' className='border p-3 rounded-lg'></input>
        <button disabled={loading} className='bg-[#213555] text-white rounded-lg p-3 uppercase hover:opacity-90 hover:shadow-lg transition-all'>Update</button>
        <Link to={"/create-listing"} className='bg-green-900 text-white rounded-lg p-3 text-center uppercase hover:opacity-80 transition-all'>Create Listing</Link> 
      </form>
      <div className='flex justify-between mt-5'>
        <span onClick={handleDeleteUser} className='text-red-700 cursor-pointer hover:opacity-70 transition-all'>Delete account</span>
        <span onClick={handleSignOut} className='text-red-700 cursor-pointer hover:opacity-70 transition-all'>Sign out</span>
      </div>
      <p className='text-red-700 mt-5 text-center'>{error ? error : ''}</p>
      <p className='text-green-900 my-5 text-center'>{updateSuccess ? 'Updated Successfully' : ''}</p>
      <button onClick={handleShowListings} className='text-green-900 w-full hover:opacity-70 transition-all mt-5 '>Show Listings</button>
      <p className='text-red-700 mt-5'>{showListingsError ? 'Error showing listings' : ''}</p>

      {userListings && userListings.length > 0 && (
        <div className='flex flex-col gap-4'>
          <h1 className='text-center mt-7 text-2xl font-semibold'>
            Your Listings
          </h1>
          {userListings.map((listing) => (
            <div
              key={listing._id}
              className='border rounded-lg p-3 flex justify-between items-center gap-4'
            >
              <Link to={`/listing/${listing._id}`}>
                <img
                  src={listing.imageUrls[0]}
                  alt='listing cover'
                  className='h-16 w-16 object-contain'
                />
              </Link>
              <Link
                className='text-slate-700 font-semibold  hover:underline truncate flex-1'
                to={`/listing/${listing._id}`}
              >
                <p>{listing.name}</p>
              </Link>

              <div className='flex flex-col item-center'>
                <button
                  onClick={() => handleListingDelete(listing._id)}
                  className='text-red-700 uppercase hover:opacity-70'
                >
                  Delete
                </button>
                <Link to={`/update-listing/${listing._id}`}>
                  <button className='text-green-900 uppercase hover:opacity-70'>Edit</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Profile