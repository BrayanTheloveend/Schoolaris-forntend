import { Container, Flex, Icon } from '@chakra-ui/react'
import React from 'react'
import {
    FcAbout,
    FcAssistant,
    FcCollaboration,
    FcDonate,
    FcManager,
  } from 'react-icons/fc'
import CustomCard from './CustomCard'

const Service = () => {
  return (
    <Container maxW={'8xl'} my={12}>
        <Flex flexWrap="wrap" gridGap={6} justify="center">
          <CustomCard
            heading={'Assistance'}
            icon={<Icon as={FcAssistant} w={10} h={10} />}
            description={
            'Schoolaris met a voter disposition une assistance ouvert 24h/7j pour gerer vos requête'
            }
            href={'#'}
            
          />
          <CustomCard
            heading={'SchoolPay'}
            icon={<Icon as={FcDonate} w={10} h={10} />}
            description={'Desormais payer votre scholarité en ligne chez schoolaris grace son service schoolPay'}
            href={'#'}
          />
          <CustomCard
            heading={'View Reslut'}
            icon={<Icon as={FcAbout} w={10} h={10} />}
            description={'Accédez rapidement aux résultats et aux évaluations. Les étudiants peuvent suivre leur progression, tandis que les enseignants peuvent gérer les notes en toute simplicité'}
            href={'#'}
          />
          {/* <CustomCard
            heading={'Recevez'}
            icon={<Icon as={FcAbout} w={10} h={10} />}
            description={'Decouvrez notre IA mis sur pieds pour ressoudre a n\'importe quel soucis concernant dropbooks n\'allez pas lui demander un date.'}
            href={'#'}
          /> */}
        </Flex>
      </Container>
  )
}

export default Service