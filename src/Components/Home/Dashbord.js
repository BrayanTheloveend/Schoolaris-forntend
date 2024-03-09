import { Avatar, Box, Button, Flex, Grid, GridItem, HStack, Heading, Icon, IconButton, Image, Input, SimpleGrid, Skeleton, Table, TableContainer,  Tbody, Td, Text, Th, Thead, Tr,  useColorModeValue, useDisclosure, useToast } from '@chakra-ui/react'
import React, { useCallback, useEffect, useState } from 'react'
import CardAnalitic from './Card'
import { BiSolidDashboard, BiSolidFolderOpen, BiSolidUser, BiSolidWallet} from 'react-icons/bi'
import { FiChevronDown, FiSearch } from 'react-icons/fi'
import CustomHeading from '../Dashboard/CustomHeading'
import { CheckIcon, DeleteIcon, EditIcon,} from '@chakra-ui/icons'
import CustomTable from '../Dashboard/CustomTable'
import image from '../../assets/images/Dashboard/datanotfound.png'
import { motion } from 'framer-motion'
import { Maincolor, containerVariant, formatter } from '../theme'
import { useAddRoleMutation, useDeleteRoleMutation, useGetPaymentQuery, useGetRoleQuery, useGetStudentQuery, useGetTeacherQuery, useGetUserAndRoleQuery, useUpdateRoleMutation } from '../Redux/ApiSlice'
import { useNavigate } from 'react-router-dom'
import AddUser from './AddUser'
import CustomModal from '../Custom/CustomModal'

