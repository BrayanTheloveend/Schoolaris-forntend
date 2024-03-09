import { Avatar, Box, Text, useColorModeValue } from '@chakra-ui/react'
import React from 'react'

const Message = ({data}) => {
  const color = useColorModeValue('gray.600', 'gray.300')
  return (
    <Box px={5} py={2} display={'flex'} justifyContent={'flex-start'} alignItems={'center'} gap={3} w={'full'}>
        <Avatar size={'sm'} src={data.image}/>
        <Box pos={'relative'} display={'flex'} justifyContent={'space-between'} alignItems={'center'} w={'full'}>
            <Box>
            <Text fontSize={'14px'} color={color} fontFamily={'Poppins extraBold'}>
              {data.name}
            </Text>
            <Text as={'p'} noOfLines={1}>
              {data.text}
            </Text>
            </Box>
            <Text fontWeight={600}>{data.time}</Text>

        </Box>
    </Box>
  )
}

export default Message