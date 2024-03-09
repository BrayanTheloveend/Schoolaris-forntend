import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Layout from './Components/Dashboard/Layout';
import Dashbord from './Components/Home/Dashbord';
import Student from './Components/Student/Student';
import Teacher from './Components/Teacher/Teacher';
import Training from './Components/Trainings/Training';
import UnitLearning from './Components/UnitLearnings/UnitLearning';
import { AnimatePresence } from 'framer-motion';
import Payment from './Components/Payment/Payment';
import Login from './Components/Auth/Login';

function App() {
  return (

    <AnimatePresence>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Layout component={<Dashbord/>}/>}/>
          <Route exact path='/student' element={<Layout component={<Student/>}/>}/>
          <Route exact path='/payment/:id/:idSubject' element={<Layout component={<Payment/>} />}/>
          <Route exact path='/teacher' element={<Layout component={<Teacher/>}/>}/>
          <Route exact path='/training' element={<Layout component={<Training/>}/>}/>
          <Route exact path='/login' element={<Login/>}/>
          <Route exact path='/unit' element={<Layout component={<UnitLearning/>}/>}/>
        </Routes>
      </BrowserRouter>
    </AnimatePresence>
      

  );
}

export default App;
