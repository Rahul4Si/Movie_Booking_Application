import React from 'react' 
import FeaturedSection from '../components/FeaturedSection' 
import HereSection from '../components/HeroSection'
import TrailerSection from '../components/TrailerSection'


 


const Home = () => { 
  return ( 
    <div> 
        <div> 
          <HereSection /> 
          <FeaturedSection /> 
          <TrailerSection />
        </div> 
    </div> 
  ) 
} 


export default Home 
