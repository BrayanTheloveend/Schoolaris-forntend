import { Box, FormControl, FormLabel, Input, useColorModeValue } from '@chakra-ui/react'
import React from 'react'


const CustomInput = ({...rest}) => {
  return (
    <FormControl position={'relative'} mt={4}>
      <Input type='text' h={'40px'} fontWeight={600} fontFamily={'Montserrat'} minW={'300px'} outline={'none'} fontSize={'md'} border={'1px solid'} borderColor={'lightgrey'} rounded={'full'} transition={'all ease 0.3s'} 
        _focus={{
          borderColor: '#4158d0',
          borderWidth: '2px'
        }}
        _focusVisible={{
          outline: 'none'
        }}
        _valid={{
          borderColor: '#4158d0',
          borderWidth: '2px'
        }}
      />
      <FormLabel fontSize={'md'} position={'absolute'} px={1} top={-3} bg={useColorModeValue('white', 'gray.800')} left={'20px'} color={'#999999'} fontWeight={'500'} pointerEvents={'none'} transition={'all ease 0.3s'}
      
      >
        Username
      </FormLabel>
    </FormControl>
  )
}

export default CustomInput