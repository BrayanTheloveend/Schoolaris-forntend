import { Avatar, Box, Flex, HStack, Icon, IconButton, Menu, MenuButton, MenuItem, MenuList, Text, VStack, useColorMode, useColorModeValue } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { FiChevronDown, FiChevronLeft, FiLogOut, FiMenu } from 'react-icons/fi'
import { primaryDark, primaryLight, vert } from '../theme'
import { FaEnvelope } from 'react-icons/fa'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import { BiSolidUser } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'

const Navbar = ({ onOpen, openMessage }) => {

  const { colorMode, toggleColorMode } = useColorMode()
  const navigate = useNavigate()
  const userDataSaved = localStorage.getItem('userData')

  const menuBorderColor = useColorModeValue('gray.200', 'gray.900')
  const textcolor = useColorModeValue('gray.600','gray.400')

  const [active, setActive] = useState(false)
  const bg = useColorModeValue('white', 'gray.800')

  useEffect(() => {
    window.addEventListener('scroll', ()=>{
      if (window.scrollY > 50){
        setActive(true)
      }else{
        setActive(false)
      }
    })
  }, [])

    
    return (
      <Flex
        ml={{ base: 0, md: 0 }}
        px={{ base: 4, md: 4 }}
        h={{base: '4.8em' , md: '5.6em'}}
        alignItems="center"
        position={'fixed'}
        w={"100%"}
        zIndex={99}
        backdropFilter={ active && 'blur(20px)'} 
        boxShadow={ active ? '0 0 12px rgba(0, 0, 0, 0.5)' : 'none'}
        bg={active ? 'rgba(255, 255, 255, .2)' : bg}
        borderBottomWidth="1px"
        borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
        justifyContent={{ base: 'space-between', md: 'flex-end' }}
        >
        <IconButton
          display={{ base: 'flex', md: 'none' }}
          onClick={onOpen}
          variant="outline"
          aria-label="open menu"
          icon={<FiMenu />}
        />
  
        <Text
          display={{ base: 'flex', md: 'none' }}
          fontSize="md"
          color={useColorModeValue(primaryLight, primaryDark)}
          fontWeight="bold">
          Schoolaris 
        </Text>
  
        <HStack spacing={{ base: '0', md: '6' }}>
  
          <Icon
            _hover={{
              color: 'gray.500'
            }}
            fontSize="15"
            onClick={openMessage}
            display={{ base: 'none',  md: 'unset'}}
            color={'gray.400'}
            _groupHover={{
              color: 'white',
            }}
            as={FaEnvelope} />
          <IconButton
            onClick={toggleColorMode}
            icon={ colorMode === 'light' ?  <MoonIcon color={vert} w={4} h={4} /> : <SunIcon color={vert} w={5} h={5} />}
            variant={'ghost'} />
  
          <Flex alignItems={'center'}>
          <Menu>
            <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: 'none' }}>
              <HStack>
                <Avatar
                size={'sm'}
                src={
                  userDataSaved ? `http://localhost:${process.env.REACT_APP_PORT}/image/${ JSON.parse(userDataSaved)?.picture }` : 'https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                }
                />
                <VStack
                  display={{ base: 'none', md: 'flex' }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2">
                <Text fontSize="md" fontWeight={600} color={textcolor}>{ JSON.parse(userDataSaved)?.name }</Text>
                <Text fontSize="xs" color={textcolor} >
                { JSON.parse(userDataSaved)?.email }
                </Text>
                </VStack>
                <Box display={{ base: 'none', md: 'flex' }}>
                <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList borderColor={menuBorderColor}>
              <MenuItem icon={<BiSolidUser color={primaryLight} w={3} h={3} />} display={{base: "unset", md: "none"}}>{ "Brayan Th"}</MenuItem>
              <MenuItem icon={<FiLogOut/>} color={'red.400'} fontWeight={'600'} 
              onClick={()=>{
                localStorage.clear()
                setTimeout(navigate, 0, '/login')
              }} >Log out</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </HStack>
      </Flex>
    )
  }

  export default Navbar