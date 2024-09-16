import { Avatar, Box, Button, Flex, Grid, GridItem, Heading, Icon, IconButton, Image,  Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, SimpleGrid, Skeleton, Table, TableContainer,  Tag,  TagLabel,  TagLeftIcon,  Tbody, Td, Text, Th, Thead, Tr,  useColorModeValue, useDisclosure, useToast } from '@chakra-ui/react'
import React, { useCallback, useEffect, useState } from 'react'
import CardAnalitic from './Card'
//import { BiSolidDashboard, BiSolidFolderOpen, BiSolidUser, BiSolidWallet} from 'react-icons/bi'
import { FiArchive, FiChevronDown, FiPlusCircle, FiSearch } from 'react-icons/fi'
import CustomHeading from '../Dashboard/CustomHeading'
import { CheckIcon, DeleteIcon, WarningIcon,} from '@chakra-ui/icons'
import CustomTable from '../Dashboard/CustomTable'
import image from '../../assets/images/Dashboard/datanotfound.png'
import { motion } from 'framer-motion'
import { Maincolor, containerVariant, formatter, vert } from '../theme'
import { useAddRoleMutation, useDeleteRoleMutation, useGetPaymentQuery, useGetRoleQuery, useGetStudentInfoQuery, useGetStudentQuery, useGetTeacherQuery, useGetUserAndRoleQuery, useUpdateRoleMutation } from '../Redux/ApiSlice'
import { useNavigate } from 'react-router-dom'
import AddUser from './AddUser'
import { kFormatter } from '../Custom/formatedNumber'
import icon1 from '../../assets/ion-icons/fitness.svg'
import icon2 from '../../assets/ion-icons/paw.svg'
import icon3 from '../../assets/ion-icons/rainy.svg'
import icon4 from '../../assets/ion-icons/speedometer.svg'
import { ImConfused2 } from 'react-icons/im'
import NotFound from '../../NotFound'
import Nodata from '../UserPage/Nodata'
import Events from '../Dashboard/Events'
import dayjs from 'dayjs'

