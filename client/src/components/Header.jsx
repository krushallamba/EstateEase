import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if(searchTermFromUrl){
      setSearchTerm(searchTermFromUrl);
    }
  },[location.search])

  return (
    <header className="bg-[#d9e9fb] shadow-md sticky top-0 z-50">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-[#384959] text-sm sm:text-xl flex flex-wrap">
            Estate <span className="text-[#6A89A7]">Ease</span>
          </h1>
        </Link>
        <form onSubmit={handleSubmit} className="bg-slate-100 p-3 rounded-full flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 sm:w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />{" "}
          <button>
            <IoSearch />
          </button>
          
        </form>
        <ul className="flex gap-4 items-center">
          <Link to="/">
            <li className="hidden sm:inline font-medium cursor-pointer text-[#384959] hover:text-[#6A89A7] transition-all">
              Home
            </li>
          </Link>
          <Link to="/about">
            <li className="hidden sm:inline font-medium cursor-pointer text-[#384959] hover:text-[#6A89A7] transition-all">
              About
            </li>
          </Link>
          <Link to="/profile">
          {currentUser ? (
            <img src={currentUser.avatar} alt="profile" className="rounded-full h-7 w-7 object-cover"/>
          ) : <li className="cursor-pointer font-medium text-[#384959] hover:text-[#6A89A7]">Sign In</li>}
          </Link>
        </ul>
      </div>
    </header>
  );
}

export default Header;
