import React, { useEffect, useState } from 'react'
import './principle.css'
import { IoIosCreate } from "react-icons/io";
import { PiStudentFill } from "react-icons/pi";
import { IoHome } from "react-icons/io5"
import { GiTeacher } from "react-icons/gi";
import { SiGoogleclassroom } from "react-icons/si";
import { IoMdClose } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import axios from 'axios';
import { baseurl } from '../url';
import { useNavigate } from 'react-router-dom';

function Principle() {

  const navigate = useNavigate();
  useEffect(() => {

    const logged = localStorage.getItem('Login');
    if (!logged) {
      navigate('/');
    }

  })



  const [popup, setpopup] = useState(false);
  const [popup1, setpopup1] = useState(false);
  const [popup2, setpopup2] = useState(false);
  const [popup3, setpopup3] = useState(false);
  const [popup4, setpopup4] = useState(false);
  const [popup5, setpopup5] = useState(false);
  const [idx, setidx] = useState(-1);
  const [name, setname] = useState("")
  const [email, setemail] = useState("")
  const [classname, setclassname] = useState("")
  const [msg, setmsg] = useState("");
  const [assigned, setassigned] = useState(false);
  const [teacher, setteacher] = useState([]);
  const [student, setstudent] = useState([]);
  const [classroom, setclassroom] = useState([]);
  const [data, setdata] = useState({});
  const [classdata, setclassdata] = useState({});
  const [studentdata, setstudentdata] = useState({});




  const deletestudent = async () => {

    setpopup3(false);
    setclassdata({});

    try {

      await axios.post(`${baseurl}/app/deletestudent`, { email: classdata.students[idx].email, name: classdata.name })
      
     

    } catch (error) {

      console.log(error);
    }

  }

  const deletestudent1 = async () => {

    setpopup5(false);
    setstudent([]);

    try {

      await axios.post(`${baseurl}/app/studentdelete`, { email: student[idx].email, name: student[idx].classname })
      
     } catch (error) {

      console.log(error);
    }

  }

  const deleteteacher = async () => {

    setpopup4(false);
    setteacher([]);

    try {

      await axios.post(`${baseurl}/app/deleteteacher`, { email: teacher[idx].email, name: teacher[idx].classname })
      
     } catch (error) {

      console.log(error);
    }

  }


  const createstudent = async () => {
    
    document.getElementById('input3').value="";
    document.getElementById('input4').value="";
   
    try {

      await axios.post(`${baseurl}/app/createstudent`, { name, email, classname }).then((res) => res.status === 200 ? setmsg("Student Created Successfully") : setmsg("Student already existed")).catch((err) => console.log(err))

    } catch (error) {

      console.log(error)
    }


  }

  const createteacher = async () => {

    document.getElementById('input1').value="";
    document.getElementById('input2').value="";

    try {

      await axios.post(`${baseurl}/app/createteacher`, { name, email, classname }).then((res) => res.status === 200 ? setmsg("Teacher Created Successfully") : setmsg("Teacher already existed")).catch((err) => console.log(err))

    } catch (error) {

      console.log(error)
    }

  }

  const window1 = () => {

    if (popup === false) {
      setpopup(true);
    }
    else {
      setmsg("");
      setteacher("");
      setassigned(false);
      setpopup(false);
    }
  }

  const window2 = () => {

    if (popup1 === false) {
      setpopup1(true);
    }
    else {
      setmsg("");
      setpopup1(false);
    }
  }

  const window3 = () => {

    if (popup2 === false) {
      setpopup2(true);
    }
    else {
      setmsg("");
      setpopup2(false);
    }
  }

  const window4 = async () => {

   
    if (popup3 === false) {
      setpopup3(true);
      await axios.get(`${baseurl}/app/getclassroom`).then((res) => res.data.length > 0 && setclassroom(res.data)).catch((err) => console.log(err))

    }
    else {

      if (Object.keys(classdata).length > 0) {
        setclassdata({});
        setstudent([]);
        setidx(-1);
        //setpopup3(false);
      }
      else {

        setpopup3(false);
      }

    }
  }

  const window5 = async () => {

    if (popup4 === false) {
      setpopup4(true);
      await axios.get(`${baseurl}/app/getteacher`).then((res) => res.data.length > 0 && setteacher(res.data)).catch((err) => console.log(err))
    }
    else {


      setpopup4(false);
    }
  }

  const window6 = async () => {

    if (popup5 === false) {
      setpopup5(true);
      await axios.get(`${baseurl}/app/getstudent`).then((res) => res.data.length > 0 && setstudent(res.data)).catch((err) => console.log(err))
    }
    else {

      setstudent([]);
      setpopup5(false);
    }
  }

  const window7 = async () => {

    await axios.get(`${baseurl}/app/getstudent`).then((res) => res.data.length > 0 && setstudent(res.data)).catch((err) => console.log(err))

  }

  const window8 = async () => {


     setclassdata({});
     setpopup3(false);
      if (Object.keys(studentdata).length !== 0) {
      await axios.post(`${baseurl}/app/updateclassroom`, { Name: studentdata.name, email: studentdata.email, name: classdata.name })

     

      
    }

    



  }

  


  const teachers = async () => {

    if (assigned === false) {
      setassigned(true);
      await axios.get(`${baseurl}/app/getteacher`).then((res) => res.data.length > 0 && setteacher(res.data)).catch((err) => console.log(err))
    }
    else {
      setassigned(false);
    }


  }

  const createclass = async () => {

    document.getElementById('input5').value="";
    await axios.post(`${baseurl}/app/createclass`, { data, name }).then((res) => res.status === 200 ? setmsg("classroom created successfully") : setmsg("classroom already existed")).catch((err) => console.log(err))

  }

  return (


    <div className='principal'>

      <div className='principal-left'>
        < IoHome className='home-icon' onClick={() => navigate('/')} />
      </div>

      <div className='principal-right'>

        <header className='principal-right-top'><h3>Welcome to Principal Panel</h3> </header>
        {popup === false && popup1 === false && popup2 === false && popup3 === false && popup4 === false && popup5 === false ? <div className='principal-box'>

          <div className='principal-box-top'>

            <div onClick={() => setpopup(true)}>
              <h4>Create Classrooms</h4>
              <IoIosCreate className='create-icon' />
            </div>
            <div onClick={() => setpopup1(true)}>
              <h4>Create Teachers</h4>
              <IoIosCreate className='create-icon' />
            </div>
            <div onClick={() => setpopup2(true)}>
              <h4>Create Students</h4>
              <IoIosCreate className='create-icon' />
            </div>

          </div>
          <div className='principal-box-top'>

            <div onClick={window4}>
              <h4>Classrooms</h4>
              <PiStudentFill className='create-icon' />
            </div>
            <div onClick={window5}>
              <h4>Teachers</h4>
              <GiTeacher className='create-icon' />
            </div>
            <div onClick={window6}>
              <h4>Students</h4>
              <SiGoogleclassroom className='create-icon' />
            </div>

          </div>


        </div> :

          popup === true ?

            <div className='principal-box'>

              <div className='close-icon'><IoMdClose onClick={window1} /></div>
              <div className='principal-box2'>
                <h4>Create Class</h4>
                <input type="text" placeholder='name' id='input5'onChange={(e) => setname(e.target.value)} />

                <div className='input-field'>
                  Teachers
                  <span><IoIosArrowDown onClick={teachers} /></span>
                </div>
                {
                  assigned === true && teacher.length > 0 && <div className='teacher-list'> {teacher.map((item) => item.classname !== "" ? <div style={{cursor:"not-allowed"}}className='teacher-list1' onClick={() => {setdata(item);setassigned(false)}}><div style={{ color: "blue"}}>{`MR ${item.name.toUpperCase()}`}</div> <div style={{ color: "red" }} onClick={()=>setassigned(false)}>Not Available</div> </div> : <div className='teacher-list1'  onClick={() => {setdata(item);setassigned(false)}}><div style={{ color: "blue" }}>{`MR ${item.name.toUpperCase()}`}</div> <div style={{ color: "green" }} onClick={()=>setassigned(false)}>Available</div> </div>)}  </div>
                }



                <button className="btn" onClick={createclass}>submit</button>
              </div>
              {
                msg !== "" && msg
              }

            </div> :

            popup1 === true ?

              <div className='principal-box'>

                <div className='close-icon'><IoMdClose onClick={window2} /></div>
                <div className='principal-box2'>
                  <h4>Create Teacher</h4>
                  <input type="text" placeholder='name' id='input1'onChange={(e) => setname(e.target.value)} />
                  <input type="email" placeholder='email' id='input2' onChange={(e) => setemail(e.target.value)} />


                  <button className="btn" onClick={createteacher}>submit</button>

                </div>
                {
                  msg !== "" && msg
                }
              </div> : popup2 === true ?

                <div className='principal-box'>

                  <div className='close-icon'><IoMdClose onClick={window3} /></div>
                  <div className='principal-box2'>
                    <h4>Create Student</h4>
                    <input type="text" placeholder='name' id='input3' onChange={(e) => setname(e.target.value)} />
                    <input type="email" placeholder='email' id='input4' onChange={(e) => setemail(e.target.value)} />


                    <button className="btn" onClick={createstudent}>submit</button>
                  </div>

                  {
                    msg !== "" && msg
                  }
                </div> : popup3 === true ?

                  <div className='principal-box' >
                    <div className='close-icon'><IoMdClose onClick={window4} /></div>
                    <h4>Classrooms</h4>

                    {
                      Object.keys(classdata).length === 0 ?
                        <div className='principal-box-class'>
                          {
                            classroom.length > 0 && classroom.map((item) => <div onClick={() => setclassdata(item)} className='classes'><div>{item.name}</div><PiStudentFill className='create-icon' /></div>)



                          }


                        </div> :
                        <div className='principal-box-class1'>
                          <div className='heading'>{classdata.name}</div>
                          {
                            classdata.teacher==="" ?<div className='heading'>Not Assigned</div> :<div className='heading'>Teacher : MR {classdata.teacher.toUpperCase()}</div>
                          }
                          
                          {
                            classdata.students.length === 0 ? <div>No Student Present!</div> : classdata.students.map((item, i) => idx !== i ? <div className='teacher-list4'>
                              <div>{item?.Name}</div>
                              <div style={{ color: "blue" }}>{item?.email}</div>
                              <div><button className='btn' onClick={() => setidx(i)}>Delete</button></div>
                            </div> : <div className='teacher-list4'>
                              <div>{item?.Name}</div>
                              <div style={{ color: "blue" }}>{item?.email}</div>
                              <div><button className='btn' onClick={deletestudent}>Confirm</button></div>
                            </div>)
                          }
                          <div>
                            <button className='btn' onClick={window7}>Add Student</button>
                          </div>
                          {
                            student.length > 0 && <div className='student-list' > {student.map((item) => item.classname === "" ? <div className='teacher-list1'  onClick={() => {setstudentdata(item);setstudent([])}}><div style={{ color: "blue" }}>{`${item.name.toUpperCase()}`}</div> <div>Available</div> </div> : <div className='teacher-list1' onClick={() => {setstudent([])}} style={{ cursor: 'not-allowed' }} ><div style={{ color: "blue" }}>{` ${item.name.toUpperCase()}`}</div> <div style={{ color: "red" }}>Not Available</div> </div>)}  </div>
                          }
                          <div>
                            <button className='btn' onClick={window8}>+</button>
                          </div>
                        </div>

                    }


                  </div> :

                  popup4 === true ?

                    <div className='principal-box' >

                      <div className='close-icon'><IoMdClose onClick={window5} /></div>
                      <h4>Teachers</h4>
                      <div className='principal-box-lower'>

                        <div className='menu'>
                          <div>Name</div>
                          <div>Email</div>
                          <div>Class</div>
                          <div></div>
                          <div>Delete</div>
                        </div>

                        <div className='teacher-list3'>
                          {
                            teacher.length > 0 && teacher.map((item,i) => idx!==i ?<div className='teacher-list2'> <div>{item.name}</div>
                              <div style={{ color: "blue" }}>{item.email}</div>
                              <div>{`${item.classname === "" ? "Not Assigned" : item.classname}`}</div>
                              <div></div>
                              <div><button className="btn" onClick={()=>setidx(i)}>Delete</button></div></div> :
                              <div className='teacher-list2'> <div>{item.name}</div>
                              <div style={{ color: "blue" }}>{item.email}</div>
                              <div>{`${item.classname === "" ? "Not Assigned" : item.classname}`}</div>
                              <div></div>
                              <div><button className="btn" onClick={deleteteacher}>Confirm</button></div></div>)
                          }

                        </div>



                      </div>

                    </div> :

                    <div className='principal-box'>

                      <div className='close-icon'><IoMdClose onClick={window6} /></div>
                      <h4>Students</h4>
                      <div className='principal-box-lower'>

                        <div className='menu'>
                          <div>Name</div>
                          <div>Email</div>
                          <div>Class</div>
                          <div></div>
                          <div>Delete</div>
                        </div>

                        <div className='teacher-list3'>
                          {
                            student.length > 0 && student.map((item, i) => idx !== i ? <div className='teacher-list2'> <div>{item.name}</div>
                              <div style={{ color: "blue" }}>{item.email}</div>
                              <div>{`${item.classname === "" ? "Not Assigned" : item.classname}`}</div>
                              <div></div>
                              <div><button className="btn" onClick={()=>setidx(i)} >Delete</button></div></div> :

                              <div className='teacher-list2'> <div>{item.name}</div>
                                <div style={{ color: "blue" }}>{item.email}</div>
                                <div>{`${item.classname === "" ? "Not Assigned" : item.classname}`}</div>
                                <div></div>
                                <div><button className="btn" onClick={deletestudent1}>Confirm</button></div></div>
                            )}

                        </div>


                      </div>


                    </div>


        }



      </div>


    </div>
  )
}

export default Principle