const Dashbord = () => {

    const navigate = useNavigate()
    const savedData = JSON.parse(localStorage.getItem('userData'))
    const textColor = useColorModeValue('gray.700','white' )
    const [onUpdate, setOnUpdate] = useState(false)
    const openModal = useDisclosure()




    // const expiredSession= useCallback((type, msg, title)=>{
    //     setmodalData({
    //       message: `Chére utilisateur ${savedData?.name} votre session viens juste d'expirée! connectez-vous pour continuer`, 
    //       button: 'Se connnecter',
    //       title: 'Session',
    //       color: vert,
    //       toggle: true,
    //     })
    // }, [savedData])



    //Dashboard CARD TOTAL PAYMENT

    useEffect(() => {
      if(!savedData){
        openModal.onOpen()
      }

    }, [navigate, savedData, openModal])
    



    //ALERT

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


    //const gain = useGetPaymentQuery()
    
    const textcolor = useColorModeValue('gray.600','gray.400')
    const [toggle, setToggle] = useState(true)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [payload, setPayload] = useState()
    const [btn, setBtn] = useState(false)
    const [loading, setLoading] = useState(false)

    const [id, setId] = useState({
        index: 0,
        current: 0
    })

    const [modalData, setmodalData] = useState({
        message: '',
        button: '',
        color: '',
        title: '',
        toggle: false
    })

    const prepareDelete=()=>{
        setmodalData({
          message: 'Are you sure to delete definitively', 
          button: 'Delete',
          title: 'Delete Role',
          color: 'red',
          toggle: true,
        })
    }

   
    const [DEL] = useDeleteRoleMutation()
    
    const handleDelete=(id)=>{
        setLoading(true)
        DEL(id).unwrap()
        .then(resp=>{
          setLoading(false)
          onClose()
          showMessage('success', resp.message , 'Delete Task')
        }).catch(err=>{
          setLoading(false)
          onClose()
          showMessage('error', err.message , 'Delete Task')
        })
    }


    const [ADD] = useAddRoleMutation()
    const [SET] = useUpdateRoleMutation()
    const Role = useGetRoleQuery(savedData?.token)

    const background = useColorModeValue('white', 'gray.800')
    // const text1 = useColorModeValue('gray.700', 'white')


    //Check Role

    useEffect(() => {
        if(savedData && (savedData?.roleName === 'STUDENT' || savedData?.roleName === 'TEACHER') ){
          setTimeout(navigate, 0, '/')
        }
      }, [navigate, savedData])




    const Payment = useGetPaymentQuery(savedData?.token)
    
    useEffect(() => {
    if(Payment.isError){
        if(Payment.error.status=== 401){
        openModal.onOpen()
        }else{
        //console.log(error.error);
        showMessage('error', 'Server has been stopped', 'Fetch Task')
        }
    }else if(Payment.isSuccess){
        //console.log(data);
        //showMessage('success', `${data.length} items found`, 'Fetch Task')
    }
    }, [Payment.isSuccess, Payment.isError, Payment.error, Payment.isLoading, Payment.data, navigate, showMessage, openModal])
    

    const Teacher = useGetTeacherQuery()
    
    useEffect(() => {
    if(Teacher.isError){
        if(Teacher.error.status=== 401){
            openModal.onOpen()
        }else{
        //console.log(error.error);
        //showMessage('error', 'Server has been stopped', 'Fetch Task')
        }
    }else if(Teacher.isSuccess){
        //console.log(data);
        //showMessage('success', `${data.length} items found`, 'Fetch Task')
    }
    }, [Teacher.isSuccess, Teacher.isError, Teacher.error, Teacher.isLoading, Teacher.data, navigate, showMessage, openModal])
    

    const Student = useGetStudentQuery(savedData?.token)
    
    useEffect(() => {
    if(Student.isError){
        if(Student.error.status=== 401){
            openModal.onOpen()
        }else{
        //console.log(error.error);
        //showMessage('error', 'Server has been stopped', 'Fetch Task')
        }
    }else if(Student.isSuccess){
        //console.log(data);
        //showMessage('success', `${data.length} items found`, 'Fetch Task')
    }
    }, [Student.isSuccess, Student.isError, Student.error, Student.isLoading, Student.data, navigate, showMessage, openModal])
    


    const handleUpdate =()=>{
        setLoading(true)
        SET({ 'id': id.current, "label": payload}).unwrap()
        .then(resp=>{
          setLoading(false)
          setOnUpdate(false)
          setPayload('')
          showMessage('success', resp.message , 'Update Task')
        }).catch(err=>{
          setLoading(false)
          setOnUpdate(false)
          setPayload('')
          showMessage('error', err.data.message , 'Update Task')
        })
    }


    //Motion

    const MotionBox = motion(CardAnalitic)
    const cardVariant = {
        initial: {
            y: -15
        },
        animate: {
            y: 0,
            transition: {
                type: 'spring'
            }
        }
    }

    const {
        data,
        isError,
        isSuccess,
        error,
        isLoading
      } = useGetUserAndRoleQuery()

    
    
    useEffect(() => {
        if(isError){
            if(error.status=== 401){
            openModal.onOpen()
            }else{
            //console.log(error.error);
            //showMessage('error', 'Server has been stopped', 'Fetch Task')
            }
        }else if(isSuccess){
            //console.log(data);
            //showMessage('success', `${data.length} items found`, 'Fetch Task')
        }
    }, [isSuccess, isError, error, isLoading, data, navigate, openModal ])

    useEffect(() => {
        if(Role.isError){
            if(Role.error.status=== 401){
            openModal.onOpen()
            }else{
            //console.log(error.error);
            //showMessage('error', 'Server has been stopped', 'Fetch Task')
            }
        }else if(Role.isSuccess){
            //console.log(data);
            //showMessage('success', `${data.length} items found`, 'Fetch Task')
        }
    }, [Role.isSuccess, Role.isError, Role.error, Role.isLoading, Role.data, navigate, openModal ])


    //Status Payment

    const paymentStatus = useGetStudentInfoQuery()

    useEffect(() => {
        if(paymentStatus.isError){
            if(paymentStatus.error.status=== 401){
                openModal.onOpen()
            }else{
            //console.log(error.error);
            //showMessage('error', 'Server has been stopped', 'Fetch Task')
            }
        }else if(paymentStatus.isSuccess){
            //console.log(data);
            //showMessage('success', `${data.length} items found`, 'Fetch Task')
        }
    }, [paymentStatus.isSuccess, paymentStatus.isError, paymentStatus.error, paymentStatus.isLoading, navigate, openModal ])

    useEffect(() => {
        if(!payload){
            setBtn(true)
        }else{
            setBtn(false)
        }
    }, [payload])
    

    const handleAddRole = ()=>{

        setLoading(true)
        ADD({"label": payload}).unwrap()
        .then(resp=>{
            setLoading(false)
            setPayload('')
            showMessage('success', resp.message , 'Add Task')
        
        }).catch(err=>{
            setLoading(false)
            setPayload('')
            showMessage('error', err.data.message , 'Add Task')
        })
    }

    const columns = React.useMemo(
        () => [
          {
            Header: ' ',
            columns: [
              {
                Header: "Noms",
                accessor: "name"
              },
              {
                Header: "Filiére",
                accessor: "subject"
              },
              {
                Header: "Pension",
                accessor: "fees"
              },
              {
                Header: "payée",
                accessor: "payed"
              },
              {
                Header: "statut",
                accessor: "statut"
              },
              
            ]
          }
        ],
        []
      );


      const formatedData = paymentStatus.isSuccess && paymentStatus.data.map(elt=>{
        return {
            key: elt.id,
            name: (
                <Flex gap={3}>
                    <Avatar size={{base: 'sm', md: 'md'}} src={`http://localhost:${process.env.REACT_APP_PORT}/image/${elt.picture}`}/>
                    <Box>
                        <Text fontSize={{base: 'sm', md: 'md'}} color={textcolor} noOfLines={1} fontWeight={600}>
                        {elt.name}
                        </Text>
                        <Text fontSize={{base: 'sm', md: 'md'}} color={textcolor} noOfLines={1}>
                        {elt.email}
                        </Text> 
                    </Box>
                </Flex>), 
            subject: <Text fontSize={{base: 'sm', md: 'md'}} noOfLines={1} fontWeight={600}>{elt.subject} {elt.level} </Text>,   
            statut: <Tag size={{base: 'sm', md: 'md'}} variant='subtle' colorScheme={ elt?.payed.reduce((accumulator, currentValue) => accumulator + currentValue.amount, 0) < elt?.fees ? 'red' : 'green'}>
            <TagLeftIcon boxSize='12px' as={ elt?.payed.reduce((accumulator, currentValue) => accumulator + currentValue.amount, 0) < elt?.fees ? WarningIcon : CheckIcon   } />
            <TagLabel>{ elt?.payed.reduce((accumulator, currentValue) => accumulator + currentValue.amount, 0) < elt?.fees ? `non soldé` : 'soldé'}</TagLabel>
            </Tag>,
            fees: <Text fontSize={{base: 'sm', md: 'md'}} noOfLines={1} fontWeight={600}> {formatter.format(elt.fees)}</Text>,   
            payed: <Text fontSize={{base: 'sm', md: 'md'}} noOfLines={1} fontWeight={600} color={vert} >{ formatter.format(elt?.payed.reduce( (accumulator, currentValue) => accumulator + currentValue.amount, 0))}</Text>,
            
        }
        
      })

    return (
    <Box as={motion.div}
        variants={containerVariant}
        initial={'hidden'}
        animate={'visible'}
    >
        <CustomHeading title={'Dashboard'} prevSection={'Tableu de bord'} currentSection={'Accueil'}/>

        <SimpleGrid 
            mt={14}
            columns={{ base: 1, sm: 2,  md: 4 }} 
            spacing={{ base: 5, lg: 8 }}
        >

            <MotionBox
                whileHover={{y: -10}}
                variants={cardVariant}
                animate={'animate'}
                isLoading={Payment.isSuccess} 
                info={Payment.isSuccess ? `${ Payment.data.reduce((accumulator, currentValue) => accumulator + currentValue.amount, 0)} Fcfa` : 'info'}
                total={Payment.isSuccess ? kFormatter(Payment.data.reduce( (accumulator, currentValue) => accumulator + currentValue.amount, 0)) : 'info'} 
                title='Revenue' 
                colorOne={'red.400'} 
                colorTwo={'#FF0080'} 
                icon={<ion-icon src={icon1} style={{fontSize: '30px'}}>
                </ion-icon>}
                label="Montant de la caisse" 
            />
            <MotionBox
                whileHover={{y: -10}}
                variants={cardVariant}
                animate={'animate'}
                isLoading = {Student.isSuccess}
                title='Etudiant' 
                total={Student.isSuccess && Student.data.length}
                colorOne={'green.400'} 
                colorTwo={'green.400'} 
                icon={<ion-icon src={icon3} style={{fontSize: '30px'}}>
                </ion-icon>} 
                label="Effectif des etudiants"
            />
            <MotionBox
                whileHover={{y: -10}}
                variants={cardVariant}
                animate={'animate'}
                title='Enseignants' 
                total={Teacher.isSuccess && kFormatter(Teacher.data.length)} 
                colorOne={'blue.400'} 
                icon={<ion-icon src={icon2} style={{fontSize: '30px'  }}>
                </ion-icon>} 
                label="Effectif des profs"
                isLoading= {Teacher.isSuccess} 
            />
            <MotionBox
                whileHover={{y: -10}}
                variants={cardVariant}
                animate={'animate'}
                isLoading={isSuccess}
                title='Personel' 
                total='45.1'  
                colorOne={'yellow.400'} 
                colorTwo={'orange.400'} 
                icon={<ion-icon src={icon4} style={{fontSize: '30px'  }}>
                </ion-icon>} 
                label="utilisateurs du systéme"
            />

        </SimpleGrid>

        <Grid
            overflowX={{base: 'scroll', md: 'unset'}}
            // gridTemplateColumns={'2fr 1fr'}
            // gap={4}
            mt={8}
            
        >
            <GridItem>
                <Box 
                bg={useColorModeValue('white', 'gray.800')} 
                p={8} 
                borderRadius={'20px'} 
                minH={'200px'} 
                border={'1px solid'}
                borderColor={useColorModeValue('#efefef', 'gray.800')}
                >
                    <Flex alignItems={'center'} mb={3} justifyContent={'space-between'}>
                        <Text fontSize={{base: 'md', md:'xl'}} color={useColorModeValue('gray.700','white' )} fontWeight={600}> Scolarité </Text>
                        <Flex gap={3} alignItems={'center'}>
                            <Icon as={FiSearch} fontSize={'16px'}/>
                            <Icon as={FiChevronDown} fontSize={'15px'}/>
                        </Flex>
                        
                    </Flex>


                    <CustomTable columns={columns} data={ paymentStatus.isSuccess ? formatedData : [] } isLoading={paymentStatus.isLoading}/>

            

                    
                </Box> 
            </GridItem>

            {/* <GridItem>
                <Box bg={'white'} p={6} borderRadius={'20px'} minH={'200px'}>
                    <Flex alignItems={'center'} mb={6} justifyContent={'space-between'}>
                        <Text fontSize={'xl'} fontWeight={600} color={'gray.700'}> Todo List </Text>
                        <Flex gap={3} alignItems={'center'}>
                            <Icon as={FiPlusCircle} fontSize={'16px'}/>
                            <Icon as={FiArchive} fontSize={'15px'}/>
                        </Flex>
                    </Flex>


                    <Flex flexDirection={'column'} gap={2}>
                        <Event event={fakeEvent}/>
                    </Flex>
                </Box> 
            </GridItem>   */}
        </Grid>

        {/* <SimpleGrid  columns={{base: 1, sm: 2, md: 3}} gap={4} mt={8} >
            <GridItem as={motion.div} whileHover={{ y: 15}} p={6} rounded={'20px'} _hover={{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)' }}   bg={background} gap={8} flexDir={'column'} display={'flex'} justifyContent={'space-between'} alignItems={'center'}>

               <Text fontSize={'md'} fontWeight={600}>ABOUT EXAM NOTES</Text>
               <ion-icon name="bulb-outline" style={{fontSize: '50px'}}></ion-icon>
               <Text fontSize={'md'} textAlign={'center'}>You can easily add and set note's percentage. Currently system setting is <strong>30% for first exam </strong>and <strong>70% for final exam</strong>   </Text>
                <Button colorScheme='blue' w={'full'}>Access now</Button>
            </GridItem>

            <GridItem as={motion.div} whileHover={{ y: 15}} p={6} _hover={{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)' }} rounded={'20px'} bg={background} gap={8} flexDir={'column'} display={'flex'} justifyContent={'space-between'} alignItems={'center'}>

                <Text fontSize={'md'} fontWeight={600}>ABOUT ROLE OF USER</Text>
                <ion-icon name="accessibility-outline" style={{fontSize: '50px', color: '#dd6b24'}}></ion-icon>
                <Text fontSize={'md'} textAlign={'center'}>users doesn't have the same privileges,  this is applied to restrict app features to <strong>user allowed only</strong>  </Text>
                <Button colorScheme='orange' w={'full'}>Update</Button>
            </GridItem>

            <GridItem as={motion.div} whileHover={{ y: 15}}  _hover={{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)' }} p={6} rounded={'20px'} bg={background}  gap={8} flexDir={'column'} display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
            <Text fontSize={'md'} fontWeight={600}>ABOUT DELETE CONSTRAINTS</Text>
                <ion-icon name="hand-right-outline" style={{fontSize: '50px', color: '#e53e3e'}}></ion-icon>
                <Text fontSize={'md'} textAlign={'center'}>Before Delete items from following session ( <strong> Trainings </strong> ) make sure its no containts important data because these will be lost </Text>
                <Button colorScheme='red' w={'full'}>Read more</Button>
            </GridItem>
        </SimpleGrid> */}

        {/* savedData?.roleName === 'SUPERADMIN' */}
       <SimpleGrid columns={{base: 1, md: 3, sm: 1}} gap={4} mt={8} >
            

            {/* <GridItem rounded={'20px'} bg={background} p={6}>
                <Text mb={6} fontSize={'md'} fontWeight={600}> type d'utilisateur </Text>

                <HStack>
                    <Input h={'38px'} placeholder='Define a new Role of user' value={payload} isDisabled={loading} onChange={e=>setPayload(e.target.value) }/>
                    <Button isDisabled={btn} h={'38px'} colorScheme={ onUpdate ? 'orange' : Maincolor} onClick={onUpdate ? handleUpdate : handleAddRole} isLoading={loading}>{onUpdate ? 'Update': 'Add' }</Button>
                </HStack>

                <Box mt={6} mb={4}>
                    {Role.isSuccess &&  Role.data.map( elt => 
                        <Flex key={elt.id} borderBottom={'1px solid'} py={3} borderColor={bColor} align={'center'} justify={'space-between'}>
                            <Text fontSize={'md'} fontWeight={500}>{elt?.label.toLowerCase()}</Text>
                            <Flex gap={2}>
                                <IconButton rounded={'full'} icon={<EditIcon/>} 
                                    onClick={()=>{
                                        setId({ index: Role.data.findIndex(item => item.id === elt.id), current: elt.id})
                                        setPayload(elt.label.toLowerCase())
                                        setOnUpdate(true)
                                    }}
                                size={'sm'} color={'blue.400'}/>
                                <IconButton rounded={'full'} icon={<DeleteIcon/>} 
                                onClick={()=>{
                                    prepareDelete()
                                    setId({ index: Role.data.findIndex(item => item.id === elt.id), current: elt.id})
                                    onOpen()
                                }} size={'sm'} color={'red.400'}/>
                            </Flex>
                        </Flex>
                    )}
                </Box>
            </GridItem> */}

           
            <GridItem>
                <Box bg={background} p={6} borderRadius={'20px'} minH={'200px'}>
                    <Flex alignItems={'center'} mb={6} justifyContent={'space-between'}>
                        <Text fontSize={{md: 'xl', base: 'md'}} fontWeight={600} color={useColorModeValue('gray.700','white' )}> Todo List </Text>
                        <Flex gap={3} alignItems={'center'}>
                            <Icon as={FiPlusCircle} fontSize={'16px'}/>
                            <Icon as={FiArchive} fontSize={'15px'}/>
                        </Flex>
                    </Flex>


                    <Flex flexDirection={'column'} gap={2}>
                        <Nodata/>
                    </Flex>
                </Box> 
            </GridItem>


            { savedData.roleName === 'ADMIN' &&  <GridItem p={6} colSpan={2} rounded={'20px'} bg={background}>

                <Flex mb={6} justify={'space-between'} align={'center'}>
                    <Text fontSize={{md: 'xl', base: 'md'}} fontWeight={600} color={textColor}> Personnel Administratif</Text>  
                    {toggle && <Button bg={vert} rounded={'20px'} colorScheme={Maincolor} onClick={()=>setToggle(false)}>{toggle ? 'Ajouter' : 'Annuler'}</Button>}
                </Flex>

                { toggle ?
                <Skeleton isLoaded={isSuccess}>
                    {isSuccess && data.length !== 0 ? 
                    <TableContainer>
                        <Table>
                            <Thead>
                                <Tr>
                                    <Th>Noms</Th>
                                    <Th>Role</Th>
                                    <Th>Option</Th>
                                </Tr>
                            </Thead>

                            <Tbody>
                                {
                                    isSuccess &&  data.map((elt, index)=>
                                        
                                        <Tr key={index}>
                                            <Td>
                                                <Flex gap={3}>
                                                    <Avatar size={{base: 'sm', md: 'md'}} src={`http://localhost:3000/image/${elt.picture}`}/>
                                                    <Box>
                                                        <Text fontSize={{base: 'sm', md: 'md'}} color={textcolor} noOfLines={1} fontWeight={600}>
                                                        {elt.name}
                                                        </Text>
                                                        <Text fontSize={{base: 'sm', md: 'md'}} color={textcolor} noOfLines={1}>
                                                        {elt.email}
                                                        </Text> 
                                                    </Box>
                                                </Flex>
                                            </Td>

                                            <Td>
                                                {elt.role}
                                            </Td>

                                            <Td>
                                                <Flex gap={2}>
                                                <IconButton icon={<DeleteIcon/>} size={{base: 'sm', md: 'md'}} color={'red.400'}
                                                
                                                    // onClick={()=>{
                                                    // handleDelete()
                                                    // setId({ index: data.findIndex(item => item.id === elt.id), current: elt.id})
                                                    // onOpen()
                                                    // }}
                                                />

                                                { elt.statut === 0 && <IconButton icon={<CheckIcon/>} size={{base: 'sm', md: 'md'}} color={'green.400'}
                                                    // onClick={()=>{ 
                                                    // handleActive()
                                                    // setId({ index: data.findIndex(item => item.id === elt.id), current: elt.id})
                                                    // onOpen()
                                                    // // setOnUpdate(true)
                                                    // }}
                                                /> }
                                                </Flex>
                                            </Td>

                                        </Tr>    
                                    )
                                }

                            </Tbody>
                        </Table>
                    </TableContainer>
                    : <Nodata/>
                    
                    }
                </Skeleton> : 
                
                <AddUser close={()=>setToggle(true)}/>
                
                }
            </GridItem>}


    
        </SimpleGrid>
        
        {/* <CustomModal
            isOpen={isOpen}
            onClose={onClose}
            title={'Delete Role'}
            isLoading={false}
            text={modalData}
            data={Role.isSuccess && Role.data[id?.index]?.label}
            isSuccess={Role.isSuccess}
            handler={()=> navigate('/login')}
        /> */}



        <Modal isOpen={openModal.isOpen} closeOnOverlayClick={false}>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>Session expirée</ModalHeader>
            
            <ModalBody>
                <Text noOfLines={3} fontSize={'md'}>Chére utilisateur <strong>{savedData?.name}</strong> votre session a éxpirée ! Connectez-vous pour continuer</Text>
            </ModalBody>

            <ModalFooter>
          
            <Button  fontWeight={500} rounded={'md'} colorScheme={'blue'}  onClick={()=>navigate('/login')}>Se connecter</Button>
            </ModalFooter>
            </ModalContent>
        </Modal>

        
    </Box>
  )
}

export default Dashbord