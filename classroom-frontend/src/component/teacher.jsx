import React from 'react'
import './teacher.css'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { IoHome } from "react-icons/io5"
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'
import { baseurl } from '../url'
function Teacher() {

  const navigate = useNavigate();
  const [classdata, setclassdata] = useState({})
  const [msg, setmsg] = useState("");
 
  const[idx,setidx]=useState(-1);

  const deletestudent = async () => {

    try {

      await axios.post(`${baseurl}/app/deletestudent`, { email: classdata.students[idx].email, name: classdata.name })

    } catch (error) {

      console.log(error);
    }

  }

  useEffect(() => {
    const logged = localStorage.getItem('tLogin');
    if (!logged) {
      navigate('/')
    }

    try {

      axios.post(`${baseurl}/app/teacherclass`, { email }).then((res) => res.status === 201 ? setmsg(res.data.messege) : setclassdata(res.data)).catch((err) => console.log(err))

    } catch (error) {

      console.log(error);

    }



  }, [deletestudent])

  const location = useLocation();
  const name = location.state.password;
  const email = location.state.email;


  return (


    <div className='teacher'>

      <div className='teacher-left'>
        < IoHome className='home-icon' onClick={() => navigate('/')} />
      </div>

      <div className='teacher-right'>
        <header className='teacher-right-top'><h3>Welcome MR {name.toUpperCase()}</h3> </header>
        <div className='teacher-box'>

          {
            msg !== "" ? <div style={{ color: "red" }}>{msg}</div> :

              Object.keys(classdata).length > 0 &&

              <div className='principal-box-class1'>

                <div className='heading'>Your Class : {classdata.name}</div>
                <div className='heading'>Students : {classdata?.students?.length}</div>
                {

                  classdata?.students?.map((item, i) => idx !== i ?
                    <div className='teacher-list4'>
                      <div>{item?.Name}</div>
                      <div style={{ color: "blue" }}>{item?.email}</div>
                      <div><button className='btn' onClick={() => setidx(i)}>Delete</button></div>


                    </div> :

                    <div className='teacher-list4'>
                      <div>{item?.Name}</div>
                      <div style={{ color: "blue" }}>{item?.email}</div>
                      <div><button className='btn' onClick={deletestudent}>Confirm</button></div>


                    </div>

                  )}
              </div>

          }

        </div>
      </div>

    </div>



  )
}

export default Teacher