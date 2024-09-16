import { Avatar, Box, Card, CardBody, Flex, Grid, GridItem, Heading, Image, SimpleGrid, Stack, Text, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import image from '../../assets/people.jpg'
import image1 from '../../assets/people.jpg'
import image2 from '../../assets/Tips-and-Apps-to-Help-Students-Gear-GettyImages-1132647177.webp'


const SectionTwo = () => {


  const textColor = useColorModeValue('gray.600', 'white')

  return (
    <Box mt={6} mb={8} p={4} textAlign={'center'}>
      <Text fontWeight={800} fontSize={'xl'}>NOS FERMES</Text>
      <Text fontSize={'md'}>Nous avons déjà aidé plusieurs fermier pour accroître leurs rendements</Text>


      <SimpleGrid mt={14} templateColumns={{base: '1fr', md: 'repeat(3, 1fr)', sm: 'repeat(2, 1fr)'}} gap={{ base: 6, md: 'unset'}}  px={{md: 10, base: 6}}   justifyItems={'center'} alignItems={'center'} >
        <GridItem>
          <Card maxW={{base:'md', md: 'sm'}} boxShadow={'0 0 12px rgba(0, 0, 0, 0.4)'}>
            <CardBody>
              <Image
                src={image}
                alt='Green double couch with wooden legs'
                borderRadius='lg'
              />
              <Stack mt='6' spacing='3'>
                <Flex justify={'space-between'} mt={4} align={'center'} gap={4}>
                  <Box textAlign={'left'}>
                    <Heading size='sm' color={useColorModeValue('gray.700', 'white')}>Consulter vos Notes</Heading>
                    <Text> en temps réel</Text>
                  </Box>
                  
                </Flex>
              
                <Text textAlign={'left'} color={textColor} mt={2}>
                  This sofa is perfect for modern tropical spaces, baroque inspired
                  spaces, earthy toned spaces and for people who love a chic design with a
                  sprinkle of vintage design...
                </Text>
              </Stack>
            </CardBody>
          </Card>
        </GridItem>

        <GridItem>
          <Card maxW={{base:'md', md: 'sm'}} boxShadow={'0 0 12px rgba(0, 0, 0, 0.4)'}>
            <CardBody>
              <Image
                src={image1}
                alt='Green double couch with wooden legs'
                borderRadius='lg'
              />
              <Stack mt='6' spacing='3'>
                <Flex justify={'flex-start'} mt={4} align={'center'} gap={4}>
                  <Box textAlign={'left'}>
                    <Heading size='sm' color={useColorModeValue('gray.700', 'white')}>Payer votre scolarité</Heading>
                    <Text> en quelque clics</Text>
                  </Box>
                </Flex>
              
                <Text textAlign={'left'} color={textColor} mt={2}>
                  This sofa is perfect for modern tropical spaces, baroque inspired
                  spaces, earthy toned spaces and for people who love a chic design with a
                  sprinkle of vintage design...
                </Text>
              </Stack>
            </CardBody>
          </Card>
        </GridItem>

        <GridItem>
          <Card maxW={{base:'md', md: 'sm'}} boxShadow={'0 0 12px rgba(0, 0, 0, 0.4)'}>
            <CardBody>
              <Image
                src={image2}
                alt='Green double couch with wooden legs'
                borderRadius='lg'
              />
              <Stack mt='6' spacing='3'>
                <Flex justify={'flex-start'} mt={4} align={'center'} gap={4}>
                  <Box textAlign={'left'}>
                    <Heading size='sm' color={useColorModeValue('gray.700', 'white')}>Telecharger vos cours</Heading>
                    <Text> en ligne</Text>
                  </Box>
                </Flex>
              
                <Text textAlign={'left'} color={textColor} mt={2}>
                  This sofa is perfect for modern tropical spaces, baroque inspired
                  spaces, earthy toned spaces and for people who love a chic design with a
                  sprinkle of vintage design...
                </Text>
              </Stack>
            </CardBody>
          </Card>
        </GridItem>
      
      </SimpleGrid>
    </Box>
  )
}

export default SectionTwo
