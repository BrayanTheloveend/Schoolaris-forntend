import React, { useEffect, useState } from 'react'
import UserNav from './UserNav'
import { Avatar, Box, Button, Flex, Grid, GridItem, Heading, Icon, IconButton, Skeleton, Text, useDisclosure } from '@chakra-ui/react'
import { EditIcon } from '@chakra-ui/icons'
import { primaryLight, vert } from '../theme'
import { BiCalendarAlt, BiGridAlt, BiLayer, BiPhoneCall, BiUser} from 'react-icons/bi'
import { FaArrowDown, FaArrowUp, FaWallet } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import HistoryItems from './historyItems'
import dayjs from 'dayjs'
import { useGetPaymentByStudentIdQuery, useGetSubjectByIdQuery} from '../Redux/ApiSlice'
import Nodata from './Nodata'
import TeacherComponent from './TeacherCompenent'
import CustomModal from '../Custom/CustomModal'


const Profile = () => {

    const navigate = useNavigate()
    const savedData = JSON.parse(localStorage.getItem('userData'))
    const { isOpen, onClose, onOpen} = useDisclosure()

    const { isError, isLoading, isSuccess, data, error } =
    useGetSubjectByIdQuery(savedData?.subjectId)

    useEffect(() => {
        if(!savedData){
            onOpen()
        }
      }, [savedData, onOpen ])
    
     //GETSUBJECT
  
    useEffect(() => {
    if(isError){
      if(error.status=== 401){
        onOpen()
      }
    }else if(isSuccess){
      // console.log(data);
      // showMessage('success', `${data.length} items found`, 'Fetch Task')
    }
  }, [isSuccess, isError, error, navigate,  onOpen])



  //GET PAYMENT HISTORY

  const payment =useGetPaymentByStudentIdQuery({id: savedData?.id, token: savedData?.token })

  useEffect(() => {
    if(payment.isError){
      if(payment.error.status=== 401){
        onOpen()
      }
    }else if(payment.isSuccess){
      // showMessage('success', `${data.length} items found`, 'Fetch Task')
    }
  }, [payment.isSuccess, payment.isError, payment.error, navigate,  onOpen])


    
  return (
    <>
    <UserNav/>
    <Grid pt={{base: 20, md: 28}} gridTemplateColumns={{base: '1fr', md:'500px'}} justifyContent={'center'} gap={4}>
        <GridItem p={4} display={'flex'} flexDir={'column'} gap={6} justifyContent={'center'} >
            <Heading fontSize={'2xl'}>Votre Profile</Heading>  
            <Flex justify={'center'} align={'center'}>
                <Box mt={4}>
                    <Box p={4} border={'2px dashed'} borderColor={vert} position={'relative'} rounded={'full'}>
                        <Avatar size={'2xl'} src={
                                `${process.env.REACT_APP_PORT}/${ savedData?.roleName === 'STUDENT' ?  `image` : 'image2'}/${ savedData?.picture }`
                            } />
                        <IconButton pos={'absolute'} bg={primaryLight} icon={<EditIcon color={'white'}/>} rounded={'full'} colorScheme='blue'/>
                    </Box>
                    
                </Box>
            </Flex>
            
            
            <Box textAlign={'center'}>
                <Text fontSize={'md'} fontWeight={600} color={'gray.500'}>
                    {savedData?.name} {savedData?.surname}
                </Text>
                <Text color={'green.400'} fontWeight={'400'}>
                    {savedData?.email}
                </Text>
            </Box>

            <Flex justify={'space-between'} w={'full'}>
                <Box mt={4}>
                    <Flex gap={6}  align={'center'}>
                        <Icon w={'18px'} h={'18px'} as={BiCalendarAlt} color={vert} />
                        <Box>
                            <Text fontSize={'sm'}>Date de naissance</Text>
                            <Heading fontSize={'md'} fontWeight={500}>
                            {dayjs(savedData?.birthday).format('DD.MM.YYYY')}
                            </Heading>
                        </Box>
                    </Flex>


                    { savedData?.roleName === 'STUDENT' && 
                    
                    <Flex gap={6} align={'center'} mt={6}>
                        <Icon w={'18px'} h={'18px'} as={BiGridAlt} color={vert} />
                        <Box >
                            <Text fontSize={'sm'}>Filiére</Text>
                            <Skeleton isLoaded={isSuccess}>
                                <Heading fontSize={'md'} fontWeight={500}>
                                    {isSuccess && data?.name} {isSuccess && data?.level}
                                </Heading>
                            </Skeleton>
                            
                        </Box>
                    </Flex> 

                    // <Flex gap={6} align={'center'} mt={6}>
                    //     <Icon w={'18px'} h={'18px'} as={BiGridAlt} color={vert} />
                    //     <Box >
                    //         <Text fontSize={'sm'}>Classes</Text>
                    //         <Skeleton isLoaded={isSuccess}>
                    //             <Heading fontSize={'md'} fontWeight={500}>
                    //                 {count}
                    //             </Heading>
                    //         </Skeleton>
                            
                    //     </Box>
                    // </Flex>

                    
                    }
                    

                    <Flex gap={6} align={'center'} mt={6}>
                        <Icon w={'18px'} h={'18px'} as={BiPhoneCall} color={vert} />
                        <Box >
                            <Text fontSize={'sm'}>Mobile</Text>
                            <Heading fontSize={'md'} fontWeight={500}>
                            {`+237 ${savedData?.mobile}`}
                            </Heading>
                        </Box>
                    </Flex>
                </Box>

                <Box mt={4}>
                    <Flex gap={6}  align={'center'}>
                        <Icon w={'18px'} h={'18px'} as={BiCalendarAlt} color={vert} />
                        <Box>
                            <Text fontSize={'sm'}>Statut</Text>
                            <Text fontSize={'md'} color={ savedData?.statut === 1 ? 'green.500' : 'red.500'}>{savedData?.statut === 1 ? 'Activé' : 'Non activé'}</Text>
                            
                        </Box>
                    </Flex>

                    <Flex gap={6} align={'center'} mt={6}>
                        <Icon w={'18px'} h={'18px'} as={BiUser} color={vert} />
                        <Box >
                            <Text fontSize={'sm'}>Role</Text>
                            <Heading fontSize={'md'} fontWeight={500}>
                            {savedData?.roleName === 'STUDENT' ? 'Étudiant' : 'Professeur' }
                            </Heading>
                        </Box>
                    </Flex>

                   
                    
                    <Flex gap={6} align={'center'} mt={6}>
                        <Icon w={'18px'} h={'18px'} as={BiLayer} color={vert} />
                        <Box >
                            <Text fontSize={'sm'}>Matricule</Text>
                            <Heading fontSize={'md'} fontWeight={500}>
                                14A2515
                            </Heading>
                        </Box>
                    </Flex>

                    
                </Box>
            </Flex>
            
       
{            
    savedData?.roleName === 'STUDENT' ? 
     <React.Fragment>
        <Heading fontSize={'2xl'} mt={8}>Votre Scolarité</Heading>
                
                <Flex justify={'space-between'} align={'center'} w={'full'}>
                    
                    <Flex w={'full'} gap={4} mt={8}>
                        <Box display={'flex'} justifyContent={'center'} alignItems={'center'} w={10} h={10} bg={vert} rounded={12}>
                            <Icon as={FaWallet} color={'white'} w={4} h={4} />
                        </Box>

                        <Box>
                            <Text fontSize={'sm'}>Montant </Text>
                            <Skeleton isLoaded={isSuccess}>
                                <Heading fontWeight={500} fontFamily={'Montserrat'} fontSize={'md'} color={vert}> {isSuccess && data?.fees} <small>XAF</small></Heading>
                            </Skeleton>
                        </Box>
                    </Flex>
                    <Flex w={'full'} gap={4} mt={8}>
                        <Box display={'flex'} justifyContent={'center'} alignItems={'center'} w={10} h={10} bg={primaryLight} rounded={12}>
                            <Icon as={FaArrowUp} color={'white'} w={4} h={4} />
                        </Box>

                        <Box>
                            <Text fontSize={'sm'}>deja payé</Text>
                            <Skeleton isLoaded={payment.isSuccess}>
                                <Heading fontWeight={500} fontFamily={'Montserrat'} fontSize={'md'} color={primaryLight}>{payment.isSuccess && payment.data.reduce((accumulator, currentValue) => accumulator + currentValue.amount, 0)} <small>XAF</small></Heading>
                            </Skeleton>
                        </Box>
                    </Flex>
                </Flex>
                {payment.isSuccess && payment.data.reduce((accumulator, currentValue) => accumulator + currentValue.amount, 0) < data?.fees &&  
                <Flex w={'full'} gap={4} mt={4}>
                    <Box display={'flex'} justifyContent={'center'} alignItems={'center'} w={10} h={10} bg={'red.400'} rounded={12}>
                        <Icon as={FaArrowDown} color={'white'} w={4} h={4} />
                    </Box>

                    <Box>
                        <Text fontSize={'sm'}>Reste</Text>
                        <Heading fontWeight={500} fontFamily={'Montserrat'} fontSize={'md'} color={'red.400'}>{payment.isSuccess && data?.fees - payment.data.reduce((accumulator, currentValue) => accumulator + currentValue.amount, 0)}  <small>XAF</small></Heading>
                    </Box>
                </Flex> }

                {/* <Flex justify={'center'} my={4}>
                    <Button colorScheme='blue' w={'full'} onClick={()=>navigate('/schoolpay')}>
                        Effectuer un paiement
                    </Button>
                </Flex> */}

                <Heading mt={4} fontSize={'md'} fontWeight={'500'}>Histotique de paiements</Heading>

                <Skeleton isLoaded={payment.isSuccess}>
                    <Box pt={4}>
                        {
                            payment.isSuccess && payment.data.length !== 0 ?
                            payment.data.map((elt,index)=> <HistoryItems key={elt.id} data={elt}/>)

                            : <Nodata/>
                        }
                    </Box>
                </Skeleton>
                
            </React.Fragment>

            :

            <TeacherComponent/>
        }
            
        </GridItem>

    </Grid>


    <CustomModal
    onClose={onClose}
    isOpen={isOpen}
    isLoading={false}
    closeOnOverlayClick
    isSuccess={true}
    title={'Session Expirée'}
    data={''}
    text={{
    message : <> Chére utilisateur <strong>{savedData?.name}</strong> votre session a éxpirée ! Connectez-vous pour continuer</>,
    color: 'blue',
    button: 'Se connecter'
    }}
    handler={()=>navigate('/login')}
    />
    
    </>
  )
}

export default Profile
