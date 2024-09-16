import React, { useCallback, useEffect, useState } from 'react'
import UserNav from './UserNav'
import { Box, Button, FormControl, FormHelperText, FormLabel, Grid, GridItem, Heading, Image, Input, InputGroup, InputLeftAddon, InputRightElement, Select, Text, useToast } from '@chakra-ui/react'
import { vert } from '../theme'
import method1 from '../../assets/images/mtn.png'
import method2 from '../../assets/images/orange.png'
import method3 from '../../assets/images/logo visa.png'
import method4 from '../../assets/images/images.png'
import { FiCheckCircle } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { useAddPaymentMutation } from '../Redux/ApiSlice'

const SchoolPay = () => {

    const navigate = useNavigate()
    const savedData = JSON.parse(localStorage.getItem('userData'))
    const [loading, setLoading] = useState(false)

    const [payload, setPayload] = useState({
        method: '1',
        mobile: '',
        amount: 10000,
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
    const [ADD] = useAddPaymentMutation()


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


       ADD({...payload, id:savedData?.id}).unwrap()
       .then(resp =>{
         showMessage('success', resp.message, 'Payement');
         setLoading(false);
         setPayload({
             mobile: '',
             amount: 10000,
             title: ''
         })
         
         setTimeout(navigate, 0, '/profile')
       })
       .catch(err=>{
         showMessage('error', err.data.message, 'Payement', 7000, 'top-center');
         setLoading(false);
       })

      
    }
  }

  return (
    <>
        <UserNav/>
        <Grid pt={{base: 20, md: 28}} gridTemplateColumns={{base: '1fr', md:'500px'}} justifyContent={'center'} gap={4}>
            <GridItem p={4} display={'flex'} flexDir={'column'} gap={6} justifyContent={'center'} >
                <Box>
                    <Heading color={vert} fontSize={'2xl'}>SchoolPay</Heading>
                    <Text mt={4}>Service de paiement sécurisé</Text>
                </Box>

                <Box>
                    <FormControl mt={4}>
                    <FormLabel gap={2} display={'flex'} alignItems={'center'} fontWeight={400}> Libellé  </FormLabel>
                    <Input  
                    h={'40px'}  
                    type='text' 
                    placeholder="Identifiant de la transaction" 
                    onChange={e=> setPayload({...payload, title: e.target.value})}
                    value={payload.title}
                    _focus={{
                            borderColor: 'green.400'
                        }} _focusVisible={{
                            borderColor: 'green.400'
                        }}  required/>
                          { validInput.title && <FormHelperText color={'red.400'}> Ce champ est requis ! </FormHelperText>}
                    </FormControl>

                    <FormControl mt={4}>
                        <FormLabel gap={2} display={'flex'} alignItems={'center'} fontWeight={400}>Methode de paiement</FormLabel>
                        <Select
                            h={'40px'}
                            value={payload.method} 
                            onChange={e=> setPayload({...payload, method: e.target.options[e.target.options.selectedIndex].id})}
  
                            _focus={{
                                borderColor: 'green.400'
                            }} _focusVisible={{
                                borderColor: 'green.400'
                            }}
                        >
                            <option value={1} id='1'>Orange Money</option>
                            <option value={2} id='2'>Mobile Money</option>
                            <option value={3} id='3'>Visa</option>
                            <option value={4} id='4'>Banque Atlantique</option>
                        </Select>
                    </FormControl>

                    <FormControl mt={4}>
                        <FormLabel gap={2} display={'flex'} alignItems={'center'} fontWeight={400}>{ parseInt(payload.method) === 1 || parseInt(payload.method) === 2 ? 'Numero de Telephone' : 'Credit Card Number' }</FormLabel>
                        <InputGroup>
                            <InputLeftAddon 
                            h={'40px'}
                            bg={'transparent'}
                            
                            >
                                <Image src={logo} w={'45px'}/>
                            </InputLeftAddon>
                            <Input
                            h={'40px'}  
                            maxLength={parseInt(payload.method) === 1 || parseInt(payload.method) === 2 ? 9 : 16} 
                            type={parseInt(payload.method) === 1 || parseInt(payload.method) === 2 ? 'number': 'text'} 
                            placeholder={ parseInt(payload.method) === 1 || parseInt(payload.method) === 2 ? 'Type your phone number' : 'XXXX-XXXX-XXXX-XXXX' }                            onChange={e=>{ 
                            checkAmount()
                            setPayload({...payload, mobile: e.target.value})
                            }}
                            value={payload.mobile.toUpperCase()}
                            _focus={{
                                borderColor: 'green.400'
                            }} _focusVisible={{
                                borderColor: 'green.400'
                            }}
                            // maxLength={parseInt(payload.method) === 1 || parseInt(payload.method) === 2 ? 9 : 16} 
                            // type={parseInt(payload.method) === 1 || parseInt(payload.method) === 2 ? 'number': 'text'} 
                            // placeholder={ parseInt(payload.method) === 1 || parseInt(payload.method) === 2 ? 'Type your phone number' : 'XXXX-XXXX-XXXX-XXXX' }
                            
                        />
                        </InputGroup>
                        { validInput.mobile && <FormHelperText color={'red.400'}> This field is required! </FormHelperText>}
                    </FormControl>

                    <FormControl mt={4}>
                        <FormLabel gap={2} display={'flex'} alignItems={'center'} fontWeight={400}>Montant du Versement</FormLabel>
                        <InputGroup>
                            <Input 
                            h={'40px'} 
                            fontFamily={'Montserrat'} 
                            maxLength={100}
                            type='tel' 
                            placeholder='Amount of Transaction' 
                            onChange={e=> setPayload({...payload, amount: e.target.value})}
                            fontWeight={400} 
                             _focus={{
                            borderColor: 'green.400'
                            }} 
                            _focusVisible={{
                            borderColor: 'green.400'
                            }}
                        _placeholder={{
                            fontWeight: 300
                        }} />
                            <InputRightElement pr={4}>
                                <Text color={vert}><small>XAF</small></Text>
                            </InputRightElement>
                        </InputGroup>
                        { validInput.amount && <FormHelperText color={'red.400'}> {inputErrorMessage} </FormHelperText>}
                    </FormControl>
                </Box>


                <Box my={8}>
                    <Button 
                    w={'full'} 
                    colorScheme='green' 
                    bg={vert} 
                    loadingText={'Traitement..'} 
                    onClick={handleSubmit} 
                    isLoading={loading}
                    >
                        <FiCheckCircle/>&nbsp; Payer
                    </Button>

                    <Button mt={6} w={'full'}  colorScheme='gray' title='Aller au profil'  onClick={()=>setTimeout(navigate, 0, `/profile`)}>
                        Annuler
                    </Button>
                </Box>
                
                
            </GridItem>
        </Grid>
    </>
  )
}

export default SchoolPay
