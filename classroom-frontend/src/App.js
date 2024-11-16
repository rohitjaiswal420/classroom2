import './App.css';
import Home from './component/home.jsx';
import Teacher from './component/teacher.jsx';
import Student from './component/student.jsx';
import Principle from './component/principle.jsx'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
function App() {
  return (
   
     <BrowserRouter>
     <Routes>
    
     <Route path='/' element={<Home/>}/>
     <Route path='/principal' element={<Principle/>}/>
     <Route path='/teacher' element={<Teacher/>}/>
     <Route path='/student' element={<Student/>}/>
     
    
    </Routes>
    </BrowserRouter>
  );
}

export default App;
