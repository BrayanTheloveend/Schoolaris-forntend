
import React, { forwardRef } from 'react'
import { Box, Flex, Grid, GridItem, Skeleton, Text } from "@chakra-ui/react";

// prop-types is a library for typechecking of props


const CardAnalitic = forwardRef(({ title, isLoading, percentage, icon, color, bg }, ref)=> {
  return (
    <GridItem  p={6} bg={color} rounded={14} boxShadow={'0 0 10px rgba(0, 0, 0, 0.1)'} ref={ref}>
        <Grid gridTemplateColumns={'2fr 1fr'} h={'50px'} alignItems={'center'}  gap={2}>
        
            <GridItem display={'flex'} flexDir={'column'} gap={2}>

                <Text 
                    fontSize={'md'} 
                    fontFamily={'Poppins Medium'}
                    color={'white'}
                    noOfLines={1}
                    //color={useColorModeValue('gray.600', 'white')}
                >
                {title}
                </Text>

                <Flex justifyContent={"left"} alignItems={'center'}>
                    <Skeleton isLoaded={isLoading}>
                        <Text variant={'h4'}
                            m={0} 
                            fontSize={'2xl'}
                            fontWeight={'600'}
                            noOfLines={1} 
                            fontFamily={'Poppins extraBold'} 
                            color={'white'}
                            >
                            { percentage }
                        </Text>
                    </Skeleton>

                </Flex>

            </GridItem>
            <GridItem display={'flex'} justifyContent={'right'}>
                <Box display={'flex'} justifyContent={"center"} 
                alignItems={'center'} 
                color={'white'}
                border={'1px dashed'}
                borderColor={'white'}
                backgroundColor={color} 
                rounded={'full'} 
                height={"3.5rem"} 
                width={"3.5rem"}>
                {icon}
                </Box>
            </GridItem>
        </Grid>
    </GridItem>
  );
})


export default CardAnalitic;