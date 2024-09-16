import { Box, Button, Container, Image, Stack, Text, useColorModeValue, VisuallyHidden } from '@chakra-ui/react'
import React from 'react'
import { FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa'
import logo from '../../assets/logo.jpg'

const Footer = () => {


    const SocialButton = ({
        children,
        label,
        href,
      }) =>{
        return (
            <Button
              bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
              rounded={'full'}
              w={8}
              h={8}
              cursor={'pointer'}
              as={'a'}
              href={href}
              display={'inline-flex'}
              alignItems={'center'}
              justifyContent={'center'}
              transition={'background 0.3s ease'}
              _hover={{
                bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
              }}>
              <VisuallyHidden>{label}</VisuallyHidden>
              {children}
            </Button>
          )
    }

return (
    <Box
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}>
      

      <Box
        borderTopWidth={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.700')}>
        <Container
          as={Stack}
          maxW={'6xl'}
          py={4}
          direction={{ base: 'column', md: 'row' }}
          spacing={4}
          justify={{ base: 'center', md: 'space-between' }}
          align={{ base: 'center', md: 'center' }}>
          <Text>© 2024 Schoolaris. All rights reserved</Text>
          <Stack direction={'row'} spacing={6}>
            <SocialButton label={'Twitter'} href={'#'}>
              <FaTwitter />
            </SocialButton>
            <SocialButton label={'YouTube'} href={'#'}>
              <FaYoutube />
            </SocialButton>
            <SocialButton label={'Instagram'} href={'#'}>
              <FaInstagram />
            </SocialButton>
          </Stack>
        </Container>
      </Box>
    </Box>
  )
}

export default Footer
