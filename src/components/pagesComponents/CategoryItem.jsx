import { AiOutlineEdit } from "react-icons/ai"; 
import { AiOutlineDelete } from "react-icons/ai"; 
import { Box, Card, CardBody, IconButton, Image, Text, useColorModeValue } from '@chakra-ui/react'
import React from 'react'

const CategoryItem = ({item, setItemId, onDeleteOpen, onUpdateOpen}) => {
  const cardBg = useColorModeValue('blue.500', 'gray.900')

  function openAlertDelete(id) {
    setItemId(id)
    onDeleteOpen()
  }
  function openAlertUpdate(id) {
    setItemId(id)
    onUpdateOpen()
  }

  return (
    <Card rounded={'sm'} backgroundColor={cardBg} border={'1px'} borderColor={'whiteAlpha.300'}>
        <CardBody display={'flex'} padding={'7px'} justifyContent={'space-between'} alignItems={'center'} gap={'10px'}>
            <Box display={'flex'} justifyContent={'center'} alignItems={'center'} gap={'5px'}>
                <Image src={item.image} rounded={'sm'} width={'45px'} height={'45px'} objectFit={'cover'}/>
                <Text color={'white'}>{item.title.length>8? `${item.title.slice(0,8)}...` : item.title}</Text>
            </Box>
            <Box display={'flex'} justifyContent={'center'} alignItems={'center'} gap={'5px'}>
                <IconButton onClick={() => openAlertDelete(item.id)} size={'sm'} fontSize={'15px'} colorScheme="red" icon={<AiOutlineDelete />}/>
                <IconButton onClick={() => openAlertUpdate(item.id)} size={'sm'} fontSize={'15px'} colorScheme="green" icon={<AiOutlineEdit />}/>
            </Box>
        </CardBody>
    </Card>
  )
}

export default CategoryItem
