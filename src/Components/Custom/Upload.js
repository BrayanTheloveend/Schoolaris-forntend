import { Avatar, Box, Icon, Input, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import profile from '../../assets/images/profile-3.jpg' 
import { FiCamera } from 'react-icons/fi';
import { primaryLight } from '../theme';

const Upload = ({handleChange, valid}) => {

  class Fichier {
    constructor(file, extention) {
      this.file = file;
      this.extention = extention;
    }
  }

  const [preview, setPreview] = useState(profile)
  const [show, setShow] = useState(true)


  return (
    <Box position={'relative'}  >
      <Box display={'flex'} position={'relative'} justifyContent={'center'} alignItems={'center'}  h={40} w={40} p={1} rounded={'full'} border={'2px dashed'} borderColor={ valid ? (show ? primaryLight : 'green.400' ) : 'red.400'}>
        <Input
          type="file"
          h={40}
          zIndex={1000}
          rounded={'full'}
          w={40}
          position="absolute"
          onChange={e=> {
            setShow(false)
            setPreview(URL.createObjectURL(e.target.files[0]))
            handleChange(new Fichier(e.target.files[0], e.target.files[0].name.split('.').pop()).file)
          }}
          top="0"
          left="0"
          opacity="0"
          aria-hidden="true"
          accept=".jpg, .jpeg, .png, .webp"
        />
          <Avatar size={'2xl'} src={preview} />
          { show && <Icon pos={'absolute'} as={FiCamera} opacity={0.6} color={valid ? (show ? primaryLight : 'green.400' ) : 'red.400'} h={8} w={8} />}
        </Box>
      

      <Text fontSize={'xs'} noOfLines={1} color={valid ? (show ? primaryLight : 'green.400' ) : 'red.400'} textAlign={'center'} mt={4} fontWeight={600}>{ show ?' Cliquer pour ajouter ...' : 'Image Ajoutée'} </Text>
    </Box>
  )
}

export default Upload