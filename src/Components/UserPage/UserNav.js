import React, { useEffect, useState } from 'react'
import { DesktopNav, MobileNav } from './Nav'
import { CloseButton, Drawer, Menu, DrawerContent, Flex, IconButton, Stack,Button, Collapse, Text, useBreakpointValue, useColorMode, useColorModeValue, useDisclosure, HStack, MenuButton, Avatar, VStack, Box, MenuList, MenuItem, MenuDivider, Image, Heading } from '@chakra-ui/react'
import { CloseIcon, HamburgerIcon, MoonIcon, SunIcon } from '@chakra-ui/icons'
import {FiChevronDown, FiLogOut, FiShield, FiUser} from 'react-icons/fi'
import {useNavigate} from 'react-router-dom'
import { FaEnvelope} from 'react-icons/fa'
// import logo from '../../assets/logo.jpg'
//import { CiShoppingCart } from 'react-icons/ci'
import { primaryDark, primaryLight, colorBase, vert } from '../theme'
import { BiSolidUser, BiUser } from 'react-icons/bi'


const UserNav = () => {


    const { isOpen, onToggle, onClose } = useDisclosure()
    const { colorMode, toggleColorMode } = useColorMode()
    const savedData = JSON.parse(localStorage.getItem('userData'))
    const navigate = useNavigate()
    const [Active , setActive ] = useState(false)
    //const textColor = useColorModeValue('gray.800', 'white')

    useEffect(() => {
        window.addEventListener('scroll', ()=>{
          if (window.scrollY > 50){
            setActive(true)
          }else{
            setActive(false)
          }
        })
      }, [])

    // const dispatch = useDispatch()
    // const state = useSelector(state=> state.user)
    const bg = useColorModeValue('white', 'gray.800')

    const customIcon = Active && 
        <div style={{position: "relative"}}>
            <FaEnvelope  />
            <Text as='span' 
            color={'white'}
            position={'absolute'} 
            top={-1} 
            right={-2} 
            fontSize={'10px'} 
            fontWeight={"500"}
            w= {2}
            h= {2}
            bg= {'red.500'}
            border= {'2px'}
            borderColor={'transparent'}
            rounded= {'full'}
            ></Text>
        </div>
    

    const menuBorderColor = useColorModeValue('gray.200', 'gray.900')

    

  return (
    <>
        <Flex
            // color={useColorModeValue('gray.600', 'white')}
            as="header" 
            zIndex={200}
            // backgroundColor={useColorModeValue('white', 'gray.800')}
            //backdropFilter="saturate(180%) blur(5px)"
            position="fixed" 
            boxShadow={'0 0 12px rgba(0, 0, 0, 0.4)'}
            w="100%"
            minH={'60px'}
            py={{ base: 2 }}
            bg={ bg}
            px={{ base: 4 }}
            
            align={'center'}> 

            <Flex
            flex={{ base: 1, md: 'auto' }}
            ml={{ base: -2 }}
            display={{ base: 'flex', md: 'none' }}>
            <IconButton
                onClick={onToggle}
                icon={isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />}
                variant={'ghost'}
                aria-label={'Toggle Navigation'}
            />
            </Flex>

            <Flex flex={{ base: 4 }} alignItems={"center"} justify={{ base: 'center', md: 'start' }} >
               
                <Heading color={ vert } fontSize={{base: 'md', md: 'xl'}}>Schoolaris</Heading>
                <Flex display={{ base: 'none', md: 'flex' }}  ml={{base: 10, md: 4}}>
                    <DesktopNav />
                </Flex>
            </Flex>

            { !localStorage.getItem('userData') ? <Stack
                flex={{ base: 1, md: 0 }}
                justify={'flex-end'}
                direction={'row'}
                spacing={6}>

                <IconButton
                onClick={toggleColorMode}
                icon={ colorMode === 'light' ?  <MoonIcon color={vert} w={3} h={3} /> : <SunIcon color={vert} w={3} h={3} />}
                variant={'ghost'} /> 
                <Button as={'a'} display={{base: 'none', md: 'flex'}}  fontSize={'sm'} onClick={()=>navigate('/login')} fontWeight={500} variant={'link'} href={'#'}>
                    Se connecter
                </Button>

                <IconButton
                    icon={<BiSolidUser/>} 
                    color={vert}
                    display={{base: 'flex', md: 'none'}}
                    onClick={()=>navigate('/login')}   
                    variant={'ghost'}                 
                    title='Se connecter'
                />

                <Button
                    as={'a'}
                    display={{ base: 'none', md: 'inline-flex' }}
                    fontSize={'sm'}
                    fontWeight={600}
                    color={'white'}
                    onClick={()=>navigate('/Registration')}
                    bg={vert}
                    _hover={{
                    bg: `${colorBase}.300`,
                    }}>
                    S'incrire
                </Button> 
            </Stack>   
                :
                <HStack >
                    <IconButton
                    color={'gray.400'}
                    icon={customIcon}
                    variant={'ghost'}
                    aria-label={'Toggle Navigation'}
                    />
                    <IconButton
                        display={{ base: 'none', md: 'unset'}}
                        onClick={toggleColorMode}
                        icon={ colorMode === 'light' ?  <MoonIcon w={3} color={'blue.400'} h={3} /> : <SunIcon color={'blue.400'} w={5} h={5} />}
                        variant={'ghost'} />
                    <Flex alignItems={'center'}>
                    <Menu>
                        <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: 'none' }}>
                        <HStack>
                            <Avatar
                            size={'sm'}
                            src={
                                `http://localhost:${process.env.REACT_APP_PORT}/${ savedData.roleName === 'STUDENT' ?  `image` : 'image2'}/${ savedData?.picture }`
                            }
                            />
                            <VStack
                            display={{ base: 'none', md: 'flex' }}
                            alignItems="flex-start"
                            spacing="1px"
                            ml="2">
                            <Text fontSize="sm"> { JSON.parse(localStorage.getItem('userData'))?.name } </Text>
                            <Text fontSize="xs">
                            {JSON.parse(localStorage.getItem('userData'))?.email}
                            </Text>
                            </VStack>
                            <Box display={{ base: 'none', md: 'flex' }}>
                            <FiChevronDown />
                            </Box>
                        </HStack>
                        </MenuButton>
                        <MenuList
                       
                        borderColor={menuBorderColor}>
                     
                        <MenuItem icon={<FiShield w={3} h={3} />} fontWeight={600} display={{base: "unset", md: "none"}}>
                        { `${savedData?.name} ${savedData?.surname}` }

                        </MenuItem>
                        <MenuDivider display={{base: "unset", md: "none"}} />
                        <MenuItem icon={<FiUser/>} fontWeight={'600'} onClick={()=>navigate('/profile')} >Profile</MenuItem>
                        <MenuItem icon={<FiLogOut/>} color={'red.400'} fontWeight={'600'} 
                            onClick={()=>{
                                localStorage.clear()
                                setTimeout(navigate, 0, '/login')
                            }} >Log out
                        </MenuItem>
                        </MenuList>
                    </Menu>
                    </Flex>
                </HStack>
                }
                
            </Flex>

    {/* Mobile NAV BAR Drawer */}

        <Collapse in={isOpen} >
            <Drawer
            isOpen={isOpen}
            placement="left"
            onClose={onClose}
            returnFocusOnClose={false}
            onOverlayClick={onClose}
            animateOpacity
            >
            <DrawerContent bg={useColorModeValue('white', 'gray.800')}>
                <Flex alignItems='center' justifyContent='right'>
                <CloseButton float='right' onClick={onClose} m={2} />
                </Flex>
                <MobileNav />
            </DrawerContent>
            </Drawer>
            
        </Collapse>
    </>
  )
}

export default UserNav