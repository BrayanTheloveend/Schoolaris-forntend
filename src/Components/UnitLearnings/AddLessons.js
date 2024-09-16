import { Box, Button, ButtonGroup, Flex, FormControl, FormHelperText, FormLabel, Grid, GridItem, Icon, Input, Select, Skeleton, Text, useColorModeValue, useToast } from '@chakra-ui/react'
import React, { useCallback, useEffect, useState } from 'react'
import bg2 from '../../assets/images/bgteacher.webp'
import { FiFile, FiGitBranch, FiGrid } from 'react-icons/fi'
import { vert } from '../theme'
import { useAddLessonMutation, useGetTeacherByUnitIdQuery } from '../Redux/ApiSlice'
import { useParams } from 'react-router-dom'
import SimpleUpload from '../Custom/SimpleUpload'


const AddLessons = ({onUpdate, cached, setShow}) => {

    const { id, index }=useParams()

    const [payload, setPayload] = useState({
        title: '',
        idTeacher: '',
        idSubject: index,
        idUnit: id
    })
    const [file , setFile]= useState(null)
    const [loading , setLoading]= useState(false)
    const [valid2 , setValid2]= useState(true)

    const [validInput, setValidInput] = useState({
        title: false,
        idTeacher: false,
        idSubject: false,
    })

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
  } = useGetTeacherByUnitIdQuery(id)

  useEffect(() => {
    if(isError){
      if(error.status=== 401){
        //navigate('/login')
      }else if(error.status=== 409){
        //console.log(error.error);
        showMessage('warning', 'Aucun professeur pour cette UA', 'Fetch Task')
      }
    }else if(isSuccess){
      //console.log(data);
      //showMessage('success', `${data.length} items found`, 'Fetch Task')
    }
  }, [isSuccess, isError, error, isLoading, data, showMessage])


//UPDATE REQUEST

useEffect(() => {
  
    if(onUpdate){
      setPayload({
        title: cached?.title,
        idTeacher: cached?.idTeacher,
        idSubject: cached?.idSubject,
        file: cached?.file
    })
  }
  }, [onUpdate, cached?.title, cached?.idTeacher, cached?.idSubject, cached?.file])


//POST REQUEST

const [ADD] = useAddLessonMutation()


const handleSubmit =()=>{

    if(!payload.title){
        setValidInput({
            title: true,
            idTeacher: false,
            idSubject: false,
            file: false
        })
    }else if(!payload.idTeacher || payload.idTeacher === ''){
        setValidInput({
            title: false,
            idTeacher: true,
            idSubject: false,
            file: false
        })
    }else if(!payload.idSubject || payload.idSubject === ''){
        setValidInput({
            title: false,
            idTeacher: false,
            idSubject: true,
            file: false
        })
    }else if(!file){
      setValidInput({
        title: false,
        idTeacher: false,
        idSubject: false,
        file: false
    })
        setValid2(true)
    }else{
         // POST REQUEST  
        setValidInput({ 
            title: false,
            idTeacher: false,
            idSubject: false,
            file: false
        })
        setLoading(true);

        const formData = new FormData();
        let formPayload = {...payload, file: file };

        for ( let key in formPayload ) {
            formData.append(key, formPayload[key]);
        }

        ADD(formData).unwrap()
        .then(resp =>{
        showMessage('success', resp.message, 'Add Task');
        setLoading(false);
        setPayload({
            title: '',
            idTeacher: '',
            idSubject: index,
            idUnit: id
        })
        setShow()

        })
        .catch(err=>{
          showMessage('error', err.data.message, 'Add Task', 7000, 'top-center');
          setLoading(false);
        })
    
    }

}

  //Close and Reset Input

  const closeAndReset =()=>{
    setPayload({
        label: '',
        idTeacher: '',
        idSubject: '',
    })
    setShow(false)
  }


  return (
    <Grid justifyContent={'center'} gridTemplateColumns={{base: '1fr', md:'400px'}} mt={14}>
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
        }}>
            <Text zIndex={10} fontSize={'2xl'} fontWeight={600} textAlign={'center'} color={'white'}>Nouvelle Leçon</Text> 
        </Flex>

            <Box p={6}>
                <FormControl>
                    <FormLabel gap={2} display={'flex'} alignItems={'center'}><Icon color={vert} as={FiGrid}/>Intitulé</FormLabel>
                    <Input type='text' onChange={e =>setPayload({...payload, title: e.target.value })} value={payload.title} placeholder='Intitulée du cours' minW={'300px'} />
                    { validInput.name && <FormHelperText color={'red.400'}> Ce champ est requis! </FormHelperText>}
                </FormControl>


                <FormControl>
                    <FormLabel alignItems={'center'}  gap={2} mt={2} display={'flex'}> <Icon color={vert} as={FiGitBranch}/> Professeur </FormLabel>
                    <Skeleton isLoaded={isSuccess} >
                    <Select 
                    defaultValue={onUpdate && cached.idTeacher}
                    placeholder=" Choisir l'auteur " 
                    disabled={onUpdate ? true : false}
                    onChange={e=> setPayload({...payload, idTeacher: e.target.options[e.target.options.selectedIndex].id})}
                    >
                        {
                        isSuccess && <option value={data.id} id={data.id} key={data.id}> {data.name} {data.surname} </option>
                        }
                        
                    </Select>
                    </Skeleton>
                    { validInput.idSubject && <FormHelperText color={'red.400'}> Ce champ est requis! </FormHelperText>}
                </FormControl>

                <FormControl>
                    <FormLabel mt={2} gap={2} display={'flex'} alignItems={'center'}><Icon color={vert} as={FiFile}/>Fichier</FormLabel>
                    <SimpleUpload handleChange={setFile} valid={valid2} setValid={setValid2}/>
                    { valid2 && <FormHelperText color={'red.400'}> Ce champ est requis! </FormHelperText>}
                </FormControl>
            </Box>

            <ButtonGroup spacing='6' mt={8} justifyContent={'center'} w={"full"}>
                <Button  w={'30%'} onClick={closeAndReset} >Annuler</Button>
                <Button colorScheme='green' bg={vert} w={'30%'} isLoading={loading}  onClick={handleSubmit}>Enregistrer</Button>
            </ButtonGroup>

        </GridItem>
    </Grid>
  )
}

export default AddLessons
