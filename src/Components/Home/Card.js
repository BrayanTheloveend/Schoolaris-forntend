
import React, { forwardRef } from 'react'
import { Box, Flex, Grid, GridItem, Skeleton, Text, useColorModeValue } from "@chakra-ui/react";

// prop-types is a library for typechecking of props


const CardAnalitic = forwardRef((props, ref)=> {
  return (
    <GridItem 
    px={6}
    title={props.info} 
    py={6}
    ref={ref}
    overflow={'hidden'} 
    // bgGradient={`linear(to-l, ${props.colorOne}, ${props.colorTwo})`} 
    bg={useColorModeValue('white', 'gray.800')}
    rounded={8} 
    display={'flex'}
    alignItems={'center'}
    justifyContent={'flex-start'}
    border={'1px solid'}
    borderColor={useColorModeValue('#efefef', 'gray.800')}
    gap={{md: 3, base: 6}}

    {...props.style}>
      <Flex flexDir={'column'} color={props.colorOne} >
          <Skeleton isLoaded={props.isLoading}>
            <Text fontWeight={600}  fontSize={'sm'} color={props.colorOne}>{props.total}</Text>
          </Skeleton>
          <ion-icon name={props.icon} style={{fontSize: '30px'  }}>
          </ion-icon>
      </Flex>
      <Flex flexDir={'column'} gap={1} >
        <Text  fontWeight={600} color={useColorModeValue('gray.600', 'gray.400')} fontSize={{md:'xl', base: 'md'}}>{props.title}</Text>
        <Text fontSize={'md'} noOfLines={1} m={0}>{props.label}</Text>
      </Flex>

  </GridItem>
  );
})


export default CardAnalitic;






