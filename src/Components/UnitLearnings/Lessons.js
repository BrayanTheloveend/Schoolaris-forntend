import { Box, Button, Checkbox, Flex, IconButton, Image, SimpleGrid, Text, useColorModeValue, useDisclosure, useToast } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import React, { useCallback, useEffect, useState } from 'react'
import CustomHeading from '../Dashboard/CustomHeading'
import { useNavigate, useParams } from 'react-router-dom'
import { useDeleteLessonGroupMutation, useDeleteLessonMutation, useGetLessonByUnitIdQuery, useGetUnitByIdQuery } from '../Redux/ApiSlice'
import LessonItems from './LessonItems'
import { vert } from '../theme'
import AddLessons from './AddLessons'
import CustomLoading from '../Dashboard/CustomLoading'
import CustomModal from '../Custom/CustomModal'
import image from '../../assets/images/Dashboard/datanotfound.png'
const Lessons = () => {

    const { id } = useParams()
    const navigate = useNavigate()
    const [show, setShow] = useState(false)
    const [loading, setLoading] = useState(false)
    const Unit = useGetUnitByIdQuery(id)
    const textColor = useColorModeValue('gray.500', 'white')
    const bgColor = useColorModeValue('white', 'gray.800')
    const [isChecked, setIsChecked] = useState(false)
    const [table, setTable]= useState([])
    const [deleteGroup] = useDeleteLessonGroupMutation()
  
    const [ Data, setData ] = useState([])
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [pos, setPos] = useState({
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


  const handleDelete=()=>{
    setmodalData({
      message: 'Voulez-vous supprimer definitivement', 
      button: 'Supprimer',
      title: 'Suppression',
      color: 'red',
      toggle: true,
    })
  }

  const [DELETE] = useDeleteLessonMutation()
  const handleClick = async(id)=>{
    setLoading(true)
    await DELETE(id).unwrap()
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



//GETUNIT
  useEffect(() => {
    if(Unit.isError){
      if(Unit.error.status=== 401){
        navigate('/login')
      }
      //console.log(error.error);
      //return showMessage('error',error.message, 'Fetch Task')
    }else if(Unit.isSuccess){
      //console.log(data);
      //showMessage('success', `${data.length} items found`, 'Fetch Task')
    }
  }, [Unit.isSuccess, Unit.isError, Unit.error, Unit.isLoading, Unit.data, showMessage, navigate])


//GETLESSON

  const {
    data,
    isLoading,
    isSuccess,
    isError, 
    error
  }= useGetLessonByUnitIdQuery(id)

  useEffect(() => {
    if(isError){
      if(error.status=== 401){
        navigate('/login')
      }
      //console.log(error.error);
      //return showMessage('error',error.message, 'Fetch Task')
    }else if(isSuccess){
      setData(data)
      //showMessage('success', `${data.length} items found`, 'Fetch Task')
    }
  }, [isSuccess, isError, error, isLoading, data, showMessage, navigate])


  const handleChange= (e)=>{
      const { name, checked } = e.target

      if(name === 'allSelected'){
        setIsChecked(checked)
        let tempData =  Data.map(item=> { return {...item, isChecked: checked}})
        setTable(tempData.map(item=> item.isChecked && parseInt(item.id)))
        setData(tempData)
          
      }else{
        setIsChecked(checked)
        let tempData =  Data.map(item=> item.id === parseInt(name) ?  {...item, isChecked: checked} : item)
        setTable(tempData.map(item=> item.isChecked && parseInt(item.id)))
        setData(tempData)
      }
  }


  //DELETE LESSON GROUP

  const handleDeleteGroup =()=>{

    const formData = new FormData();
    for ( let key in table ) {
      formData.append('lessons', key);
    }

    setLoading(true)
    deleteGroup(formData).unwrap()
    .then(resp=>{ 
      setLoading(false)
      showMessage('success', resp.message , 'Delete Task')
    })
    .catch(err=> {
      setLoading(false)
      showMessage('error',err.message, 'Fetch Task')
    })
  }




  return (
    <Box 
    as={motion.div}
    initial={{ y: '100vh' }}
    animate={{ y: 0}}>

        <CustomHeading title={Unit.isSuccess ? Unit.data.name : 'Wait a moment'} prevSection={'Cours'} currentSection={'listes des cours'} nextSection={'Liste des Lessons'}/>
      
        { !show ? 
          
          <>
            <Flex justify={'space-between'} align={'center'} mt={10} bg={bgColor} p={4}>
            <Flex gap={2} align={'center'}>
              <Checkbox name="allSelected" onChange={handleChange} isChecked={Data.filter(item => item?.isChecked !== true ).length < 1}  />
              <Text fontSize={'md'} fontWeight={600}> Tout selectionnés </Text>
            </Flex>
            

            <Flex gap={4} align={'center'}>
              <Text fontSize={'md'} color={textColor}><strong>{ Data.filter(item => item?.isChecked === true ).length }</strong> elements</Text>
              <Button isLoading={loading} colorScheme='red' isDisabled={!isChecked} onClick={handleDeleteGroup}>
                Supprimer
              </Button>
              <Button colorScheme='green' bg={vert} onClick={()=>setShow(true)}>
                Ajouter
              </Button>
            </Flex>
          </Flex>

          {
            isLoading ?  <CustomLoading/> : Data.length === 0 ? 
            
            <Flex minH={'350px'} justify={'center'} align={'center'} flexDir={'column'}>
              <Image src={image} maxW={{base: '6em', md: '8em'}} opacity={0.9} /> 
                <Text mt={3} textAlign={'center'} fontSize={'md'} color={'gray.500'}>
                  Aucune données <br /> disponibles
                </Text>
            </Flex> 
            : 
            <SimpleGrid 
              mt={14}
              columns={{ base: 1, sm: 2,  md: 4 }} 
              spacing={{ base: 5, lg: 8 }}
            >
            {
              isSuccess && Data.map(elt=> <LessonItems key={elt.id} data={elt} onChange={handleChange} checked={elt?.isChecked || false}
                handleDelete={()=>{
                setPos({ index: Data.findIndex(item => item.id === elt.id), current: elt.id})
                handleDelete()
                onOpen()
              }} />)
            }

          </SimpleGrid>
          }


      </> : <AddLessons setShow={setShow}/>
      
      }

        <CustomModal 
          isOpen={isOpen} 
          onClose={onClose} 
          text={modalData} 
          title={modalData.title}
          isLoading={loading} 
          data={isSuccess && Data[pos?.index]?.label}
          isSuccess={isSuccess}
          handler={()=>handleClick(pos.current) }
        />
    </Box>
  )
}

export default Lessons
