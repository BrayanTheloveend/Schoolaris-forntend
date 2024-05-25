import React from 'react'
import { Box, Flex, Text } from '@chakra-ui/react'
import Loading from 'react-loading-components';
import { vert } from '../theme';


const CustomLoading = () => {
  return (

    <Flex justify={'center'} minH={'350px'} align={'center'} w={'full'} h={'full'}>
        <Box display={'flex'} justifyContent={'center'} alignItems={'center'} gap={2} flexDir={'column'}>
            {/* <Image
              src={chicken} 
              as={motion.img}
              w= '100px'
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, repeat: Infinity}}
            /> */}
            <Loading type='oval' width={40} height={40} fill={vert} />
            <Text fontSize={{md: 'md'}}> Chargement ...</Text>
            
        </Box>
        
    </Flex>
  )
}

export default CustomLoading