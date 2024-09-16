import { ChevronRightIcon } from '@chakra-ui/icons'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Heading } from '@chakra-ui/react'
import React from 'react'
import { primaryLight, vert } from '../theme'

const CustomHeading = ({title, prevSection, currentSection, nextSection}) => {
  return (
    <>
        <Heading my={5} fontFamily={'Poppins'} fontWeight={{base: 400, md: 600}}  fontSize={{base: '2xl', md:'3xl'}}>{title}</Heading>
        <Breadcrumb separator={<ChevronRightIcon color='gray.500' />}>
          <BreadcrumbItem>
            <BreadcrumbLink fontWeight={{base: 400, md: 600}}>{prevSection}</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink color={ !nextSection && vert}  fontWeight={{base: 400, md: 600}}>{currentSection}</BreadcrumbLink>
          </BreadcrumbItem>

          { nextSection && <BreadcrumbItem>
            <BreadcrumbLink color={vert} fontWeight={{base: 400, md: 600}}>{nextSection}</BreadcrumbLink>
          </BreadcrumbItem>}
        </Breadcrumb>
    </>
  )
}

export default CustomHeading