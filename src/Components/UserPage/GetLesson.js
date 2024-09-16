import React, { useEffect, useState } from 'react'
import UserNav from './UserNav'
import { Box, Grid, GridItem, Heading, Icon, Input, InputGroup, InputRightElement, Text} from '@chakra-ui/react'
import { primaryLight} from '../theme'
import { FiSearch } from 'react-icons/fi'
import LessonItems from './LessonItems'
import { useGetLessonByUnitIdQuery, useGetLessonQuery } from '../Redux/ApiSlice'
import { useNavigate } from 'react-router-dom'
import CustomLoading from '../Dashboard/CustomLoading'
import Nodata from './Nodata'


const GetLesson = () => {

    const [Data, setData] = useState([])
    const [table, setTable] = useState([])
    const navigate = useNavigate()
    //GETLESSON
  const {
    data,
    isLoading,
    isSuccess,
    isError, 
    error
  }= useGetLessonQuery()

  useEffect(() => {
    if(isError){
      if(error.status=== 401){
        navigate('/login')
      }
      //console.log(error.error);
      //return showMessage('error',error.message, 'Fetch Task')
    }else if(isSuccess){
      setData(data)
      setTable(data)
      //showMessage('success', `${data.length} items found`, 'Fetch Task')
    }
  }, [isSuccess, isError, error, isLoading, data, navigate])


  const filterOn = (value)=>{
    if(value.length === 0){
        setTable(Data)
    }else{
        setTable(Data.filter(elt=> elt.label.toLowerCase().includes(value.toLowerCase())))
    }
  }

  return (
    <>
        <UserNav/>
        <Grid pt={{base: 20, md: 28}} gridTemplateColumns={{base: '1fr', md:'600px'}} justifyContent={'center'} gap={4}>
            <GridItem p={4} display={'flex'} flexDir={'column'} gap={6} justifyContent={'center'} >
                <Box>
                    <Heading fontSize={'2xl'}>Vos Cours</Heading>
                    <Text mt={2}>Tous les cours disponible</Text>  
                </Box>
                

                <InputGroup mt={8}>
                    <Input h={'40px'} fontWeight={400} onChange={e=>filterOn(e.target.value)}  placeholder='Rechercher des Cours' _focus={{
                    borderColor: primaryLight
                }} _focusVisible={{
                    borderColor: primaryLight
                }}
                _placeholder={{
                    fontWeight: 300
                }} />
                    <InputRightElement pr={8}>
                    <Icon as={FiSearch} w={6} h={6} color={primaryLight}/>
                    </InputRightElement>
                </InputGroup>
    
            </GridItem>

            <GridItem p={4}>
                { 
                    isLoading ? <CustomLoading/> : table.length === 0 ? <Nodata/>  :
                    <Grid gridTemplateColumns={'repeat(2, 1fr)'} gap={{md: 4, base: 1}}>
                    { isSuccess &&   table.map(elt=><LessonItems key={elt.id} data={elt}/>) }
                    </Grid>
                }
                    
                
            </GridItem>
        </Grid>
    </>
  )
}

export default GetLesson
