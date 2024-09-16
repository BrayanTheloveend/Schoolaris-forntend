import { Box, Heading, Icon, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { FiArrowLeft } from 'react-icons/fi'
import { vert } from '../theme'
import { useNavigate } from 'react-router-dom'
import NoteEditItems from './noteEditItems'
import { useGetTeacherAssignQuery } from '../Redux/ApiSlice'
import CustomLoading from '../Dashboard/CustomLoading'
import Nodata from './Nodata'
import NoteComponent from './NoteComponent'

const TeacherAssign = () => {

    const [shown, setShown] = useState(true)
    const [title, setTitle] = useState('Editer la note des étudiants')
    const [id, setId] = useState({idSubject: null, idUnit: null })
    const navigate = useNavigate()

    const savedData = JSON.parse(localStorage.getItem('userData'))
    const { isLoading, isSuccess, data, error, isError} =  useGetTeacherAssignQuery(savedData?.id)

    //GET ASSIGNMENT  
  
    useEffect(() => {
        if(isError){
        if(error.status=== 401){
            navigate('/login')
        }
        }else if(isSuccess){
        
        // showMessage('success', `${data.length} items found`, 'Fetch Task')
        }
    }, [isSuccess, isError, error, isLoading, data, navigate])





  return (
    <React.Fragment>

        <Box display={'flex'} justifyContent={'space-between'}>

            <Box>
                <Heading fontSize={'2xl'}>{ shown ? 'Vos Assignations' : 'Vos Étudiants'}</Heading>
                <Text mt={4}>{shown ? 'Attribuer des notes a vos etudiants' :  title }</Text>
            </Box>

            {!shown && <Icon
                mt={2}
                float={'left'}
                as={FiArrowLeft} 
                w={{base: 8, md:10}}
                h={{base: 8, md:10}}
                onClick={()=>setShown(true)}
                title='edit'
                size={{base: 'sm', md: 'sm'}} 
                color={vert}
            />}

        </Box>

        

        {shown ? 
            <Box mt={10}>

                {  !isLoading ? isSuccess && data.length !== 0 ?
                    
                    data.map(elt=>  <NoteEditItems handleSet={setId}  data={elt} key={elt.id} 
                        setShown={()=>{
                        setTitle(`éditer les note de  ${elt.unit}`)
                        setShown(false)
                    }} />) :

                    <Nodata/>
                    : 
                    <CustomLoading/>
                }

                
            </Box>
            : 
            <Box mt={10}>
                <NoteComponent id={id}/>
            </Box>
        }

    </React.Fragment>
  )
}

export default TeacherAssign
