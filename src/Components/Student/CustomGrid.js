import React from 'react'
import { Box, Button, Flex, Grid, GridItem, Icon, IconButton, Text, useColorModeValue } from '@chakra-ui/react'
import { FiChevronLeft, FiFilter, FiPlus, FiPrinter, FiSearch } from 'react-icons/fi'
import CustomTable from '../Dashboard/CustomTable'
import StudentDetails from './StudentDetails'

const CustomGrid = ({data, column, isLoading, showdetails, id, setShowdetails, add, text }) => {

    const bg = useColorModeValue('white', 'gray.800')

  return (
    <Grid  gap={4} mt={8}>
        <GridItem>
            <Box bg={ !showdetails && bg} p={6} borderRadius={'20px'} minH={'200px'} boxShadow={ !showdetails && '0 0 10px rgba(0, 0, 0, 0.1)'}>
                <Flex alignItems={'center'} mb={3} justifyContent={'space-between'}>

                    <Flex alignItems={'center'} justifyContent={'center'} gap={6}>
                        { showdetails && <IconButton colorScheme='blue' icon={<FiChevronLeft/>} onClick={setShowdetails} pr={1} rounded={'full'} fontSize={'2xl'}></IconButton>}
                        <Flex gap={2} align={'center'}>
                            <Text fontSize={'xl'} color={useColorModeValue('gray.700', 'white')} fontWeight={600}>{showdetails ? `${text} Details` : `All ${text}`} </Text>
                            <Text fontSize={'md'} color={useColorModeValue('gray.600', 'gray.500')} fontWeight={600}>( {data.length} )</Text>
                        </Flex>
                        
                    </Flex>
                    
                    <Flex gap={3} alignItems={'center'}>
                        
                        
                        { !showdetails && <> 
                            <Icon as={FiFilter}/>
                            <Icon fontSize={'16px'} as={FiSearch}/>
                            <Button colorScheme='blue' rounded={'full'} onClick={add}><FiPlus/> Ajouter</Button>
                        </>}

                        { !showdetails ?  <Icon fontSize={'16px'} as={FiPrinter}/> : <Button colorScheme='blue' rounded={'full'}><FiPrinter/> Imprimer</Button>}
                        
                    </Flex> 
                </Flex>

                {
                    showdetails ? <StudentDetails data={data[id]}/> : <CustomTable data={data} columns={column} isLoading={isLoading}/>
                }
                
            </Box> 
        </GridItem>
    </Grid>
  )
}

export default CustomGrid