import { Box, Text, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import Message from './Message'
import { motion } from 'framer-motion'
import { vert } from '../theme'

const MessageBox = ({open}) => {

    const samples =[
        {
            name: 'Brayan Thelove',
            text: 'What\' up bro',
            time: '18:89',
            image: 'https://hackspirit.com/wp-content/uploads/2021/06/Copy-of-Rustic-Female-Teen-Magazine-Cover.jpg'
        },
        {
            name: 'Rovil Bowser',
            text: 'New Deals',
            time: '12:89',
            image: 'https://img.huffingtonpost.com/asset/5c2d06271d00002c0231b4e4.jpeg?ops=scalefit_720_noupscale'
        },

    ]

    return (
        <Box 
        boxShadow={'0 0 10px rgba(0, 0, 0, 0.3)'}
        animation={'ease-in-out'}
        minW={"300px"} 
        rounded={'md'} 
        position={'fixed'} 
        top={'73px'} 
        right={'18px'}
        bg={useColorModeValue('white', 'gray.800')}
        display={'block'}
        zIndex={10}
        as={motion.div}
        initial={{ y: -50}}
        animate={{ y: 0 }}
        > 
            <Box p={4} mb={1} display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
            <Text as={'span'}  color={'gray.500'} fontSize={'14px'}>
                Messages
            </Text>
            <Text as={'span'} h={6} w={6} rounded={'full'} bg={vert}  color={'white'} display={'flex'} justifyContent={'center'} alignItems={'center'} fontSize={'12px'} fontWeight={'500'}>
                {samples.length}
            </Text>
            </Box>

        
            {
                samples.map((item, index)=> <Message key={index} data={item} />)
            }
         
            
            <br />
            { samples.length > 4 && <Text color={'blue.300'} textAlign={'center'} my={4} >See more</Text>}
        </Box>
  )
}

export default MessageBox