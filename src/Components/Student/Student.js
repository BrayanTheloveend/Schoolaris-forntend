import React, { useCallback, useEffect, useState } from 'react'
import CustomHeading from '../Dashboard/CustomHeading'
import { Avatar, Box, Button, Flex, Grid, GridItem, IconButton, Skeleton, Tag, TagLabel, TagLeftIcon, Text, useColorModeValue, useDisclosure, useToast } from '@chakra-ui/react'
import AddStudent from './AddStudent'
import { useActiveStudentMutation, useDeleteStudentMutation, useGetStudentQuery } from '../Redux/ApiSlice'
import { useNavigate } from 'react-router-dom'
import { CheckIcon, DeleteIcon, Icon, InfoIcon, WarningIcon } from '@chakra-ui/icons'
import StudentDetails from './StudentDetails'
import CustomTable from '../Dashboard/CustomTable'
import { FiFilter, FiPlus, FiPrinter, FiSearch } from 'react-icons/fi'
import CustomModal from '../Custom/CustomModal'
import { motion } from 'framer-motion'
import { containerVariant, vert } from '../theme'
import { BiSolidShield } from 'react-icons/bi'


const Student = () => {

  const [toogle, setToogle] = useState(false) 
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [ onUpdate, setOnUpdate ] = useState(false)
  const [toogleAdd, setToogleAdd] = useState(false)
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  const textcolor = useColorModeValue('gray.600','gray.400')
  const bg = useColorModeValue('white', 'gray.800')
  const color = useColorModeValue('gray.700', 'white')
  const borderColor = useColorModeValue('#efefef', 'gray.800')
  

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
      message: 'Voulez-vous activé', 
      button: 'Activé',
      title: 'Activer un compte',
      color: 'green',
      toggle: false,
    })
  }

  const handleDelete=()=>{
    setmodalData({
      message: 'Voulez-vous supprimer definitivement', 
      button: 'Supprimer',
      title: 'Suppression',
      color: 'red',
      toggle: true,
    })
  }
  
  const handleBlock=()=>{
    setmodalData({
      message: 'Voulez-vous bloqué', 
      button: 'Bloqué',
      title: 'Bloqué un compte',
      color: 'orange',
      toggle: false,
      
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
        <Avatar size={{base: 'sm', md: 'md'}} src={`http://localhost:${process.env.REACT_APP_PORT}/image/${elt.picture}`}/>
          <Box>
            <Text fontSize={{base: 'sm', md: 'md'}} color={textcolor} noOfLines={1} fontWeight={600}>
              {elt.name}
            </Text>
            <Text fontSize={{base: 'sm', md: 'md'}} color={textcolor} noOfLines={1}>
              {elt.surname}
            </Text> 
          </Box>
        </Flex>), 
        email: <Text fontSize={{base: 'sm', md: 'md'}} noOfLines={1} fontWeight={600}> {elt.email} </Text>,   
        mobile: <Text fontSize={{base: 'sm', md: 'md'}} noOfLines={1} color={textcolor}> +237 {elt.mobile}</Text>,
        statut: <Tag size={{base: 'sm', md: 'md'}} variant='subtle' colorScheme={ elt?.statut === 0 ? 'yellow' : 'green'}>
          <TagLeftIcon boxSize='12px' as={elt?.status=== 0 ? WarningIcon : CheckIcon   } />
          <TagLabel>{ elt?.statut === 0 ? `Awaiting` : 'Activated'}</TagLabel>
        </Tag>,
        options:  
        <Flex gap={2}>
          <IconButton 
            icon={<InfoIcon/>} 
            onClick={()=> setTimeout(navigate, 0, `/student/Details/${elt.id}/${elt.subjectId}`)} 
            size={{base: 'sm', md: 'md'}} color={'blue.400'} />
          <IconButton icon={<DeleteIcon/>} size={{base: 'sm', md: 'md'}} color={'red.400'}
            onClick={()=>{
              handleDelete()
              setId({ index: data.findIndex(item => item.id === elt.id), current: elt.id})
              onOpen()
            }}
          />

           <IconButton icon={ elt.statut === 0 ? <CheckIcon/> : <BiSolidShield/> } size={{base: 'sm', md: 'md'}} color={'green.400'}
            onClick={()=>{ 
              elt.statut === 0 ? handleActive() : handleBlock()
              setId({ index: data.findIndex(item => item.id === elt.id), current: elt.id})
              onOpen()
              // setOnUpdate(true)
            }}
          /> 
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
        <CustomHeading title={'Gestions des Etudiants'} prevSection={'Etudiants'} currentSection={ toogleAdd ? 'Add Student':  'Liste des étudiants'} nextSection={ toogle ? 'Listes des étudiants' : null}/>

      
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
                    p={!toogle ? 6 : 0} borderRadius={'20px'} 
                    minH={'200px'} 
                    border={'1px solid'}
                    borderColor={borderColor}
                    >
                      {!toogle && <Flex alignItems={'center'} mb={3} justifyContent={'space-between'}>

                        <Flex alignItems={'center'} justifyContent={'center'} gap={6}>
                          <Flex gap={2} align={'center'}>
                            <Skeleton isLoaded={isSuccess} >
                              { isSuccess && <Text fontSize={'xl'} color={vert} fontWeight={600}>{data.length} </Text>}
                            </Skeleton>
                            
                          </Flex>
                        </Flex>
                        
                        <Flex gap={3} alignItems={'center'}>
                          <Icon as={FiFilter}/>
                          <Icon fontSize={'16px'} as={FiSearch}/>
                          <Button colorScheme={'green'} bg={vert} rounded={'full'} onClick={()=>setToogleAdd(true)}><FiPlus/> Ajouter</Button>
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