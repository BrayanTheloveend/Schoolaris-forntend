import { Box, Button, Grid, GridItem, Heading,  Modal,  ModalBody,  ModalContent,  ModalFooter,  ModalHeader,  ModalOverlay,  Text, useDisclosure } from '@chakra-ui/react'
import React, { useEffect} from 'react'
import UserNav from './UserNav'
import NoteItems from './NoteItems'
import { useGetNoteByUnitAndStudentQuery } from '../Redux/ApiSlice'
import { useNavigate } from 'react-router-dom'
import Nodata from './Nodata'
import CustomLoading from '../Dashboard/CustomLoading'
import TeacherAssign from './TeacherAssign'

const Note = () => {
  
    const navigate = useNavigate()
    const openModal = useDisclosure()
    const savedData = JSON.parse(localStorage.getItem('userData'))
    const note = useGetNoteByUnitAndStudentQuery({id: savedData?.id, index: savedData?.subjectId})

    useEffect(() => {
      if(!savedData){
        navigate('/login')
      }
    }, [])

    //GETNOTE

    useEffect(() => {
      if(note.isError){
        if(note.error.status=== 401){
          openModal.onOpen()
        }
      }else if(note.isSuccess){

        // showMessage('success', `${data.length} items found`, 'Fetch Task')
      }
    }, [note.isSuccess, note.isError, note.error, note.data, navigate, openModal])


 
  return (
    <>
        <UserNav/>
        <Grid pt={{base: 20, md: 28}} gridTemplateColumns={{base: '1fr', md:'500px'}} justifyContent={'center'} gap={4}>
            <GridItem p={4} display={'flex'} flexDir={'column'} gap={6} justifyContent={'center'} >

                {savedData?.roleName === 'STUDENT' ? 
                
                    <React.Fragment>
                        <Box mb={8}>
                            <Heading fontSize={'2xl'}>Vos Resultat scolaire</Heading>
                            <Text mt={4}>Toutes les notes disponibles</Text>
                        </Box>

                        { !note.isLoading ? 
                        <Box>
                            {
                                 note.isSuccess && note.data.length !== 0 ?
                                 note.data.map(elt=><NoteItems key={elt.id} data={elt}/> )

                                : <Nodata/>
                            }  
                        </Box>
                        
                        : <CustomLoading/>
                    }
                    </React.Fragment>
                    
                        :

                    <TeacherAssign/>


                }
                
            </GridItem>
        </Grid>


        <Modal isOpen={openModal.isOpen} closeOnOverlayClick={false}>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>Session expirée</ModalHeader>
            
            <ModalBody>
                <Text noOfLines={3} fontSize={'md'}>Chére utilisateur <strong>{savedData?.name}</strong> votre session a éxpirée ! Connectez-vous pour continuer</Text>
            </ModalBody>

            <ModalFooter>
          
            <Button fontWeight={500} rounded={'md'} colorScheme={'blue'}  onClick={()=>navigate('/login')}>Se connecter</Button>
            </ModalFooter>
            </ModalContent>
        </Modal>




        
      
    </>
  )
}

export default Note
