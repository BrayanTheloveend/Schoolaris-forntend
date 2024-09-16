import { Box, Button, ButtonGroup,  FormControl, FormHelperText, FormLabel, Image, Input, InputGroup, InputLeftAddon, InputRightAddon, Select,  useToast } from '@chakra-ui/react'
import React, { useCallback, useEffect, useState } from 'react'
import method1 from '../../assets/images/mtn.png'
import method2 from '../../assets/images/orange.png'
import method3 from '../../assets/images/logo visa.png'
import method4 from '../../assets/images/images.png'
import { useNavigate } from 'react-router-dom'
import { useAddPaymentMutation } from '../Redux/ApiSlice'
//import { v4 as uuidv4 } from 'uuid';
import { vert } from '../theme'

const PaymentModal = (props) => {
  
    const [loading, setLoading] = useState(false)

    const [payload, setPayload] = useState({
        method: '1',
        mobile: '',
        amount: 10000,
        id: props.id,
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


    const [ADD] = useAddPaymentMutation()

    // useEffect(() => {
    //   window.scrollTo(0,0)
    // }, [])
    
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

  const [inputErrorMessage, setInputErrorMessage] = useState('Ce champ est requis')

 const checkAmount = () => {

   if(parseInt(payload.amount) < 10000){
       setInputErrorMessage('Min Amount : 10000XAF')
       setValidInput({...validInput, amount: true})
   }else{
       setInputErrorMessage('Ce champ est requis')
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
         
         props.handleClose()
       })
       .catch(err=>{
         showMessage('error', err.data.message, 'Payement', 7000, 'top-center');
         setLoading(false);
         props.handleClose()
       })

      
    }
  }

    

  return (
    
             
    <Box pb={4}>
        <FormControl>
            <FormLabel gap={2} display={'flex'} color={'gray.500'} >Libellé</FormLabel>
            <Input 
                fontFamily={'Montserrat'} 
                maxLength={100}
                type='tel' 
                fontWeight={400} 
                 _focus={{
                borderColor: 'green.400'
                }} 
                _focusVisible={{
                borderColor: 'green.400'
                }}
              _placeholder={{
                  fontWeight: 300
              }} 
                placeholder='Mention a Label for Transaction'
                onChange={e=> setPayload({...payload, title: e.target.value})}
                value={payload.title}
                />
                { validInput.title && <FormHelperText color={'red.400'}> Ce champ est requis! </FormHelperText>}
        </FormControl>

        <FormControl mt={4}>
            <FormLabel gap={2} mt={1} display={'flex'} color={'gray.500'}>Methode de paiement</FormLabel>
            
                <Select 
  
                    fontFamily={'Montserrat'} 
                    maxLength={100}
                    type='tel' 
                     _focus={{
                    borderColor: 'green.400'
                    }} 
                    _focusVisible={{
                    borderColor: 'green.400'
                    }}
                _placeholder={{
                    fontWeight: 300
                }} 
                    value={payload.method} 
                    onChange={e=> setPayload({...payload, method: e.target.options[e.target.options.selectedIndex].id})}
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
                <InputLeftAddon>
                  <Image src={logo} w={'45px'}/>
                </InputLeftAddon>
                <Input
               fontFamily={'Montserrat'} 
               fontWeight={400} 
                _focus={{
               borderColor: 'green.400'
               }} 
               _focusVisible={{
                borderColor: 'green.400'
                }}
                _placeholder={{
                    fontWeight: 300
                }} 
                maxLength={parseInt(payload.method) === 1 || parseInt(payload.method) === 2 ? 9 : 16} 
                type={parseInt(payload.method) === 1 || parseInt(payload.method) === 2 ? 'number': 'text'} 
                placeholder={ parseInt(payload.method) === 1 || parseInt(payload.method) === 2 ? 'Type your phone number' : 'XXXX-XXXX-XXXX-XXXX' }
                onChange={e=>{ 
                checkAmount()
                setPayload({...payload, mobile: e.target.value})
                }}
                
                value={payload.mobile.toUpperCase()}
              />
            </InputGroup>
            { validInput.mobile && <FormHelperText color={'red.400'}> Ce champ est requis! </FormHelperText>}
        </FormControl>

        <FormControl mt={4}>
            <FormLabel gap={2} mt={1} display={'flex'} color={'gray.500'}>Montant</FormLabel>
            <InputGroup>
                <Input 
                fontFamily={'Montserrat'} 
                fontWeight={400} 
                  _focus={{
                borderColor: 'green.400'
                }} 
                _focusVisible={{
                borderColor: 'green.400'
                }}
            _placeholder={{
                fontWeight: 300
            }} 
                value={payload.amount}
                maxLength={100}
                type='tel' 
                placeholder='Amount of Transaction' 
                onChange={e=> setPayload({...payload, amount: e.target.value})}
                />
                <InputRightAddon>
                  <strong>XAF</strong>
                </InputRightAddon>
            </InputGroup>
            { validInput.amount && <FormHelperText color={'red.400'}> {inputErrorMessage} </FormHelperText>}
        </FormControl>

        
        <ButtonGroup spacing='6' mt={6} justifyContent={'end'} w={"full"}>
          <Button w={'30%'} onClick={props.handleClose}>Annuler </Button>
          <Button colorScheme='green' bg={vert} loadingText={'Processing..'} onClick={handleSubmit} isLoading={loading}>Envoyer</Button>
        </ButtonGroup>


    </Box>


)}

export default PaymentModal