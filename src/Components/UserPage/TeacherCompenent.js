import { Box, Heading, Skeleton } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import PlaningItems from './PlaningItems'
import Nodata from './Nodata'
import { useGetTeacherAssignQuery } from '../Redux/ApiSlice'
import { useNavigate } from 'react-router-dom'

const TeacherComponent = () => {

    const savedData = JSON.parse(localStorage.getItem('userData'))
    const planning = useGetTeacherAssignQuery(savedData?.id)
    const navigate = useNavigate()
    // const [count, setCount] = useState()
    
    //GET ASSIGNMENT  
   
    useEffect(() => {
     if(savedData?.roleName === 'TEACHER'){
         if(planning.isError){
             if(planning.error.status=== 401){
               navigate('/login')
             }
           }else if(planning.isSuccess){
             //setCount(planning.data.length)
             // showMessage('success', `${data.length} items found`, 'Fetch Task')
         }
     }
    }, [planning.isSuccess, planning.isError, planning.error, planning.isLoading, planning.data, savedData, navigate])

    
  return (
    <React.Fragment>
        <Heading fontSize={'2xl'} mt={8}>Votre Planning</Heading>

        <Skeleton isLoaded={planning.isSuccess}>
            <Box pt={4}>
                {
                    planning.isSuccess && planning.data.length !== 0 ?
                    planning.data.map((elt,index)=> <PlaningItems key={elt.id} data={elt}/>)

                    : <Nodata/>
                }
            </Box>
        </Skeleton>
    </React.Fragment>
  )
}

export default TeacherComponent
