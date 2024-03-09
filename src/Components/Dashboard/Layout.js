import React, { useCallback, useEffect, useState } from 'react'
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
  useToast,
  Skeleton,
} from '@chakra-ui/react'
import { primaryLight } from '../theme'
import { NavLink, useNavigate, redirect } from 'react-router-dom'

// import { useSignOut } from 'react-firebase-hooks/auth'
// import { getAuth } from 'firebase/auth'


import MessageBox from './MessageBox'
import Navbar from './Navbar'
import { BiArch, BiBell, BiBookBookmark, BiCompass, BiGrid, BiPaperclip, BiUser } from 'react-icons/bi'
import { useGetUserRoleByIdQuery} from '../Redux/ApiSlice'



const LinkItems = [  
  { name: 'Dashboard', icon: BiGrid, href: '/' , color: '#56aceb'},
  { name: 'Trainings', icon: BiPaperclip, href: '/training', color: 'red.500' },
  { name: 'Manage classes', icon:  BiBookBookmark, href: '/unit', color: 'orange.400'},
  { name: 'Manage Students', icon:  BiCompass, href: '/student', color: '#32cd32'},
  { name: 'Manage Teachers', icon: BiUser, href: '/teacher', color: '#e7522b' },
  { name: 'Notifications', icon: BiBell, href: '/order', color: 'pink.500' },
  { name: 'Settings', icon: BiArch, href: '/order', color: 'blue.300' },
]


const SidebarContent = ({ onClose, ...rest }) => {

  const linkColor = useColorModeValue('gray.600', 'gray.300')
  const bgActive = useColorModeValue('#efefef', 'gray.900')
  const navigate = useNavigate()

  if(!localStorage.getItem('userData')){
    setTimeout(navigate, 0, '/login')
  }

  const toast = useToast()
  const showMessage = useCallback((type, msg, title)=>{
    toast({
      position: 'bottom-right',
      title: title,
      description: msg,
      status: type,
      duration: 3500,
      isClosable: true,
    })
  }, [toast])


  const {
    data,
    isError,
    isSuccess,
    error,
    isLoading
  } = useGetUserRoleByIdQuery(JSON.parse(localStorage.getItem('userData'))?.role)

  useEffect(() => {
    if(isError){
      if(error.status === 401){
        navigate('/login')
      }
      //console.log(error.error);
      showMessage('error', 'Server has been stopped', 'Fetch Task')
    }else if(isSuccess){
      //console.log(data);
      //showMessage('success', `${data.length} items found`, 'Fetch Task')
    }
  }, [isSuccess, isError, error, isLoading, data, navigate, showMessage])

  

  return (
    <Box
      bg={useColorModeValue('white', 'gray.800')}
      borderRightColor={useColorModeValue('gray.500', 'gray.100')}
      w={{ base: 'full', md: '22em' }}
      pos="fixed"
      zIndex={100}
      h="full"
      {...rest}>
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize={{base:"md", md: 'xl'}} textTransform={'uppercase'} fontFamily={'Poppins extraBold'} letterSpacing={2} color={primaryLight} fontWeight="bold">
          Schoolaris
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>

      <Flex mx={6} my={4} mb={8} gap={2} alignItems={'center'}>
        <Avatar
          w={'35px'}
          h={'35px'}
          src={
            localStorage.getItem('userData') ? `http://localhost:3000/image/${ JSON.parse(localStorage.getItem('userData'))?.picture }` : 'https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
          }
        />

        <Flex flexDir={'column'} gap={0} >
          <Text fontSize={'16px'} color={useColorModeValue('gray.600', 'white')} fontWeight={'400'}>{ localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData'))?.name : 'User name'}</Text>
          <Skeleton isLoaded={isSuccess}><Text fontSize={'sm'}>{ isSuccess ? data?.label.toLowerCase() : 'RoleOfUser'}</Text></Skeleton>
        </Flex>
      </Flex>

      <Box ml={8} mb={5}><Text fontWeight={600}>Navigation</Text></Box>
      {LinkItems.map((link,index) => (
        <Link 
        key={index}
        to={link.href}
        as={NavLink}
        display={'flex'} 
        gap={4}
        textDecoration={'none'}  
        alignItems="center"
        fontSize={'md'}
        p="2"
        py={3}
        pl={3}
        mx={3}
        role="group"
        borderRightRadius={'25px'}
        color={linkColor}
        cursor="pointer"
        
        _activeLink={{ bg: bgActive, borderLeft: "3px solid", borderLeftColor: primaryLight , fontFamily: 'Poppins semiBold'  }}
         _hover={{
           bg: bgActive,
            fontFamily: 'Poppins semiBold'
         }}
        >
          <Icon
            rounded={'full'}
            color={link.color}
            // _groupHover={{
            //   color: 'white',
            // }}

            as={link.icon}
          />
          
          {link.name}
        </Link>
        
      ))}
    </Box>
  )
}


const Layout = ({component}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [message, setMessage] = useState(false)

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent onClose={() => onClose} display={{ base: 'none', md: 'block' }} />
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
      <Box ml={{ base: 0, md: 80 }} p={{base: 8, md: 8}} overflowX={'hidden'}>          
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