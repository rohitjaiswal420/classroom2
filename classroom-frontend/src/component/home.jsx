import React from 'react'
import './home.css'
import Header from './header'
import { useEffect } from 'react'
function Home() {

  useEffect(()=>{

    localStorage.removeItem('Login');
    localStorage.removeItem('tLogin');
    localStorage.removeItem('sLogin');
  })


  return (
    
    <div className='home'>
        
     <Header/>

    </div>
  )
}

export default Home