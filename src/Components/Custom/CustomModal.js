import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from '@chakra-ui/react'
import React from 'react'

const CustomModal = ({onClose, isOpen, isLoading, isSuccess, data, handler, text, title, closeOnOverlayClick}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered closeOnOverlayClick={!closeOnOverlayClick} >
        <ModalOverlay />
        <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        {!closeOnOverlayClick && <ModalCloseButton />}
        <ModalBody>
            <Text noOfLines={3} fontSize={'md'}>{text.message} <strong>{data}</strong> ?</Text>
        </ModalBody>

        <ModalFooter>
            { !closeOnOverlayClick && <Button rounded={'md'} colorScheme='blue' mr={3} onClick={onClose}>
            annuler
            </Button>}
            <Button variant='outline' isLoading={isLoading} rounded={'md'} colorScheme={text.color} onClick={handler}>{text.button}</Button>
        </ModalFooter>
        </ModalContent>
    </Modal>
  )
}

export default CustomModal