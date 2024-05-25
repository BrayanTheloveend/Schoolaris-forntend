import { Box } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import UserNav from './UserNav'
import Hero from './Hero'
import Service from './Service'
import Title from './Title'
import { useNavigate } from 'react-router-dom'

const UserPage = () => {

  const navigate = useNavigate()
  const userDataSaved = localStorage.getItem('userData')

  

  useEffect(() => {
    if(!userDataSaved){
      navigate('/login')
    }else if( userDataSaved && (JSON.parse(userDataSaved)?.roleName !== 'STUDENT' && JSON.parse(userDataSaved)?.roleName !== 'TEACHER' )){
      setTimeout(navigate, 0, '/dash')
    }
  }, [navigate, userDataSaved])
  
  return (
    <Box>
      <UserNav/>
      <Hero/>
      <Title>
        About Us
      </Title>
      <Service/>
    </Box>
  )
}

export default UserPage