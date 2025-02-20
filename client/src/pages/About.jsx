import React from "react";

function About() {
  return (
    <div className='relative h-screen bg-cover bg-center bg-no-repeat ' style={{ backgroundImage: "url('https://cdn.corporatefinanceinstitute.com/assets/real-estate.jpeg')"}}>
    <div className='absolute inset-0 bg-white bg-opacity-80'>
    <div className="py-5 px-4 max-w-6xl mx-auto sm:py-20">
      <h1 className="text-3xl font-bold mb-4 text-[#384959]">About Estate<span className="text-[#6A89A7]">Ease</span></h1>
      <p className="mb-4 text-[#384959] ">
        Welcome to Estate Ease, your ultimate destination for hassle-free real
        estate transactions. Our platform is designed to connect buyers,
        sellers, and renters, offering a seamless experience in finding their
        dream property. Whether you are searching for a cozy apartment, a
        luxurious villa, or a commercial space, Estate Ease provides a
        comprehensive listing with all the essential details to help you make
        informed decisions.
      </p>
      <p className="mb-4 text-[#384959] ">
        We understand that real estate is more than just buying and selling—it’s
        about finding the perfect place to call home or making a smart
        investment. Our mission is to simplify the process by providing verified
        property listings, transparent communication between buyers and sellers,
        and a platform that prioritizes user convenience.
      </p>
      <p className="mb-4 text-[#384959] ">
        Whether you're a first-time homebuyer, a seasoned investor, or a real
        estate agent looking for an efficient platform to showcase properties,
        Estate Ease is here to support you at every step. Explore our listings
        today and experience a smarter way to navigate the real estate market!
      </p>
      </div>
      </div>
    </div>
  );
}

export default About;
