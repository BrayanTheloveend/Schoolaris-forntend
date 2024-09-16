import { Box, Button, Flex, Grid, GridItem, Icon, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useColorModeValue, useDisclosure, useToast } from '@chakra-ui/react'
import React, { useCallback, useEffect, useState } from 'react'
import CustomHeading from '../Dashboard/CustomHeading'
import { FiFilter, FiPlus, FiSearch } from 'react-icons/fi'
import CustomTable from '../Dashboard/CustomTable'
import { DeleteIcon, EditIcon, InfoIcon } from '@chakra-ui/icons'
import { useDeleteUnitMutation, useGetUnitQuery } from '../Redux/ApiSlice'
import AddUnit from './AddUnit'
import { motion } from 'framer-motion'
import { containerVariant, vert } from '../theme'
import { useNavigate } from 'react-router-dom'

const UnitLearning = () => {
    const [toogle, setToogle] = useState(false) 
    const bg = useColorModeValue('white', 'gray.800')
    const textcolor = useColorModeValue('gray.600','gray.400')
    const [loading, setLoading] = useState(false) 
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [id, setId] = useState({ index: 0, current: 0})
    const [onUpdate, setOnUpdate] = useState(false)
    const navigate = useNavigate()

    const openModal = useDisclosure()
    const savedData = JSON.parse(localStorage.getItem('userData'))

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



  //checkbox logic
  const [ Data, setData ] = useState([])
  const [isChecked, setIsChecked] = useState(false)

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
        openModal.onOpen()
      }else{
        //console.log(error.error);
        //showMessage('error', 'Server has been stopped', 'Fetch Task')
      }
    }else if(isSuccess){
      console.log(data);
      setData(data)
      //showMessage('success', `${data.length} items found`, 'Fetch Task')
    }
  }, [isSuccess, isError, error, isLoading, data, showMessage, navigate, openModal])


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
            Header: " ",
            accessor: "checkbox"
          },
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
Data.map(elt=>{
 return(
   {
     key: elt.id,
     checkbox: <input className="form-check-input" type="checkbox" name={elt.id} onChange={handleChange} checked={elt?.isChecked || false} id="flexCheckDefault" />,
     name: 
        <Text fontSize={{base: 'sm', md: 'md'}} color={textcolor} noOfLines={2} fontWeight={500}>
          {elt.name}
        </Text>, 
      code: <Text fontSize={{base: 'sm', md: 'md'}} fontWeight={600} textAlign={'center'} >{elt.code} </Text>,   
      coef: <Text fontSize={{base: 'sm', md: 'md'}} noOfLines={1} textAlign={'center'} fontWeight={600} color={vert}> {elt.coefficient} </Text>,   
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

        <IconButton icon={<InfoIcon/>} size={{base: 'sm', md: 'md'}} color={'blue.400'}
          onClick={()=> navigate(`/unitLearning/${elt.id}/${elt.SubjectId}`)}
        />
        
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
        <CustomHeading title={'Gestions des UA'} prevSection={'Cours'} currentSection={ toogle ? 'Ajouter un cours':  'listes des cours'} nextSection={null}/>

        { !toogle ? 

        <Grid overflowX={{base: 'scroll', md: 'unset'}}  gap={4} mt={8}>
            <GridItem>
                <Box bg={bg} p={6} borderRadius={'20px'} minH={'200px'} boxShadow={'0 0 10px rgba(0, 0, 0, 0.1)'}>
                    <Flex alignItems={'center'} mb={3} justifyContent={'space-between'}>

                      <Box display={'flex'}  flexDir={'column'} gap={3} > 
                        <Flex gap={1} align={'center'}>
                          <Icon 
                          color={isChecked ? 'red.400' : 'gray.500'} 
                          as={DeleteIcon}/>
                          <Text 
                            title='supprimer les elements selectionnés' 
                            mx={2} 
                            color={ isChecked  ? 'red.400' : 'gray.500'}
                            fontWeight={600}
                            cursor={'pointer'}>
                            {Data.filter(item => item?.isChecked === true ).length } Delete
                          </Text>
                        </Flex>
            

                      
                        <Flex gap={2}>
                          <input type="checkbox"  name="allSelected" onChange={handleChange} checked={Data.filter(item => item?.isChecked !== true ).length < 1} />
                          <Text fontSize={{base:'sm', md: 'md'}} >{'Tout selectioner'}</Text>
                        </Flex>
                      
                      </Box>
                        
                      <Flex gap={3} alignItems={'center'}>
                        <Icon as={FiFilter}/>
                        <Icon fontSize={'16px'} as={FiSearch}/>
                        <Button 
                        bg={vert}
                        color={'white'}
                        rounded={'full'}
                        size={{base: 'sm', md: 'md'}}
                        colorScheme={'green'}
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

        <AddUnit close ={()=>setToogle(false)} onUpdate={onUpdate} setOnUpdate={()=>setOnUpdate(false)} cached={ data?.length > 0 ? data[id.index] : []}/> 
        }

        <Modal isOpen={isOpen} onClose={onClose} isCentered >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader> Suppression</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text noOfLines={3} fontSize={'md'}>Voulez-vous supprimé defitivement <strong>{isSuccess && `${data[id.index]?.name} Code ${data[id.index]?.code}`}  </strong> ?</Text>
            </ModalBody>

            <ModalFooter>
              <Button rounded={'md'} colorScheme='blue' mr={3} onClick={onClose}>
                Annuler
              </Button>
              <Button variant='outline' isLoading={loading} rounded={'md'} colorScheme='red' onClick={()=>handleClick(id.current)} >Supprimer</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>





        
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

export default UnitLearning