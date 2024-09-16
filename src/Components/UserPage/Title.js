import { Center, Heading } from '@chakra-ui/react'
import React from 'react'

const Title = ({children}) => {
  return (

    <Center>
      <Heading 
        fontSize={{ base: '2xl', sm: '3xl' }}  
        className='TitleMark'
        fontWeight={600}
        mt={10}
        mb={10}
        // _after={{
        //   content: "''",
        //   width: '120px',
        //   height: useBreakpointValue({ base: '10%', md: '18%' }),
        //   position: 'absolute',
        //   bottom: -4,
        //   left: 'calc(50% - 60px)',
        //   bg: colorLight,
        //   zIndex: -1,
        // }}
        >
          {children}
        </Heading>
    </Center>
  )
}

export default Title
