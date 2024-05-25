import { Box, Button, ButtonGroup, Flex, FormControl, FormHelperText, FormLabel, Grid, GridItem, Icon, Input, Select, Skeleton, Text, useColorModeValue, useToast } from '@chakra-ui/react'
import React, { useCallback, useEffect, useState } from 'react'
import bg2 from '../../assets/images/bgteacher.webp' 
import { FiBookmark, FiGitBranch, FiGitCommit, FiGrid } from 'react-icons/fi'
import { useAddUnitMutation, useGetSubjectQuery, useUpdateUnitMutation } from '../Redux/ApiSlice'
import { BiChalkboard } from 'react-icons/bi'
import { vert } from '../theme'

const AddUnit = ({close, onUpdate, cached, setOnUpdate}) => {


const [payload, setPayload] = useState({
    name: '',
    code: '',
    description: '',
    coefficient: '',
    idSubject: '',
    duration: 30
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

    const {
        data,
        isError,
        isSuccess,
        error,
        isLoading
    } = useGetSubjectQuery(JSON.parse(localStorage.getItem('userData'))?.token)
    
    useEffect(() => {
    if(isError){
        if(error.status=== 401){
        //navigate('/login')
        }
        //console.log(error.error);
        showMessage('error',error.message, 'Fetch Task')
    }else if(isSuccess){
        //console.log(data);
        //showMessage('success', `${data.length} items found`, 'Fetch Task')
    }}, [isSuccess, isError, error, isLoading, data, showMessage])

    const [ADD] = useAddUnitMutation()
    const [UPDATE] = useUpdateUnitMutation()


    //Input Validation and POST REQUEST

    const [validInput, setValidInput] = useState({
        name: false,
        code: false,
        description: false,
        coefficient: false,
        idSubject: false,
    })


    const handleSubmit = (e)=>{
        e.preventDefault()

    if(!payload.name){
        setValidInput({ 
            name: true,
            code: false,
            description: false,
            coefficient: false,
            idSubject: false,
        })
    }else if(!payload.code){
        setValidInput({ 
            name: false,
            code: true,
            description: false,
            coefficient: false,
            idSubject: false,
        })
    }else if(!payload.description){
        setValidInput({ 
            name: false,
            code: false,
            description: true,
            coefficient: false,
            idSubject: false,
        })
    }else if(!payload.coefficient ){
        setValidInput({ 
            name: false,
            code: false,
            description: false,
            coefficient: true,
            idSubject: false,
        })
    }else if(!payload.idSubject || payload.idSubject === ''  ){
        setValidInput({ 
            name: false,
            code: false,
            description: false,
            coefficient: false,
            idSubject: true,
        })
    }
    // POST REQUEST  
    else {
        setValidInput({ 
            name: false,
            code: false,
            description: false,
            coefficient: false,
            idSubject: false,
        })
        setLoading(true);

        ADD(payload).unwrap()
        .then(resp =>{
        showMessage('success', resp.message, 'Add Task');
        setLoading(false);
        setPayload({
          name: '',
          code: '',
          description: '',
          coefficient: '',
          idSubject: '',
        })
        close()

        })
        .catch(err=>{
          showMessage('error', err.data.message, 'Add Task', 7000, 'top-center');
          setLoading(false);
        })
    }
}

//UPDATE REQUEST

useEffect(() => {
  
    if(onUpdate){
      setPayload({
        name: cached?.name,
        code: cached?.code,
        description: cached?.description,
        coefficient: cached?.coefficient,
        idSubject: cached?.SubjectId,
    })
  }
  }, [onUpdate, cached?.name, cached?.code, cached?.description, cached?.coefficient, cached?.SubjectId])

  const handleUpdate=()=>{
    setLoading(true);

    UPDATE({...payload, id: cached?.id}).unwrap()
    .then(resp =>{
      showMessage('success', resp.message, 'Update Task');
      setLoading(false);
      setPayload({
        name: '',
        code: '',
        description: '',
        coefficient: '',
        idSubject: '/',
      })
      close()
      setOnUpdate()
    })
    .catch(err=>{
      showMessage('error', err.message, 'Update Task', 7000, 'top-center');
      setLoading(false);
    })
  }

  const closeAndReset =()=>{
    setOnUpdate()
    setPayload({
      name: '',
      code: '',
      description: '',
      coefficient: '',
      idSubject: '/',
    })
    close()
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
            bgGradient: 'linear-gradient(-135deg, #010101, #60c94c)',
            opacity: 0.7,
            borderTopLeftRadius: '20px',
            borderTopRightRadius:'20px',
          }}
          >
           <Text zIndex={10} fontSize={'2xl'} fontWeight={600} fontFamily={'Poppins semibold'} textAlign={'center'} color={'white'}>Ajouter un cour</Text> 
        </Flex>

          <Box p={6}>
            <FormControl>
              <FormLabel gap={2} display={'flex'} alignItems={'center'}><Icon color={vert} as={FiGrid}/>Noms</FormLabel>
              <Input type='text' onChange={e =>setPayload({...payload, name: e.target.value })} value={payload.name} placeholder='Classe Name' minW={'300px'} />
              { validInput.name && <FormHelperText color={'red.400'}> Ce champ est requis! </FormHelperText>}
            </FormControl>

            <Flex align={'center'} justify={'space-between'} mt={2} gap={2}>
              <FormControl>
                <FormLabel gap={2} display={'flex'} alignItems={'center'}><Icon color={vert} as={FiBookmark}/>code</FormLabel>
                <Input type='text' onChange={e =>setPayload({...payload, code: e.target.value })} value={payload.code} placeholder='Mention code' />
                { validInput.code && <FormHelperText color={'red.400'}> Ce champ est requis! </FormHelperText>}
              </FormControl>

              <FormControl>
                <FormLabel gap={2} display={'flex'} alignItems={'center'}><Icon color={vert} as={BiChalkboard}/> Coefficient</FormLabel>
                <Input type='number' onChange={e =>setPayload({...payload, coefficient: e.target.value })} value={payload.coefficient} placeholder='Coefficient' />
                { validInput.coefficient && <FormHelperText color={'red.400'}> Ce champ est requis! </FormHelperText>}
              </FormControl>
            </Flex>

            <FormControl>
                <FormLabel alignItems={'center'}  gap={2} mt={2} display={'flex'}> <Icon color={vert} as={FiGitBranch}/> Filiére </FormLabel>
                <Skeleton isLoaded={isSuccess} >
                  <Select 
                   
                  defaultValue={onUpdate && cached.SubjectId}
                  placeholder='Select subject'
                  disabled={onUpdate ? true : false}
                  onChange={e=> setPayload({...payload, idSubject: e.target.options[e.target.options.selectedIndex].id})}
                  >
                    {
                      isSuccess && data.map(item=> <option value={item.id} id={item.id} key={item.id}> {item.name} / Niveau:  {item.level} </option>)
                    }
                    
                  </Select>
                </Skeleton>
                { validInput.idSubject && <FormHelperText color={'red.400'}> Ce champ est requis! </FormHelperText>}
            </FormControl>

            <FormControl mt={2}>
              <FormLabel gap={2} display={'flex'} alignItems={'center'}> <Icon color={vert} as={FiGitCommit}/>Description</FormLabel>
              <Input type='text' placeholder='Add description here' onChange={e =>setPayload({...payload, description: e.target.value })} value={payload.description} minW={'300px'} />
              { validInput.description && <FormHelperText color={'red.400'}> Ce champ est requis! </FormHelperText>}
            </FormControl>
                
          </Box>
              
          <ButtonGroup spacing='6' mt={8} justifyContent={'center'} w={"full"}>
            <Button  w={'30%'} onClick={closeAndReset} >Annuler</Button>
            <Button colorScheme='green' bg={vert} w={'30%'} isLoading={loading}  onClick={ onUpdate ? handleUpdate : handleSubmit}>Enregistrer</Button>
            
          </ButtonGroup>

        </GridItem>
    </Grid>
  )
}

export default AddUnit