import { Box, Flex, Image, Text, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import image from '../../assets/images/Dashboard/doc3.png'

const UploadDoc = ({show, valid}) => {
  return (
    <Flex flexDir={'column'} gap={1}>
        <Box w={'130px'} display={'flex'} justifyContent={'center'} alignItems={'center'} rounded={'full'} h={'130px'} border={'2px dashed'} borderColor={valid ? (show ? 'blue.400' : 'green.400' ) : 'red.400'}>
            <Image src={image} w={'80px'} opacity={0.6} />
        </Box>
       
        <Text fontSize={'xs'} noOfLines={1} color={valid ? (show ? 'blue.400' : 'green.400' ) : 'red.400'} textAlign={'center'} mt={4} fontWeight={600}>{ show ?' Cliquer pour ajouter ...' : 'Image Ajoutée'} </Text>
    </Flex>
  )
}

export default UploadDoc