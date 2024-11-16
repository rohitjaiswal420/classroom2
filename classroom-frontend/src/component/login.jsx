import React, { useState } from 'react'
import { IoMdClose, IoMdSend } from "react-icons/io";
import './login.css'
import { baseurl } from '../url';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { PiFalloutShelter } from 'react-icons/pi';

function Login({setopen,category,categoryfunc}) {
  
    function handlings() {
    
        categoryfunc("");
        setopen(false);

      }

    const navigate=useNavigate();
   
    const[email,setemail]=useState("");
    const[msg,setmsg]=useState("");
    const[password,setpassword]=useState("");
    if(msg!=="")
    {

      setTimeout(()=>{

        setmsg("");
  
       },2000)

    }
    
    const validate=async()=>{
        
      
      if(category==="Principal")
      {
  
        try {

           await axios.post(`${baseurl}/app/principlevalidate`,{email:email,password:password}).then((res)=> res.data===true ?navigate('/principal') : setmsg("email or password wrong")).then((res1)=>localStorage.setItem('Login',true)).catch((err)=>console.log(err));

         

          
          
        } catch (error) {
          
          console.log(error);
        }


      }
      else if(category==="Teacher")
      {
       
        try {

          await axios.post(`${baseurl}/app/teachervalidate`,{email:email,name:password}).then((res)=>res.data===true? navigate('/teacher' , {state: {password,email} }) :setmsg("email or password wrong")).then((res1)=>localStorage.setItem('tLogin',true)).catch((err)=>console.log(err));

          
          
        } catch (error) {
          
          console.log(error);
        }

      }
      else{

        try {

          await axios.post(`${baseurl}/app/studentvalidate`,{email:email,name:password}).then((res)=>res.data===true? navigate('/student', {state: {password,email} }) :setmsg("email or password wrong")).then((res1)=>localStorage.setItem('sLogin',true)).catch((err)=>console.log(err));

          
          
        } catch (error) {
          
          console.log(error);
        }

      }


    }


  return (
    <div>
        
     <div className='login-page'>

      <div className='closing'>

        <div className='login-upper' onClick={handlings}>
          <IoMdClose />
        </div>

        <div className='login-lower'>

          <div className='login-lower-left'>

            <h2>Login</h2>
            <h2>as</h2>
            <h3>{category}</h3>

            <input type="email" placeholder='email' onChange={(e)=>setemail(e.target.value)}/>
            {category==="Principal"?<input type="text" placeholder='password' onChange={(e)=>setpassword(e.target.value)}/>:
            <input type="text" placeholder='name' onChange={(e)=>setpassword(e.target.value)}/>}
            <button className='login-button' onClick={validate}>login</button>
           
            {
                msg==="email or password wrong" &&  <div>{msg}</div>
            }

            </div>

           
          


        </div>

      </div>

    </div>







    </div>
  )
}

export default Login