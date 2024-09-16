import { Box, Flex, Heading, Text, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import { vert } from '../theme'




const Events = ({event}) => {
  return (
    <Flex justifyContent={'flex-start'} alignItems={'center'} gap={4}>
        <Box p={4} textAlign={'center'} borderRadius={'16px'} w={'55px'} h={'55px'} pos={'relative'} overflow={'hidden'} bg={useColorModeValue('white', 'gray.700')} boxShadow={'0 0 10px rgba(0, 0, 0, 0.1)'}>
          <Heading color={useColorModeValue('gray.600', 'white')} fontSize={'xl'}>{event.slice(0,2)}</Heading>
          <Text as={'span'} color={'#fff'} bg={vert} position={'absolute'} bottom={0} left={0} w={'full'}>{event.slice(3,5)}</Text>
        </Box>

        <Box>
            <Flex>
                <Text noOfLines={1} fontSize={'15px'} fontWeight={500} color={'gray.700'}>{event.title}</Text>
            </Flex>
          
            <Text noOfLines={1} fontSize={'13px'} color={'gray.700'}>{event.description}</Text>
        </Box>

        
    </Flex>


  )
}

export default Events