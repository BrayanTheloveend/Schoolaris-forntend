import {
    Box,
    Flex,
    Text,
    Stack,
    Collapse,
    Icon,
    Popover,
    PopoverTrigger,
    PopoverContent,
    useColorModeValue,
    useDisclosure,
  } from '@chakra-ui/react'
  import {
    ChevronDownIcon,
    ChevronRightIcon,
  } from '@chakra-ui/icons'
import { primaryDark, colorBase, vert } from '../theme'


  

export const DesktopNav = () => {

    const linkColor = useColorModeValue('gray.600', 'gray.200')
    const linkHoverColor = useColorModeValue(vert, vert)
    const popoverContentBgColor = useColorModeValue('white', 'gray.800')
    const savedData = JSON.parse(localStorage.getItem('userData'))
    
    

    const NavItem = [
      {
        label: 'Accueil',
        href: '/',
        component: ''
      },
  
      savedData?.roleName && {

        label: 'Informations',
        children: [
  
           {
            label: savedData?.roleName === 'STUDENT' ?  'Mes Resultats' : 'Gérer les Notes',
            subLabel: savedData?.roleName === 'STUDENT' ? 'Retrouver vos notes d\'examen' : 'Attribuer des notes',
            href: '/note',
          },
          savedData?.roleName === 'STUDENT' && {
            label: savedData?.roleName === 'STUDENT' ?  'Mes Cours' : 'Gérer les Notes',
            subLabel: savedData?.roleName === 'STUDENT' ? 'Retrouver vos cours en exclusivité' : 'Attribuer des notes',
            href: '/cours',
          },
  
        ],
      },
    ]
  
    return (
      <Stack direction={'row'}  spacing={4}>
        {NavItem.map((navItem) => (
          <Box key={navItem?.label}>
            <Popover trigger={'hover'} placement={'bottom-start'}>
              <PopoverTrigger>
                <Box
                  as="a"
                  p={2}
                  href={navItem?.href ?? '#'}
                  fontSize={'sm'}
                  fontWeight={500}
                  color={linkColor}
                  _hover={{
                    textDecoration: 'none',
                    color: linkHoverColor,
                  }}>
                  {navItem?.label}
                </Box>
              </PopoverTrigger>
  
              {navItem?.children && (
                <PopoverContent
                  border={0}
                  boxShadow={'xl'}
                  bg={popoverContentBgColor}
                  p={4}
                  rounded={'xl'}
                  minW={'sm'}>
                  <Stack>
                    {navItem?.children.map((child) => (
                      <DesktopSubNav key={child?.label} {...child} />
                    ))}
                  </Stack>
                </PopoverContent>
              )}
            </Popover>
          </Box>
        ))}
      </Stack>
    )
  }
  
  export const DesktopSubNav = ({ label, href, subLabel }) => {
    return (
      <Box
        as="a"
        href={href}
        role={'group'}
        display={'block'}
        p={2}
        rounded={'md'}
        _hover={{ bg: useColorModeValue(`${colorBase}.50`, 'gray.900') }}>
        <Stack direction={'row'} align={'center'}>
          <Box>
            <Text
              transition={'all .3s ease'}
              _groupHover={{ color: vert }}
              fontWeight={500}>
              {label}
            </Text>
            <Text fontSize={'sm'}>{subLabel}</Text>
          </Box>
          
          <Flex
            transition={'all .3s ease'}
            transform={'translateX(-10px)'}
            opacity={0}
            _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
            justify={'flex-end'}
            align={'center'}
            flex={1}>
            <Icon color={vert} w={5} h={5} as={ChevronRightIcon} />
          </Flex>
        </Stack>
      </Box>
    )
  }
  
  export const MobileNav = () => {

    const savedData = JSON.parse(localStorage.getItem('userData'))
    const NavItem = [
      {
        label: 'Accueil',
        href: '/',
        component: ''
      },
  
      savedData?.roleName && {

        label: 'Informations',
        children: [
  
           {
            label: savedData?.roleName === 'STUDENT' ?  'Mes Resultats' : 'Gérer les Notes',
            subLabel: savedData?.roleName === 'STUDENT' ? 'Retrouver vos notes d\'examen' : 'Attribuer des notes',
            href: '/note',
          },
          savedData?.roleName === 'STUDENT' && {
            label: savedData?.roleName === 'STUDENT' ?  'Mes Cours' : 'Gérer les Notes',
            subLabel: savedData?.roleName === 'STUDENT' ? 'Retrouver vos cours en exclusivité' : 'Attribuer des notes',
            href: '/cours',
          },
  
        ],
      },
    ]

    return (
      <Stack bg={useColorModeValue('white', 'gray.800')} p={4} display={{ md: 'none' }}>
        {NavItem.map((navItem) => (
          <MobileNavItem key={navItem?.label} {...navItem} />
        ))}
      </Stack>
    )
  }
  

  export const MobileNavItem = ({ label, children, href }) => {
    const { isOpen, onToggle } = useDisclosure()
  
    return (
      <Stack spacing={4} onClick={children && onToggle}>
        <Box
          py={2}
          as="a"
          href={href ?? '#'}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          _hover={{
            textDecoration: 'none',
          }}>
          <Text fontWeight={600} color={useColorModeValue('gray.600', 'gray.200')}>
            {label}
          </Text>
          {children && (
            <Icon
              as={ChevronDownIcon}
              transition={'all .25s ease-in-out'}
              transform={isOpen ? 'rotate(180deg)' : ''}
              w={6}
              h={6}
            />
          )}
        </Box>
  
        <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
          <Stack
            mt={2}
            pl={4}
            borderLeft={1}
            borderStyle={'solid'}
            borderColor={useColorModeValue('gray.200', 'gray.700')}
            align={'start'}>
            {children &&
              children.map((child) => (
                <Box as="a" 
                  key={child?.label} 
                  py={2} 
                  href={child?.href}
                  _hover={{
                    color: primaryDark
                  }}
                  >
                  {child?.label}
                </Box>
              ))}
          </Stack>
        </Collapse>
      </Stack>
    )
  }
  
  