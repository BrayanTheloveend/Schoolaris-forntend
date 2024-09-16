import { Box, Button, Flex, Grid, GridItem, Input, Text, useColorModeValue } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import React, { useState } from 'react'
import CustomHeading from '../Dashboard/CustomHeading'
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
  } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { setStorage } from '../Redux/ReduxSlice'



const Settings = () => {


    const bg = useColorModeValue('white', 'gray.800')
    const color = useColorModeValue('gray.700', 'white')
    const borderColor = useColorModeValue('#efefef', 'gray.800')
    const [payload, setPayload] = useState()
    const [toggle, setToogle]  =useState(true)


    //redux state 
    const state = useSelector(state => state.storage.percentNote)
    const dispatch = useDispatch()

    const handleSubmit =()=>{
        dispatch(setStorage(payload))
        setToogle(true)
    
    }
    



  return (
    <Box as={motion.div}
        initial={{ y: '-100vh' }}
        animate={{ y: 0}}>
        <CustomHeading title={'Paramétres'}/>

        <Grid 
        templateColumns={{base: '1fr', md: 'repeat(2, 1fr)'}} 
        mt={8} 
        gap={4}
        column={2} >
            <GridItem>
                <Box 
                bg={bg} 
                p={6} borderRadius={'20px'} 
                minH={'200px'} 
                border={'1px solid'}
                borderColor={borderColor}
                >

                    <Flex justify={'space-between'} align={'center'}>
                        <Text fontSize={{base:'sm', md: 'md'}} >
                            Pourcentage de calcul des Notes
                        </Text>

                        <Text cursor={'pointer'} onClick={()=>setToogle(!toggle)} fontSize={{base:'sm', md: 'md'}} fontWeight={600} color={toggle ? 'blue.400' : 'red.400'}>
                            { toggle ? 'Modifier' : 'Annuler'}
                        </Text>
                    </Flex>
                   

                    <TableContainer mt={4}>
                        <Table variant='simple'>
                            <Thead>
                                <Tr>
                                   
                                </Tr>
                            </Thead>
                            <Tbody>
                            <Tr>
                                <Td>Controle Continu</Td>
                                <Td isNumeric> {toggle ?  state : <Input m={0} type='number' onChange={e=> setPayload(e.target.value)} value={payload} width={20}/>}</Td> 
                            </Tr>
                            <Tr>
                                <Td>Session normale</Td>
                                <Td isNumeric>{100-parseInt(state)}</Td>
                            </Tr>
                            
                            </Tbody>
                        
                        </Table>
                    </TableContainer>


                    <Flex justify={'end'}>
                        { !toggle && <Button colorScheme='blue' mt={4} size={'sm'} onClick={handleSubmit}>Valider</Button>}
                    </Flex>
                    


                    

                </Box>
            </GridItem>



            <GridItem>
                 <Box 
                bg={bg} 
                p={6} borderRadius={'20px'} 
                minH={'200px'} 
                border={'1px solid'}
                borderColor={borderColor}
                >

                    <Text fontSize={{base:'sm', md: 'md'}} >
                        Couleurs et texte
                    </Text>

                </Box>
            </GridItem>

        </Grid>
      
    </Box>
  )
}

export default Settings
