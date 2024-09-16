import { Box, Button, Flex, FormControl, FormHelperText, FormLabel, Grid, GridItem, Heading, HStack, Icon, Image, Input, InputGroup, InputRightElement, Select, Skeleton, Text, useToast } from '@chakra-ui/react'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import img1 from '../../assets/stud.jpg'
import img2 from '../../assets/teach.jpg'
import { FaCheck } from 'react-icons/fa'
import { vert } from '../theme'
import { useAddStudentMutation, useAddTeacherMutation, useGetSubjectQuery } from '../Redux/ApiSlice'
import { useNavigate } from 'react-router-dom'
import { FiEye, FiEyeOff, FiGitBranch } from 'react-icons/fi'
import SimpleUpload from '../Custom/SimpleUpload'
import Upload from '../Custom/Upload'
import dayjs from 'dayjs'

const Registration = () => {

  const [role, setRole]=useState(false)

   // STUDENT DATA
   const [profile, setProfile] = useState({
    name: '',
    surname: '',
    birthday: '',
    mobile: '',
    email: '',
    idSubject: '/',
    password: '',
    rePassword: ''
  })

  //LOADER STATE
  const [loading, setLoading] = useState(false)
  const [file , setFile]= useState(null)
  const [valid2 , setValid2]= useState(true)

  //Upload
  const [picture, setPicture] = useState(null);
  const [valid, setValid] = useState(true);
  const inputRef = useRef()
  const navigate = useNavigate()

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
  } = useGetSubjectQuery()

  const [ADD] = useAddStudentMutation()
  const [AD] = useAddTeacherMutation()

