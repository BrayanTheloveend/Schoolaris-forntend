import { Avatar, Box, Button, Flex, FormControl, FormLabel, Grid, GridItem, Heading, Icon, IconButton, Image, Input, Link, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Skeleton, Text, useColorModeValue, useDisclosure, useToast } from '@chakra-ui/react'
import React, { useCallback, useEffect, useState } from 'react'
import {
  List,
  ListItem,
} from '@chakra-ui/react'

//payment method logo

import method1 from '../../assets/images/mtn.png'
import method2 from '../../assets/images/orange.png'
import method3 from '../../assets/images/logo visa.png'
import method4 from '../../assets/images/images.png'

import { FiArrowLeft, FiCheckCircle, FiChevronLeft, FiChevronRight, FiPlus, FiPrinter, FiSend } from 'react-icons/fi'
import bgblue from '../../assets/images/bgstudent.webp'
import dayjs from 'dayjs'
import image from '../../assets/images/Dashboard/datanotfound.png'
import { useAddNoteMutation, useDeleteNoteMutation, useGetNoteByUnitAndStudentQuery, useGetPaymentByStudentIdQuery, useGetStudentByIdQuery, useGetSubjectByIdQuery, useGetUnitBySubjectQuery, usePrintStudentProfileMutation, useUpdateNoteMutation} from '../Redux/ApiSlice'
import {
  Table,
  Thead,
  Tbody,
  //Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react'
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { motion } from 'framer-motion'
import CustomModal from '../Custom/CustomModal'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { vert, formatter } from '../theme'
import CustomHeading from '../Dashboard/CustomHeading'

const StudentDetails = () => {

  //navigate between pages

  const navigate = useNavigate()

  const textColor = useColorModeValue('gray.600', 'gray.400')
  const text1 = useColorModeValue('gray.700', 'white')

  //params

  const { userId, subjectId } = useParams()

  //Modals

  const { isOpen, onOpen, onClose } = useDisclosure()
  const openModal = useDisclosure()
  const [modalData, setmodalData] = useState({
    message: '',
    button: '',
    color: '',
    title: '',
    toggle: false
  })

  //  onUpdateHelper

  const [id, setId] = useState({
    index: 0, current: 0
  })
  const [onUpdate, setOnUpdate] =  useState(false)
  const [loading, setLoading] =  useState(false)
  const [write, setWrite] =  useState(false)

  const handleDelete=()=>{
    setmodalData({
      message: 'Are you sure to delete definitively', 
      button: 'Delete',
      title: 'Delete Note',
      color: 'red',
      toggle: true,
    })
  }

  //AddNote Payload

  const [payload, setPayload] = useState({
    markOne: 0,
    markTwo: 0,
    idUnit: '/'
  })

  const [disabled, setDisabled] = useState(false)

  //Payload Validation

  useEffect(() => {
      console.log(payload.idUnit);
      if(!payload.idUnit || payload.idUnit==='/' ){
        setDisabled(true)
      }else{
        setDisabled(false)
      }
  }, [payload.idUnit, payload.markOne, payload.markTwo])
  

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

  const request =  useGetSubjectByIdQuery(subjectId)
  const student = useGetStudentByIdQuery(userId)
  const note = useGetNoteByUnitAndStudentQuery({id: userId, index: subjectId})
  const unitLearning = useGetUnitBySubjectQuery(subjectId)
  const payment =useGetPaymentByStudentIdQuery(userId)
  const [ADD] = useAddNoteMutation()
  const [DEL] = useDeleteNoteMutation()
  const [UPDATE] = useUpdateNoteMutation()
  const [PRINT] = usePrintStudentProfileMutation()


  //GETSTUDENTBYID

  useEffect(() => {
    if(student.isError){
      if(student.error.status=== 401){
        //navigate('/login')
      }
    }else if(student.isSuccess){

      // showMessage('success', `${data.length} items found`, 'Fetch Task')
    }
  }, [student.isSuccess, student.isError, student.error])


  //GETUNIT LEARNING
  useEffect(() => {
    if(unitLearning.isError){
      if(unitLearning.error.status=== 401){
        //navigate('/login')
      }
      //console.log(error.error);
      //return showMessage('error',error.message, 'Fetch Task')
    }else if(unitLearning.isSuccess){
      //console.log(data);
      //showMessage('success', `${data.length} items found`, 'Fetch Task')
    }
  }, [unitLearning.isSuccess, unitLearning.isError, unitLearning.error])

  //GETSUBJECT
  
  useEffect(() => {
    if(request.isError){
      if(request.error.status=== 401){
        //navigate('/login')
      }
    }else if(request.isSuccess){
      // console.log(data);
      // showMessage('success', `${data.length} items found`, 'Fetch Task')
    }
  }, [request.isSuccess, request.isError, request.error])

  //GETNOTE

  useEffect(() => {
    if(note.isError){
      if(note.error.status=== 401){
        //navigate('/login')
      }
    }else if(note.isSuccess){
      console.log(note.data);
      // showMessage('success', `${data.length} items found`, 'Fetch Task')
    }
  }, [note.isSuccess, note.isError, note.error, note.data])
  

  //GET PAYMENT HISTORY

  useEffect(() => {
    if(payment.isError){
      if(payment.error.status=== 401){
        //navigate('/login')
      }
    }else if(payment.isSuccess){
      // showMessage('success', `${data.length} items found`, 'Fetch Task')
    }
  }, [payment.isSuccess, payment.isError, payment.error])






  //SUBMIT REQUEST
  
  const handleSubmit =()=>{
    setLoading(true);
    
    ADD({...payload, percentId: 1, id: userId}).unwrap()
    .then(resp =>{
      setLoading(false);
      setPayload({
        idUnit: '/',
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

  //HELPER

  const resetAndClose =()=>{
    onClose()
    setPayload({
      idUnit: '',
      markOne: 0,
      markTwo: 0,
    })
  }

  //DELETE REQUEST

  const DeleteNote =async(id)=>{
    setLoading(true)
    await DEL(id).unwrap()
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

    UPDATE({...payload, id: id.index}).unwrap()
    .then(resp =>{
      showMessage('success', resp.message, 'Update Task');
      setLoading(false);
      setPayload({
        idUnit: '/',
        markOne: 0,
        markTwo: 0,
      })
      onClose()
      setOnUpdate(false)
    })
    .catch(err=>{
      showMessage('error', err.message, 'Update Task', 7000, 'top-center');
      setLoading(false);
    })
  }


  //PRINT REQUEST


  const handlePrint = async()=>{
    let payload =  {
      ...student.data, note: note.data, subject: request.data 
    }

    //console.log({'data': payload});
     setLoading(true)
     await PRINT({'userData': payload}).unwrap()
     .then(resp=>{
       setLoading(false)
       showMessage('success', resp.message , 'Update Task')
     }).catch(err=>{
       setLoading(false)
       showMessage('error', err.message , 'Update Task')
     })
  }


  const methodPayment = (id)=>{
    switch (id) {
      case '1':
        return method2
      case '2':
        return method1
      case '3':
        return method3
      case '4':
        return method4
  
      default:
        break;
    }
  }

  

  const openPdf = (link)=>{
    window.open(link)
  }




  
  return (
    <Box minH={'350px'} as={motion.div}
      initial={{ y: '-100vh' }}
      animate={{ y: 0}}
    >

      <CustomHeading title={'Gestions des Etudiants'} prevSection={'Etudiant'} currentSection={'Listes des etudiants'} nextSection={'Details'}/>

      <Flex mb={14} mt={8} align={'center'} justifyContent={'space-between'}>


        <Flex gap={4} align={'center'}>
          <Icon color={vert} as={FiArrowLeft} fontSize={20}/>
          <Link as={NavLink} fontSize={'xl'} to={'/student'} color={vert} fontWeight={600}>Back</Link>
        </Flex>
        

        <Button colorScheme={'green'} color={vert} borderColor={vert} variant={'outline'} onClick={handlePrint} isLoading={loading}  isDisabled={!(note.isSuccess && request.isSuccess)} rounded={'full'} ><FiPrinter/> Imprimer</Button>
      </Flex>

      <Grid
        gap={5}
        templateRows={{base: 'unset', md: 'repeat(2, 1fr)'}}
        templateColumns={{base: '1fr', md: 'repeat(4, 1fr)'}}
      >
        <GridItem pos={'relative'} colSpan={{base: 1, md: 4}} minH={'200px'} bgImg={bgblue} borderRadius={'30px'} _before={{
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
          
          <Flex justifyContent={{base: 'center', md:'unset'}} flexDir={{base: 'row-reverse', md:'column'}} zIndex={10} h={'full'} w={"full"} pos={{base:'relative', md: 'absolute'}} bottom={{ base:'unset', md:'-50%'}} gap={2} textAlign={'center'} alignItems={'center'}>
          
            <Box textAlign={{base: 'left', md: 'unset'}}>
              <Skeleton isLoaded={student.isSuccess}>
                <Text fontWeight={600}  lineHeight={8} noOfLines={2} fontSize={{ base: 'xl', md:'2xl'}} color={'white'}>
                {`${student.data?.name} ${student.data?.surname}`}   
                </Text>
              </Skeleton>
              <Skeleton isLoaded={student.isSuccess}>
                <Text fontSize={{ base: 'sm', md:'md'}} fontWeight={500} color={'white'} >
                {student.data?.email}    
                </Text>
              </Skeleton>
              
            </Box>
            
            <Skeleton isLoaded={student.isSuccess}>
              <Avatar size={{base: 'xl', md: '2xl'}} mb={2} border={{base: '4px solid', md: '5px solid'}} borderColor={'white'} src={`http://localhost:${process.env.REACT_APP_PORT}/image/${student.data?.picture}`}/>
            </Skeleton>
          </Flex>

          <Flex w={'full'} px={8} pos={'absolute'} top={0} zIndex={10} mt={4} justifyContent={'space-between'} alignItems={'center'}>
            <Text fontWeight={600} fontFamily={'Poppins semiBold'} noOfLines={1} fontSize={'md'} color={'white'}>
              ID #{userId}
            </Text>

            <Skeleton isLoaded={student.isSuccess}>
              <Text fontWeight={600} noOfLines={2} fontSize={'md'} fontFamily={'Poppins semiBold'} color={'white'}>
                CreatAt: {dayjs(student.data?.createdAt).format('DD.MM.YYYY')}
              </Text>
            </Skeleton>
          </Flex>
        </GridItem>


        <GridItem boxShadow={'0 0 10px rgba(0, 0, 0, 0.1)'} bg={useColorModeValue('white', 'gray.800')} colSpan={{base: 1, md: 2}} borderRadius={'30px'} p={6}>
          <Text fontSize={'md'} fontWeight={'500'} textAlign={'center'}>PROFILE</Text>
          <br />

          <List fontSize={'md'} ml={2} spacing={2}>
            <ListItem display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
              <Flex gap={2} justifyContent={'center'} alignItems={'center'}> 
                <FiChevronRight/>  
                <Text fontWeight={500} color={'gray.600'} fontFamily={'Poppins Semibold'}>Full Name</Text>
              </Flex>
              <Skeleton isLoaded={student.isSuccess}>
                <Text>{student.data?.name} {student.data?.surname}</Text>
              </Skeleton>
              
            </ListItem>

            <ListItem display={'flex'} justifyContent={'space-between'}>
              <Flex gap={2} justifyContent={'center'} alignItems={'center'}>
                <FiChevronRight/>
                <Text fontWeight={500} color={'gray.600'} fontFamily={'Poppins Semibold'}>Birthday</Text>
              </Flex> 
              <Skeleton isLoaded={student.isSuccess}>
                <Text>{ dayjs(student.data?.birthday).format('DD.MM.YYYY')}</Text>
              </Skeleton>
            </ListItem>

            <ListItem display={'flex'} justifyContent={'space-between'}>
              <Flex gap={2} justifyContent={'center'} alignItems={'center'}>
                <FiChevronRight/>
                <Text fontWeight={500} color={'gray.600'} fontFamily={'Poppins Semibold'}>
                  Subject 
                </Text>
              </Flex> 
              <Skeleton isLoaded={request.isSuccess}>
                <Text>{request.data?.name} Niv {request.data?.level}</Text>
              </Skeleton>
            </ListItem>

            <ListItem display={'flex'} justifyContent={'space-between'}>
              <Flex gap={2} justifyContent={'center'} alignItems={'center'}>
                <FiChevronRight/>
                <Text fontWeight={500} color={'gray.600'} fontFamily={'Poppins Semibold'}>
                Mobile 
                </Text>
              </Flex>
              <Skeleton isLoaded={student.isSuccess}>
                <Text>+237 {student.data?.mobile}</Text> 
              </Skeleton> 
            </ListItem>

            <ListItem display={'flex'} justifyContent={'space-between'}>
              <Flex gap={2} justifyContent={'center'} alignItems={'center'}>
               <FiChevronRight/>
               <Text fontWeight={500} color={'gray.600'} fontFamily={'Poppins Semibold'}>Note Receipt </Text>
              </Flex>
              <Skeleton isLoaded={student.isSuccess}>
                <Link  title='Mettre à jour le relevé de note' color='green.500' onClick={()=>openPdf(`http://localhost:${process.env.REACT_APP_PORT}/profile/${student.data?.profile}`)}>...Cliquez pour ouvrir</Link> 
              </Skeleton> 
            </ListItem>
          </List>
        </GridItem>

        <GridItem boxShadow={'0 0 10px rgba(0, 0, 0, 0.1)'} bg={useColorModeValue('white', 'gray.800')} colSpan={{base: 1, md: 2}} borderRadius={'30px'} p={6}>
          <Text fontSize={'md'} fontWeight={'500'} textAlign={'center'}>SCHOOL</Text>
          <br />

          <List fontSize={'md'} ml={2} spacing={2}>
            <ListItem display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
              <Text fontWeight={500} color={'gray.600'} fontFamily={'Poppins Semibold'}>School Fees</Text> 
              <Skeleton isLoaded={request.isSuccess}><Text fontFamily={'Poppins ExtraBold'}>{formatter.format(request.data?.fees)}</Text>
              </Skeleton>
            </ListItem>

            <ListItem display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
              <Text fontWeight={500} color={'gray.600'} fontFamily={'Poppins Semibold'}>Already payed</Text> <Skeleton isLoaded={payment.isSuccess}><Text fontFamily={'Poppins ExtraBold'}>
              { payment.isSuccess && formatter.format(payment.data.reduce( (accumulator, currentValue) => accumulator + currentValue.amount, 0))}</Text></Skeleton>
            </ListItem>

            <ListItem display={'flex'} justifyContent={'space-between'}>
              <Text fontWeight={500} color={'gray.600'} fontFamily={'Poppins Semibold'}>Statut </Text> <Text color={student.data?.statut === 1 ? 'green.400' : 'red.400'}>{student.data?.statut === 1 ? 'Activé' : 'Non Activé'}</Text>
            </ListItem>

            <ListItem  display={'flex'} justifyContent={'space-between'}>
              <Text fontWeight={500} color={'gray.600'} fontFamily={'Poppins Semibold'}>Rate </Text> <Text>3.5</Text>
            </ListItem>

            <ListItem display={'flex'} justifyContent={ 'center'} gap={0} >
              <Input 
              as={motion.input}
              transition={'ease-in-out .3s all'}
              roundedLeft={'full'}
              roundedRight={'none'}
              type='text'
              maxW={60}
              _focus={{
                maxW: 'full'
              }}

              placeholder={`Write message to ${student.data?.name}`}
              />
              <IconButton roundedRight={'full'} roundedLeft={'none'} pr={1} icon={<FiSend/>} onClick={()=>setWrite(!write)} colorScheme='green' bg={vert}/>
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

        <Skeleton isLoaded={note.isSuccess}>

          { note.isSuccess && note.data.length !== 0 ?
          <TableContainer mt={4}>
            <Table variant='simple'>
             <TableCaption> { note.isSuccess && note.data.length !== 0 && 'Les notes ci-dessus representent 70% de la note Finale' }</TableCaption> 
              <Thead>
                <Tr>
                  <Th>EXAMEN</Th>
                  { note.isSuccess && note.data.map((item, index)=> 
                    <Th key={item.id}>
                      <Flex justify={'space-between'} align={'center'}>
                        {item.header}

                        <Flex gap={2}>
                          <IconButton 
                            icon={<EditIcon/>} 
                            onClick={()=>{
                              setId({index: item.id , current: note.data.findIndex(elt => elt.id === item.id)})
                              setOnUpdate(true)
                              setPayload({
                                markOne: item.noteOne,
                                markTwo: item.noteTwo,
                                idUnit: item.idUnit
                              })
                              onOpen()
                            }} 
                            size={{base: 'sm', md: 'sm'}} color={'blue.400'} />
                          <IconButton icon={<DeleteIcon/>} size={{base: 'sm', md: 'sm'}} color={'red.400'}
                            onClick={()=>{
                              setId({index: item.id , current: note.data.findIndex(elt => elt.id === item.id)})
                              handleDelete()
                              openModal.onOpen()
                            }}
                          />
                        </Flex>
                      </Flex>
                    </Th>
                  )}
                </Tr>
              </Thead>
               <Tbody>
                  <Tr>
                    <Td fontSize={'md'}>Controle Continu</Td> 
                    { note.isSuccess && note.data.map((item, index)=> <Td key={item.id} isNumeric textAlign={'center'} color={item.noteOne < 10 && 'red'} fontWeight={600} fontSize={'md'}>{item.noteOne}</Td>) }
                  </Tr>
              
                  <Tr>
                    <Td fontSize={'md'}>Session Normale</Td>
                    { note.isSuccess && note.data.map((item, index)=> <Td key={index} isNumeric color={item.noteTwo < 10 && 'red'} fontWeight={600} fontSize={'md'}>{item.noteTwo}</Td>) } 
                  </Tr> 
                </Tbody> 
            </Table>
          </TableContainer>

          :
          <Flex mb={6} flexDir={'column'} align={'center'} justify={'center'}>
            <Image src={image} maxW={{base: '6em', md: '6em'}} opacity={0.9} /> 
            <Heading mt={3} fontSize={'sm'} color={'gray.400'} textAlign={'center'}>Aucne données <br />disponible</Heading>
          </Flex>}

        </Skeleton>

      </Box>


        {/* PAYMENT HISTORY */}

      <Box mt={4} w={'full'} boxShadow={'0 0 10px rgba(0, 0, 0, 0.1)'} bg={useColorModeValue('white', 'gray.800')} borderRadius={'30px'} p={6}>
        <Flex justify={'space-between'} align={'center'} mb={2}>
          <Text fontSize={'md'} fontWeight={'500'}>Historique de paiement</Text>
          <Flex gap={2}>
          </Flex>
            <Button colorScheme='green' bg={vert} title='redirect to Payment page' rounded={'full'} onClick={()=>setTimeout(navigate, 0, `/payment/${userId}/${subjectId}`)}>
              <FiCheckCircle/>Payer
            </Button>
        </Flex>

        <Skeleton isLoaded={payment.isSuccess}>

        { payment.isSuccess && payment.data.length !== 0 ?
          <TableContainer>
            <Table variant='simple'>
              <TableCaption>Paiement annuel</TableCaption>
              <Thead>
                <Tr>
                  <Th>Libellé</Th>
                  <Th>Initiateur</Th>
                  <Th>methode</Th>
                  <Th>Montant</Th>
                  <Th>Options</Th>
                </Tr>
              </Thead>
              <Tbody>
                { payment.isSuccess &&

                  payment.data.map((item, index)=> 
                  <Tr key={index}>
                    <Td fontWeight={600} fontSize={'md'} color={'gray.600'}>{item.title}</Td>
                    <Td fontWeight={600} fontSize={'md'} color={'gray.600'}>{ (item.method === 1 || item.method === 2) ? `+237 ${item.credential}` : item.credential}</Td>
                    <Td><Image src={methodPayment(item.method.toString())} w={'35px'}/></Td>
                    <Td fontWeight={600} fontSize={'md'} fontFamily={'Poppins extraBold'} color={textColor}>{formatter.format(item.amount)}</Td>
                    <Td>
                      <IconButton
                        icon={<FiPrinter/>} 
                        onClick={()=> openPdf(`http://localhost:${process.env.REACT_APP_PORT}/bill/${item.bill}`)}
                        title='Print Bill'
                        size={{base: 'sm', md: 'sm'}} color={vert} />
                    </Td>
                  </Tr>) 
                }
                
              </Tbody>
            </Table>
          </TableContainer>
          :
          <Flex mb={6} flexDir={'column'} align={'center'} justify={'center'}>
            <Image src={image} maxW={{base: '6em', md: '6em'}} opacity={0.9} /> 
            <Heading mt={3} fontSize={'sm'} color={'gray.400'}>No data to display</Heading>
          </Flex>
        }
        </Skeleton>

      </Box>


    {/* Modal */}



    <Modal isOpen={isOpen} closeOnOverlayClick={false} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
        <ModalHeader>{ onUpdate ? 'Update Note':'Add Student Note'}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text noOfLines={3} mb={4} fontSize={'md'}>{`Fill the following fields to ${ onUpdate ? 'Update':'Add'}`} <strong>{student.data?.name}'s notes</strong></Text>
          
          <FormControl>
            <FormLabel alignItems={'center'} gap={2} mt={1} display={'flex'}> <ion-icon name="archive-outline"></ion-icon> Unit Learning </FormLabel>
            <Skeleton isLoaded={unitLearning.isSuccess} rounded={'full'}>
              <Select 
              disabled={onUpdate}
              value={payload.idUnit}
              name='Unit'
              placeholder={ unitLearning.isSuccess && unitLearning.data.length === 0 ? 'Aucune UA disponible': 'select Unit'}
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
                <FormLabel alignItems={'center'}  gap={2} mt={1} display={'flex'}> <ion-icon name="ribbon-outline"></ion-icon> Control Continu</FormLabel>
                <Input type='number' onChange={e =>setPayload({...payload, markOne: e.target.value })} value={payload.markOne}/>
              </FormControl>

              <FormControl>
                <FormLabel alignItems={'center'}  gap={2} mt={1} display={'flex'}><ion-icon name="school-outline"></ion-icon> Examen final</FormLabel>
                <Input type='number' onChange={e =>setPayload({...payload, markTwo: e.target.value })} value={payload.markTwo}/>
              </FormControl>
            </Flex>

        </ModalBody>

        <ModalFooter>
          <Button variant='outline' rounded={'md'} colorScheme='gray'  mr={3} onClick={resetAndClose}>
            Cancel
          </Button>
          <Button  bg={vert} isLoading={loading} rounded={'md'} colorScheme={onUpdate ? 'orange':'green'} isDisabled={disabled} onClick={onUpdate ? handleUpdate : handleSubmit}>{onUpdate ? 'Modifier':'Ajouter'}</Button>
        </ModalFooter>
        </ModalContent>
    </Modal>


    <CustomModal 
      isOpen={openModal.isOpen} 
      onClose={openModal.onClose} 
      text={modalData} 
      title={modalData.title}
      isLoading={loading} 
      data={note.isSuccess && note.data[id.current]?.header}
      handler={()=> DeleteNote(id.index)}
    />






    </Box>
  )
}

export default StudentDetails