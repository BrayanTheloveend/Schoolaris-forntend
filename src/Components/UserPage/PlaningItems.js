import { Box, Flex, Heading, Text, useColorModeValue } from '@chakra-ui/react'
import React from 'react'



const PlaningItems = ({data}) => {
  return (
    <Flex pb={4} px={2} w={{base: 'full', md: '480px'}} borderBottom={'1px solid'} borderColor={useColorModeValue('#efefef', 'gray.700')}  justify={'space-between'}align={'center'}>
        <Box>
            <Text>Specialité</Text>
            <Heading fontSize={'md'} mt={2} noOfLines={2} fontWeight={400}>{data.name} {data.level}</Heading>
        </Box>
        <Box>
            <Text>Matiére</Text>
            <Heading fontSize={'md'} mt={2} fontWeight={400} noOfLines={2} fontFamily={'Montserrat'}>{data.unit}</Heading>
        </Box>

        <Box>
            <Text>{data.day}</Text>
            <Heading fontSize={'md'} mt={2} fontWeight={400} fontFamily={'Montserrat'}>{data.start}h - {data.end}h</Heading>
        </Box>

    
    </Flex>
  )
}

export default PlaningItems
