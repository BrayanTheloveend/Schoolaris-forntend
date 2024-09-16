import { Box, Flex, Heading, Image, Text } from '@chakra-ui/react'
import React from 'react'
import { vert } from './Components/theme'
import img from './assets/images/Dashboard/datanotfound.png'
import UserNav from './Components/UserPage/UserNav'
const NotFound = () => {
  return (
    <>
        <Flex w={'full'} p={10} pt={28} h={'full'} gap={4} flexDir={'column'} justifyContent={'center'} alignItems={'center'}>
        <Box>
            <Heading textAlign={'center'} fontSize={{base: '4xl',md:'8xl'}} color={vert}>
                    404  
            </Heading>
            <Heading textAlign={'center'} fontSize={{base: '2xl',md:'6xl'}} color={vert}>
                NOT FOUND  
            </Heading>
        </Box>
        <Image src={img} w={{base: '150px',md:'250px'}}/>

        <Text mt={10} color={'white'} textAlign={'center'} fontWeight={400} fontSize={{base: 'md',md:'xl'}}>
            La page que vous recherche n'est pas disponible !
        </Text>
            
        </Flex>
    </>
  )
}

export default NotFound
