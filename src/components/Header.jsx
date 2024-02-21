import { BiSun } from "react-icons/bi"; 
import { AiOutlineSearch } from "react-icons/ai"; 
import { BiCategoryAlt } from "react-icons/bi"; 
import { BiMoon } from "react-icons/bi"; 
import { Box, Icon, IconButton, Input, InputGroup, InputRightElement, Text, useColorMode, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import btnData from "../config/constants";
import { useLocation } from "react-router-dom";

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const { pathname  } = useLocation()
  const headerBg = useColorModeValue('blue.400', 'gray.900')
  return (
    <Box borderBottom={'1px'} borderColor={'whiteAlpha.400'} backgroundColor={headerBg} position={'sticky'} px={'10px'} height={'60px'} top={0} display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
      <Box display={'flex'} fontSize={'22px'} justifyContent={'center'} alignItems={'center'} gap={'10px'}>
        <Box padding={'5px'} width={'35px'} height={'35px'} display={'flex'} justifyContent={'center'} alignItems={'center'} rounded={'md'} backgroundColor={'blue.500'}>
            <Icon color={'white'} as={btnData.find(item => item.path === pathname).icon}/>
        </Box>
        <Text fontWeight={'600'} fontSize={'18px'} color={'white'}>{btnData.find(item => item.path === pathname).title}</Text>
      </Box>
      <Box width={'50%'} display={'flex'} justifyContent={'center'} alignItems={'center'} gap={'10px'}>
        <InputGroup>
            <Input color={'white'} size={'md'} rounded={'full'} _placeholder={{color : 'whiteAlpha.700'}} placeholder="Search..."/>
            <InputRightElement>
                <IconButton rounded={'full'} size={'sm'} icon={<AiOutlineSearch />}/>
            </InputRightElement>
        </InputGroup>
      <Box>
        <IconButton size={'sm'} rounded={'full'} icon={colorMode === 'light'? <BiMoon/> : <BiSun /> } onClick={() => toggleColorMode()}/>
      </Box>
      </Box>
    </Box>
  )
}

export default Header
