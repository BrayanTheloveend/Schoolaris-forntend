import { Flex, Heading,  Stack, Button, Text, useBreakpointValue } from '@chakra-ui/react'
import React from 'react'
import { vert } from '../theme'
import image from '../../assets/Preparing.jpg'
import { useNavigate } from 'react-router-dom'

const Hero = () => {
  const navigate = useNavigate()
  return (
    <>
      <Stack w={'100vw'}  position={'relative'} mb={10}  direction={{ base: 'column', md: 'row' }}
      _before={{
        display: 'block',
        position: 'absolute',
        content: "''",
        width: '100%',
        top: 0,
        bottom: 0,
        bg: '#000',
        bgGradient: 'linear-gradient(0deg, transparent, #000)',
        opacity: 0.6,
      }} h={'100vh'} justify={'center'} align={'center'} bg={`url(${image})`} bgSize={'cover'}>

      <Flex p={6} zIndex={100} flex={1} mt={useBreakpointValue({ base: '40', md: '' })} align={'center'} justify={'center'}>
        <Stack spacing={6} w={'full'} maxW={'lg'}>
          <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
            <Text
              as={'span'}
              position={'relative'}
              fontWeight={500}
              color={'white'}
             >
              Bienvenue sur 
            </Text>
            <br />{' '}
            <Text color={vert} as={'span'}>
              Schoolaris
            </Text>{' '}
          </Heading>
          <Text fontSize={{ base: 'md', lg: 'lg' }} color={'white'}>
            la plateform de gestion des etudiants <span style={{color: vert}}> des institut universitaire au cameroun. </span>
            Fini la paperas !
          </Text>
          <Stack direction={{ base: 'column', md: 'row' }} mt={6} spacing={4}>
            <Button
              onClick={()=>navigate('/login')}
              colorScheme='green'
              bg={vert}
              >
              Commencer
            </Button>
            <Button as={'a'} href='#aboutUs'>en savoir plus</Button>
          </Stack>
        </Stack>
      </Flex>
      
      <Flex flex={1} mt= { useBreakpointValue({ base: '5', md: '15', })}>
       
      </Flex>

      </Stack>
      {/* <Stack minH={'100vh'} mb={10}  direction={{ base: 'column', md: 'row' }}>
      
    </Stack> */}
    </>
  )
}

export default Hero