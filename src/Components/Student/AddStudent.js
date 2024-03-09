import { Box, Button, ButtonGroup, Flex, FormControl, FormHelperText, FormLabel, Grid, GridItem, Image, Input, InputGroup, InputLeftAddon, Radio, RadioGroup, Select, Skeleton, Stack, Text, useColorModeValue, useToast } from '@chakra-ui/react'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import bg2 from '../../assets/images/bgstudent.webp' 
// import profile from '../../assets/images/profile-3.jpg' 
import { FiGift, FiGitBranch, FiMail, FiPhone } from 'react-icons/fi'
import { BiUser} from 'react-icons/bi'
import { FaUserCircle } from 'react-icons/fa'
import Upload from '../Custom/Upload'
import { useAddStudentMutation, useGetSubjectQuery } from '../Redux/ApiSlice'
import dayjs from 'dayjs'
import { motion } from 'framer-motion'
import cmrFlag from '../../assets/images/Dashboard/cmr flag.png'

const AddStudent = ({ close, cached, onUpdate }) => {


  // STUDENT DATA
  const [profile, setProfile] = useState({
    name: '',
    surname: '',
    birthday: '',
    mobile: '',
    email: '',
    idSubject: '',
    password: '',
    rePassword: ''
  })

  //LOADER STATE
  const [loading, setLoading] = useState(false)

  //Upload
  const [picture, setPicture] = useState();
  const [valid, setValid] = useState(true);
  const inputRef = useRef()

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

  const {
    data,
    isError,
    isSuccess,
    error,
    isLoading
  } = useGetSubjectQuery(JSON.parse(localStorage.getItem('userData'))?.token)

  const [ADD] = useAddStudentMutation()

//GETSTUDENTS

  useEffect(() => {
    if(isError){
      if(error.status=== 401){
        //navigate('/login')
      }
      //console.log(error.error);
      //return showMessage('error',error.message, 'Fetch Task')
    }else if(isSuccess){
      //console.log(data);
      //showMessage('success', `${data.length} items found`, 'Fetch Task')
    }
  }, [isSuccess, isError, error, isLoading, data, showMessage])


  //UPDATE REQUEST

  useEffect(() => {
  
    if(onUpdate){
      setProfile({
      name: cached?.name,
      surname: cached?.surname,
      birthday: cached?.birthday,
      mobile: cached?.mobile,
      email: cached?.email,
      idSubject: cached?.SubjectId,
      password: '',
      rePassword: ''
    })
  }
  }, [onUpdate, cached?.name, cached?.email, cached?.surname, cached?.birthday, cached?.mobile, cached?.SubjectId])

  const handleEdit=()=>{
    console.log(profile);
  }
  

  //input phone useffect

 
  



  //Input Validation and POST REQUEST

  const [validInput, setValidInput] = useState({
    name: false,
    surname: false,
    birthday: false,
    mobile: false,
    email: false,
    idSubject: false,
    password: false,
    rePassword: false
  })


  const handleSubmit = (e)=>{
    e.preventDefault()

    if(!profile.name){
      setValidInput({ 
        name: true,
        surname: false,
        birthday: false,
        mobile: false,
        email: false,
        idSubject: false,
        password: false,
        rePassword: false
      })
      window.scrollTo(0, 0)
    }else if(!profile.surname){
      setValidInput({ 
        name: false,
        surname: true,
        birthday: false,
        mobile: false,
        email: false,
        idSubject: false,
        password: false,
        rePassword: false
      })
      window.scrollTo(0, 0)
    }else if(!profile.birthday){
      setValidInput({ 
        name: false,
        surname: false,
        birthday: true,
        mobile: false,
        email: false,
        idSubject: false,
        password: false,
        rePassword: false
      })

    }else if(profile.mobile.length !== 9 ){
      setValidInput({ 
        name: false,
        surname: false,
        birthday: false,
        mobile: true,
        email: false,
        idSubject: false,
        password: false,
        rePassword: false
      })
    }else if(!profile.email){
      setValidInput({ 
        name: false,
        surname: false,
        birthday: false,
        mobile: false,
        email: true,
        idSubject: false,
        password: false,
        rePassword: false
      })
    }else if(profile.idSubject === '/'){
      setValidInput({ 
        name: false,
        surname: false,
        birthday: false,
        mobile: false,
        email: false,
        idSubject: true,
        password: false,
        rePassword: false
      })
    }else if(profile.password.length < 8 ){
      setValidInput({ 
        name: false,
        surname: false,
        birthday: false,
        mobile: false,
        email: false,
        idSubject: false,
        password: true,
        rePassword: false
      })
    }else if( profile.password !== profile.rePassword){
      setValidInput({ 
        name: false,
        surname: false,
        birthday: false,
        mobile: false,
        email: false,
        idSubject: false,
        password: false,
        rePassword: true
      })
    }else if(!picture){
      setValidInput({ 
        name: false,
        surname: false,
        birthday: false,
        mobile: false,
        email: false,
        idSubject: false,
        password: false,
        rePassword: false
      })
      setValid(false)
      window.scrollTo(0, 0)
    }
    // POST REQUEST  

    else {

      console.log(profile, picture);
      setValidInput({ 
        name: false,
        surname: false,
        birthday: false,
        mobile: false,
        email: false,
        idSubject: false,
        password: false,
        rePassword: false
      })

      setLoading(true);
      const formData = new FormData();
      let payload = {...profile, file: picture };

      for ( let key in payload ) {
        formData.append(key, payload[key]);
      }

      ADD(formData).unwrap()
      .then(resp =>{
        showMessage('success', resp.message, 'Add Task');
        setLoading(false);
        setProfile({
          name: '',
          surname: '',
          birthday: '',
          mobile: '',
          email: '',
          idSubject: '/',
          password: '',
          rePassword: ''
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
    <Grid justifyContent={'center'} gridTemplateColumns={'500px'} mt={8}
      as={motion.div}
      initial={{ y: '100vh' }}
      animate={{ y: 0}} 
    >
        <GridItem  bg={useColorModeValue('white', 'gray.800')} minH={'300px'} pb={6} borderRadius={'20px'}  boxShadow={'0 0 10px rgba(0, 0, 0, 0.1)'}>
          <Flex w={'full'} h={'50px'} 
          justifyContent={'center'} 
          alignItems={'center'} 
          bgImage={bg2} 
          bgPosition={'center'} 
          borderTopLeftRadius={'20px'} 
          borderTopRightRadius={'20px'}
          position={'relative'}
          _before={{
            display: 'block',
            position: 'absolute',
            content: "''",
            width: '100%',
            top: 0,
            bottom: 0,
            bgGradient: 'linear-gradient(-135deg, #c850c0, #4158d0)',
            opacity: 0.7,
            borderTopLeftRadius: '20px',
            borderTopRightRadius:'20px',
          }}
          >
           <Text zIndex={10} fontSize={'2xl'} fontWeight={600} fontFamily={'Poppins semibold'} textAlign={'center'} color={'white'}>Registration</Text> 
          </Flex>

            <Flex mt={6} px={6} justifyContent={'space-between'}>
              <Box>
                <FormControl>
                  <FormLabel gap={2} display={'flex'} alignItems={'center'}><FaUserCircle/> Name</FormLabel>
                  <Input id='1' onChange={e =>setProfile({...profile, name: e.target.value })} value={profile?.name} type='text' placeholder='Student name' minW={'300px'} rounded={'full'} name='name' ref={inputRef} required/>
                  { validInput.name && <FormHelperText color={'red.400'}> This field is required! </FormHelperText>}
                </FormControl>

                <FormControl mt={2}>
                  <FormLabel gap={2} display={'flex'} alignItems={'center'}><BiUser/> Surname</FormLabel>
                  <Input type='text' id='2' onChange={e =>setProfile({...profile, surname: e.target.value })} value={profile?.surname} placeholder=' Student Surname' minW={'300px'} name='surname' ref={inputRef} rounded={'full'} required/>
                  { validInput.surname && <FormHelperText color={'red.400'}> This field is required! </FormHelperText>}
                </FormControl>

                <FormControl mt={2}>
                  <FormLabel gap={2} display={'flex'} alignItems={'center'}><FiMail/> Email Adress</FormLabel>
                  <Input type='email' id='3' onChange={e =>setProfile({...profile, email: e.target.value })} value={profile?.email} disabled={onUpdate} placeholder='sample@gmail.com' name='email' ref={inputRef}  minW={'300px'} rounded={'full'}/>
                  { validInput.email && <FormHelperText color={'red.400'}> This field is required! </FormHelperText>}
                </FormControl>

                <FormControl mt={4} mb={2} display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                  <FormLabel gap={2} alignItems={'center'} display={'flex'}>Gender</FormLabel>
                  <RadioGroup defaultValue='1'>
                    <Stack direction='row' justify={'center'} >
                      <Radio value='1' checked>Male</Radio>
                      <Radio value='2'>Female</Radio>
                    </Stack>
                  </RadioGroup>
                </FormControl>
                
              </Box>

              <Upload handleChange={setPicture} valid={valid} />
              
            </Flex>

            <Box px={6}>

              <FormControl>
                <FormLabel alignItems={'center'}  gap={2} mt={1} display={'flex'}> <FiGitBranch/> Subject </FormLabel>
                <Skeleton isLoaded={isSuccess} rounded={'full'}>
                  <Select 
                  rounded={'full'} 
                  defaultValue={onUpdate && cached.SubjectId}
                  name='subject' ref={inputRef}
                  id='4'
                  placeholder='Select subject'
                  onChange={e=> setProfile({...profile, idSubject: e.target.options[e.target.options.selectedIndex].id})}
                  >
                    {
                      isSuccess && data.map(item=> <option value={item.id} id={item.id} key={item.id}>{item.name} / Niveau:  {item.level} </option>)
                    }
                    
                  </Select>
                </Skeleton>
                { validInput.idSubject && <FormHelperText color={'red.400'}> This field is required! </FormHelperText>}
              </FormControl>

              <Text textAlign={'center'} mt={5}>Personnal data</Text>

              <FormControl mt={1}>
                <FormLabel gap={2} mt={1} display={'flex'}> <FiGift/>Birthday</FormLabel>
                <Input name='date' id='5' ref={inputRef} type='date' onChange={e =>setProfile({...profile, birthday: e.target.value })} value={dayjs(profile?.birthday).format('YYYY-MM-DD')} minW={'300px'} rounded={'full'}/>
                { validInput.birthday && <FormHelperText color={'red.400'}> This field is required! </FormHelperText>}
              </FormControl>

              <FormControl mt={1}>
                <FormLabel gap={2} mt={1} display={'flex'}> <FiPhone/>Mobile</FormLabel>
                <InputGroup>
                  <InputLeftAddon bg={'transparent'}>
                    <strong>+237</strong>
                  </InputLeftAddon>
                  <Input maxLength={9} type='tel' onChange={e =>setProfile({...profile, mobile: e.target.value })} value={profile.mobile} minW={'300px'} rounded={'full'} placeholder='Type your phone number'/>
                </InputGroup>
                { validInput.mobile && <FormHelperText color={'red.400'}> Phone number must be 9 digits </FormHelperText>}
              </FormControl>

              <FormControl mt={2}>
                <FormLabel>Password</FormLabel>
                <Input type='password' id='6' name='password' ref={inputRef}  onChange={e =>setProfile({...profile, password: e.target.value })} disabled={onUpdate} placeholder='set a password' minW={'300px'} rounded={'full'}/>
                { validInput.password && <FormHelperText color={'red.400'}> Password must be 8 strings at least! </FormHelperText>}
              </FormControl>

              <FormControl mt={2}>
                <FormLabel>Re Password</FormLabel>
                <Input type='password' name='Repassword' id='7' ref={inputRef} onChange={e =>setProfile({...profile, rePassword: e.target.value })} disabled={onUpdate} placeholder='Confirm Your Password' minW={'300px'} rounded={'full'}/>
                { validInput.password && <FormHelperText color={'red.400'}> Password doesn't match! </FormHelperText>}
              </FormControl>


              <ButtonGroup spacing='6' mt={8} justifyContent={'center'} w={"full"}>
                <Button colorScheme='blue' w={'30%'} rounded={'full'} isLoading={loading} loadingText={'Processing...'} onClick={ !onUpdate ? handleSubmit : handleEdit}>Submit</Button>
                <Button rounded={'full'} w={'30%'} onClick={close}>Cancel </Button>
              </ButtonGroup>

            </Box>


        </GridItem>
    </Grid>
    
  )
}

export default AddStudent