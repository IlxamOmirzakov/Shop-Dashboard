import { BiCategoryAlt } from "react-icons/bi"; 
import { Box, Button, Divider, Icon, Text, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import btnData from "../config/constants";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({setShowDash}) => {
  const hoverBtn = useColorModeValue('blue.500', 'blackAlpha.500')
  const activeBtn = useColorModeValue('blue.600', 'blackAlpha.700')
  const hoverActiveBtn = useColorModeValue('blue.700', 'blackAlpha.900')
  const { pathname } = useLocation()
  return (
    <Box  width={'full'} padding={'5px'} mt={'15px'}>
      <Text color={'white'} textAlign={'center'} fontWeight={'600'} fontSize={'20px'}>Dashboard</Text>
        <Divider mb ={'20px'} mt={'9px'}/>
      <Box display={'flex'} flexDir={'column'} gap={'10px'}>
        {btnData.map(item => (
            <Link to={item.path} key={item.id}> 
                <Button onClick={() => setShowDash(false)} rounded={'sm'} isActive={item.path === pathname? true : false} _active={{backgroundColor :  activeBtn}} variant={'outline'} color={'white'} _hover={{backgroundColor : item.path === pathname? hoverActiveBtn : hoverBtn }} width={'full'} justifyContent={'start'} gap={'10px'}>
                    <Icon as={item.icon}/>
                    <Text>{item.title}</Text>
                </Button>
            </Link>
        ))}
      </Box>
    </Box>
  )
}

export default Sidebar
