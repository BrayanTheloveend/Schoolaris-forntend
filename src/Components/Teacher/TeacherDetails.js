import React, { useCallback, useEffect, useState } from 'react'
import { Avatar, Box, Button, Flex, FormControl, FormLabel, Grid, GridItem, Heading, IconButton, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Skeleton, Table, TableCaption, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useColorModeValue, useDisclosure, useToast } from '@chakra-ui/react'
import {
  List,
  ListItem,
} from '@chakra-ui/react'

import { FiChevronRight, FiPlus } from 'react-icons/fi'
import bgblue from '../../assets/images/bgteacher.webp'
import image from '../../assets/images/Dashboard/datanotfound.png'
import dayjs from 'dayjs'
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import CustomModal from '../Custom/CustomModal'
import { useAddTeacherAssignMutation, useDeleteTeacherAssignMutation, useGetSubjectQuery, useGetTeacherAssignQuery, useGetUnitBySubjectQuery, useGetUnitQuery, useUpdateTeacherAssignMutation } from '../Redux/ApiSlice'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { vert } from '../theme'


const TeacherDetails = ({ data }) => {

  const { isOpen, onOpen, onClose } = useDisclosure()
  const openModal = useDisclosure()
  const [count, setCount] = useState(0)
  const navigate = useNavigate()
  const [modalData, setmodalData] = useState({
    message: '',
    button: '',
    color: '',
    title: '',
    toggle: false
  })

  // onUpdateHelper
  const [subId, setSubId] = useState(null)
  const [id, setId] = useState({
    index: 0, current: 0
  })
  const [onUpdate, setOnUpdate] =  useState(false)
  const [loading, setLoading] =  useState(false)

  const handleDelete=()=>{
    setmodalData({
      message: 'Are you sure to delete definitively', 
      button: 'Delete',
      title: 'Delete Task',
      color: 'red',
      toggle: true,
    })
  }

  // AddNote Payload

  const [payload, setPayload] = useState({
    idUnit: '/',
    start: 0,
    end: 0,
    idSubject: '/'
  })

  const [disabled, setDisabled] = useState(false)

  // Payload Validation

  useEffect(() => {
      console.log(payload.idUnit);
      if(!payload.idUnit){
        setDisabled(true)
      }else{
        setDisabled(false)
      }
  }, [payload.idUnit, payload.end, payload.start])
  

  //GETSTUDENTS AND NOTE

  const toast = useToast()
  const showMessage = useCallback((type, msg, title, duration, position)=>{
    toast({
      position: position ? position : 'bottom-right',
      title: title,
      description: msg,
      status: type,
      duration: duration ? duration : 3500 ,
      isClosable: true,
    })
  }, [toast])

  // REDUX DECLARATION

  const request =  useGetTeacherAssignQuery(data?.id)
  const subject = useGetSubjectQuery(JSON.parse(localStorage.getItem('userData'))?.token)
  const [ADD] = useAddTeacherAssignMutation()
  const [DEL] = useDeleteTeacherAssignMutation()
  const [UPDATE] = useUpdateTeacherAssignMutation()

  //GETUNIT

  useEffect(() => {
    if(subject.isError){
      if(subject.error.status=== 401){
        navigate('/login')
      }
      //console.log(error.error);
      //return showMessage('error',error.message, 'Fetch Task')
    }else if(subject.isSuccess){
      setSubId(subject.data[0].id)
      setPayload({
        idUnit: '/',
        start: 0,
        end: 0, 
        idSubject: subject.data[0].id 
      })
      //console.log(data);
      //showMessage('success', `${data.length} items found`, 'Fetch Task')
    }
  }, [subject.isSuccess, subject.isError, subject.error, subject.isLoading, showMessage, subject.data])


  const unitLearning = useGetUnitBySubjectQuery(subId)

  //GETUNIT
  useEffect(() => {
    if(unitLearning.isError){
      if(unitLearning.error.status=== 401){
        //navigate('/login')
      }
      //console.log(error.error);
      //return showMessage('error',error.message, 'Fetch Task')
    }else if(unitLearning.isSuccess){
      //console.log(data);
      setPayload({
        ...payload, 
        idUnit: unitLearning.data[0]?.id 
      })
      //showMessage('success', `${data.length} items found`, 'Fetch Task')
    }
  }, [unitLearning.isSuccess, unitLearning.isError, unitLearning.error, unitLearning.isLoading, showMessage, unitLearning.data])



//GET ASSIGNMENT  
  
  useEffect(() => {
    if(request.isError){
      if(request.error.status=== 401){
        //navigate('/login')
      }
    }else if(request.isSuccess){
      setCount(request.data.length)
      // showMessage('success', `${data.length} items found`, 'Fetch Task')
    }
  }, [request.isSuccess, request.isError, request.error, request.isLoading, request.data])


  //CREATE REQUEST
  
  const handleSubmit =()=>{
    setLoading(true);
    
    ADD({...payload, idTeacher: data?.id}).unwrap()
    .then(resp =>{
      setLoading(false);
      setPayload({
        idUnit: '',
        start: 0,
        end: 0,
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

  //HELPER

  const resetAndClose =()=>{
    onClose()
    setOnUpdate(false)
    setPayload({
      idUnit: '',
      start: 0,
      end: 0,
    })
  }

  //DELETE REQUEST

  const Deleter =async()=>{

    setLoading(true)
    await DEL({ idTeacher: data?.id, idUnit: id.index }).unwrap()
    .then(resp=>{
      setLoading(false)
      openModal.onClose()
      showMessage('success', resp.message , 'Delete Task')
    }).catch(err=>{
      setLoading(false)
      openModal.onClose()
      showMessage('error', err.message , 'Delete Task')
    })

  }

  //UPDATE REQUEST

  const handleUpdate = ()=>{
    setLoading(true);

    UPDATE({...payload, idTeacher: data?.id, idUnit: id.index}).unwrap()
    .then(resp =>{
      setLoading(false);
      onClose()
      showMessage('success', resp.message, 'Update Task');
      setPayload({
        idUnit: '/',
        idSubject: 0,
        start: 0,
        end: 0
      })
      
      setOnUpdate(false)
    })
    .catch(err=>{
      showMessage('error', err.message, 'Update Task', 7000, 'top-center');
      setLoading(false);
    })
  }



  


  return (
    <Box minH={'350px'} mt={14}
    as={motion.div}
    initial={{ y: '-100vh' }}
    animate={{ y: 0}}>
      <Grid
      gap={5}
        templateRows='repeat(2, 1fr)'
        templateColumns='repeat(4, 1fr)'
      >
        <GridItem pos={'relative'} bgSize={'cover'} bgRepeat={'no-repeat'} colSpan={4} minH={'200px'} bgImg={bgblue} borderRadius={'30px'} _before={{
          position: 'absolute',
          background: 'rgba(0, 0, 0, 0.30)',
          top: 0,
          borderRadius:'30px',
          left: 0,
          width: '100%',
          height: '100%',
          content: "''",
          display: 'block',
          
        }}>
          
          <Flex flexDir={'column'} zIndex={100} w={"full"} pos={'absolute'} bottom={'-30%'} gap={2} textAlign={'center'} alignItems={'center'}>
          
            <Text fontWeight={600}  lineHeight={8} noOfLines={2} fontSize={'2xl'} color={'white'}>
              {`${data?.name} ${data?.surname}`}  
            </Text>
            <Text fontSize={'md'} fontWeight={500} color={'white'} >
              {data?.email}  
            </Text>

            <Avatar size={'2xl'} mb={2} border={'5px solid'} borderColor={'white'} src={`http://localhost:${process.env.REACT_APP_PORT}/image2/${data?.picture}`}/>
          </Flex>

          <Flex w={'full'} px={8} pos={'absolute'} top={0} zIndex={100} mt={4} justifyContent={'space-between'} alignItems={'center'}>
            <Text fontWeight={600} noOfLines={1} fontSize={'md'} color={'white'}>
              ID #{data?.id }
            </Text>

            <Text fontWeight={600} noOfLines={2} fontSize={'md'} color={'white'}>
              CreatAt: {dayjs(data?.createdAt).format('DD.MM.YYYY')}
            </Text>
          </Flex>
        </GridItem>


        <GridItem boxShadow={'0 0 10px rgba(0, 0, 0, 0.1)'} bg={useColorModeValue('white', 'gray.800')} colSpan={2} borderRadius={'30px'} p={6}>
          <Text fontSize={'md'} fontWeight={'500'} textAlign={'center'}>PROFILE</Text>
          <br />

          <List fontSize={'md'} ml={2} spacing={2}>
            <ListItem display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
              <Flex gap={2} justifyContent={'center'} alignItems={'center'}> <FiChevronRight/>  <Text fontWeight={500} color={'gray.600'}>Full Name</Text></Flex> <Text>{`${data?.name} ${data?.surname}`}</Text>
            </ListItem>

            <ListItem display={'flex'} justifyContent={'space-between'}>
              <Flex gap={2} justifyContent={'center'} alignItems={'center'}><FiChevronRight/><Text fontWeight={500} color={'gray.600'}>Birthday </Text></Flex> <Text>{ dayjs(data.birthday).format('DD/MM/YYYY')}</Text>
            </ListItem>
            
            <ListItem display={'flex'} justifyContent={'space-between'}>
              <Flex gap={2} justifyContent={'center'} alignItems={'center'}><FiChevronRight/><Text fontWeight={500} color={'gray.600'}>Mobile </Text></Flex> <Text>+237 {data?.mobile}</Text> 
            </ListItem>

            <ListItem display={'flex'} justifyContent={'space-between'}>
              <Flex gap={2} justifyContent={'center'} alignItems={'center'}><FiChevronRight/><Text fontWeight={500} color={'gray.600'}>Curriculum Vitae </Text></Flex> <Text>CDxKFGM18SDFK82</Text>
            </ListItem>

            
          </List>
        </GridItem>

        <GridItem boxShadow={'0 0 10px rgba(0, 0, 0, 0.1)'} bg={useColorModeValue('white', 'gray.800')} colSpan={2} borderRadius={'30px'} p={6}>
          <Text fontSize={'md'} fontWeight={'500'} textAlign={'center'}>SCHOOL</Text>
          <br />

          <List fontSize={'md'} ml={2} spacing={2}>
            <ListItem display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
              <Text fontWeight={500} color={'gray.600'}>Courses</Text> <Skeleton isLoaded={request.isSuccess}><Text>{count}</Text></Skeleton>
            </ListItem>

            <ListItem display={'flex'} justifyContent={'space-between'}>
              <Text fontWeight={500} color={'gray.600'}>Statut </Text> <Text color={data.statut === 1 ? 'green.400' : 'red.400'}>{data.statut === 1 ? 'Activé' : 'Non Activé'}</Text>
            </ListItem>

            <ListItem display={'flex'} justifyContent={'space-between'}>
              <Text fontWeight={500} color={'gray.600'}>Rate </Text> <Text>3.5</Text>
            </ListItem>

            <ListItem display={'flex'} justifyContent={'flex-end'} gap={10}>
              <IconButton rounded={'full'} icon={<EditIcon/>} colorScheme='green' bg={vert}/>
              {/* <Input type='search' w={'full'} borderRadius={'8px'} placeholder='Write a message to Brayan Theloveend'></Input> <IconButton rounded={'full'} icon={<BiSolidSend/>} colorScheme='blue'/> */}
            </ListItem>
          </List>

        </GridItem>
      </Grid>

      <Box mt={4} w={'full'} boxShadow={'0 0 10px rgba(0, 0, 0, 0.1)'} bg={useColorModeValue('white', 'gray.800')} borderRadius={'30px'} p={6}>
        <Flex justify={'space-between'} align={'center'}>
          <Text fontSize={'md'} fontWeight={'500'}>Note</Text>
          <Flex gap={2}>
            <Button colorScheme='green' bg={vert} rounded={'full'} onClick={onOpen}><FiPlus/> Ajouter</Button>
          </Flex>
        </Flex>

        <Skeleton isLoaded={request.isSuccess}>
          <TableContainer mt={4}>
            <Table variant='simple'>
             <TableCaption> { request.isSuccess && request.data.length !== 0 && 'These is represent Teacher Assignments' }</TableCaption> 
              <Thead>
                { request.isSuccess && request.data.length !== 0 && <Tr>
                  <Th>Filiére</Th>
                  { request.isSuccess && request.data.map((item, index)=> 
                    <Th key={index}>
                    <Flex justify={'space-between'} align={'center'}>

                      {item.name} niv {item.level}

                      <Flex gap={2}>
                        <IconButton 
                          icon={<EditIcon/>} 
                          onClick={()=>{
                            setId({index: item.idUnit , current: request.data.findIndex(elt => (elt.idUnit === item.idUnit) && (elt.idSubject === item.idSubject))})
                            setOnUpdate(true)
                            setPayload({
                              start: item.start,
                              end: item.end,
                              idSubject: item.idSubject,
                              idUnit: item.idUnit,
                            })
                            onOpen()
                          }} 
                          size={{base: 'sm', md: 'sm'}} color={'blue.400'} />
                        <IconButton icon={<DeleteIcon/>} size={{base: 'sm', md: 'sm'}} color={'red.400'}
                          onClick={()=>{
                            setId({index: item.idUnit , current: request.data.findIndex(elt => (elt.idUnit === item.idUnit) && (elt.idSubject === item.idSubject))})
                            handleDelete()
                            openModal.onOpen()
                          }}
                        />
                      </Flex>
                    </Flex>
                      
                  </Th>
                    
                  )}
                </Tr>}
              </Thead>
               <Tbody>
         
                <Tr>
                { request.isSuccess && request.data.length !== 0 && <Td fontSize={'md'}>Unit</Td> }
                  { request.isSuccess && request.data.length !== 0 ? 
                    request.data.map((item, index)=> <Td key={index} isNumeric fontWeight={600} fontSize={'md'}>{item.unit}</Td>) :
                  <Flex flexDir={'column'} align={'center'} justify={'center'}>
                    <Image src={image} maxW={{base: '6em', md: '6em'}} opacity={0.9} /> 
                    <Text mt={3} fontSize={'sm'} textAlign={'center'} color={'gray.400'}>Aucune données <br />disponible</Text>
                  </Flex>
                  } 
                </Tr> 
                  
                <Tr>
                { request.isSuccess && request.data.length !== 0 && <Td fontSize={'md'}>Planing</Td> }
                  {
                    request.isSuccess && request.data.map((item, index)=> <Td key={index} isNumeric fontWeight={600} fontSize={'md'}>{item.start}h-{item.end}h</Td>)
                  }
                </Tr>

               
 
              </Tbody> 
              {/* <Tfoot>
                <Tr>
                  <Th>To convert</Th>
                  <Th>into</Th>
                  <Th isNumeric>multiply by</Th>
                </Tr>
              </Tfoot> */}
            </Table>
          </TableContainer>
        </Skeleton>

      </Box>


    {/* Modal */}


    <Modal isOpen={isOpen} closeOnOverlayClick={false} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
        <ModalHeader>{ onUpdate ? ' Mettre a jour le planing':'Ajouter '}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text noOfLines={3} mb={4} fontSize={'md'}>{`Remplir les champs suivants pour ${ onUpdate ? 'mettre ajour':'Ajouter'}`} <strong>{data?.name}'s Task</strong></Text>
          
          <FormControl>
            <FormLabel alignItems={'center'} gap={2} mt={1} display={'flex'}><ion-icon name="file-tray-full-outline"></ion-icon>Filiére</FormLabel>
            <Skeleton isLoaded={subject.isSuccess} rounded={'full'}>
              <Select 
              disabled={onUpdate}
              value={payload.idSubject}
              name='subject'
              placeholder={ subject.isSuccess && subject.data.length === 0 ? 'Aucune filiére disponible': 'Choisir une filiére'}
              onChange={e=> {
                setPayload({...payload, 
                idSubject: e.target.options[e.target.options.selectedIndex].id})
                setSubId(e.target.options[e.target.options.selectedIndex].id)
                }}
              >
                {
                  subject.isSuccess && subject.data.map(item=> <option value={item.id} id={item.id} key={item.id}> {item.name} / {item.level} </option>)
                }
                
              </Select>
            </Skeleton>
          </FormControl>
          
          <FormControl>
            <FormLabel alignItems={'center'} gap={2} mt={1} display={'flex'}><ion-icon name="bandage-outline"></ion-icon> Unité d'apprentissage </FormLabel>
            <Skeleton isLoaded={unitLearning.isSuccess} rounded={'full'}>
              <Select 
              disabled={onUpdate}
              value={payload.idUnit}
              name='Unit'
              placeholder={ unitLearning.isSuccess && unitLearning.data.length === 0 ? 'Aucune UA disponible' : 'Choisir une UA'}
              onChange={e=> setPayload({...payload, idUnit: e.target.options[e.target.options.selectedIndex].id})}
              >
                {
                  unitLearning.isSuccess && unitLearning.data.map(item=> <option value={item.id} id={item.id} key={item.id}> {item.name} / {item.code} </option>)
                }
                
              </Select>
            </Skeleton>
          </FormControl>

          <Flex align={'center'} justify={'space-between'} mt={2} gap={2}>
              <FormControl>
                <FormLabel alignItems={'center'}  gap={2} mt={1} display={'flex'}><ion-icon name="alarm-outline"></ion-icon>Heure de debut</FormLabel>
                <Input type='number' defaultValue={0} onChange={e =>setPayload({...payload, start: e.target.value })} value={payload.start}/>
              </FormControl>

              <FormControl>
                <FormLabel alignItems={'center'}  gap={2} mt={1} display={'flex'}><ion-icon name="alarm-outline"></ion-icon>heure de fin</FormLabel>
                <Input type='number' defaultValue={0} onChange={e =>setPayload({...payload, end: e.target.value })} value={payload.end}/>
              </FormControl>
            </Flex>

        </ModalBody>

        <ModalFooter>
          <Button rounded={'md'} colorScheme='blue' mr={3} onClick={resetAndClose}>
            Cancel
          </Button>
          <Button variant='outline' isLoading={loading} rounded={'md'} colorScheme={onUpdate ? 'orange':'green'} isDisabled={disabled} onClick={onUpdate ? handleUpdate : handleSubmit}>{onUpdate ? 'Modifier':'Ajouter'}</Button>
        </ModalFooter>
        </ModalContent>
    </Modal>


    <CustomModal
      isOpen={openModal.isOpen} 
      onClose={openModal.onClose} 
      text={modalData} 
      title={modalData.title}
      isLoading={loading} 
      data={request.isSuccess && request.data[id.current]?.name}
      handler={Deleter}
    />


       

        

    </Box>
  )
}

export default TeacherDetails