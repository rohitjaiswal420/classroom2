import React from 'react'
import './header.css'
import { useState } from 'react';
import Login from './login';
function Header() {

  const [open,setopen]=useState(false);
  const[logincategory,setlogincategory]=useState("");

  const openfunc=()=>{
    
    setlogincategory("Principal");
    setopen(true);

  }

  const openfunc1=()=>{
    
    setlogincategory("Teacher");
    setopen(true);

  }

  const openfunc2=()=>{
    
    setlogincategory("Student");
    setopen(true);

  }




  return (
     <>
     <div className='header'>
      

     
        
       <div className='left'>
      
       <li className='listleft' onClick={openfunc}>Principal</li>
       <li className='listleft' onClick={openfunc1}>Teacher</li>
       <li className='listleft' onClick={openfunc2}>Student</li>
       
       </div>

       <div className="center" >Classroom</div>

       <div className='right'>
      
      
      
      </div>
     
      </div>

      {
         open===true && <Login setopen={setopen} category={logincategory} categoryfunc={setlogincategory}/>
      }

      </>
  )
}

export default Header