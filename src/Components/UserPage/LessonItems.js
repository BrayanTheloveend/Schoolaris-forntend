import { Box, Flex, GridItem, Heading, IconButton, Image, Text, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import { FiDownloadCloud } from 'react-icons/fi'
import { primaryLight } from '../theme'
import img from '../../assets/images/Dashboard/doc2.png'
import dayjs from 'dayjs'


const LessonItems = ({data}) => {

    const openPdf = (link)=>{
        window.open(link)
    }
  return (
    <GridItem h={'fit-content'}  p={2} display={'flex'} justifyContent='space-between' border={'1px solid'} borderColor={useColorModeValue('#efefef', 'gray.700')} gap={4} boxShadow={'md'} rounded={8}>
                        
    <Flex justify={'flex-start'} align={'center'} gap={2}>
        <Box>
            <Image src={img} w={{base: '60px', md:'80px'}} />
        </Box>
        
        <Box>
            <Text fontSize={'xs'} mt={2}>Intitulé</Text>
            <Heading fontSize={{base: 'sm', md: 'md'}} noOfLines={1}  fontWeight={300}>{data.label}</Heading>
        
            <Box mt={2} display={'flex'} gap={2}>
                <Text fontSize={'sm'} mt={2}>&nbsp;<strong>{dayjs(data.createdAt).format('DD.MM.YYYY')}</strong></Text>
            </Box>
        </Box>
    </Flex>

    <Flex justify={'space-between'} align={'end'} flexDir={'column'}>

        <IconButton
            mt={2}
            w={{base: 10, md: 10}}
            fontSize={{base: 'md', md: 'xl'}}
            h={{base: 10, md: 10}}
            rounded={'full'}
            icon={<FiDownloadCloud/>} 
            onClick={()=>openPdf(`http://localhost:${process.env.REACT_APP_PORT}/cours/${data?.file}`)}
            title='Print Bill'
            color={primaryLight} 
        />

        {/* <Flex gap={4} align={'center'} justifyContent={'center'}>
            <Text color={primaryLight} fontSize={'sm'} fontFamily={'Montserrat'} fontWeight={600}>{kFormatter(156)}</Text>

            <IconButton
                mt={2}
                w={{base: 10, md: 10}}
                fontSize={{base: 'md', md: 'xl'}}
                h={{base: 10, md: 10}}
                rounded={'full'}
                icon={<FiHeart/>} 
                //onClick={()=>openPdf(`http://localhost:${process.env.REACT_APP_PORT}/cours/${data?.file}`)}
                title='Liked'
                color={primaryLight} 
            />
        </Flex> */}
        
    </Flex>
    

</GridItem>
  )
}

export default LessonItems
