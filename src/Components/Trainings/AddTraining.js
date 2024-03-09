import React, { useCallback, useEffect, useState } from 'react'
import { Box, Button, ButtonGroup, Flex, FormControl, FormHelperText, FormLabel, Grid, GridItem, Input, Text, useColorModeValue, useToast } from '@chakra-ui/react'
import bg2 from '../../assets/images/bgteacher.webp' 
import { FiBookmark,  FiCornerUpRight, FiGitCommit } from 'react-icons/fi'
import { BiChalkboard} from 'react-icons/bi'
import { useAddSubjectMutation, useUpdateSubjectMutation } from '../Redux/ApiSlice'



const AddTraining = ({close, onUpdate, cached}) => {


  const [payload, setPayload] = useState({
    name: '',
    sigle: '',
    description: '',
    level: '',
    fees: ''
  })
  const [loading, setLoading] = useState(false)

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

  const [ADD] = useAddSubjectMutation()
  const [UPDATE] = useUpdateSubjectMutation()


  //Input Validation and POST REQUEST

  const [validInput, setValidInput] = useState({
    name: false,
    sigle: false,
    description: false,
    level: false,
    fees: false
  })


  const handleSubmit = (e)=>{
    e.preventDefault()

    if(!payload.name){
      setValidInput({ 
        name: true,
        sigle: false,
        description: false,
        level: false,
        fees: false
      })
    }else if(!payload.sigle){
      setValidInput({ 
        name: false,
        sigle: true,
        description: false,
        level: false,
        fees: false
      })
    }else if(!payload.description){
      setValidInput({ 
        name: false,
        sigle: false,
        description: true,
        level: false,
        fees: false
      })
    }else if(!payload.level ){
      setValidInput({ 
        name: false,
        sigle: false,
        description: false,
        level: true,
        fees: false
      })
    }else if(!payload.fees){
      setValidInput({ 
        name: false,
        sigle: false,
        description: false,
        level: false,
        fees: true
      })
    }
    // POST REQUEST  
    else {
      setValidInput({ 
        name: false,
        sigle: false,
        description: false,
        level: false,
        fees: false
      })
      setLoading(true);

      ADD(payload).unwrap()
      .then(resp =>{
        showMessage('success', resp.message, 'Add Task');
        setLoading(false);
        setPayload({
          name: '',
          sigle: '',
          description: '',
          level: '',
          fees: ''
        })
        close()

      })
      .catch(err=>{
        showMessage('error', err.message, 'Add Task', 7000, 'top-center');
        setLoading(false);
      })
    }
  }


  //UPDATE REQUEST

  useEffect(() => {
  
    if(onUpdate){
      setPayload({
      name: cached?.name,
      sigle: cached?.sigle,
      description: cached?.description,
      level: cached?.level,
      fees: cached?.fees,
    })
  }
  }, [onUpdate, cached?.name, cached?.sigle, cached?.level, cached?.description, cached?.fees])

  const handleEdit=()=>{
    setLoading(true);

    UPDATE({...payload, id: cached.id}).unwrap()
    .then(resp =>{
      showMessage('success', resp.message, 'Update Task');
      setLoading(false);
      setPayload({
        name: '',
        sigle: '',
        description: '',
        level: '',
        fees: ''
      })
      close()
    })
    .catch(err=>{
      showMessage('error', err.data.message, 'Update Task', 7000, 'top-center');
      setLoading(false);
    })
  }


  return (
    <Grid justifyContent={'center'} gridTemplateColumns={'500px'} mt={8}>
        <GridItem bg={useColorModeValue('white', 'gray.800')} minH={'300px'} pb={6} borderRadius={'20px'}  boxShadow={'0 0 10px rgba(0, 0, 0, 0.1)'}>
          <Flex w={'full'} h={'50px'} 
          justifyContent={'center'} 
          alignItems={'center'} 
          bgImage={bg2} 
          position={'relative'}
          bgPosition={'center'} 
          borderTopLeftRadius={'20px'} 
          borderTopRightRadius={'20px'}
          _before={{
            display: 'block',
            position: 'absolute',
            content: "''",
            width: '100%',
            top: 0,
            bottom: 0,
            //bg: 'blue.400',
            bgGradient: 'linear-gradient(-135deg, #c850c0, #4158d0)',
            opacity: 0.7,
            borderTopLeftRadius: '20px',
            borderTopRightRadius:'20px',
          }}
          >
           <Text zIndex={10} fontSize={'2xl'} fontWeight={600} fontFamily={'Poppins semibold'} textAlign={'center'} color={'white'}>Training</Text> 
        </Flex>

          <Box p={6}>
            <FormControl>
              <FormLabel gap={2} display={'flex'} alignItems={'center'}><FiBookmark/> Name</FormLabel>
              <Input type='text' onChange={e =>setPayload({...payload, name: e.target.value })} value={payload.name} placeholder='Training Name' minW={'300px'} rounded={'full'}/>
              { validInput.name && <FormHelperText color={'red.400'}> This field is required! </FormHelperText>}
            </FormControl>

            <Flex align={'center'} justify={'space-between'} mt={2} gap={2}>
              <FormControl>
                <FormLabel gap={2} display={'flex'} alignItems={'center'}><FiBookmark/> Level</FormLabel>
                <Input type='text' onChange={e =>setPayload({...payload, level: e.target.value })} value={payload.level} placeholder='Mention level' rounded={'full'}/>
                { validInput.level && <FormHelperText color={'red.400'}> This field is required! </FormHelperText>}
              </FormControl>

              <FormControl>
                <FormLabel gap={2} display={'flex'} alignItems={'center'}><BiChalkboard/> Sigle</FormLabel>
                <Input type='text' onChange={e =>setPayload({...payload, sigle: e.target.value })} value={payload.sigle} placeholder='Sigle' rounded={'full'}/>
                { validInput.sigle && <FormHelperText color={'red.400'}> This field is required! </FormHelperText>}
              </FormControl>
            </Flex>

            <FormControl mt={2}>
              <FormLabel gap={2} display={'flex'} alignItems={'center'}><FiCornerUpRight/> School fees</FormLabel>
              <Input type='number' placeholder='fees for 1 year' onChange={e =>setPayload({...payload, fees: e.target.value })} value={payload.fees} rounded={'full'}/>
              { validInput.fees && <FormHelperText color={'red.400'}> This field is required! </FormHelperText>}
            </FormControl>

            <FormControl mt={2}>
              <FormLabel gap={2} display={'flex'} alignItems={'center'}><FiGitCommit/>Label</FormLabel>
              <Input type='text' placeholder='Add description here' onChange={e =>setPayload({...payload, description: e.target.value })} value={payload.description} minW={'300px'} rounded={'full'}/>
              { validInput.description && <FormHelperText color={'red.400'}> This field is required! </FormHelperText>}
            </FormControl>
                
          </Box>
              
          <ButtonGroup spacing='6' mt={8} justifyContent={'center'} w={"full"}>
            <Button colorScheme='blue' w={'30%'} isLoading={loading} rounded={'full'} onClick={ onUpdate ? handleEdit : handleSubmit}>Save</Button>
            <Button rounded={'full'} w={'30%'} onClick={close}>Cancel</Button>
          </ButtonGroup>

        </GridItem>
    </Grid>
  )
}

export default AddTraining