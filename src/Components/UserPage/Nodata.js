import { Flex, Heading, Image } from '@chakra-ui/react'
import React from 'react'
import image from '../../assets/images/Dashboard/datanotfound.png'
const Nodata = () => {
  return (
    <Flex mb={6} flexDir={'column'} align={'center'} justify={'center'}>
        <Image src={image} maxW={{base: '6em', md: '6em'}} opacity={0.9} /> 
        <Heading mt={3} fontSize={'sm'} color={'gray.400'} fontWeight={400}>Aucune données</Heading>
    </Flex>
  )
}

export default Nodata
