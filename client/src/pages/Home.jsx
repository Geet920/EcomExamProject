import React from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Newsletter from '../components/Newsletter';
import Slider from '../components/Slider';

const Home = () => {
  return (
    <div className='container'>
        <Navbar/>
        <Slider/>
        <Newsletter/>
        <Footer/>
    </div>
  )
}

export default Home;