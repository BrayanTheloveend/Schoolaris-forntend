import { Box, Button, Flex, FormControl, FormLabel, Heading, IconButton, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Skeleton, Text, useColorModeValue, useDisclosure, useToast } from '@chakra-ui/react'
import React, { useCallback, useEffect, useState } from 'react'
import { FiEdit } from 'react-icons/fi'
import { getColorByNote, primaryLight, vert } from '../theme'
import {  useAddNoteMutation, useGetNoteByUnitAndStudentQuery, useUpdateNoteMutation } from '../Redux/ApiSlice'
import { useSelector } from 'react-redux'

const NoteStudentItems = (props) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [loading, setLoading] =  useState(false)
    const [currentNote, setCurrentNote] =  useState([])
    const [payload, setPayload] = useState({
        markOne: 0,
        markTwo: 0,
      })

      const toast = useToast()
      const showMessage = useCallback((type, msg, title)=>{
        toast({
          position: 'bottom-right',
          title: title,
          description: msg,
          status: type,
          duration: 3500,
          isClosable: true,
        })
      }, [toast])


    //redux
    const [ADD] = useAddNoteMutation()
    const [UPDATE] = useUpdateNoteMutation()
    const state = useSelector(state => state.storage.percentNote)


    const note = useGetNoteByUnitAndStudentQuery({id: props?.data.id, index: props?.data.SubjectId})

    //GETNOTE

    useEffect(() => {
      if(note.isError){
        if(note.error.status=== 401){
          //navigate('/login')
        }
      }else if(note.isSuccess){
        console.log(note.data);

        setCurrentNote(note.data?.filter(elt=> elt.idUnit === props.data.idUnits))
        let temp = note.data?.filter(elt=> elt.idUnit === props.data.idUnits)
        setPayload({
          markOne: temp ? 0 : parseInt(temp[0].noteOne),
          markTwo: temp ? 0 : parseInt(temp[0].noteTwo),
        })
        // showMessage('success', `${data.length} items found`, 'Fetch Task')
      }
    }, [note.isSuccess, note.isError, note.error, note.data])
    

    //SUBMIT REQUEST
  
  const handleAdd =()=>{

    setLoading(true)
  
   ADD({...payload, idUnit: props.data.idUnits, percentId: state, id: props.data.id}).unwrap()
   .then(resp =>{
     setLoading(false);
     setPayload({
       markOne: 0,
       markTwo: 0,
     })
     onClose()
     showMessage('success', resp.message, 'Add Task');

   })
   .catch(err=>{
     setLoading(false);
     showMessage('error', err.data.message, 'Add Task', 7000, 'top-center');
     onClose()
   })
}

  const handleSubmit =()=>{

    setLoading(true)
  
   UPDATE({...payload, idUnit: props.data.idUnits, percentId: state, id: currentNote[0]?.id}).unwrap()
   .then(resp =>{
     setLoading(false);
     setPayload({
       markOne: 0,
       markTwo: 0,
     })
     onClose()
     showMessage('success', resp.message, 'Update Task');

   })
   .catch(err=>{
     setLoading(false);
     showMessage('error', err.data.message, 'Update Task', 7000, 'top-center');
     onClose()
   })
}


    //HELPER

    const resetAndClose =()=>{
        onClose()
        setPayload({
        idUnit: '',
        markOne: 0,
        markTwo: 0,
        })
    }
  return (
    <>
        <Flex pb={4} px={2} w={'full'} borderBottom={'1px solid'} borderColor={useColorModeValue('#efefef', 'gray.700')}  justify={'space-between'}align={'center'}>
            <Box>
                <Text>Noms</Text>
                <Heading noOfLines={1} fontSize={{base: 'sm',md:'md'}} mt={2} fontWeight={500}>{props.data.name}</Heading>
            </Box>

            <Box>
                <Text>Note CC</Text>
                <Skeleton isLoaded={note.isSuccess}>
                  <Heading fontSize={{base: 'sm',md:'md'}} color={getColorByNote(note.isSuccess && currentNote[0]?.noteOne)} mt={2} fontFamily={'Montserrat'} fontWeight={500}>{note.isSuccess && currentNote[0]?.noteOne}</Heading>
                </Skeleton>
            </Box>
            <Box>
                <Text>Note SN</Text>
                <Skeleton isLoaded={note.isSuccess}>
                  <Heading fontSize={{base: 'sm',md:'md'}} color={getColorByNote(note.isSuccess && currentNote[0]?.noteTwo)} mt={2} fontFamily={'Montserrat'} fontWeight={500}>{note.isSuccess && currentNote[0]?.noteTwo}</Heading>
                </Skeleton>
            </Box>

            <IconButton
                mt={2}
                icon={<FiEdit/>} 
                onClick={onOpen}
                // onClick={()=> openPdf(`http://localhost:${process.env.REACT_APP_PORT}/bill/${item.bill}`)}
                title='edit'
                size={{base: 'sm', md: 'sm'}} color={primaryLight} 
            />
        </Flex>


        <Modal isOpen={isOpen} closeOnOverlayClick={false} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader> Editer la note</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
            <Text noOfLines={3} mb={4} fontSize={'md'}>Remplir pour ajouter la note de <strong> {props.data.name }</strong></Text>
            
            
            <Flex align={'center'} justify={'space-between'} mt={2} gap={2}>
                <FormControl>
                    <FormLabel alignItems={'center'} fontWeight={400}  gap={2} mt={1} display={'flex'}> <ion-icon name="ribbon-outline"></ion-icon> Control Continu</FormLabel>
                    <Input type='number' onChange={e =>setPayload({...payload, markOne: parseFloat(e.target.value) })} value={payload.markOne}/>
                </FormControl>

                <FormControl>
                    <FormLabel alignItems={'center'} fontWeight={400}  gap={2} mt={1} display={'flex'}><ion-icon name="school-outline"></ion-icon> Session Normale</FormLabel>
                    <Input type='number' onChange={e =>setPayload({...payload, markTwo: parseFloat(e.target.value) })} value={payload.markTwo}/>
                </FormControl>
                </Flex>

            </ModalBody>

            <ModalFooter>
            <Button variant='outline' fontWeight={400} rounded={'md'} colorScheme='gray'  mr={3} onClick={resetAndClose}>
                Annuler
            </Button>
            <Button  bg={vert} isLoading={loading} fontWeight={400} rounded={'md'} colorScheme={'green'}  onClick={ note.isSuccess && currentNote.length ===0 ? handleAdd : handleSubmit }>Enregistrer</Button>
            </ModalFooter>
            </ModalContent>
        </Modal>
    </>
    



  )
}

export default NoteStudentItems
