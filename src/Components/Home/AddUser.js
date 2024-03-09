import { Box, Button, ButtonGroup, Flex, FormControl, FormHelperText, HStack, Input, InputGroup, InputRightElement, Select, Skeleton, useColorModeValue, useToast } from '@chakra-ui/react'
import Upload from '../Custom/Upload'
import React, { useCallback, useEffect, useState } from 'react'
import { FaEye, FaEyeSlash, FaMailBulk, FaMailchimp, FaUser } from 'react-icons/fa'
import { Maincolor } from '../theme'
import { useNavigate } from 'react-router-dom'
import { useAddAdminMutation, useGetRoleQuery } from '../Redux/ApiSlice'

const AddUser = ({close}) => {

    const navigate =  useNavigate()

    const [payload, setPayload] = useState({
        name: '',
        password: '',
        idRole: '',
        email: ''
    })

    const [validInput, setValidInput] = useState({
        name: false,
        password: false,
        idRole: false,
        email: false
    })
    const [valid, setValid] = useState(true)


    const [loading, setLoading] = useState(false)

    const [picture, setPicture] = useState('')
    const [passwordType, setPasswordType] = useState(false)

    const [message, setMessage] = useState({
        name: 'This field is required',
        password: 'This field is required',
        email: 'This field is required',
        idRole: 'This field is required',
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

  // REDUX DECLARATION

    const [ADD]  = useAddAdminMutation()
    const {
        data,
        isError,
        isSuccess,
        error,
        isLoading
      } = useGetRoleQuery(JSON.parse(localStorage.getItem('userData'))?.token)

    useEffect(() => {
        if(isError){
          if(error.status=== 401){
            setTimeout(navigate, 0, '/login')
          }else{
            //console.log(error.error);
            //showMessage('error', 'Server has been stopped', 'Fetch Task')
          }
        }else if(isSuccess){
          //console.log(data);
          //showMessage('success', `${data.length} items found`, 'Fetch Task')
        }
      }, [isSuccess, isError, error, isLoading, data, navigate ])

      const handleSubmit = ()=>{

        if(!payload.name){
            setValidInput({ 
              name: true,
              email: false,
              idRole: false,
              password: false,
            })
          }else if(!payload.email){
            setValidInput({ 
                name: false,
                email: true,
                idRole: false,
                password: false,
            })
            window.scrollTo(0, 0)
          }else if(!payload.password){
            setValidInput({ 
                name: false,
                email: false,
                idRole: false,
                password: true,
            })
          }else if(!payload.idRole && payload.idRole !== '/'){
            setValidInput({ 
                name: false,
                email: false,
                idRole: true,
                password: false,
            })
          }else if(!picture){
            setValidInput({ 
                name: false,
                email: false,
                idRole: false,
                password: false,
            })
            setValid(false)
          }
          // POST REQUEST  
      
          else {
      
            setValid({ 
                name: false,
                email: false,
                idRole: false,
                password: false,
            })
      
            setLoading(true);

            const formData = new FormData();
            let body = {...payload, file: picture };
      
            for ( let key in body ) {
              formData.append(key, body[key]);
            }
      
            ADD(formData).unwrap()
            .then(resp =>{
              showMessage('success', resp.message, 'Add Task');
              setLoading(false);
              setPayload({
                name: '',
                email: '',
                idRole: '/',
                password: '',
              })
              close()
      
            })
            .catch(err=>{
              showMessage('error', err.data.message, 'Add Task', 7000, 'top-center');
              setLoading(false);
            })
      
            
          }
      }

  return (

    <Box display={'flex'} justifyContent={'center'} alignItems={'center'} gap={12} flexDir={'column'}>
        <Flex justify={'center'} align={'center'} gap={12} mt={4}>
            <Upload valid={valid} handleChange={setPicture}/>
            <Box>
                <FormControl>
                    <InputGroup>
                        <Input onChange={e=> setPayload({...payload, name: e.target.value})} type="email" placeholder='Username' />
                        <InputRightElement mt={1} color={'gray.400'}>
                            <FaUser/>
                        </InputRightElement>
                    </InputGroup>
                    {validInput.name && <FormHelperText color={'red.500'}>{message.name}</FormHelperText>}
                </FormControl>
                <FormControl mt={2}>
                    <InputGroup>
                        <Input onChange={e=> setPayload({...payload, email: e.target.value})} type="email" placeholder='Email' rounded={'4px'} h={'38px'}/>
                        <InputRightElement mt={1} color={'gray.400'}>
                            @
                        </InputRightElement>
                    </InputGroup>
                    {validInput.email && <FormHelperText color={'red.500'}>{message.email} </FormHelperText>}
                </FormControl>
                <FormControl mt={2}>
                    <InputGroup>
                        <Input onChange={e=> setPayload({...payload, password: e.target.value})} type={passwordType ? 'password': 'text'} placeholder='Password' rounded={'4px'} h={'38px'} />
                        <InputRightElement color={'gray.400'} mt={1} onClick={()=>setPasswordType(!passwordType)}>
                            { passwordType ? <FaEye/> : <FaEyeSlash/>}
                        </InputRightElement>
                    </InputGroup>
                    { validInput.password && <FormHelperText color={'red.500'}>{message.password}</FormHelperText>}
                </FormControl>

                <FormControl mt={2}>
                    <Skeleton isLoaded={isSuccess} rounded={'full'}>
                        <Select 
                        name='role'
                        fontWeight={600}
                        placeholder='Select Role'
                        onChange={e=> setPayload({...payload, idRole: e.target.options[e.target.options.selectedIndex].id})}
                        >
                            {
                            isSuccess && data.map(item=> <option value={item.id} id={item.id} key={item.id}>{item.label.toLowerCase()} </option>)
                            }
                            
                        </Select>
                        </Skeleton>
                    { validInput.idRole && <FormHelperText color={'red.500'}>{message.idRole}</FormHelperText>}
                </FormControl>
            </Box>
            
        </Flex>

        <ButtonGroup w={'full'} gap={4} justifyContent={"center"}>
            <Button w={'50%'} isLoading={loading} colorScheme={Maincolor} onClick={handleSubmit}>Submit</Button>
            <Button onClick={close} colorScheme='red' variant={'outline'}>Cancel</Button>
        </ButtonGroup>
    </Box>
  )
}

export default AddUser