const Dashbord = () => {

    const navigate = useNavigate()
    const bColor = useColorModeValue('gray.200', 'gray.700')
    const [onUpdate, setOnUpdate] = useState(false)
    const [Data, setData] = useState([
        {
            name: 'Revenue',
            value: <><small>XAF</small> 862</> ,
            currency: true,
            variant: +3.5 ,
            color: 'green.400',
            bg:  'green.100',
            icon: <BiSolidWallet size={'25px'}/>
        },
        {
            name: 'Teachers',
            value: 18,
            variant: +3.5 ,
            color: 'yellow.400',
            bg:  'yellow.100',
            icon: <BiSolidUser size={'25px'}/>
        },
        {
            name: 'Students',
            value: '1.52K',
            variant: +3.5 ,
            color: 'blue.400',
            bg:  'blue.100',
            icon: <BiSolidDashboard size={'25px'}/>
        },
        {
            name: 'Employement',
            value: 45,
            variant: +3.5 ,
            color: 'orange.400',
            bg:  'orange.100',
            icon: <BiSolidFolderOpen size={'25px'}/>
        },
    ])


    //Dashboard CARD TOTAL PAYMENT







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
    const Role = useGetRoleQuery(JSON.parse(localStorage.getItem('userData'))?.token)

    const background = useColorModeValue('white', 'gray.800')
    // const text1 = useColorModeValue('gray.700', 'white')




    const Payment = useGetPaymentQuery()
    
    useEffect(() => {
    if(Payment.isError){
        if(Payment.error.status=== 401){
        navigate('/login')
        }else{
        //console.log(error.error);
        showMessage('error', 'Server has been stopped', 'Fetch Task')
        }
    }else if(Payment.isSuccess){
        //console.log(data);
        //showMessage('success', `${data.length} items found`, 'Fetch Task')
    }
    }, [Payment.isSuccess, Payment.isError, Payment.error, Payment.isLoading, Payment.data, navigate, showMessage])
    

    const Teacher = useGetTeacherQuery()
    
    useEffect(() => {
    if(Teacher.isError){
        if(Teacher.error.status=== 401){
        navigate('/login')
        }else{
        //console.log(error.error);
        showMessage('error', 'Server has been stopped', 'Fetch Task')
        }
    }else if(Teacher.isSuccess){
        //console.log(data);
        //showMessage('success', `${data.length} items found`, 'Fetch Task')
    }
    }, [Teacher.isSuccess, Teacher.isError, Teacher.error, Teacher.isLoading, Teacher.data, navigate, showMessage])
    

    const Student = useGetStudentQuery(JSON.parse(localStorage.getItem('userData'))?.token)
    
    useEffect(() => {
    if(Student.isError){
        if(Student.error.status=== 401){
        navigate('/login')
        }else{
        //console.log(error.error);
        showMessage('error', 'Server has been stopped', 'Fetch Task')
        }
    }else if(Student.isSuccess){
        //console.log(data);
        //showMessage('success', `${data.length} items found`, 'Fetch Task')
    }
    }, [Student.isSuccess, Student.isError, Student.error, Student.isLoading, Student.data, navigate, showMessage])
    


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
            setTimeout(navigate, 0, '/login')
            }else{
            //console.log(error.error);
            //showMessage('error', 'Server has been stopped', 'Fetch Task')
            }
        }else if(isSuccess){
            //console.log(data);
            //showMessage('success', `${data.length} items found`, 'Fetch Task')
        }
    }, [isSuccess, isError, error, isLoading, data, navigate ])

    useEffect(() => {
        if(Role.isError){
            if(Role.error.status=== 401){
            setTimeout(navigate, 0, '/login')
            }else{
            //console.log(error.error);
            //showMessage('error', 'Server has been stopped', 'Fetch Task')
            }
        }else if(Role.isSuccess){
            //console.log(data);
            //showMessage('success', `${data.length} items found`, 'Fetch Task')
        }
    }, [Role.isSuccess, Role.isError, Role.error, Role.isLoading, Role.data, navigate ])

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


    return (
    <Box as={motion.div}
        variants={containerVariant}
        initial={'hidden'}
        animate={'visible'}
    >
        <CustomHeading title={'Dashboard'} prevSection={'Dashboard'} currentSection={'Home'}/>

        <SimpleGrid 
            mt={8}
            columns={{ base: 1, sm: 2,  md: 4 }} 
            spacing={{ base: 5, lg: 8 }}
        >

            <MotionBox
                whileHover={{y: -10, boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)'}}
                variants={cardVariant}
                animate={'animate'}
                title={Data[0].name}
                isLoading={Payment.isSuccess} 
                percentage={Payment.isSuccess && formatter.format(Payment.data.reduce( (accumulator, currentValue) => accumulator + currentValue.amount, 0))} 
                count={Data[0].variant} 
                icon={Data[0].icon} 
                color={Data[0].color} 
                bg={Data[0].bg}
            />
            <MotionBox
                whileHover={{y: -10, boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)'}}
                variants={cardVariant}
                animate={'animate'}
                isLoading = {Teacher.isSuccess}
                title={Data[1].name} 
                percentage={Teacher.isSuccess && Teacher.data.length} 
                count={Data[1].variant} 
                icon={Data[1].icon} 
                color={Data[1].color} 
                bg={Data[1].bg}
            />
            <MotionBox
                whileHover={{y: -10, boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)'}}
                variants={cardVariant}
                animate={'animate'}
                title={Data[2].name}
                isLoading= {Student.isSuccess} 
                percentage={Student.isSuccess && Student.data.length} 
                count={Data[2].variant} 
                icon={Data[2].icon} 
                color={Data[2].color} 
                bg={Data[2].bg}
            />
            <MotionBox
                whileHover={{y: -10, boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)'}}
                variants={cardVariant}
                animate={'animate'}
                isLoading={isSuccess}
                title={Data[3].name} 
                percentage={isSuccess && data.length} 
                count={Data[3].variant} 
                icon={Data[3].icon} 
                color={Data[3].color} 
                bg={Data[3].bg}
            />

        </SimpleGrid>

        <Grid
            overflowX={{base: 'scroll', md: 'unset'}}
            // gridTemplateColumns={'2fr 1fr'}
            // gap={4}
            mt={8}
            
        >
            <GridItem>
                <Box bg={useColorModeValue('white', 'gray.800')} p={6} borderRadius={'20px'} boxShadow={'0 0 10px rgba(0, 0, 0, 0.1)'} minH={'200px'} >
                    <Flex alignItems={'center'} mb={3} justifyContent={'space-between'}>
                        <Text fontSize={'xl'} color={useColorModeValue('gray.700','white' )} fontWeight={600}> Recent Request </Text>
                        <Flex gap={3} alignItems={'center'}>
                            <Icon as={FiSearch} fontSize={'16px'}/>
                            <Icon as={FiChevronDown} fontSize={'15px'}/>
                        </Flex>
                        
                    </Flex>


                    <CustomTable columns={[]} data={[]}/>

            

                    
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

        <SimpleGrid  columns={{base: 1, sm: 2, md: 3}} gap={4} mt={8} >
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
        </SimpleGrid>


        <SimpleGrid columns={{base: 1, md: 3, sm: 1}} gap={4} mt={8} >
            

            <GridItem rounded={'20px'} bg={background} p={6}>
                <Text mb={6} fontSize={'md'} fontWeight={600}> ROLE OF USER </Text>

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
            </GridItem>


            <GridItem p={6} colSpan={2} rounded={'20px'} bg={background}>

                <Flex mb={6} justify={'space-between'} align={'center'}>
                    <Text fontSize={'md'} fontWeight={600}> ADMIN </Text>  
                    {toggle && <Button rounded={'20px'} colorScheme={Maincolor} onClick={()=>setToggle(false)}>{toggle ? 'Ajouter' : 'Annuler'}</Button>}
                </Flex>

                { toggle ?
                <Skeleton isLoaded={isSuccess}>
                    {isSuccess && data.length !== 0 ? 
                    <TableContainer>
                        <Table>
                            <Thead>
                                <Tr>
                                    <Th>User</Th>
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
                    :
                    <Flex my={10} width={'100%'} flexDir={'column'} align={'center'} justify={'center'}>
                        <Image src={image} w={'6em'} opacity={0.9} /> 
                        <Heading mt={3} fontSize={'sm'} color={'gray.400'}>No data to display</Heading>
                    </Flex>
                    }
                </Skeleton> : 
                
                <AddUser close={()=>setToggle(true)}/>
                
                }
            </GridItem>


    
        </SimpleGrid>
        
        <CustomModal
            isOpen={isOpen}
            onClose={onClose}
            title={'Delete Role'}
            isLoading={loading}
            text={modalData}
            data={Role.isSuccess && Role.data[id?.index]?.label}
            isSuccess={Role.isSuccess}
            handler={()=> handleDelete(id.current)}
        />



        
    </Box>
  )
}

export default Dashbord