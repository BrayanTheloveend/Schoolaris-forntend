import { Box, Flex, Icon, Input, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { FiFilePlus } from 'react-icons/fi';

const SimpleUpload = ({handleChange, valid, setValid}) => {

    class Fichier {
        constructor(file, extention) {
          this.file = file;
          this.extention = extention;
        }
    }

    const [ placeholder, setPlaceholder ] =useState('Veuillez importer un fichier')


  return (

    <Flex
    h={10}
    border={'2px dashed'}
    borderColor={valid ? 'gray.400': 'red.400'}
    gap={8} 
    px={6}
    rounded={4}
    position={'relative'}
    align={'center'}
    >
        
        <Icon as={FiFilePlus} fontSize={'md'}/>
        <Text fontSize={'md'} noOfLines={1}>
          {placeholder}
        </Text>
        <Input type='file'
        placeholder='Importer un fichier'
        minW={'300px'}
        onChange={e=> {
          handleChange(new Fichier(e.target.files[0], e.target.files[0].name.split('.').pop()).file)
          setPlaceholder(e.target.files[0].name)
          setValid(true)
        }}
        pos={'absolute'}
        opacity="0"
        top='0'
        left='0'
        aria-hidden="true"
        accept=".pdf, .doc, .docx"
        />
    </Flex>
    
  )
}

export default SimpleUpload
