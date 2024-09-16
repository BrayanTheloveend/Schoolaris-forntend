import { Box, Button, ButtonGroup, Flex, FormControl, FormHelperText, FormLabel, Grid, GridItem, Icon, Input, Radio, RadioGroup, Stack, Text, useColorModeValue, useToast } from '@chakra-ui/react'
import React, { useCallback, useRef, useState } from 'react'
import bg2 from '../../assets/images/bgteacher.webp' 
//import profile from '../../assets/images/profile-4.jpg' 
import { FiFolder, FiGift, FiMail, FiPhone } from 'react-icons/fi'
import { BiUser } from 'react-icons/bi'
import { FaUserCircle } from 'react-icons/fa'
import Upload from '../Custom/Upload'
import { motion } from 'framer-motion'
import dayjs from 'dayjs'
import { useAddTeacherMutation } from '../Redux/ApiSlice'
import { vert } from '../theme'
import SimpleUpload from '../Custom/SimpleUpload'



const AddTeacher = ({ close, onUpdate }) => {

  const [profile, setProfile] = useState({
    name: '',
    surname: '',
    birthday: '',
    mobile: '',
    email: '',
    password: '',
    rePassword: ''
  })

  //Upload
  const [picture, setPicture] = useState(null);
  const [CV, setCV] = useState('');
  

  //LOADER STATE
  const [loading, setLoading] = useState(false)
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

  const [ADD] = useAddTeacherMutation()
  

  //UPDATE REQUEST

  const handleEdit=()=>{
    console.log(profile);
  }


  //Input Validation and POST REQUEST

  const [validInput, setValidInput] = useState({
    name: false,
    surname: false,
    birthday: false,
    mobile: false,
    email: false,
    password: false,
    rePassword: false
  })

  const [valid, setValid] = useState(true);
  const [valid2, setValid2] = useState(true);

  const handleSubmit = (e)=>{
    e.preventDefault()

    if(!profile.name){
      setValidInput({ 
        name: true,
        surname: false,
        birthday: false,
        mobile: false,
        email: false,
        password: false,
        rePassword: false,
      })
      setValid(true)
      setValid2(true)
      window.scrollTo(0, 0)
    }else if(!profile.surname){
      setValidInput({ 
        name: false,
        surname: true,
        birthday: false,
        mobile: false,
        email: false,
        password: false,
        rePassword: false,
      })
      setValid(true)
      setValid2(true)
      window.scrollTo(0, 0)
    }else if(!profile.birthday){
      setValidInput({ 
        name: false,
        surname: false,
        birthday: true,
        mobile: false,
        email: false,
        password: false,
        rePassword: false,
      })
      setValid(true)
      setValid2(true)
    }else if(!CV){
      setValidInput({ 
        name: false,
        surname: false,
        birthday: false,
        mobile: false,
        email: false,
        password: false,
        rePassword: false,
      })
      setValid2(false)
      setValid(true)
    }else if(profile.mobile.length !== 9 ){
      setValidInput({ 
        name: false,
        surname: false,
        birthday: false,
        mobile: true,
        email: false,
        password: false,
        rePassword: false,
      })
      setValid(true)
      setValid2(true)
    }else if(!profile.email){
      setValidInput({ 
        name: false,
        surname: false,
        birthday: false,
        mobile: false,
        email: true,
        password: false,
        rePassword: false,

      })
      setValid2(true)
      setValid(true)
    }else if(profile.password.length < 8 ){
      setValidInput({ 
        name: false,
        surname: false,
        birthday: false,
        mobile: false,
        email: false,
        password: true,
        rePassword: false,

      })
      setValid2(true)
      setValid(true)
    }else if( profile.password !== profile.rePassword){
      setValidInput({ 
        name: false,
        surname: false,
        birthday: false,
        mobile: false,
        email: false,
        password: false,
        rePassword: true,

      })
      setValid2(true)
      setValid(true)
    }else if(!picture){
      setValidInput({ 
        name: false,
        surname: false,
        birthday: false,
        mobile: false,
        email: false,
        password: false,
        rePassword: false,
      })
      setValid2(true)
      window.scrollTo(0, 0)
      setValid(false)
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
        password: false,
        rePassword: false
      })
      setValid(true)
      setValid2(true)

      setLoading(true);
      const formData = new FormData();
      let payload = {...profile};
      let payloadFile = {picture: picture, cv: CV};

      for ( let file in payloadFile ) {
        formData.append('file', payloadFile[file]);
      }

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
          password: '',
          rePassword: ''
        })
        close()

      })
      .catch(err=>{
        showMessage('success', err.data.message, 'Add Task', 7000, 'top-center');
        setLoading(false);
      })

    }
    
  }










  return (
    <Grid justifyContent={'center'} gridTemplateColumns={{base: '1fr', md:'500px'}} mt={8}
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
            //bg: 'blue.400',
            bgGradient: 'linear-gradient(-135deg, #010101, #60c94c)',
            opacity: 0.7,
            borderTopLeftRadius: '20px',
            borderTopRightRadius:'20px',
          }}
          >
           <Text zIndex={10} fontSize={'2xl'} fontWeight={600} fontFamily={'Poppins'} textAlign={'center'} color={'white'}>Registration</Text> 
          </Flex>

            <Flex mt={6} px={6} gap={4} justifyContent={'space-between'}>
              <Box>
                <FormControl>
                  <FormLabel gap={2} display={'flex'} alignItems={'center'}><Icon color={vert} as={FaUserCircle} /> Name</FormLabel>
                  <Input id='1' onChange={e =>setProfile({...profile, name: e.target.value })} value={profile?.name} type='text' placeholder="Teacher's name" minW={'300px'}  name='name' ref={inputRef} required/>
                  { validInput.name && <FormHelperText color={'red.400'}> This field is required! </FormHelperText>}
                </FormControl>

                <FormControl mt={2}>
                  <FormLabel gap={2} display={'flex'} alignItems={'center'}><Icon color={vert} as={BiUser} /> Surname</FormLabel>
                  <Input type='text' id='2' onChange={e =>setProfile({...profile, surname: e.target.value })} value={profile?.surname} placeholder="Teacher's Surname" minW={'300px'} name='surname' ref={inputRef}  required/>
                  { validInput.surname && <FormHelperText color={'red.400'}> This field is required! </FormHelperText>}
                </FormControl>

                <FormControl mt={2}>
                  <FormLabel gap={2} display={'flex'} alignItems={'center'}><Icon color={vert} as={FiMail}/> Email Adress</FormLabel>
                  <Input type='email' id='3' onChange={e =>setProfile({...profile, email: e.target.value })} value={profile?.email} disabled={onUpdate} placeholder='sample@gmail.com' name='email' ref={inputRef}  minW={'300px'} />
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

              <Text textAlign={'center'} mt={5}>Personnal data</Text>

              <FormControl mt={1}>
                <FormLabel gap={2} mt={1} display={'flex'}><Icon color={vert} as={FiGift}/>Birthday</FormLabel>
                <Input name='date' id='5' ref={inputRef} type='date' onChange={e =>setProfile({...profile, birthday: e.target.value })} value={dayjs(profile.birthday).format('YYYY-MM-DD')} minW={'300px'} />
                { validInput.birthday && <FormHelperText color={'red.400'}> This field is required! </FormHelperText>}
              </FormControl>

              <FormControl mt={1}>
                <FormLabel gap={2}  display={'flex'}> <Icon color={vert} as={FiPhone}/>Mobile</FormLabel>
                <Input type='number' name='phone' ref={inputRef} onChange={e =>setProfile({...profile, mobile: e.target.value })} value={profile.mobile} placeholder='Your phone number' minW={'300px'} />
                { validInput.mobile && <FormHelperText color={'red.400'}> Phone number must be 9 digits </FormHelperText>}
              </FormControl>
              
              <FormControl>
                <FormLabel alignItems={'center'}  gap={2} mt={2} display={'flex'}> <FiFolder/> Curriculum Vitae (cv) </FormLabel>
                <SimpleUpload handleChange={setCV} valid={valid2} setValid={setValid2} /> 
                { !valid2 && <FormHelperText color={'red.400'}> This field is required! </FormHelperText>}
              </FormControl>

              <FormControl mt={2}>
                <FormLabel>Password</FormLabel>
                <Input type='password' id='6' name='password' ref={inputRef}  onChange={e =>setProfile({...profile, password: e.target.value })} disabled={onUpdate} placeholder='set a password' minW={'300px'} />
                { validInput.password && <FormHelperText color={'red.400'}> Password must be 8 strings at least! </FormHelperText>}
              </FormControl>

              <FormControl mt={2}>
                <FormLabel>Re Password</FormLabel>
                <Input type='password' name='Repassword' id='7' ref={inputRef} onChange={e =>setProfile({...profile, rePassword: e.target.value })} disabled={onUpdate} placeholder='Confirm Your Password' minW={'300px'} />
                { validInput.rePassword && <FormHelperText color={'red.400'}> Password doesn't match! </FormHelperText>}
              </FormControl>


              <ButtonGroup spacing='6' mt={8} justifyContent={'center'} w={"full"}>
                <Button  w={'30%'} onClick={close}>Annuler</Button>
                <Button colorScheme='green' bg={vert} w={'30%'}  isLoading={loading} loadingText={'traitement...'} onClick={ !onUpdate ? handleSubmit : handleEdit}>Enregistrer</Button>
              </ButtonGroup>

            </Box>


        </GridItem>
    </Grid>
    
  )
}

export default AddTeacher