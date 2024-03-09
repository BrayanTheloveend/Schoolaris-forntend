import { Box, Flex, Heading, Text } from '@chakra-ui/react'
import React from 'react'




const Events = ({event}) => {
  return (
    <Flex justifyContent={'flex-start'} alignItems={'center'} gap={4}>
        <Box p={4} textAlign={'center'} borderRadius={'16px'} w={'55px'} h={'55px'} pos={'relative'} overflow={'hidden'} bg={'white'} boxShadow={'0 0 10px rgba(0, 0, 0, 0.1)'}>
          <Heading color={'gray.600'} fontSize={'xl'}>{event.date.slice(0,2)}</Heading>
          <Text as={'span'} color={'#fff'} bg={'blue.400'} position={'absolute'} bottom={0} left={0} w={'full'}>{event.date.slice(3,6)}</Text>
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