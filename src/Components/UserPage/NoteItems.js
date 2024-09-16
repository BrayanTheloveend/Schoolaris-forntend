import { Box, Flex, Heading, Text, useColorModeValue } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { getColorByNote, vert } from '../theme'
import { useGetNoteByUnitAndStudentQuery } from '../Redux/ApiSlice'
import { useNavigate } from 'react-router-dom'

const NoteItems = ({data}) => {



  return (
    <Box w={'full'} display={'flex'} justifyContent={'space-between'} my={8}>

    <Box mt={6} mb={6} display={'flex'} justifyContent={'center'} >
        <Box>
            <Heading fontSize={'md'} textAlign={'center'} fontWeight={500} noOfLines={1}>{data.header}</Heading>
            <Flex gap={2}>
                <Text mt={2}>Code : {data.accessor}</Text>
                <Text mt={2}>Coef : <strong style={{fontFamily: 'Montserrat'}}>{data.coef}</strong></Text>
            </Flex>
        </Box>
    </Box>

    <Flex gap={4} justify={'center'}>
        <Flex rounded={14} pos={'relative'} boxShadow={'md'} justify={'center'} align={'center'} border={'2px solid'} borderColor={getColorByNote(data.noteOne)} w={{base: '90px',md:'130px'}} h={{base: '90px',md:'130px'}}>
            <Box pos={'absolute'} px={2} top={-3} textAlign={'center'} bg={useColorModeValue('white', 'gray.800')}>
            <Heading fontSize={{base: 'sm', md:'md'}} fontWeight={500} noOfLines={1}>
                Note 
                </Heading> 
                <Heading fontSize={{base: 'xs', md: 'sm'}} fontWeight={400}>
                Controle CC
                </Heading>
            </Box>

            <Heading fontFamily={'Montserrat'} fontSize={{base: 'xl', md: '3xl'}} color={getColorByNote(data.noteOne)}>
                {data.noteOne}
            </Heading>

            <Box pos={'absolute'} bottom={1}>
                <Text fontSize={{base: 'xs', md: 'md'}}>Total sur 20</Text>
            </Box>
            
        </Flex>

        <Flex rounded={14} pos={'relative'} justify={'center'} align={'center'}border={'2px solid'} borderColor={getColorByNote(data.noteTwo)} gap={4} boxShadow={'md'} w={{base: '90px',md:'130px'}} h={{base: '90px',md:'130px'}}>
            <Box pos={'absolute'} px={2} top={-3} textAlign={'center'} bg={useColorModeValue('white', 'gray.800')}>
            <Heading fontSize={{base: 'sm', md:'md'}} fontWeight={500} noOfLines={1}>
                Note 
                </Heading> 
                <Heading fontSize={{base: 'xs', md: 'sm'}} fontWeight={400}>
                Controle SN
                </Heading>
            </Box>

            <Heading fontFamily={'Montserrat'} fontSize={{base: 'xl', md: '3xl'}} color={getColorByNote(data.noteTwo)}>
                {data.noteTwo}
            </Heading>
            
            <Box pos={'absolute'} bottom={1}>
                <Text fontSize={{base: 'xs', md: 'md'}}>Total sur 20</Text>
            </Box>
        </Flex>

    </Flex>
    
    
</Box>
  )
}

export default NoteItems
