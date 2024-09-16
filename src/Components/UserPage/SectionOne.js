import { Grid, GridItem,  Image, Tag, TagLabel, TagLeftIcon, Text, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import vector from '../../assets/study.png'
import { BiStar } from 'react-icons/bi'

const SectionOne = () => {
  return (
    <Grid id='aboutUs' px={{ base: 'unset', md: 24}} mt={{ base: '1em', md:'2em'}} gridTemplateColumns={{base: '1fr' , md: '1fr 1fr'}}>
        <GridItem p={10} >
            <Text fontSize={{ base: '2xl', md: '4xl'}} color={useColorModeValue('', 'white')} fontWeight={500}>
                Optez pour une meilleure administration <br />
            </Text>

            <Text fontSize={{ base: 'md', md: 'xl'}} mt={18} borderLeft={'3px solid'} borderColor={'blue.400'} pl={8}>
                <Text mb={2} fontWeight={700} color={'blue.400'}>Centralisé les données de vos etudiants</Text>
                <Tag variant='subtle' colorScheme='green'>
                    <TagLeftIcon boxSize='12px' as={BiStar} />
                    <TagLabel>Vérifier</TagLabel>
                </Tag>
                <br />
                <br />

                Suivez les inscriptions, gérez les dossiers académiques et assurez-vous que chaque étudiant a les ressources nécessaires pour réussir. 
                
            </Text>
            
        </GridItem>

        <GridItem justifyContent={'center'} display={'flex'} alignItems={'center'}>
            <Image src={vector} w={{ base: '400px', md: '60%'}}  />
        </GridItem>
    </Grid>
  )
}

export default SectionOne