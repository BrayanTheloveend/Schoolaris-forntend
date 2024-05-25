import React, { useCallback, useEffect, useState } from 'react'
import { Box, Button, ButtonGroup, Flex, FormControl, FormHelperText, FormLabel, Grid, GridItem, Icon, Input, Text, useColorModeValue, useToast } from '@chakra-ui/react'
import bg2 from '../../assets/images/bgteacher.webp' 
import { FiArrowUp, FiBookmark,  FiCornerUpRight, FiGitCommit } from 'react-icons/fi'
import { BiChalkboard} from 'react-icons/bi'
import { useAddSubjectMutation, useUpdateSubjectMutation } from '../Redux/ApiSlice'
import { vert } from '../theme'



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
    <Grid justifyContent={'center'} gridTemplateColumns={'400px'} mt={8}>
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
            bgGradient: 'linear-gradient(-135deg,  #010101, #60c94c)',
            opacity: 0.7,
            borderTopLeftRadius: '20px',
            borderTopRightRadius:'20px',
          }}
          >
           <Text zIndex={10} fontSize={'xl'} fontWeight={600} fontFamily={'Poppins semibold'} textAlign={'center'} color={'white'}>Nouvelle formation</Text> 
        </Flex>

          <Box p={6}>
            <FormControl>
              <FormLabel gap={2} display={'flex'} alignItems={'center'}> <Icon color={vert} as={FiBookmark}/>Noms</FormLabel>
              <Input type='text' onChange={e =>setPayload({...payload, name: e.target.value })} value={payload.name} placeholder='Training Name' minW={'300px'} />
              { validInput.name && <FormHelperText color={'red.400'}> This field is required! </FormHelperText>}
            </FormControl>

            <Flex align={'center'} justify={'space-between'} mt={2} gap={2}>
              <FormControl>
                <FormLabel gap={2} display={'flex'} alignItems={'center'}><Icon color={vert} as={FiArrowUp}/>Niveau</FormLabel>
                <Input type='text' onChange={e =>setPayload({...payload, level: e.target.value })} value={payload.level} placeholder='Mention level' />
                { validInput.level && <FormHelperText color={'red.400'}> This field is required! </FormHelperText>}
              </FormControl>

              <FormControl>
                <FormLabel gap={2} display={'flex'} alignItems={'center'}><Icon color={vert} as={BiChalkboard}/> Sigle</FormLabel>
                <Input type='text' onChange={e =>setPayload({...payload, sigle: e.target.value })} value={payload.sigle} placeholder='Sigle' />
                { validInput.sigle && <FormHelperText color={'red.400'}> This field is required! </FormHelperText>}
              </FormControl>
            </Flex>

            <FormControl mt={2}>
              <FormLabel gap={2} display={'flex'} alignItems={'center'}><Icon color={vert} as={FiCornerUpRight}/> Frais de scholarité</FormLabel>
              <Input type='number' placeholder='fees for 1 year' onChange={e =>setPayload({...payload, fees: e.target.value })} value={payload.fees} />
              { validInput.fees && <FormHelperText color={'red.400'}> This field is required! </FormHelperText>}
            </FormControl>

            <FormControl mt={2}>
              <FormLabel gap={2} display={'flex'} alignItems={'center'}> <Icon color={vert} as={FiGitCommit}/>Libellé</FormLabel>
              <Input type='text' placeholder='Add description here' onChange={e =>setPayload({...payload, description: e.target.value })} value={payload.description} minW={'300px'} />
              { validInput.description && <FormHelperText color={'red.400'}> This field is required! </FormHelperText>}
            </FormControl>
                
          </Box>
              
          <ButtonGroup spacing='6' mt={8} justifyContent={'center'} w={"full"}>
            <Button  w={'30%'} onClick={close}>Annuler</Button>
            <Button colorScheme='green' bg={vert} w={'30%'} isLoading={loading}  onClick={ onUpdate ? handleEdit : handleSubmit}>Enregistrer</Button>
            
          </ButtonGroup>

        </GridItem>
    </Grid>
  )
}

export default AddTraining