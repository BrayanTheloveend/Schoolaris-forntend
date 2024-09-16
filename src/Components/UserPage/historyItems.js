import { Box, Flex, Grid, GridItem, Heading, IconButton, Text, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import { FiPrinter } from 'react-icons/fi'
import { primaryLight } from '../theme'

const HistoryItems = ({data}) => {

  return (
    <Grid gridTemplateColumns={'repeat(3, 1fr)'} py={4} px={2} w={'full'} borderBottom={'1px solid'} borderColor={useColorModeValue('#efefef', 'gray.700')} justify={'space-between'} align={'center'}>
        <GridItem textAlign={'left'}>
            <Text>Motif</Text>
            <Heading fontSize={'md'} mt={2} fontWeight={500}>{data.title}</Heading>
        </GridItem>
        <GridItem textAlign={'right'}>
            <Text>Montant</Text>
            <Heading fontSize={'md'} mt={2} fontFamily={'Montserrat'} fontWeight={500}>{data.amount} <small>XAF</small></Heading>
        </GridItem>

        <GridItem textAlign={'right'}>
          <IconButton
            mt={2}
            icon={<FiPrinter/>} 
            onClick={()=> window.open(`http://localhost:${process.env.REACT_APP_PORT}/bill/${data.bill}`)}
            title='Print Bill'
            size={{base: 'sm', md: 'sm'}} color={primaryLight} 
          />
        </GridItem>
        
    </Grid>
  )
}

export default HistoryItems
