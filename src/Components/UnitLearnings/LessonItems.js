import { Avatar, Box, Checkbox, Flex, GridItem, Icon, IconButton, Image, Link, Skeleton, Text, useColorModeValue } from '@chakra-ui/react';
import React, { forwardRef, useEffect } from 'react'
import { FiDownload, FiHeart } from 'react-icons/fi';
import { vert } from '../theme';
import imageTest from '../../assets/convert-google-doc-to-pdf-6.png'
import { DeleteIcon } from '@chakra-ui/icons';
import dayjs from 'dayjs';
import { useGetLikeByLessonIdQuery, useGetTeacherByIdQuery } from '../Redux/ApiSlice';

const LessonItems = forwardRef((props, ref)=> {

    const textColor = useColorModeValue('gray.600', 'gray.500')

    const openPdf = (link)=>{
        window.open(link)
    }


    const Teacher = useGetTeacherByIdQuery(props.data.idTeacher)
    const Like = useGetLikeByLessonIdQuery(props.data.id)

    //GETTEACHER DATA
    useEffect(() => {
        if(Like.isError){
        if(Like.error.status=== 401){
            //navigate('/login')
        }
        //console.log(error.error);
        //return showMessage('error',error.message, 'Fetch Task')
        }else if(Like.isSuccess){
        console.log(Like.data);
        //showMessage('success', `${data.length} items found`, 'Fetch Task')
        }
    }, [Like.isSuccess, Like.isError, Like.error, Like.isLoading, Like.data])

    //GETTEACHER DATA
    useEffect(() => {
        if(Teacher.isError){
        if(Teacher.error.status=== 401){
            //navigate('/login')
        }
        //console.log(error.error);
        //return showMessage('error',error.message, 'Fetch Task')
        }else if(Teacher.isSuccess){
        console.log(Teacher.data);
        //showMessage('success', `${data.length} items found`, 'Fetch Task')
        }
    }, [Teacher.isSuccess, Teacher.isError, Teacher.error, Teacher.isLoading, Teacher.data])





    return (
      <GridItem 
      ref={ref}
      pos={'relative'}
      overflow={'hidden'} 
      bg={useColorModeValue('white', 'gray.800')}
      rounded={8} 
      border={'1px solid'}
      borderColor={useColorModeValue('#efefef', 'gray.800')}
      gap={{md: 3, base: 6}}
  
      {...props.style}>
        

        <Image src={imageTest} />


        <Flex px={4} py={2} pos={'absolute'} top={0} align={'center'} justify={'space-between'} w={'100%'}>
            <Flex align={'center'} gap={4}>
                <Checkbox/>
                <Text color={'gray.700'}>selectionner</Text>
            </Flex>
            <Flex gap={2} align={'center'}>
                <IconButton icon={<DeleteIcon/>} size={'sm'} onClick={props.handleDelete} colorScheme='red'/>  
            </Flex>
            
        </Flex>
        
        <Box p={4} pos={'relative'}>

            <Box bg={vert} borderLeftRadius={10} position={'absolute'}  p={2} top={-7} right={0}>
                <Text fontWeight={700} color={'white'}>{dayjs(props.data.creatAt).format('DD.MM.YYYY')}</Text>
            </Box>
            <Flex justify={'space-between'}>
                <Flex gap={2} align={'center'}>
                    <Skeleton isLoaded={Teacher.isSuccess}>
                        <Avatar size={'md'} src={`http://localhost:${process.env.REACT_APP_PORT}/image2/${Teacher.data?.picture}`} />
                    </Skeleton>
                    <Box>
                        <Skeleton isLoaded={Teacher.isSuccess}>
                            <Text fontWeight={600} noOfLines={1} color={useColorModeValue('gray.600', 'white')}>Mr {Teacher.data?.name} {Teacher.data?.surname} </Text>
                        </Skeleton>
                        <Text color={textColor}>professeur</Text>
                    </Box>
                    
                </Flex>


            </Flex>

         {/*    <Text fontWeight={500} >Genie Logiciel Niveau 3</Text>*/}
            <Text fontWeight={500} mt={2} noOfLines={1}> <strong>Intitulé: </strong> &nbsp;&nbsp;&nbsp; {props.data.label}</Text> 

            <Flex gap={4} align={'center'} justify={'space-between'} mt={4}>

                <Link title='Ouvrir...' color='green.500' onClick={()=>openPdf(`http://localhost:${process.env.REACT_APP_PORT}/cours/${props.data?.file}`)}>Ouvrir...</Link> 
                <Flex gap={4}>
                    <Icon as={FiHeart} color={vert} fontSize={20}/>
                    <Skeleton isLoaded={Like.isSuccess} >
                        <Text fontWeight={500} color={useColorModeValue('gray.600', 'white')}>{Like.isSuccess && Like.data.length}</Text>
                    </Skeleton>
                </Flex>
            </Flex>
        </Box>
        

  
    </GridItem>
    );
  })

export default LessonItems
