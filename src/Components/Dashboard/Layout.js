import React, { useEffect, useState } from 'react'
import {
  Avatar,
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  Link,
  Button,
  Image,
 // useToast,
} from '@chakra-ui/react'
import { primaryLight, vert } from '../theme'
import { NavLink, useNavigate } from 'react-router-dom'

// import { useSignOut } from 'react-firebase-hooks/auth'
// import { getAuth } from 'firebase/auth'

import logo from '../../assets/logo.jpg'


import MessageBox from './MessageBox'
import Navbar from './Navbar'
import { BiArch, BiBell, BiBookBookmark, BiPaperclip, BiSpeaker, BiUser } from 'react-icons/bi'
import { FiBook, FiChevronLeft, FiChevronRight, FiNavigation, FiSettings, FiTrendingUp } from 'react-icons/fi'


const LinkItems = [  
  { name: 'Tableau de bord', icon: BiArch, href: '/dash' , color: '#56aceb'},
  { name: 'Formations', icon: FiTrendingUp, href: '/training', color: 'red.500' },
  { name: 'Gestion des UA', icon:  FiBook, href: '/unit', color: 'orange.400'},
  { name: 'Gestions des étudiants', icon:  FiNavigation, href: '/student', color: '#32cd32'},
  { name: 'Professeur', icon: BiUser, href: '/teacher', color: '#e7522b' },
  //{ name: 'Notifications', icon: BiBell, href: '/order', color: 'pink.500' },
  { name: 'Parametres', icon: FiSettings, href: '/setting', color: 'blue.300' },
]


const SidebarContent = ({ onClose, expand, expandValue, ...rest }) => {

  const userDataSaved =  localStorage.getItem('userData')

  const linkColor = useColorModeValue('gray.600', 'gray.300')
  //const bgActive = useColorModeValue('#efefef', 'gray.900')
  const navigate = useNavigate()


  if(!userDataSaved){
    setTimeout(navigate, 0, '/login')
  }

  // const toast = useToast()
  // const showMessage = useCallback((type, msg, title)=>{
  //   toast({
  //     position: 'bottom-right',
  //     title: title,
  //     description: msg,
  //     status: type,
  //     duration: 3500,
  //     isClosable: true,
  //   })
  // }, [toast])

  

  return (
    <Box
      bg={useColorModeValue('white', 'gray.800')}
      borderRightColor={useColorModeValue('gray.500', 'gray.100')}
      w={{ base: 'full', md: '22em' }}
      pos="fixed"
      zIndex={100}
      h="full"
      transition={'ease width 0.5s'}
      boxShadow={'0 0 12px rgba(0, 0, 0, 0.1)'}
      {...rest}>
      <Flex h="20" alignItems="center" mx="8" justifyContent= "space-between">
        {/* <Image src={expandValue ? logo : logo2 } w='160px' /> */}
        <Flex gap={2} justify={'center'} align={'center'}>
          <Image rounded={4} src={logo} w='35px' />
          <Text letterSpacing={-1} display={ {base: 'none', md: 'block'}} visibility={{base: 'hidden', md: expandValue ? 'visible' : 'hidden'}} color={useColorModeValue('gray.800','white')} fontSize={'2xl'} fontWeight={600}>Schoo<span style={{color: vert}}>laris</span></Text>
          <Text fontSize={'15px'} display={{base: 'block', md: 'none'}} color={useColorModeValue('gray.800','white')} fontWeight={600}>Schoo<span style={{color: vert}}>laris</span></Text>
        </Flex>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>

        <Button 
            w='40px' 
            h={'40px'} 
            onClick={expand}
            display={'flex'} 
            justifyContent={'center'} 
            alignItems={'center'} 
            colorScheme='green' 
            bg={vert}
            rounded={'full'} 
            position={'absolute'} 
            right={-6}
            transition={'ease-in-out 1.5s all'}
            >
            <Icon
            transition={'ease-in-out 1.5s all'}
            as={expandValue ? FiChevronLeft : FiChevronRight}  
            color={'white'}
            fontSize={'22px'}
          />
          </Button> 

       <Flex visibility={expandValue ? 'visible' : 'hidden'} mx={6} my={4} mb={8} gap={2} alignItems={'center'}>
        <Avatar
          w={'35px'}
          h={'35px'}
          src={
            userDataSaved ? `${process.env.REACT_APP_PORT}/image/${ JSON.parse(userDataSaved)?.picture }` : 'https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
          }
        />

        <Flex flexDir={'column'} gap={0} >
          <Text fontSize={'16px'} color={useColorModeValue('gray.600', '#efefef')} fontWeight={'600'}>{ userDataSaved ? JSON.parse(userDataSaved)?.name : 'User name'}</Text>
          <Text fontSize={'sm'} >{ userDataSaved ? JSON.parse(userDataSaved)?.roleName : 'RoleOfUser'}</Text>
        </Flex>
      </Flex>

      <Box ml={8} mt={14} mb={5} visibility={{ base: 'visible', md: expandValue ? 'visible' : 'hidden' }}><Text fontWeight={600}>Navigation</Text></Box>
      {LinkItems.map((link,index) => (
        <Link 
        key={index}
        to={link.href}
        as={NavLink}
        display={'flex'}
        gap={4}
        textDecoration={'none'}  
        alignItems="center"
        fontWeight={500}
        py={'10px'}
        fontSize={'15px'}
        pl={3}
        mx={3}
        role="group"
        color={linkColor}
        cursor="pointer"
        
        _activeLink={{ color: link.color, borderLeft: '2px solid', borderColor: link.color  }}
         _hover={{
           fontWeight: 600
         }}
        >
          <Icon
            rounded={'full'}
            fontSize={'18px'}
            color={link.color}
             _groupHover={{
               color: link.color,
             }}

            as={link.icon}
          />
          
          { expandValue ? link.name : ''}
          <Text fontSize={{base: '12px', md: '15px'}} display={{base: 'block', md: 'none'}}>{link.name}</Text>
        </Link>
        
      ))}


      {/* <Image src={sidebarBg} position={'absolute'} bottom={0} left={0}/> */}
    </Box>
  )
}


const Layout = ({component}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [message, setMessage] = useState(false)
  const [expand, setExpand] = useState(true)

  

  return (
    <Box minH="100vh" bg={useColorModeValue('#efefef', 'gray.900')}>
      <SidebarContent w={{ base : '5.4em' , md: expand ? '20em' : '5.6em' }} expand={()=>setExpand(!expand)} expandValue={expand} onClose={() => onClose} display={{ base: 'none', md: 'block' }} />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size={{base: 'xs', md: "sm"}}>
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <Navbar onOpen={onOpen} openMessage={()=>setMessage(!message)} />
      <Box ml={{ base: 0, md: expand ? '18rem' : '6rem'}} p={{base: 8, md: 8}} overflowX={'hidden'}>          
        <>
          <br /><br /><br />
          {message && <MessageBox open={message} />}
          {component}
        </>
      </Box>
    </Box>
  )
}



export default Layout