//GETSTUDENTS

  useEffect(() => {
    if(isError){
      if(error.status=== 401){
        navigate('/login')
      }
      //console.log(error.error);
      //return showMessage('error',error.message, 'Fetch Task')
    }else if(isSuccess){
      //console.log(data);
      //showMessage('success', `${data.length} items found`, 'Fetch Task')
    }
  }, [isSuccess, isError, error, isLoading, data, showMessage, navigate])


  //Hide/Show password

  const [passwordType, setPasswordType] = useState(false)
  const [passwordType2, setPasswordType2] = useState(false)


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


  const handleSubmitOne = ()=>{

    if(!profile.email){
      setValidInput({ 
        name: false,
        surname: false,
        birthday: false,
        mobile: false,
        email: true,
        password: false,
        rePassword: false,
      })
      setValid(true)
      window.scrollTo(0, 0)
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
      setValid(true)
      window.scrollTo(0, 0)
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
      window.scrollTo(0, 100)
    }else if(!profile.name){
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
      setValid(true)
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
      setValid(true)
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
      setValid(true)

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
      setValid(true)
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
      setValid(true)
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
      setValid(true)
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
      setValid(true)

      setLoading(true);
      const formData = new FormData();
      let payload = {...profile, file: picture};

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

      })
      .catch(err=>{
        showMessage('error', err.data.message, 'Add Task', 7000, 'top-center');
        setLoading(false);
      })

      
    }
  }



  const handleSubmitTwo = ()=>{

    if(!profile.email){
      setValidInput({ 
        name: false,
        surname: false,
        birthday: false,
        mobile: false,
        email: true,
        password: false,
        rePassword: false,
      })
      window.scrollTo(0, 0)
    }else if(!profile.name){
      setValidInput({ 
        name: true,
        surname: false,
        birthday: false,
        mobile: false,
        email: false,
        password: false,
        rePassword: false,
      })
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
    }else if(!file){
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

      setLoading(true);
      const formData = new FormData();
      let payload = {...profile};
      let payloadFile = {picture: picture, cv: file};

      for ( let file in payloadFile ) {
        formData.append('file', payloadFile[file]);
      }

      for ( let key in payload ) {
        formData.append(key, payload[key]);
      }

      AD(formData).unwrap()
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


      })
      .catch(err=>{
        showMessage('success', err.data.message, 'Add Task', 7000, 'top-center');
        setLoading(false);
      })

    }
    
  }



  

  return (
    <Grid pt={10} gridTemplateColumns={{base: '1fr', md:'500px'}} justifyContent={'center'} gap={4}>
      <GridItem p={4} display={'flex'} flexDir={'column'} gap={0} justifyContent={'center'} >
      {/* <GridItem bg={`url(${img})`} 
     
      minH={'100vh'} 
      bgPos={'center'} 
      bgSize={'cover'} 
      pos={'relative'}
      _before={{
        display: 'block',
        position: 'absolute',
        content: "''",
        width: '100%',
        top: 0,
        bottom: 0,
        //bg: vert,
        bgGradient: `linear-gradient(-140deg, transparent, ${vert})`,
        opacity: 0.7,
      }}
      >
        
       
      </GridItem> */}
        
  
      <Box>
        <Heading fontWeight={500} fontSize={'2xl'} mb={8} textAlign={'center'}>
         { !role ? `S'inscrire` : 'Postuler' }
        </Heading>
        <Box mt={8}>
          <Text fontSize={'md'}>Dite nous</Text>
          <Heading fontSize={'xl'} fontWeight={500}>
            Qui êtes vous ? 
          </Heading>
        </Box>
        <Flex p={4} px={8} my={4} gap={10} justify={'space-between'} align={'center'}>

          <Flex p={2} justify={'center'} align={'center'} flexDir={'column'} gap={4}>
            <Image w={'160px'} 
            border={'1px solid'} 
            transition={'ease-in-out 0.4s'} 
            borderColor={!role ? 'green.400' : 'gray.200'} 
            _hover={{ borderColor: 'green.400'}}  
            rounded={20} src={img1} onClick={()=>setRole(false)}/>
            <Flex gap={4} 
            justify={'center'} 
            align={'center'}
          >
              {!role && <Icon color={'green.400'} as={FaCheck}/>}
              <Text fontSize={'md'} color={!role && 'green.400'}>Étudiant</Text>
            </Flex>
          </Flex>
          <Flex p={2} justify={'center'} align={'center'} flexDir={'column'} gap={4} >
            <Image 
            w={'160px'} 
            border={'1px solid'} 
            transition={'ease-in-out 0.4s'} 
            borderColor={role ? 'green.400' : 'gray.200'} 
            _hover={{ borderColor: 'green.400'}} 
            rounded={20} src={img2} onClick={()=>setRole(true)}/>
            <Flex gap={4} 
            justify={'center'} 
            align={'center'}
           >
              {role && <Icon color={'green.400'} as={FaCheck}/>}
              <Text fontSize={'md'} color={role && 'green.400'}>Professeur</Text>
            </Flex>
          </Flex>

        </Flex>
        
        <FormControl>
          <FormLabel gap={2} display={'flex'} alignItems={'center'} fontWeight={400} fontSize={'md'}>  Votre courriel </FormLabel>
          <Input id='1' h={'40px'} type='text' onChange={e =>setProfile({...profile, email: e.target.value })} value={profile?.email} p={4} placeholder="adresse email" minW={'300px'}  fontSize={'md'} name='name' _focus={{
            borderColor: 'green.400'
          }} _focusVisible={{
              borderColor: 'green.400'
          }}  required/>
        { validInput.email && <FormHelperText color={'red.400'}> Ce champ est requis! </FormHelperText>}
        </FormControl>

        { role ? 
          <FormControl mt={4}>
          <FormLabel gap={2} display={'flex'} alignItems={'center'} fontWeight={400} fontSize={'md'}> Nous aurons besoin de votre CV !</FormLabel>
          <SimpleUpload handleChange={setFile} valid={valid2} setValid={setValid2}/>
          { !valid2 && <FormHelperText color={'red.400'}> Ce champ est requis! </FormHelperText>} 
        </FormControl>

        :

          <FormControl mt={4}>
            <FormLabel alignItems={'center'} fontWeight={400}  gap={2} mt={1} display={'flex'}> <Icon color={vert} as={FiGitBranch}/> Filiére </FormLabel>
            <Skeleton isLoaded={isSuccess} _focus={{
            borderColor: 'green.400'
          }} _focusVisible={{
              borderColor: 'green.400'
          }}>
              <Select 
              name='subject'
              id='2'
              placeholder='Choisir une Filiére'
              defaultValue={'Choisir une Filiére'}
              onChange={e=> setProfile({...profile, idSubject: e.target.options[e.target.options.selectedIndex].id})}
              >
                {
                  isSuccess && data.map(item=> <option value={item.id} id={item.id} key={item.id}>{item.name} / Niveau:  {item.level} </option>)
                }
              </Select>
            </Skeleton>
            { validInput.idSubject && <FormHelperText color={'red.400'}> Ce champ est requis! </FormHelperText>}
          </FormControl>
        
        }

        <Box mt={12} mb={8}>
          <Text fontSize={'md'}>Dite nous en plus</Text>
          <Heading fontSize={'xl'} fontWeight={500}>
            A propos de vous
          </Heading>
        </Box>

        <Upload handleChange={setPicture} valid={valid} />

        <FormControl mt={4}>
          <FormLabel gap={2} display={'flex'} alignItems={'center'} fontWeight={400}> Votre Nom  </FormLabel>
          <Input id='3' h={'40px'} onChange={e =>setProfile({...profile, name: e.target.value })} value={profile.name} type='text' placeholder="noms de l'etudiant" minW={'300px'} _focus={{
            borderColor: 'green.400'
          }} _focusVisible={{
              borderColor: 'green.400'
          }}  name='name' ref={inputRef} required/>
          { validInput.name && <FormHelperText color={'red.400'}> Ce champ est requis! </FormHelperText>}
        </FormControl>

        <FormControl mt={4}>
          <FormLabel gap={2} display={'flex'} alignItems={'center'} fontWeight={400}>  Votre Prenoms  </FormLabel>
          <Input type='text' h={'40px'} id='4' onChange={e =>setProfile({...profile, surname: e.target.value })} value={profile.surname} placeholder="Prenoms de l'etudiant" minW={'300px'} _focus={{
            borderColor: 'green.400'
          }} _focusVisible={{
              borderColor: 'green.400'
          }} name='surname' ref={inputRef}  required/>
          { validInput.surname && <FormHelperText color={'red.400'}> Ce champ est requis! </FormHelperText>}
        </FormControl>

        <FormControl mt={4}>
          <FormLabel gap={2} display={'flex'} alignItems={'center'} fontWeight={400}>  Votre Telephone  </FormLabel>
          <Input type='tel' h={'40px'} id='4' onChange={e =>setProfile({...profile, mobile: e.target.value })} value={profile.mobile} placeholder="Prenoms de l'etudiant" minW={'300px'} _focus={{
            borderColor: 'green.400'
          }} _focusVisible={{
              borderColor: 'green.400'
          }} name='mobile' ref={inputRef}  required/>
          { validInput.mobile && <FormHelperText color={'red.400'}> exemple  6 78 58 15 21 </FormHelperText>}
        </FormControl>

        <FormControl mt={4}>
          <FormLabel gap={2} mt={1} display={'flex'} fontWeight={400}>Votre date de naissance</FormLabel>
          <Input name='date' id='5' ref={inputRef} type='date' onChange={e =>setProfile({...profile, birthday: e.target.value })} value={dayjs(profile.birthday).format('YYYY-MM-DD')} _focus={{
            borderColor: 'green.400'
          }} _focusVisible={{
              borderColor: 'green.400'
          }} minW={'300px'} />
          { validInput.birthday && <FormHelperText color={'red.400'}> Ce champ est requis! </FormHelperText>}
        </FormControl>

        <Box mt={12} mb={8}>
          <Text fontSize={'md'}>Question de </Text>
          <Heading fontSize={'xl'} fontWeight={500}>
            Securité
          </Heading>
        </Box>


        <FormControl mt={4}>
          <FormLabel fontWeight={400}>Mot de passe</FormLabel>
          <InputGroup>
            <Input h={'40px'} value={profile.password} type={passwordType2 ? 'text' : 'password'} id='6' name='password' ref={inputRef}  onChange={e =>setProfile({...profile, password: e.target.value })} placeholder='Definir un mot de passe' minW={'300px'} _focus={{
            borderColor: 'green.400'
          }} _focusVisible={{
              borderColor: 'green.400'
          }} />
            <InputRightElement onClick={()=>setPasswordType2(!passwordType2)}>
              <Icon as={passwordType2 ? FiEyeOff : FiEye} color={vert}/>
            </InputRightElement>
          </InputGroup>
          { validInput.password && <FormHelperText color={'red.400'}> Le mot de passe doit contenir au moins 8 caractéres </FormHelperText>}
        </FormControl>

        <FormControl mt={4}>
          <FormLabel fontWeight={400}>Confirmer le mot de passe</FormLabel>
          <InputGroup>
            <Input h={'40px'} value={profile.rePassword} type={passwordType ? 'text' : 'password'} name='Repassword' id='7' ref={inputRef} onChange={e =>setProfile({...profile, rePassword: e.target.value })} placeholder='Confirmer le mot de passe' minW={'300px'} _focus={{
            borderColor: 'green.400'
          }} _focusVisible={{
              borderColor: 'green.400'
          }} />
            <InputRightElement onClick={()=>setPasswordType(!passwordType)}>
              <Icon as={passwordType ? FiEyeOff : FiEye} color={vert}/>
            </InputRightElement>
          </InputGroup>
          { validInput.rePassword && <FormHelperText color={'red.400'}> Les mots de passes ne correpondent pas  </FormHelperText>}
        </FormControl>
        
      
      </Box> 

      <Button isLoading={loading} onClick={!role ? handleSubmitOne :  handleSubmitTwo} mb={8} w={'full'} colorScheme='green' bg={vert} mt={12}  >
        Envoyer
      </Button>

      <HStack justifyContent={'center'}>
        <Text>J'ai déjà un compte </Text>
        <Text cursor={'pointer'} color={'blue.500'} onClick={()=>navigate('/login')}>Se connecter</Text>
      </HStack>

        


        
    </GridItem>
        


      
    
    </Grid>
    
  )
}

export default Registration
