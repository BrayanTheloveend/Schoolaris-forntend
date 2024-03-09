import { ChevronRightIcon } from '@chakra-ui/icons'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Heading } from '@chakra-ui/react'
import React from 'react'
import { primaryLight } from '../theme'

const CustomHeading = ({title, prevSection, currentSection, nextSection}) => {
  return (
    <>
        <Heading my={5} fontSize={'3xl'} id='triggerNav'>{title}</Heading>
        <Breadcrumb separator={<ChevronRightIcon color='gray.500' />}>
          <BreadcrumbItem>
            <BreadcrumbLink fontWeight={500}>{prevSection}</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink color={ !nextSection && 'blue.400'} fontWeight={500}>{currentSection}</BreadcrumbLink>
          </BreadcrumbItem>

          { nextSection && <BreadcrumbItem>
            <BreadcrumbLink color={'blue.400'} fontWeight={500}>{nextSection}</BreadcrumbLink>
          </BreadcrumbItem>}
        </Breadcrumb>
    </>
  )
}

export default CustomHeading