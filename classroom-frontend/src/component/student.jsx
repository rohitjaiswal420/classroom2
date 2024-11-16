import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { IoHome } from "react-icons/io5"
import './student.css'
import { useEffect } from 'react';
import { baseurl } from '../url';
import axios from 'axios';
function Student() {

  const navigate = useNavigate();
  const [classdata, setclassdata] = useState({})
  const [msg, setmsg] = useState("");
  useEffect(() => {

    const logged = localStorage.getItem('sLogin');
    if (!logged) {
      navigate('/')
    }

    try {

      axios.post(`${baseurl}/app/studentclass`, { email }).then((res) => res.status === 201 ? setmsg(res.data.messege) : setclassdata(res.data)).catch((err) => console.log(err))

    } catch (error) {

      console.log(error);

    }


  })

  const location = useLocation();
  const name = location.state.password;
  const email = location.state.email;


  return (

    <div className='student'>

      <div className='student-left'>
        < IoHome className='home-icon' onClick={() => navigate('/')} />
      </div>

      <div className='student-right'>
        <header className='principal-right-top'><h3>Welcome {name.toUpperCase()}</h3> </header>
        <div className='student-box'>

          {
            msg !== "" ? <div style={{ color: "red" }}>{msg}</div> :

             Object.keys(classdata).length > 0 &&

              <div className='principal-box-class1'>

                <div className='heading'>{classdata.name}</div>
                <div className='heading'>Teacher : MR {classdata?.teacher?.toUpperCase()}</div>
                {
                
                classdata?.students?.map((item) =>  item.Name===name? 
                 
                <div className='teacher-list4' style={{backgroundColor:"green", color:"white"}}>
                    

                       
                <div>{item?.Name}</div>
                <div style={{color:"blue"}}>{item?.email}</div>
                <div>{classdata.name}</div>

            
              </div>
                
                
                : <div className='teacher-list4'>
                    

                       
                        <div>{item?.Name}</div>
                        <div>{item?.email}</div>
                        <div>{classdata.name}</div>

                    
                      </div>

                )}
              </div>

          }


        </div>
      </div>

    </div>
  )
}

export default Student