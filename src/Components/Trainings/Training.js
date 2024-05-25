import { Box, Text, Button, Flex, Grid, GridItem, Icon, IconButton, useColorModeValue, useDisclosure, useToast, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from '@chakra-ui/react'
import React, { useCallback, useEffect, useState } from 'react'
import CustomHeading from '../Dashboard/CustomHeading'
//import CustomGrid from '../Student/CustomGrid'
import AddTraining from './AddTraining'
import { FiChevronLeft, FiFilter, FiPlus, FiPrinter, FiSearch } from 'react-icons/fi'
import CustomTable from '../Dashboard/CustomTable'
import { useDeleteSubjectMutation, useGetSubjectQuery } from '../Redux/ApiSlice'
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { motion } from 'framer-motion'
import { Maincolor, containerVariant, formatter, vert } from '../theme'
import { listIcon } from '../theme'
import { useNavigate } from 'react-router-dom'

const Training = () => {

  const [toogle, setToogle] = useState(false) 
  const bg = useColorModeValue('white', 'gray.800')
  const text1 = useColorModeValue('gray.700', 'white')
  const textcolor = useColorModeValue('gray.600','gray.400')
  const [loading, setLoading] = useState(false) 
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [id, setId] = useState({ index: 0, current: 0})
  const [onUpdate, setOnUpdate] = useState(false)
  const navigate = useNavigate()

  // ALERTS
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

  const {
    data,
    isError,
    isSuccess,
    error,
    isLoading
  } = useGetSubjectQuery(JSON.parse(localStorage.getItem('userData'))?.token)


  const [isChecked, setIsChecked] = useState(false)
  
  const [ Data, setData ] = useState([])

  const handleChange= (e)=>{
      const { name, checked } = e.target

      if(name === 'allSelected'){
        setIsChecked(checked)
        let tempData =  Data.map(item=> { return {...item, isChecked: checked}})
        setData(tempData)
          
      }else{
        setIsChecked(checked)
        let tempData =  Data.map(item=> item.id === parseInt(name) ?  {...item, isChecked: checked} : item)
        setData(tempData)
      }
  }

//GETSTUDENTS

  useEffect(() => {

    if(isError){
      if(error.status=== 401){
        navigate('/login')
      }else{
        //console.log(error.error);
        showMessage('error', 'Server has been stopped', 'Fetch Task')
      }
      
    }else if(isSuccess){
      console.log(data);
      setData(data)
      //showMessage('success', `${data.length} items found`, 'Fetch Task')
    }
  }, [isSuccess, isError, error, isLoading, data, showMessage, navigate])


  //DELETE REQUEST

  const [DEL] = useDeleteSubjectMutation()

  const handleClick= async(id)=>{
    setLoading(true)
    await DEL(id).unwrap()
    .then(resp=>{
      showMessage('success', resp.message , 'Delete Task')
      setLoading(false)
      onClose()
    }).catch(err=>{
      showMessage('error', err.message , 'Delete Task')
      setLoading(false)
      onClose()
    })
  }


  // Columns

  const column = React.useMemo(
    () => [
      {
        Header: ' ',
        columns: [
          {
            Header: " ",
            accessor: "checkbox"
          },
          {
            Header: "Noms",
            accessor: "name"
          },
          {
            Header: "Level",
            accessor: "level"
          },
          {
            Header: "School Fees",
            accessor: "fees"
          },
          {
            Header: "Code",
            accessor: "code"
          },
          {
            Header: "Description",
            accessor: "label"
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
Data.map(elt=>{
 return(
   {
     key: elt.id,
     checkbox: <input className="form-check-input" type="checkbox" onClick={handleChange} name={elt.id} checked={elt?.isChecked || false} id="flexCheckDefault" />,
     name: 
        <Text fontSize={{base: 'sm', md: 'md'}} color={textcolor} noOfLines={2} fontWeight={600}>
          {elt.name}
        </Text>, 
      code: <Text fontSize={{base: 'sm', md: 'md'}} noOfLines={1} fontWeight={600} fontFamily= {'Poppins Light'}> # {elt.sigle} </Text>,   
      fees: <Text fontSize={{base: 'sm', md: 'md'}} noOfLines={1} fontWeight={600} color={vert} fontFamily= {'Poppins semiBold'}> {formatter.format(elt.fees)}</Text>,   
      label: <Text fontSize={{base: 'sm', md: 'md'}} noOfLines={1}  color={textcolor}>{elt.description}</Text>,
      level: <Text fontSize={{base: 'sm', md: 'md'}} noOfLines={1} fontFamily={'Poppins SemiBold'} color={textcolor}>{elt.level}</Text>,
      options:  
      <Flex gap={2}>
        {/* <IconButton 
          icon={<InfoIcon/>} 
          onClick={()=>{
            setId({...id, index: data.findIndex(item => item.id === elt.id)})
            setToogle(true)
            }} 
          size={{base: 'sm', md: 'md'}} color={'blue.400'} /> */}
        <IconButton icon={<DeleteIcon/>} size={{base: 'sm', md: 'md'}} color={'red.400'}
          onClick={()=>{
            setId({ index: data.findIndex(item => item.id === elt.id), current: elt.id})
            onOpen()
          }}
        />

        <IconButton icon={<EditIcon/>} size={{base: 'sm', md: 'md'}} color={'blue.400'}
          onClick={()=>{
            setId({ index: data.findIndex(item => item.id === elt.id), current: elt.id})
            setOnUpdate(true)
            setToogle(true)
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
      <CustomHeading title={'Specialitées'} prevSection={'Filiére'} currentSection={ toogle ? 'Add Subject':  'Listes des filiéres'} nextSection={null}/>

      {
        toogle ?
        <AddTraining close = {()=>setToogle(false)} onUpdate={onUpdate} cached={ isSuccess && data[id?.index]} /> : 

        <Grid  
        gap={4} mt={8}
        overflowX={{base: 'scroll', md: 'unset'}}

        >
          <GridItem>
              <Box bg={ !toogle && bg} p={6} borderRadius={'20px'} minH={'200px'} boxShadow={ !toogle && '0 0 10px rgba(0, 0, 0, 0.1)'}>
                <Flex mb={3} justifyContent={'space-between'}>

                  <Box display={'flex'} flexDir={'column'} gap={3}> 
                    <Flex gap={1} align={'center'}>
                      <Icon 
                      color={isChecked ? 'red.400' : 'gray.500'}
                      // color={isChecked ? 'red.400' : 'gray.500'} 
                      as={DeleteIcon}/>
                      <Text 
                        title='supprimer les elements selectionnés' 
                        mx={2} 
                        color={ isChecked  ? 'red.400' : 'gray.500'}
                        fontWeight={600}
                        cursor={'pointer'}>
                        Delete ({Data.filter(item => item?.isChecked === true ).length })
                      </Text>
                    </Flex>
           

                    
                      <Flex gap={2}>
                        <input type="checkbox"  name="allSelected" onChange={handleChange} checked={Data.filter(item => item?.isChecked !== true ).length < 1}   />
                        <Text fontSize={{base:'sm', md: 'md'}} >{'Tout selectioner'}</Text>
                      </Flex>
                    
                  </Box>
                      
                    <Flex gap={3} alignItems={'center'}>
                      
                      { !toogle && <> 
                        <Icon as={FiFilter}/>
                        <Icon fontSize={'16px'} as={FiSearch}/>
                        <Button colorScheme={'green'} 
                        bg={vert}
                        rounded={'full'}
                        color={'white'}
                        onClick={()=>{
                          setOnUpdate(false)
                          setToogle(true)}
                        }><FiPlus/> Ajouter</Button>
                      </>}

                      { !toogle?  <Icon fontSize={'16px'} as={FiPrinter}/> : <Button colorScheme={'green'} rounded={'full'}><FiPrinter/> Imprimer</Button>}
                        
                    </Flex> 
                  </Flex>
                  <CustomTable data={FormatData} columns={column} isLoading={isLoading}/>
              </Box> 
          </GridItem>
      </Grid>
      }


      <Modal isOpen={isOpen} onClose={onClose} isCentered >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader> Suppression</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text noOfLines={3} fontSize={'md'}>Voulez-vous supprimé defitivement <strong>{isSuccess && `${data[id.index]?.name} Niveau ${ isSuccess && data[id?.index]?.level}`}  </strong> ?</Text>
            </ModalBody>

            <ModalFooter>
              <Button rounded={'md'} colorScheme='blue' mr={3} onClick={onClose}>
                Annuler
              </Button>
              <Button variant='outline' isLoading={loading} rounded={'md'} colorScheme='red' onClick={()=>handleClick(id.current)}>Supprimer</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

    </Box>
  )
}

export default Training