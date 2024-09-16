import { Box, Button, ButtonGroup, Flex, FormControl, FormHelperText, FormLabel, Grid, GridItem, Heading, Image, Input, InputGroup, InputLeftAddon, InputRightAddon, Select, Skeleton, Text, useColorModeValue, useToast } from '@chakra-ui/react'
import { color, motion } from 'framer-motion'
import React, { useCallback, useEffect, useState } from 'react'
import image from '../../assets/images/pay.jpg'
import method1 from '../../assets/images/mtn.png'
import method2 from '../../assets/images/orange.png'
import method3 from '../../assets/images/logo visa.png'
import method4 from '../../assets/images/images.png'
import { useNavigate, useParams } from 'react-router-dom'
import { FiCheckCircle } from 'react-icons/fi'
import img2 from '../../assets/login-bg@2x.png'
import { useAddPaymentMutation, useGenerateTokenMutation, useGetStudentByIdQuery, useGetSubjectByIdQuery, useRequestToPayMutation } from '../Redux/ApiSlice'
import { v4 as uuidv4 } from 'uuid';
import { vert } from '../theme'

const Payment = () => {

    const bg = useColorModeValue('white', 'gray.800')
    const { id, idSubject }= useParams()
    const [loading, setLoading] = useState(false)

    const [payload, setPayload] = useState({
        method: '1',
        mobile: '',
        amount: 10000,
        id: id,
        title: ''
    })
    const [ logo, setLogo] = useState()


    //ALERT
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
    } = useGetStudentByIdQuery(id)
    const request = useGetSubjectByIdQuery(idSubject)
    const [ADD] = useAddPaymentMutation()

    //MOMO API STATEMENT

    const [GENTOKEN] =useGenerateTokenMutation()
    const [PAY] =useRequestToPayMutation()

    useEffect(() => {
        if(isError){
        if(error.status=== 401){
            //navigate('/login')
        }
        //console.log(error.error);
        showMessage('error', 'Server has been stopped', 'Fetch Task')
        }else if(isSuccess){
        //console.log(data);
        //showMessage('success', `${data.length} items found`, 'Fetch Task')
        }
    }, [isSuccess, isError, error, isLoading, data, showMessage])

    useEffect(() => {
        if(request.isError){
          if(request.error.status=== 401){
            //navigate('/login')
          }
        }else if(request.isSuccess){
          // console.log(data);
          // showMessage('success', `${data.length} items found`, 'Fetch Task')
        }
    }, [request.isSuccess, request.isError, request.error, request.isLoading, request.data])
    



    useEffect(() => {
      window.scrollTo(0,0)
    }, [])
    useEffect(() => {
        switch (payload.method) {
            case '1':
                setLogo(method2)
                break;
            case '2':
                setLogo(method1)
                break;
            case '3':
                setLogo(method3)
                break;
            case '4':
                setLogo(method4)
                break;
        
            default:
                break;
        }
     
    }, [payload.method])

    const navigate = useNavigate()



    //Input Validation and POST REQUEST

  const [validInput, setValidInput] = useState({
    mobile: false,
    amount: false,
    title: false
  })

  const [inputErrorMessage, setInputErrorMessage] = useState('This field is required')

 const checkAmount = () => {

   if(parseInt(payload.amount) < 10000){
       setInputErrorMessage('Min Amount : 10000XAF')
       setValidInput({...validInput, amount: true})
   }else{
       setInputErrorMessage('This field is required')
       setValidInput({...validInput, amount: false})
   }
 }
 


  const handleSubmit = (e)=>{
    e.preventDefault()

    if(!payload.title){
      setValidInput({ 
        mobile: false,
        amount: false,
        title: true
      })
      window.scrollTo(0, 0)
    }else if(!payload.mobile){
      setValidInput({ 
        mobile: true,
        amount: false,
        title: false
      })
    }else if(!payload.amount){
      setValidInput({ 
        mobile: false,
        amount: true,
        title: false
      })
    
    // POST REQUEST  

    }else{

      console.log(payload);
      setLoading(true)
      setValidInput({ 
        mobile: false,
        amount: false,
        title: false
      })


      //Generate Token API call

    //   GENTOKEN().unwrap()
    //   .then(resp=>{
    //     setLoading(false)
    //     console.log(resp);
    //   }).catch(err=> console.log(err))


       ADD(payload).unwrap()
       .then(resp =>{
         showMessage('success', resp.message, 'Payement');
         setLoading(false);
         setPayload({
             mobile: '',
             amount: 10000,
             title: ''
         })
         
         setTimeout(navigate, 0, `/student/Details/${id}/${idSubject}`)
       })
       .catch(err=>{
         showMessage('error', err.data.message, 'Payement', 7000, 'top-center');
         setLoading(false);
       })

      
    }
  }

    

  return (
    <Box as={motion.div}
    initial={{ y: '-100vh' }}
    animate={{ y: 0, transition:{ type: 'just'}}}
    w={'100%'}
    h={'100%'}
    display={'flex'}
    justifyContent={'center'}
    alignItems={'center'}
    >
        <Box textAlign={'center'} mt={{ base: 6, md: 12}}>
            <Flex gap={4} align={'center'} flexDir={{base: 'column', md: 'row'}} justify={'center'}>
                <ion-icon name="shield-checkmark-outline" style={{fontSize: '35px', color: vert}}></ion-icon>
                <Heading color={vert}>Payement Securisée</Heading>
            </Flex>
            <br /><br />
            <Grid gridTemplateColumns={{md: '250px 350px', base: '1fr'}} gridRow={'450px'} minW={{base: 'full', md:'550px'}} minH={{md: '450px', base: 'max-content'}} bg={bg} rounded={'25px'} boxShadow={'0 0 10px rgba(0, 0, 0, 0.1)'}>
                <GridItem display={{base: 'none', md: 'block'}} bgImage={img2} bgSize={'cover'} bgPos={'right'}  borderLeftRadius={'25px'} px={6} py={4}>
                    <Flex h={'full'} justify={'space-between'} flexDir={'column'}>
                        {/* <Avatar size={'2xl'} src={img2}/> */}

                        <Box mt={4} textAlign={'left'}>
                            <Text color={'white'}>Informations de l'etudiant</Text><br />
                            
                            <Skeleton isLoaded={isSuccess}><Text fontWeight={600} fontSize={'xl'} color={'white'}>{data?.name} {data?.surname.toUpperCase()} </Text></Skeleton>
                            <Skeleton isLoaded={request.isSuccess}><Text fontFamily={'Poppins'} fontSize={'md'} color={'white'}>{request.data?.name.toUpperCase()}</Text></Skeleton>
                            <Skeleton isLoaded={request.isSuccess}><Text fontFamily={'Poppins'} fontSize={'md'} color={'white'}>Level {request.data?.level}</Text></Skeleton>
                        </Box>



                        <Box mt={4} textAlign={'left'}>
                            <Skeleton isLoaded={isSuccess}><Text fontFamily={'Poppins'} fontSize={'md'} color={'white'}>{data?.email}</Text></Skeleton>
                            <Skeleton isLoaded={isSuccess}><Text fontFamily={'Poppins'} fontSize={'xs'} color={'white'}>Mobile +237 {data?.mobile}</Text></Skeleton>
                        </Box>

                    </Flex>
                </GridItem>

                <GridItem px={6} py={4}>
                    <Box px={4}>
                        <FormControl mt={4}>
                            <FormLabel gap={2} mt={1} display={'flex'} color={'gray.500'} >Libellé</FormLabel>
                            <Input 
                                border={'none'}  
                                rounded={'none'} 
                                h={'40px'} 
                                maxLength={255}
                                type='text' 
                                placeholder='Mention a Label for Transaction'
                                borderBottom={'1px solid'}
                                onChange={e=> setPayload({...payload, title: e.target.value})}
                                value={payload.title}
                                borderColor={'gray.300'} 
                                _focusVisible={{
                                    border: 'none',
                                    borderBottom: '2px solid',
                                    borderColor: 'blue.400'
                                }}
                                />
                                { validInput.title && <FormHelperText color={'red.400'}> This field is required! </FormHelperText>}
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel gap={2} mt={1} display={'flex'} color={'gray.500'}>Methode de paiement</FormLabel>
                            
                                <Select 
                                    borderLeft={'none'} 
                                    h={'40px'}  
                                    border={'none'}
                                    rounded={0}
                                    borderBottom={'1px solid'}
                                    borderColor={'gray.400'}
                                    value={payload.method} 
                                    onChange={e=> setPayload({...payload, method: e.target.options[e.target.options.selectedIndex].id})}
                                    _focusVisible={{
                                        border: 'none',
                                        borderBottom: '2px solid',
                                        borderColor: 'blue.400'
                                    }}
                                >
                                    <option value={1} id='1'>Orange Money</option>
                                    <option value={2} id='2'>Mobile Money</option>
                                    <option value={3} id='3'>Visa</option>
                                    <option value={4} id='4'>Banque Atlantique</option>
                                </Select>
           
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel gap={2} mt={1} display={'flex'} color={'gray.500'}>{ parseInt(payload.method) === 1 || parseInt(payload.method) === 2 ? 'Numero de Telephone' : 'Credit Card Number' }</FormLabel>
                            <InputGroup>
                                <InputLeftAddon 
                                h={'40px'}
                                bg={'transparent'}
                                rounded={0}
                                border={'none'}
                                borderBottom={'1px solid'}
                                borderColor={'gray.300'}
                                >
                                    <Image src={logo} w={'45px'}/>
                                </InputLeftAddon>
                                <Input
                                h={'40px'}  
                                border={'none'}
                                maxLength={parseInt(payload.method) === 1 || parseInt(payload.method) === 2 ? 9 : 16} 
                                type={parseInt(payload.method) === 1 || parseInt(payload.method) === 2 ? 'number': 'text'} 
                                placeholder={ parseInt(payload.method) === 1 || parseInt(payload.method) === 2 ? 'Type your phone number' : 'XXXX-XXXX-XXXX-XXXX' }

                                onChange={e=>{ 
                                checkAmount()
                                setPayload({...payload, mobile: e.target.value})
                                }}
                                
                                value={payload.mobile.toUpperCase()}
                                rounded={0}
                                borderBottom={'1px solid'}
                                borderColor={'gray.400'} 
                                _focusVisible={{
                                    border: 'none',
                                    borderBottom: '2px solid',
                                    borderColor: 'blue.400'
                                }}/>
                            </InputGroup>
                            { validInput.mobile && <FormHelperText color={'red.400'}> This field is required! </FormHelperText>}
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel gap={2} mt={1} display={'flex'} color={'gray.500'}>Montant</FormLabel>
                            <InputGroup>
                                <Input
                                h={'40px'}  
                                
                                fontWeight={600}
                                fontSize={'xl'}
                                border={'none'}
                                rounded={0}
                                borderBottom={'1px solid'}
                                borderColor={'gray.400'}
                                value={payload.amount}
                                maxLength={100}
                                type='tel' 
                                placeholder='Amount of Transaction' 
                                onChange={e=> setPayload({...payload, amount: e.target.value})}
                                _focusVisible={{
                                    border: 'none',
                                    borderBottom: '2px solid',
                                    borderColor: 'blue.400'
                                }}/>
                                <InputRightAddon 
                                h={'40px'}
                                bg={'transparent'}
                                rounded={0}
                                border={'none'}
                                borderBottom={'1px solid'}
                                borderColor={'gray.300'}
                                >
                                    <strong>XAF</strong>
                                </InputRightAddon>
                            </InputGroup>
                            { validInput.amount && <FormHelperText color={'red.400'}> {inputErrorMessage} </FormHelperText>}
                        </FormControl>

                        
                        <ButtonGroup spacing='6' mt={16} justifyContent={'center'} w={"full"}>
                            <Button colorScheme='green' bg={vert} w={'60%'} rounded={'none'} loadingText={'Processing..'} onClick={handleSubmit} isLoading={loading}><FiCheckCircle/> &nbsp; Purchase</Button>
                            <Button rounded={'none'} w={'30%'} onClick={()=>setTimeout(navigate, 0, `/student/Details/${id}/${idSubject}`)}>Cancel </Button>
                        </ButtonGroup>


                    </Box>
                
                </GridItem>
            </Grid>
        </Box>
        
    </Box>
  )
}

export default Payment