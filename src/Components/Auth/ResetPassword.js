import { Button, Flex, FormControl, FormHelperText, Grid, GridItem, HStack, Heading, Input, InputGroup, InputRightElement, Link, Stack, Text, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import { FaUser } from 'react-icons/fa'
import { useCallback, useState } from 'react'
import img from '../../assets/Preparing.jpg'
import { useNavigate } from 'react-router-dom'

const ResetPassword = () => {

    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const [message, setMessage] = useState({
        email: 'This fields is required',
        password: 'This fields is required'
    })
    const [payload, setPayload] = useState({
        email: '',
        password: ''
    })
    const [valid, setValid] = useState({
        email: false,
        password: false
    })

    const handleSubmit = ()=>{

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

        <Grid gridTemplateColumns={'350px'} gap={2} gridRow={'300px'} minH={'400px'}>
            <GridItem border={'2px solid rgba(255, 255, 255, .2)'} backdropFilter={'blur(20px)'} bg={'rgba(255, 255, 255, .2)'} boxShadow={ '0 0 12px rgba(0, 0, 0, 0.5)'} rounded={'20px'}  p={6} >
                <Heading fontSize={'3xl'} color={'white'} textAlign={'center'} my={2}>Reset Password</Heading>
                <Text textAlign={'center'} color={'white'}>No worry you can easily reset your password..</Text>
            
                <FormControl mt={8} id="email">
                    <InputGroup>
                        <Input onChange={e=> setPayload({...payload, email: e.target.value})} type="email" placeholder='username or email' _placeholder={{color: 'gray.400'}} bg={'white'} rounded={'4px'} h={'42px'} _focusVisible={{
                            bg: useColorModeValue('white', 'gray.600')
                        }}
                         />
                        <InputRightElement   mt={1} color={'gray.400'}>
                            <FaUser/>
                        </InputRightElement>
                    </InputGroup>
                    {valid.email && <FormHelperText color={'red.500'}>{message.email} </FormHelperText>}
                </FormControl>
                
                <Stack spacing={6} mt={2}>
                    
                    <Button isLoading={loading} onClick={handleSubmit} colorScheme={'blue'} variant={'solid'}>
                        Reset Password
                    </Button>
                    <HStack justifyContent={'center'}>
                        <Text color={'white'}>You already have an account ?</Text>
                        <Link onClick={()=>setTimeout(navigate, 0, '/login')}color={'blue.500'}>Sign In</Link>
                    </HStack>

                    { true && 
                        <><Text color={'white'}>
                            Vous avez reçu un courriel contenant un lien pour reinitialiser votre mot de passe et d'acceder a votre compte 
                            <span style={{color: 'red'}}>  userEmail@gmail.com</span>
                        </Text>

                        <HStack justifyContent={'center'}>
                            <Text color={'white'}>Vous n'avez pas reçu le mail ?</Text>
                            <Link onClick={()=>setTimeout(navigate, 0, '/login')} color={'blue.500'}> renvoyer</Link>
                        </HStack>
                    </>}

                </Stack>
                
            </GridItem>
        </Grid>

    </Flex>
  )
}

export default ResetPassword