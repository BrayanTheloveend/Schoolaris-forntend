import { BrowserRouter, Route, Routes } from 'react-router-dom';
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
import UserPage from './Components/UserPage';
import ResetPassword from './Components/Auth/ResetPassword';
import StudentDetails from './Components/Student/StudentDetails';
import Lessons from './Components/UnitLearnings/Lessons';
import Settings from './Components/Settings/Settings';
import Registration from './Components/Auth/Registration';
import Profile from './Components/UserPage/Profile';
import GetLesson from './Components/UserPage/GetLesson';
// import SchoolPay from './Components/UserPage/SchoolPay';
import NotFound from './NotFound';
import Note from './Components/UserPage/Note';

function App() {
  return (

    <AnimatePresence>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<UserPage/>}/>
          <Route exact path='*' element={<NotFound/>}/>
          <Route exact path='/note' element={<Note/>}/>
          <Route exact path='/profile' element={<Profile/>}/>
          <Route exact path='/cours' element={<GetLesson/>}/>
          <Route exact path='/resetPassword' element={<ResetPassword/>}/>
          <Route exact path='/dash' element={<Layout component={<Dashbord/>}/>}/>
          <Route exact path='/student' element={<Layout component={<Student/>}/>}/>
          <Route exact path='/unitLearning/:id/:index' element={<Layout component={<Lessons/>}/>}/>
          <Route exact path='/student/Details/:userId/:subjectId' element={<Layout component={<StudentDetails/>}/>} />
          <Route exact path='/payment/:id/:idSubject' element={<Layout component={<Payment/>} />}/>
          {/* <Route exact path='/schoolpay' element={<SchoolPay/>}/> */}
          <Route exact path='/teacher' element={<Layout component={<Teacher/>}/>}/> 
          <Route exact path='/training' element={<Layout component={<Training/>}/>}/>
          <Route exact path='/Registration' element={<Registration/>}/>
          <Route exact path='/setting' element={<Layout component={<Settings/>}/>}/>
          <Route exact path='/login' element={<Login/>}/>
          <Route exact path='/unit' element={<Layout component={<UnitLearning/>}/>}/>
        </Routes>
      </BrowserRouter>
    </AnimatePresence>
      

  );
}

export default App;
