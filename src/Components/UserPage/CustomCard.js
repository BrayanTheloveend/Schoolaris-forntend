import {
    Box,
    Button,
    Flex,
    Heading,
    Stack,
    Text,
    useColorModeValue,
  } from '@chakra-ui/react'
import { primaryLight, primaryDark } from '../theme'


const CustomCard = ({ heading, description, icon, href }) => {

    return (
      <Box
        maxW={{ base: 'full', md: '275px' }}
        w={'full'}
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        p={5}>
        <Stack align={'start'} spacing={2}>
          <Flex
            w={16}
            h={16}
            align={'center'}
            justify={'center'}
            color={'white'}
            rounded={'full'}
            bg={useColorModeValue('gray.100', 'gray.700')}>
            {icon}
          </Flex>
          <Box mt={2}>
            <Heading size="md" >{heading}</Heading>
            <Text mt={1} fontSize={'md'} noOfLines={5}>
              {description}
            </Text>
          </Box>
          <Button variant={'link'} colorScheme={'blue'} size={'sm'}>
            En savoir plus
          </Button>
        </Stack>
      </Box>
    )
  }

  export default CustomCard