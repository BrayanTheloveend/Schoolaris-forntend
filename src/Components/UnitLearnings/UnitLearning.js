import { Box, Button, Flex, Grid, GridItem, Icon, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useColorModeValue, useDisclosure, useToast } from '@chakra-ui/react'
import React, { useCallback, useEffect, useState } from 'react'
import CustomHeading from '../Dashboard/CustomHeading'
import { FiChevronLeft, FiFilter, FiPlus, FiPrinter, FiSearch } from 'react-icons/fi'
import CustomTable from '../Dashboard/CustomTable'
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { useDeleteUnitMutation, useGetUnitQuery } from '../Redux/ApiSlice'
import AddUnit from './AddUnit'
import { motion } from 'framer-motion'
import { Maincolor, containerVariant, listIcon } from '../theme'
import { useNavigate } from 'react-router-dom'

const UnitLearning = () => {
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
  } = useGetUnitQuery()


//GETUNIT

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
      //showMessage('success', `${data.length} items found`, 'Fetch Task')
    }
  }, [isSuccess, isError, error, isLoading, data, showMessage])


  //DELETE REQUEST

  const [DEL] = useDeleteUnitMutation()

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
            Header: "Noms",
            accessor: "name"
          },
          {
            Header: "Code",
            accessor: "code"
          },
          {
            Header: "Coefficient",
            accessor: "coef"
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
data.map(elt=>{
 return(
   {
     key: elt.id,
     name: (
      <Flex gap={3} align={'center'}>
        <ion-icon name={`${listIcon[Math.floor(Math.random() * (listIcon.length))]}`}></ion-icon>
        <Text fontSize={{base: 'sm', md: 'md'}} color={textcolor} noOfLines={2} fontWeight={600}>
          {elt.name}
        </Text>
      </Flex>), 
      code: <Text fontSize={{base: 'sm', md: 'md'}} noOfLines={1} fontWeight={600} fontFamily= {'Poppins Light'}> # {elt.code} </Text>,   
      coef: <Text fontSize={{base: 'sm', md: 'md'}} noOfLines={1} fontWeight={600} color={'#56ace5'} fontFamily= {'Poppins semiBold'}> {elt.coefficient} Credit </Text>,   
      label: <Text fontSize={{base: 'sm', md: 'md'}} noOfLines={1}  color={textcolor}>{elt.description}</Text>,
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
        <CustomHeading title={'Manage Classes'} prevSection={'Classes'} currentSection={ toogle ? 'Add Classes':  'List of Classes'} nextSection={null}/>

        { !toogle ? 

        <Grid overflowX={{base: 'scroll', md: 'unset'}}  gap={4} mt={8}>
            <GridItem>
                <Box bg={bg} p={6} borderRadius={'20px'} minH={'200px'} boxShadow={'0 0 10px rgba(0, 0, 0, 0.1)'}>
                    <Flex alignItems={'center'} mb={3} justifyContent={'space-between'}>

                        <Flex alignItems={'center'} justifyContent={'center'} gap={6}>
                            <Flex gap={2} align={'center'}>
                            <Text fontSize={'xl'} color={text1} fontWeight={600}>All Classes</Text>
                            </Flex>
                        </Flex>
                        
                        <Flex gap={3} alignItems={'center'}>
                            <Icon as={FiFilter}/>
                            <Icon fontSize={'16px'} as={FiSearch}/>
                            <Button colorScheme={Maincolor} rounded={'full'} 
                            onClick={()=>{
                              setToogle(true)
                              setOnUpdate(false)
                            }}>

                            <FiPlus/> Ajouter</Button>
                        </Flex> 
                    </Flex>
                    <CustomTable data={FormatData} columns={column} isLoading={isLoading}/>
                </Box> 
            </GridItem>
        </Grid> :

        <AddUnit close = {()=>setToogle(false)} onUpdate={onUpdate} setOnUpdate={()=>setOnUpdate(false)} cached={ data?.length > 0 ? data[id.index] : []}/> 
        }

        <Modal isOpen={isOpen} onClose={onClose} isCentered >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader> Delete Training</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text noOfLines={3} fontSize={'md'}>Are you sure to delete definitively <strong>{isSuccess && `${data[id.index]?.name} Code ${data[id.index]?.code}`}  </strong> ?</Text>
            </ModalBody>

            <ModalFooter>
              <Button rounded={'md'} colorScheme='blue' mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button variant='outline' isLoading={loading} rounded={'md'} colorScheme='red' onClick={()=>handleClick(id.current)} >Delete</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

    </Box>
  )
}

export default UnitLearning