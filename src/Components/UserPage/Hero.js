import { Flex, Heading, Image, Stack, Button, Text, useBreakpointValue } from '@chakra-ui/react'
import React from 'react'
import { primaryLight } from '../theme'
import image from '../../assets/images/bgstudent.webp'

const Hero = () => {
  return (
    <>
      <Stack minH={'100vh'} mb={10}  direction={{ base: 'column', md: 'row' }}>
      <Flex p={6} flex={1} mt={useBreakpointValue({ base: '20', md: '' })} align={'center'} justify={'center'}>
        <Stack spacing={6} w={'full'} maxW={'lg'}>
          <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
            <Text
              as={'span'}
              position={'relative'}
              _after={{
                width: 'full',
                height: useBreakpointValue({ base: '20%', md: '30%' }),
                position: 'absolute',
                bottom: 1,
                left: 0,
                zIndex: -1,
              }}>
              Bienvenue sur 
            </Text>
            <br />{' '}
            <Text color={'blue.400'} as={'span'}>
              Schoolaris
            </Text>{' '}
          </Heading>
          <Text fontSize={{ base: 'md', lg: 'lg' }} color={'gray.500'}>
            la plateform de gestion et de coolaborations des <span style={{color: primaryLight}}>universités du cameroun. </span>
            Fini la paperas !
          </Text>
          <Stack direction={{ base: 'column', md: 'row' }} mt={6} spacing={4}>
            <Button
              rounded={'full'}
              colorScheme='blue'>
              En savoir plus
            </Button>
            <Button rounded={'full'}>Consulter</Button>
          </Stack>
        </Stack>
      </Flex>
      
      <Flex flex={1} mt= { useBreakpointValue({ base: '5', md: '15', })}
          
      >
        <Image
          alt={'Login Image'}
          objectFit={'cover'}
          src={image}
        />
      </Flex>
    </Stack>
    </>
  )
}

export default Hero