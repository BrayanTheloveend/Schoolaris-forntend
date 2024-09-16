import { Box, Button, Flex, Heading, Text, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import { vert } from '../theme'

const NoteEditItems = (props) => {
  return (
    <Flex rounded={14} mb={6} pos={'relative'} justify={'center'} align={'center'} border={'1px solid'} borderColor={useColorModeValue('#efefef', 'gray.700')} gap={4} boxShadow={'md'} w={'full'} h={{base: '90px',md:'100px'}}>
        <Box pos={'absolute'} px={6} top={-3} textAlign={'center'} bg={useColorModeValue('white', 'gray.800')}>
            <Heading fontSize={'md'} fontWeight={500} noOfLines={1}>
                Filiére 
            </Heading> 
            <Heading mt={1} fontSize={'sm'} fontWeight={400}>
            {props.data.name} {props.data.level}
            </Heading>
        </Box>

        <Heading noOfLines={1} fontSize={'xl'} fontFamily={'Montserrat'}>
            {props.data.unit}
        </Heading>
        
        <Box pos={'absolute'} bottom={1}>
            <Text>Noté sur 20</Text>
        </Box>
        <Box pos={'absolute'} top={4} right={4}>
            <Button size={{base: 'sm', md: 'md'}} onClick={()=>{
            props.setShown()
            props.handleSet({ idSubject: props.data?.idSubject, idUnit: props.data.idUnit})
        }}  
            rounded={"full"} 
            colorScheme='green' 
            bg={vert}
            >
                éditer
            </Button>
        </Box>
    </Flex>
  )
}

export default NoteEditItems
