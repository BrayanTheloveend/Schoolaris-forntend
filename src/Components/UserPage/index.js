import { Box } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import UserNav from './UserNav'
import Hero from './Hero'
import Service from './Service'
import Title from './Title'
import { useNavigate } from 'react-router-dom'
import SectionOne from './SectionOne'
// import SectionTwo from './SectionTwo'
import ContactUs from './ContactUs'
import Footer from './Footer'

const UserPage = () => {

  const navigate = useNavigate()
  const savedData = JSON.parse(localStorage.getItem('userData'))

  

   useEffect(() => {
     if(!savedData){
      //  navigate('/login')
     }else{
        if(savedData?.roleName !== 'STUDENT' && savedData?.roleName !== 'TEACHER' ){
          setTimeout(navigate, 0, '/dash')
        }
     } 
      
   }, [navigate, savedData])
  
  return (
    <Box>
      <UserNav/>
      <Hero/>
      <Title>
        A propos de Nous
      </Title>

     
      <SectionOne/>
      <Title>
        Nos Services
      </Title>
      <Service/>
      {/* <Title>
        Contacter Nous
      </Title> */}
      <ContactUs/>
      <Footer/>
    </Box>
  )
}

export default UserPage