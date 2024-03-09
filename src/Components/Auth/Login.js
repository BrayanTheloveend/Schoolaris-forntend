import { Button, Checkbox, Flex, FormControl, FormHelperText, Grid, GridItem, HStack, Heading, Input, InputGroup, InputRightElement, Stack, Text, useColorModeValue, useToast } from '@chakra-ui/react'
import React, { useCallback, useState } from 'react'
import img from '../../assets/Preparing.jpg'
import { FaEye, FaEyeSlash, FaUser } from 'react-icons/fa'
import { useLoginMutation } from '../Redux/ApiSlice'
import { useNavigate } from 'react-router-dom'

const Login = () => {

    const [passwordType, setPasswordType] = useState(true)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const [valid, setValid] = useState({
        email: false,
        password: false
    })

    // window.addEventListener(onkeydown, alert('press'), false )
    const [message, setMessage] = useState({
        email: 'This fields is required',
        password: 'This fields is required'
    })
    const [payload, setPayload] = useState({
        email: '',
        password: ''
    })

    //GETSTUDENTS AND NOTE

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

    const [LOG] = useLoginMutation()


const handleSubmit=()=>{
    if(!payload.email){
        setMessage({
            ...message,
            email: 'This field is required'
        })
        setValid({
            email: true,
            password: false
        })
        
    }else if(!payload.password){
        
        setMessage({
            ...message,
            password: 'This field is required'
        })
        setValid({
            email: false,
            password: true
        })
    }else{
        setValid({
            email: false,
            password: false
        })
        setLoading(true);
    
    LOG(payload).unwrap()
    .then(resp =>{
        setLoading(false);
        setPayload({
            email: '',
            password: ''
        })
        localStorage.setItem('userData', JSON.stringify(resp))
        console.log(resp);
        setTimeout(navigate, 0, '/')
    })
    

    .catch(err=>{
        setLoading(false);
        console.log(err);
        if(err.status === 404){
            setMessage({...message, email: err.data.message})
            setValid({password: false, email: true})

        }else if(err.data.message.includes('password')){
            setMessage({...message, password: err.data.message})
            setValid({ email: false, password: true})
        }
        else{
            showMessage('error', 'Sorry something went Wrong... Try later', 'Login', 7000, 'botton-riht');
        }
        
    })

    }
}

  return (
    <Flex w={'100vw'}  position={'relative'}
    _before={{
      display: 'block',
      position: 'absolute',
      content: "''",
      width: '100%',
      top: 0,
      bottom: 0,
      bg: 'blue.400',
      bgGradient: 'linear-gradient(-135deg, #c850c0, #4158d0)',
      opacity: 0.7,
    }} h={'100vh'} justify={'center'} align={'center'} bg={`url(${img})`} bgSize={'cover'}>

        <Grid gridTemplateColumns={'350px'} gap={2} gridRow={'300px'} minH={'400px'}>
            <GridItem border={'2px solid rgba(255, 255, 255, .2)'} backdropFilter={'blur(20px)'} bg={'rgba(255, 255, 255, .2)'} boxShadow={ '0 0 12px rgba(0, 0, 0, 0.5)'} rounded={'20px'}  p={6} >
                <Heading fontSize={'3xl'} color={'white'} textAlign={'center'} my={2}>Sign In</Heading>
                <Text textAlign={'center'} color={'white'}>We are really happy to see you again.</Text>
            
                <FormControl mt={8} id="email">
                    <InputGroup>
                        <Input onChange={e=> setPayload({...payload, email: e.target.value})} type="email" placeholder='username or email' _placeholder={{color: 'gray.400'}} bg={'white'} rounded={'4px'} h={'42px'} _focusVisible={{
                            bg: useColorModeValue('white', 'gray.600')
                        }}
                         />
                        <InputRightElement mt={1} color={'gray.400'}>
                            <FaUser/>
                        </InputRightElement>
                    </InputGroup>
                    {valid.email && <FormHelperText color={'red.500'}>{message.email} </FormHelperText>}
                </FormControl>
                <FormControl mt={2} id="password">
                    <InputGroup>
                        <Input onChange={e=> setPayload({...payload, password: e.target.value})} type={passwordType ? 'password': 'text'} placeholder='password' bg={'white'} rounded={'4px'} h={'42px'} _placeholder={{color: 'gray.400'}} _focusVisible={{
                            bg: useColorModeValue('white', 'gray.600')
                        }}/>
                        <InputRightElement color={'gray.400'} mt={1} onClick={()=>setPasswordType(!passwordType)}>
                            { passwordType ? <FaEye/> : <FaEyeSlash/>}
                        </InputRightElement>
                    </InputGroup>
                    { valid.password && <FormHelperText color={'red.500'}>{message.password}</FormHelperText>}
                </FormControl>
                <Stack spacing={6} mt={2}>
                    <Stack
                    direction={{ base: 'column', sm: 'row' }}
                    align={'start'}
                    mt={2}
                    justify={'space-between'}>
                    <Checkbox color={'white'}>Remember me</Checkbox>
                    <Text color={'blue.500'}>Forgot password?</Text>
                    </Stack>
                    <Button isLoading={loading} onClick={handleSubmit} colorScheme={'blue'} variant={'solid'}>
                    Sign in
                    </Button>

                    <HStack justifyContent={'center'}>
                        <Text color={'white'}>haven't an Account ?</Text>
                        <Text color={'blue.500'}>Sign up</Text>
                    </HStack>
                </Stack>
                
            </GridItem>
        </Grid>

    </Flex>
  )
}

export default Login