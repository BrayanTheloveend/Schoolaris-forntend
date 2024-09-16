import { Box, Button, Checkbox, Flex, FormControl, FormHelperText, Grid, GridItem, HStack, Heading, Input, InputGroup, InputRightElement, Link, Stack, Text, useColorModeValue, useToast } from '@chakra-ui/react'
import React, { useCallback, useEffect, useState } from 'react'
import img from '../../assets/Preparing.jpg'
import { FaEye, FaEyeSlash, FaUser } from 'react-icons/fa'
import { useLoginMutation, useSendCodeMutation, useVerifyMutation } from '../Redux/ApiSlice'
import { NavLink, useNavigate } from 'react-router-dom'
import { vert } from '../theme'
import OTPInput from 'react-otp-input'

const Login = () => {

    const [passwordType, setPasswordType] = useState(true);
    const [loading, setLoading] = useState(false);
    const [shown, setShown] = useState(true);
    const inputbg = useColorModeValue('white', 'gray.600');
    const [isDisabled, setDisabled]= useState(false)

    const [otp, setOtp] = useState('')
    const navigate = useNavigate()
    const [valid, setValid] = useState({
        email: false,
        password: false,
        otp: false,
    })

    // window.addEventListener(onkeydown, alert('press'), false )
    const [message, setMessage] = useState({
        email: 'This fields is required',
        password: 'This fields is required',
        otp: ''
    })
    const [payload, setPayload] = useState({
        email: '',
        password: ''
    })
    useEffect(()=>{
        if(otp.length !== 6){
            setDisabled(true)
        }else{
            setDisabled(false)
        }
    },[otp])


    const [VERIFY] = useVerifyMutation()

    const handleVerify =()=>{
        setLoading(true)
        setValid(false)
        VERIFY({...payload, code: otp}).unwrap()
        .then(resp =>{ 
            setLoading(false);
            showMessage('success', resp?.message , 'Activation')
            setShown(true)
        })
        .catch(err=>{
            if(err.status === 403){
                setLoading(false);
                setMessage({...message, otp: err?.data?.message})
                setValid({...valid, otp: true})
            }else{
                setLoading(false);
                showMessage('error', err?.data?.message , 'Activation')

            }
        })
    }

    const [CODE]= useSendCodeMutation()

    const handleSendCode = ()=>{
        setLoading(true)
        CODE(payload).unwrap()
        .then(resp => {
            setLoading(false)
            //showMessage('error', resp?.message , 'Activation')
        }).catch(err => {
            setLoading(false)
            showMessage('error', err?.data?.message , 'Login')
        });
    }
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
            ...valid,
            email: false,
            password: true,
        })
    }else{
        setValid({
            ...valid,
            email: false,
            password: false
        })
        setLoading(true);
    
 LOG(payload).unwrap()
 .then(resp =>{ 
     setLoading(false);
     localStorage.setItem('userData', JSON.stringify(resp))
        
     if((resp.roleName !== 'STUDENT') && (resp.roleName !== 'TEACHER')){
         setTimeout(navigate, 0, '/dash')
     }else{
         setTimeout(navigate, 0, '/profile')
     }
 })

 .catch(err=>{
     setLoading(false);
     console.log(err);
     if(err.status === 404){
         setMessage({...message, email: err?.data?.message})
         setValid({password: false, email: true})

     }else if(err.status === 403){

         if(err.data.message?.includes('mot de passe')){

             setMessage({...message, password: err?.data?.message})
             setValid({ email: false, password: true})

         }else if(err.data.message?.includes('activée')){
            setPayload({...payload, ...err.data?.data })
            setShown(false)
            setValid({ email: true, password: true})
            showMessage('warning', err?.data?.message , 'Login')

         }else{
            showMessage('warning', err?.data?.message , 'Login')
         }

     }else{
        showMessage('error', 'Une erreur interne est Survenue dans le serveur' , 'Login')
        console.log(err);
     }})

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
      bg: '#000',
      //bgGradient: 'linear-gradient(-135deg, #c850c0, #4158d0)',
      opacity: 0.5,
    }} h={'100vh'} justify={'center'} align={'center'} bg={`url(${img})`} bgSize={'cover'}>

        <Grid gridTemplateColumns={{base: '250x', md:'350px'}} gap={2} gridRow={'300px'} minH={'400px'} p={{base: 8, md: 'unset'}}>
            <GridItem border={'2px solid rgba(255, 255, 255, .2)'} backdropFilter={'blur(20px)'} bg={'#efefefe'} boxShadow={ '0 0 12px rgba(0, 0, 0, 0.5)'} rounded={'20px'}  p={6} >
                <Heading fontSize={'3xl'} color={'white'} textAlign={'center'} my={2}>{shown ? 'Sign In' : 'Verify'}</Heading>
                <Text textAlign={'center'} color={'white'}>{ shown ? 'Nous sommes content de vous revoir.' : 'Veuillez saisir le code d\'acivation' }</Text>
            
                {shown ? <React.Fragment>
                    <FormControl mt={8} id="email">
                        <InputGroup>
                            <Input onChange={e=> setPayload({...payload, email: e.target.value})} bg={inputbg} type="email" placeholder='username or email' _placeholder={{color: 'gray.400'}} rounded={'4px'} h={'42px'} 
                            _focusVisible={{
                                bg: inputbg
                            }}
                            />
                            <InputRightElement mt={1} color={'green.400'}>
                                <FaUser/>
                            </InputRightElement>
                        </InputGroup>
                        {valid.email && <FormHelperText color={'red.500'}>{message.email} </FormHelperText>}
                    </FormControl>
                    <FormControl mt={2} id="password">
                        <InputGroup>
                            <Input onChange={e=> setPayload({...payload, password: e.target.value})} type={passwordType ? 'password': 'text'} placeholder='password' bg={inputbg} rounded={'4px'} h={'42px'} _placeholder={{color: 'gray.400'}} _focusVisible={{
                                bg: inputbg
                            }}/>
                            <InputRightElement color={'green.400'} mt={1} onClick={()=>setPasswordType(!passwordType)}>
                                { passwordType ? <FaEye/> : <FaEyeSlash/>}
                            </InputRightElement>
                        </InputGroup>
                        { valid.password && <FormHelperText color={'red.500'}>{message.password}</FormHelperText>}
                    </FormControl>
                </React.Fragment>
                
                :


                <React.Fragment>
                    <Box my={8} display={'flex'} justifyContent={'center'}>
                    <OTPInput
                        value={otp}
                        onChange={setOtp}
                        inputStyle={{
                            color: 'white'
                        }}
                        inputType='tel'
                        numInputs={6}
                        renderSeparator={<span>-</span>}
                        renderInput={(props) => <Input onChange={props.onChange} 
                        onBlur={props.onBlur} 
                        onFocus={props.onFocus}
                        onKeyDown={props.onKeyDown} onPaste={props.onPaste}
                        autoComplete={props.autoComplete} 
                        value={props.value}
                        ref={props.ref}
                        color={'white'}  
                        h={'42px'} 
                        w={'42px'} 
                        fontFamily={'Montserrat'}  
                        _focus={{
                            borderColor: 'green.400'
                        }} _focusVisible={{
                            borderColor: 'green.400'
                        }} />}  
                    />
                    </Box>
                    { valid.otp && <Text mb={2} fontSize={'sm'} textAlign={'center'} color={'red.500'}>{message.otp}</Text>}
                </React.Fragment>
                }
                <Stack spacing={6} mt={2}>
                    {shown && <Stack
                    direction={{ base: 'column', sm: 'row' }}
                    align={'start'}
                    mt={2}
                    justify={'space-between'}>
                    <Checkbox color={'white'}>se souvenir</Checkbox>
                    <Link as={Link} onClick={()=>setTimeout( navigate, 0, '/resetPassword')}  color={vert}>mot de passe oublié?</Link>
                    </Stack>}

                    <Button isLoading={loading} bg={vert} isDisabled={!shown && isDisabled} onClick={ shown ? handleSubmit : handleVerify} colorScheme={'vert'} variant={'solid'}>
                        { shown ? 'Se connecter' : 'Vérifier'}
                    </Button>

                    <HStack justifyContent={'center'}>
                        <Text color={'white'}>{ shown ? 'Vous n\'avez pas de compte ?' : 'Vous n\'avez pas reçu de code ?'}</Text>
                        <Text cursor={'pointer'}  color={'blue.500'} onClick={shown ? ()=> navigate('/Registration') : handleSendCode }>{ shown ? 'S\'inscrire' : 'Renvoyé'}</Text>
                    </HStack>
                </Stack>
                
            </GridItem>
        </Grid>

    </Flex>
  )
}

export default Login