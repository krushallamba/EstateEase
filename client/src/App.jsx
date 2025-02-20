import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import About from "./pages/About"
import Profile from "./pages/Profile"
import Header from "./components/Header"
import PrivateRoute from "./components/PrivateRoute"
import CreateListing from "./pages/CreateListing"
import UpdateListing from "./pages/UpdateListing"
import Listing from "./pages/Listing"
import Search from "./pages/Search"
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux"
import { signOutSuccess } from "./redux/user/userSlice"
import { useEffect } from "react"

function App() {

  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);

  // const api = axios.create({
  //   baseURL: "http://localhost:3000/api",
  //   timeout: 1000,
  // });
  
  // // Axios response interceptor to catch 401 Unauthorized errors globally
  // // api.interceptors.response.use(
  // //   (response) => response, // If status is not 401, pass response
  // //   (error) => {
  // //     if (error.response && error.response.status === 401) {
  // //       const dispatch = useDispatch();
        
  // //       // Dispatch SignOutSuccess to clear user from Redux
  // //       dispatch(signOutSuccess());
  // //     }
  // //     return Promise.reject(error); // Reject the error to be caught in the catch blocks
  // //   }
  // // );

  const checkAuthStatus = async () => {
    try {
      const response = await fetch(`/api/auth/check-session`, {
        method: "GET",
        credentials: "include", // Ensures cookies are sent with the request
      });

      if (response.status === 401) {
        dispatch(signOutSuccess())  // Call logout function if session is invalid
      }
    } catch (error) {
      console.error("Error checking session:", error);
      dispatch(signOutSuccess()); // Log out if request fails
    }
  };

  checkAuthStatus()

  

  return (
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/sign-in" element={<SignIn/>}></Route>
      <Route path="/sign-up" element={<SignUp/>}></Route>
      <Route path="/about" element={<About/>}></Route>
      <Route path="/search" element={<Search/>}></Route>
      <Route path="/listing/:listingId" element={<Listing/>}></Route>
      <Route element={<PrivateRoute/>}>
        <Route path="/profile" element={<Profile/>}></Route>
        <Route path="/create-listing" element={<CreateListing/>}></Route>
        <Route path="/update-listing/:listingId" element={<UpdateListing/>}></Route>
      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
