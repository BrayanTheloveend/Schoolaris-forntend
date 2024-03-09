import React, { useCallback, useEffect, useState } from 'react'
import CustomHeading from '../Dashboard/CustomHeading'
import { Avatar, Box, Button, Flex, Grid, GridItem, IconButton, Tag, TagLabel, TagLeftIcon, Text, useColorModeValue, useDisclosure, useToast } from '@chakra-ui/react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import AddStudent from './AddStudent'
import { useActiveStudentMutation, useDeleteStudentMutation, useGetStudentQuery } from '../Redux/ApiSlice'
import { useNavigate } from 'react-router-dom'
import { CheckIcon, DeleteIcon, Icon, InfoIcon, WarningIcon } from '@chakra-ui/icons'
import StudentDetails from './StudentDetails'
import CustomTable from '../Dashboard/CustomTable'
import { FiChevronLeft, FiFilter, FiPlus, FiPrinter, FiSearch } from 'react-icons/fi'
import CustomModal from '../Custom/CustomModal'
import { motion } from 'framer-motion'
import { Maincolor, containerVariant } from '../theme'


const Student = () => {

  const [toogle, setToogle] = useState(false) 
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [ onUpdate, setOnUpdate ] = useState(false)
  const [toogleAdd, setToogleAdd] = useState(false)
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  const textcolor = useColorModeValue('gray.600','gray.400')
  const bg = useColorModeValue('white', 'gray.800')
  const text1 = useColorModeValue('gray.700', 'white')
  

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


  //GET REQUEST

  const {
    data,
    isError,
    isSuccess,
    error,
    isLoading
  } = useGetStudentQuery(JSON.parse(localStorage.getItem('userData'))?.token)

  useEffect(() => {
    if(isError){
      if(error.status=== 401){
        navigate('/login')
      }else{
        //console.log(error.error);
        showMessage('error', 'Server has been stopped', 'Fetch Task')
      }
    }else if(isSuccess){
      //console.log(data);
      //showMessage('success', `${data.length} items found`, 'Fetch Task')
    }
  }, [isSuccess, isError, error, isLoading, data, navigate, showMessage])

  //DELETE REQUEST

  const [DEL] = useDeleteStudentMutation()

  const handleClick= async(id)=>{
    setLoading(true)
    await DEL(id).unwrap()
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

  //ACTIVATE

  const handleActive=()=>{
    setmodalData({
      message: 'Are you sure to activate', 
      button: 'Activate',
      title: 'Activate Student',
      color: 'green',
      toggle: false,
    })
  }

  const handleDelete=()=>{
    setmodalData({
      message: 'Are you sure to delete definitively', 
      button: 'Delete',
      title: 'Delete Student',
      color: 'red',
      toggle: true,
    })
  }


  const [ACTIVE] = useActiveStudentMutation()

  const Activate= async(id)=>{
    setLoading(true)
    ACTIVE(id).unwrap()
    .then(resp=>{
      setLoading(false)
      onClose()
      showMessage('success', resp.message , 'Add Task')
    
    }).catch(err=>{
      setLoading(false)
      onClose()
      showMessage('error', err.message , 'Add Task')
    })
  }
  
  



  // Columns

  const column = React.useMemo(
      () => [
        {
          Header: ' ',
          columns: [
            {
              Header: "Noms",
              accessor: "name"
            },
            {
              Header: "Courriel",
              accessor: "email"
            },
            {
              Header: "Mobile",
              accessor: "mobile"
            },
            {
              Header: "Statut",
              accessor: "statut"
            },
            
            {
              Header: "Options",
              accessor: "options"
            },
          ]
        }
      ],
      []
    );

  //Format data

  const FormatData = isSuccess ?
  data.map(elt=>{
   return(
     {
       key: elt.id,
       name: (
       <Flex gap={3}>
        <Avatar size={{base: 'sm', md: 'md'}} src={`http://localhost:3000/image/${elt.picture}`}/>
          <Box>
            <Text fontSize={{base: 'sm', md: 'md'}} color={textcolor} noOfLines={1} fontWeight={600}>
              {elt.name}
            </Text>
            <Text fontSize={{base: 'sm', md: 'md'}} color={textcolor} noOfLines={1}>
              {elt.surname}
            </Text> 
          </Box>
        </Flex>), 
        email: <Text fontSize={{base: 'sm', md: 'md'}} noOfLines={1} fontWeight={600} color={'blue.400'} fontFamily= {'Poppins Light'}> {elt.email} </Text>,   
        mobile: <Text fontSize={{base: 'sm', md: 'md'}} noOfLines={1} fontFamily={'Poppins SemiBold'} color={textcolor}> +237 {elt.mobile}</Text>,
        statut: <Tag size={{base: 'sm', md: 'md'}} variant='subtle' colorScheme={ elt?.statut === 0 ? 'yellow' : 'green'}>
          <TagLeftIcon boxSize='12px' as={elt?.status=== 0 ? WarningIcon : CheckIcon   } />
          <TagLabel>{ elt?.statut === 0 ? `Awaiting` : 'Activated'}</TagLabel>
        </Tag>,
        options:  
        <Flex gap={2}>
          <IconButton 
            icon={<InfoIcon/>} 
            onClick={()=>{
              setId({...id, index: data.findIndex(item => item.id === elt.id)})
              setToogle(true)
              }} 
            size={{base: 'sm', md: 'md'}} color={'blue.400'} />
          <IconButton icon={<DeleteIcon/>} size={{base: 'sm', md: 'md'}} color={'red.400'}
            onClick={()=>{
              handleDelete()
              setId({ index: data.findIndex(item => item.id === elt.id), current: elt.id})
              onOpen()
            }}
          />

          { elt.statut === 0 && <IconButton icon={<CheckIcon/>} size={{base: 'sm', md: 'md'}} color={'green.400'}
            onClick={()=>{ 
              handleActive()
              setId({ index: data.findIndex(item => item.id === elt.id), current: elt.id})
              onOpen()
              // setOnUpdate(true)
            }}
          /> }
        </Flex>
        }
      )
    }) : [];

  return (
    <Box
      as={motion.div}
      variants={containerVariant}
      initial={'hidden'}
      animate={'visible'}
    >
        <CustomHeading title={'Manage Students'} prevSection={'Student'} currentSection={ toogleAdd.one ? 'Add Student':  'Listy of students'} nextSection={ toogle.one ? 'Student Details' : null}/>

        <Tabs mt={10} colorScheme={Maincolor} >
            <TabList>
              <Tab>Grade 1</Tab>
              <Tab>Fess</Tab>
              <Tab>Files</Tab>
            </TabList>

            <TabPanels>

                {/* Level One */}

                <TabPanel >
                  {
                    toogleAdd  ? 
                    <AddStudent 
                      close = {()=>setToogleAdd(false)} 
                      onUpdate={onUpdate} 
                      cached={ isSuccess && data[id.index]} 
                    /> 
                    : 

                    <Grid mt={8} overflowX={{base: toogle===false ? 'scroll' : 'unset', md: 'unset'}}>
                      <GridItem>
                          <Box 
                            bg={ !toogle && bg} 
                            p={6} borderRadius={'20px'} 
                            minH={'200px'} 
                            boxShadow={ !toogle && '0 0 10px rgba(0, 0, 0, 0.1)'}
                            >
                             {!toogle && <Flex alignItems={'center'} mb={3} justifyContent={'space-between'}>

                                <Flex alignItems={'center'} justifyContent={'center'} gap={6}>
                                  <Flex gap={2} align={'center'}>
                                    <Text fontSize={'xl'} color={text1} fontWeight={600}>All Student</Text>
                                  </Flex>
                                </Flex>
                                
                                <Flex gap={3} alignItems={'center'}>
                                  <Icon as={FiFilter}/>
                                  <Icon fontSize={'16px'} as={FiSearch}/>
                                  <Button colorScheme={Maincolor} rounded={'full'} onClick={()=>setToogleAdd(true)}><FiPlus/> Ajouter</Button>
                                  <Icon fontSize={'16px'} as={FiPrinter}/> 
                                </Flex> 
                              </Flex>}

                              {
                                toogle ? <StudentDetails data={data[id.index]} setToogle={setToogle} /> : <CustomTable data={FormatData} columns={column} isLoading={isLoading}/>
                              }
                              
                          </Box> 
                      </GridItem>
                  </Grid>
                    
                  }
                </TabPanel>

                {/* Level Two */}

                <TabPanel>
                  
                </TabPanel>

                {/* Level Three */}

                <TabPanel>
                </TabPanel>
            </TabPanels>
        </Tabs>


        <CustomModal 
          isOpen={isOpen} 
          onClose={onClose} 
          text={modalData} 
          title={modalData.title}
          isLoading={loading} 
          data={isSuccess && data[id?.index]?.email}
          isSuccess={isSuccess}
          handler={()=>{ modalData.toggle ? handleClick(id.current) : Activate(id.current)}}
        />
    </Box>
  )
}

export default Student